/** Host half of the Research Lab UI plugin: command, tool, and session projection. */
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { appendPluginRecord } from '@deepseek-ai/dsh-session'
import { z as zod } from 'zod'

export const name = 'dsh-lab-research-ui'
export const inject = ['commands', 'tools', 'sessionProjections']

/** Wire payload schema for research state projection. */
const sessionStates = new WeakMap()

const researchProjectionSchema = zod.union([
  zod.object({
    nodes: zod.array(zod.object({
      id: zod.string(),
      kind: zod.enum(['question', 'hypothesis', 'dataset', 'experiment', 'artifact', 'finding']),
      title: zod.string(),
      status: zod.string().optional(),
      stage: zod.string().optional(),
      parent: zod.string().optional(),
      degradationReason: zod.string().optional(),
      metrics: zod.record(zod.union([zod.string(), zod.number()])).optional(),
      detail: zod.string().optional(),
      fields: zod.record(zod.union([zod.string(), zod.number(), zod.boolean()])).optional(),
      tags: zod.array(zod.string()).optional(),
      sandboxPath: zod.string().optional(),
      fileType: zod.enum(['code', 'markdown', 'image', 'text']).optional(),
      content: zod.string().optional(),
      preview: zod.string().optional(),
      staged: zod.boolean().optional(),
      version: zod.string().optional(),
      history: zod.array(zod.object({
        version: zod.string(),
        timestamp: zod.string().optional(),
        metrics: zod.record(zod.union([zod.string(), zod.number()])).optional(),
        detail: zod.string().optional(),
        degradationReason: zod.string().optional(),
        stage: zod.string().optional(),
        sandboxPath: zod.string().optional(),
        content: zod.string().optional(),
        preview: zod.string().optional(),
      })).optional(),
      slices: zod.record(zod.object({
        name: zod.string().optional(),
        samples: zod.union([zod.string(), zod.number()]).optional(),
        criteria: zod.string().optional(),
        split: zod.string().optional(),
        holdout: zod.boolean().optional(),
      })).optional(),
      dataProvenance: zod.object({
        datasetId: zod.string().optional(),
        slice: zod.string().optional(),
        samples: zod.union([zod.string(), zod.number()]).optional(),
        criteria: zod.string().optional(),
        split: zod.string().optional(),
        holdout: zod.boolean().optional(),
      }).optional(),
      thread: zod.array(zod.object({
        id: zod.string(),
        sender: zod.enum(['user', 'assistant', 'system']),
        timestamp: zod.string().optional(),
        text: zod.string(),
      })).optional(),
    })),
    edges: zod.array(zod.object({
      id: zod.string().optional(),
      source: zod.string(),
      target: zod.string(),
      label: zod.string().optional(),
    })),
    activity: zod.array(zod.object({
      time: zod.string().optional(),
      event: zod.string(),
      detail: zod.string().optional(),
    })),
    activeThreadId: zod.string().nullable().optional(),
  }),
  zod.null(),
])

/** Durable profile-level boundary constraint prompts for the Research Lab agent. */
const RESEARCH_SANDBOX_POLICY = `## Research Lab & Virtual Staging Sandbox Guidelines (Mandatory Rules)

You are operating with the Research Lab UI workspace plugin active. You must strictly enforce the following safety, boundary, and scientific integrity constraints across ALL conversation turns:

1. [Zero Unapproved Disk Writes · 零未授权物理落盘]
   - During research exploration, EDA, hypothesis generation, and experiment prototyping: DO NOT write code scripts (.py, .sh), documentation/notes (.md), or chart figures (.png, .svg) directly to the workspace filesystem using bash, write_file, or any file tools without explicit user approval.
   - All exploratory code, documentation, and visualization assets MUST be staged virtually into research nodes via 'research_state_write' using 'sandboxPath', 'fileType' ('code' | 'markdown' | 'image' | 'text'), 'content', and/or 'preview' (staged: true). They will render cleanly inside the Research Tab for user inspection and in-tab execution without dirtying the git repository.

2. [Explicit Authorization Gate for Disk Commits · 显式落盘授权门禁]
   - DO NOT autonomously, implicitly, or proactively persist sandboxed files to the physical disk.
   - You may ONLY call 'research_sandbox_commit' when the user explicitly grants permission in chat (e.g., "允许落盘", "把沙箱代码写入项目", "commit sandbox files", "保存到磁盘").

3. [Workspace & Git Tree Cleanliness · 工作区干净度与防污染]
   - Keep the project git working tree clean. Never generate untracked exploratory junk files in the repository.
   - Never execute 'git commit' unless explicitly instructed by the user.

4. [Display Language Alignment · 界面显示语言绝对对齐]
   - Strictly honor the user's chosen display language preference (e.g. Chinese).
   - In 'research_state_write', all node titles, details, summaries, and metadata keys/values must strictly use the chosen display language. Do not mix uncoordinated English/Chinese labels.

5. [Scientific Integrity & Holdout Isolation · 科研真实性与数据隔离]
   - Never touch, evaluate on, or peek into holdout/test cohorts during exploration.
   - Fix hypotheses, comparators, and evaluation criteria BEFORE running experiments; never retroactively alter definitions or hypotheses after seeing results.

6. [Scientific Lifecycle Machine & Degradation Logging · 科学假设状态机与证伪退化记录]
   - Scientific exploration deepens and branches dynamically: hypotheses are frequently falsified, refined, or degraded as evidence emerges.
   - Status Machine:
     * Positive: 'proposed' -> 'testing' -> 'supported' / 'confirmed' / 'completed'
     * Refinement & Branching: 'refined' -> 'subset' -> 'pivoted'
     * Refutation & Degradation: 'falsified' (已证伪), 'negative' (负向结论), 'failed' (实验失败), 'bottleneck' (遭遇瓶颈), 'deprecated' (废弃), 'abandoned' (放弃)
   - When a hypothesis or experiment fails or encounters a blocker:
     * Never silently erase or overwrite it! Falsified hypotheses are essential negative evidence that prevents repeat errors.
     * Mark status as 'falsified', 'failed', or 'bottleneck' via 'research_node_update', and provide a rigorous 'degradationReason' explaining the empirical failure mechanism.
     * Branch improved hypotheses or new experiment iterations using 'research_node_add' with 'parent: <previousNodeId>' to track bloodline lineage.
   - Record quantitative evaluation results in 'metrics' (e.g. PPV, Sens, FA_per_h, AUROC, MAE) for automated structured KPI display.

7. [Card-Level Versioning & Iteration Snapshots · 卡片级版本控制与历史快照]
   - When iterating an existing model, feature set, or experiment script, update the node via 'research_node_update' with a new 'version' (e.g. 'v1.1', 'v1.2', 'v2.0').
   - The system automatically archives the prior version's metrics, stage, and code into 'history', enabling delta comparisons and historical rollbacks without cluttering the canvas with duplicate cards.

8. [Data Cohorts & Provenance Tracking · 数据切片追踪与防泄漏门禁]
   - For datasets ('kind: dataset'), define named cohort subsets in 'slices' (e.g. 'raw_all', 'clean_snr15', 'train_split', 'val_split') with explicit filter criteria, sample counts (N), and holdout status.
   - For artifacts and experiments ('kind: artifact' | 'experiment'), ALWAYS specify 'dataProvenance' (e.g. { datasetId: 'ds-bp', slice: 'clean_snr15', samples: 1820, split: 'train_split' }) to guarantee scientific reproducibility and prevent uncoordinated data drift or holdout leakage.

9. [Card-Level Dedicated Threads & Discussion Lineage · 卡片专属讨论与研讨线索沉淀]
   - Each research node supports an independent conversation thread ('thread': [{ id, sender, timestamp, text }]).
   - When the user focuses on or inquires about a specific card (or in localized thread discussion):
     * Provide focused, granular technical analysis specifically addressing that card's hypotheses, metrics, code, or failure rationale.
     * Record key debate points, ablation hypotheses, or debugging conclusions using 'research_thread_post', keeping the scientific rationale transparent and auditable.
     * If discussion results in an updated decision or metric, update the card status, metrics, or degradationReason in the same turn.

10. [Multi-Agent Collaboration & Continuous Sync · 多 Agent 协同与增量进展同步]
   - When working alongside other AI agents, background research runs, or team members, use the '/import-sync' command to synchronize incoming progress.
   - Always perform incremental reconciliation: preserve existing card IDs, discussion threads, and staged assets; update statuses and metrics with version history; and append timeline activity entries.`

/**
 * Register the `/start-research` command, `research_state_write` tool, and
 * `research` session projection.
 * @param ctx - plugin context
 */
export function apply(ctx) {
  // Inject durable profile-level boundary constraint section into system prompt
  function registerSandboxPromptSection(sp) {
    if (!sp || typeof sp.section !== 'function') return
    try {
      sp.section({
        name: 'research:sandbox-boundary',
        order: 700, // Positioned at policy layer (alongside PLAN_POLICY and TEAM_POLICY)
        text: RESEARCH_SANDBOX_POLICY,
      })
    } catch (err) {
      console.warn('Failed to register research sandbox prompt section:', err)
    }
  }

  const currentSystemPrompt = (typeof ctx.get === 'function' ? ctx.get('systemPrompt') : null) || ctx.systemPrompt
  if (currentSystemPrompt) {
    registerSandboxPromptSection(currentSystemPrompt)
  }
  if (typeof ctx.on === 'function') {
    ctx.on('internal/service', (name, service) => {
      if (name === 'systemPrompt') {
        registerSandboxPromptSection(service)
      }
    })
  }

  // Register the research session projection
  ctx.sessionProjections.register({
    key: 'research',
    stateSchema: researchProjectionSchema,
    init: (header) => {
      const cwd = header?.cwd || process.cwd()
      try {
        const filePath = path.join(cwd, 'research_nodes.json')
        if (fsSync.existsSync(filePath)) {
          const content = fsSync.readFileSync(filePath, 'utf8')
          const parsed = JSON.parse(content)
          const validated = researchProjectionSchema.safeParse(parsed)
          if (validated.success) return validated.data
        }
      } catch {
        // Fallback to null on read/parse error
      }
      return null
    },
    apply: (state, event) => {
      if (event.type === 'plugin:research/write' || event.type === 'research/write') return event.data.state
      return state
    },
    wire: {
      viewSchema: researchProjectionSchema,
      view: state => state,
    },
    stateVersion: 2,
  })

  // Helper functions for state access and atomic persistence
  function getSessionState(session) {
    let state = sessionStates.get(session)
    if (!state) {
      const cwd = session.header?.cwd || session.cwd || process.cwd()
      const filePath = path.join(cwd, 'research_nodes.json')
      if (fsSync.existsSync(filePath)) {
        try {
          state = JSON.parse(fsSync.readFileSync(filePath, 'utf8'))
        } catch {}
      }
    }
    return state || { nodes: [], edges: [], activity: [] }
  }

  async function commitSessionState(session, state) {
    const cleanState = JSON.parse(JSON.stringify(state))
    sessionStates.set(session, cleanState)
    try {
      appendPluginRecord(session, 'plugin:research/write', { state: cleanState })
    } catch (err) {
      try {
        session.append('research/write', { state: cleanState })
      } catch (innerErr) {
        console.error('Failed to append research state record:', err, innerErr)
      }
    }
    const cwd = session.header?.cwd || session.cwd || process.cwd()
    const filePath = path.join(cwd, 'research_nodes.json')
    try {
      await fs.writeFile(filePath, JSON.stringify(cleanState, null, 2), 'utf-8')
    } catch (err) {
      console.error('Failed to update research_nodes.json:', err)
    }
  }

  // Register the research_state_write tool
  ctx.tools.register(defineTool({
    name: 'research_state_write',
    description: 'Record and update the entire research project structure, hypotheses, datasets, experiments, and virtual sandbox assets. Send the ENTIRE state. MANDATORY SANDBOX RULE: During exploration and analysis, DO NOT write scripts (.py), notes (.md), or charts (.png/.svg) directly to the workspace disk. Always stage them in node sandboxPath, fileType, and content/preview with staged: true for in-tab preview without disk pollution. Only commit to disk via research_sandbox_commit when the user explicitly approves.',
    parameters: {
      nodes: {
        type: 'array',
        required: true,
        description: 'Research entities: question, hypotheses, datasets, experiments, artifacts, findings.',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string', required: true, description: 'Unique identifier for this node.' },
            kind: { type: 'string', required: true, enum: ['question', 'hypothesis', 'dataset', 'experiment', 'artifact', 'finding'], description: 'Type of research entity.' },
            title: { type: 'string', required: true, description: 'Brief title.' },
            status: { type: 'string', description: 'Lifecycle status (e.g. proposed, testing, supported, falsified, refined, raw, curated, split, subset, locked, planned, running, completed, failed, blocked, preliminary, confirmed, negative, bottleneck, staged, committed, frozen).' },
            stage: { type: 'string', description: 'Pipeline stage or milestone (e.g. "Stage 1 Audit", "Stage 2b Pilot", "Edge INT8").' },
            parent: { type: 'string', description: 'Parent node ID from which this entity branches or derives.' },
            degradationReason: { type: 'string', description: 'Explicit explanation if this node is falsified, failed, deprecated, or abandoned.' },
            metrics: { type: 'object', additionalProperties: true, description: 'Key performance metrics (e.g. PPV, Sensitivity, FA_per_h, AUROC).' },
            detail: { type: 'string', description: 'Supplementary detail or status.' },
            fields: { type: 'object', additionalProperties: true, description: 'Key-value pairs for additional properties. For dataset nodes, provide structured metadata (e.g. samples, features, format, source, target, access).' },
            tags: { type: 'array', items: { type: 'string' }, description: 'Tags or category labels.' },
            sandboxPath: { type: 'string', description: 'Virtual sandbox file path in workspace (e.g. scripts/baseline.py, docs/notes.md, figures/dist.png). Sandboxed files are NOT written to disk until explicitly approved.' },
            fileType: { type: 'string', enum: ['code', 'markdown', 'image', 'text'], description: 'Type of sandbox content for in-tab preview rendering.' },
            content: { type: 'string', description: 'Full code, markdown document, or text content. Rendered directly in the Research Tab without writing to disk.' },
            preview: { type: 'string', description: 'Optional preview snippet, summary, or image data URL (e.g. data:image/png;base64,...).' },
            staged: { type: 'boolean', description: 'Whether this file is staged in virtual sandbox (true, default) or already committed to disk (false).' },
            version: { type: 'string', description: 'Version tag for this iteration (e.g. "v1.0", "v1.2", "v2-alpha").' },
            history: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Historical version snapshots for delta comparison.' },
            slices: { type: 'object', additionalProperties: true, description: 'Named cohort/data slices defined on a dataset node.' },
            dataProvenance: { type: 'object', additionalProperties: true, description: 'Explicit data lineage binding for artifacts/experiments.' },
            thread: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Dedicated card discussion thread messages.' },
          },
        },
      },
      edges: {
        type: 'array',
        required: true,
        description: 'Relationships between research entities.',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string', description: 'Unique identifier for this edge.' },
            source: { type: 'string', required: true, description: 'Source node id.' },
            target: { type: 'string', required: true, description: 'Target node id.' },
            label: { type: 'string', description: 'Relationship label (e.g., motivates, uses, produces).' },
          },
        },
      },
      activity: {
        type: 'array',
        required: true,
        description: 'Timeline of research progress events.',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            time: { type: 'string', description: 'Timestamp (e.g., HH:MM).' },
            event: { type: 'string', required: true, description: 'Event type (e.g., question proposed, experiment started).' },
            detail: { type: 'string', description: 'Event details.' },
          },
        },
      },
      activeThreadId: {
        oneOf: [{ type: 'string' }, { type: 'null' }],
        description: 'Currently focused research card ID for thread discussions (or null for global main line).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          status: { type: 'string', required: true },
          nodeCount: { type: 'integer', required: true },
          edgeCount: { type: 'integer', required: true },
          stagedCount: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Research state updated: ${value.nodeCount} entities, ${value.edgeCount} relationships, ${value.stagedCount} sandbox files staged in tab (zero unapproved disk writes).`,
      }],
    },
    async execute(args, exec) {
      if (!exec.agent) {
        throw new Error('research_state_write requires an owning agent session')
      }
      const session = exec.agent.session
      const state = {
        nodes: (args.nodes || []).map(node => {
          const hasSandbox = Boolean(node.sandboxPath || node.content || node.preview)
          const nodeCopy = { ...node }
          if (hasSandbox) {
            nodeCopy.staged = node.staged !== undefined ? node.staged : true
          } else {
            delete nodeCopy.staged
          }
          return nodeCopy
        }),
        edges: args.edges,
        activity: args.activity,
        activeThreadId: args.activeThreadId !== undefined ? args.activeThreadId : (getSessionState(session).activeThreadId ?? null),
      }

      await commitSessionState(session, state)
      const stagedCount = state.nodes.filter(n => n.staged === true).length
      return {
        status: 'updated',
        nodeCount: state.nodes.length,
        edgeCount: state.edges.length,
        stagedCount,
      }
    },
    presentCall: args => ({
      card: 'generic',
      title: 'Update research state',
      kind: 'other',
      rawInput: `${args.nodes.length} nodes, ${args.edges.length} edges`,
    }),
  }))

  // Register the research_node_add tool (Incremental growth)
  ctx.tools.register(defineTool({
    name: 'research_node_add',
    description: 'Incrementally add a new entity (hypothesis branch, experiment run, dataset slice, finding, artifact) to the research canvas as exploration expands. If "parent" is provided, automatically wires a relationship edge to the parent entity without having to resend the entire canvas.',
    parameters: {
      node: {
        type: 'object',
        required: true,
        additionalProperties: false,
        description: 'The entity to add to the research project.',
        properties: {
          id: { type: 'string', required: true, description: 'Unique identifier for this node (e.g. h1.1, e2b, d1.2, f3).' },
          kind: { type: 'string', required: true, enum: ['question', 'hypothesis', 'dataset', 'experiment', 'artifact', 'finding'], description: 'Type of research entity.' },
          title: { type: 'string', required: true, description: 'Clear, concise title.' },
          status: { type: 'string', description: 'Lifecycle status (e.g. proposed, testing, supported, falsified, refined, raw, curated, split, subset, locked, planned, running, completed, failed, blocked, preliminary, confirmed, negative, bottleneck, staged, committed, frozen).' },
          stage: { type: 'string', description: 'Pipeline stage or milestone (e.g. "Stage 1 Audit", "Stage 2b Pilot", "Edge INT8").' },
          parent: { type: 'string', description: 'Parent node ID from which this entity branches or derives (e.g. "h1").' },
          detail: { type: 'string', description: 'Detailed scientific description, mechanism, or background.' },
          degradationReason: { type: 'string', description: 'Explicit reason if this node is falsified, failed, deprecated, or abandoned.' },
          metrics: { type: 'object', additionalProperties: true, description: 'Key performance metrics (e.g. PPV, Sensitivity, FA_per_h, AUROC, CI).' },
          fields: { type: 'object', additionalProperties: true, description: 'Structured metadata (e.g. samples, features, format, source).' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Tags or category labels.' },
          sandboxPath: { type: 'string', description: 'Virtual sandbox target path in workspace (e.g. scripts/pilot.py, figures/pr.png).' },
          fileType: { type: 'string', enum: ['code', 'markdown', 'image', 'text'], description: 'Content type for in-tab preview.' },
          content: { type: 'string', description: 'Code, document, or base64 data to stage in tab without disk pollution.' },
          preview: { type: 'string', description: 'Preview text or data URL.' },
          staged: { type: 'boolean', description: 'Whether staged in sandbox (defaults to true if sandboxPath/content is set).' },
          version: { type: 'string', description: 'Version tag for this iteration (e.g. "v1.0", "v1.2", "v2-alpha").' },
          history: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Historical version snapshots.' },
          slices: { type: 'object', additionalProperties: true, description: 'Named cohort/data slices defined on a dataset node.' },
          dataProvenance: { type: 'object', additionalProperties: true, description: 'Explicit data lineage binding for artifacts/experiments.' },
          thread: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Card discussion thread messages.' },
        },
      },
      edges: {
        type: 'array',
        description: 'Optional additional edges connecting this new node to existing nodes.',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string' },
            source: { type: 'string', required: true },
            target: { type: 'string', required: true },
            label: { type: 'string' },
          },
        },
      },
      activityEvent: {
        type: 'string',
        description: 'Optional timeline description (e.g. "branched sub-hypothesis H1.1 to explore suppression window").',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          status: { type: 'string', required: true },
          nodeId: { type: 'string', required: true },
          totalNodes: { type: 'integer', required: true },
          totalEdges: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Added research node [${value.nodeId}], total ${value.totalNodes} entities, ${value.totalEdges} relationships.`,
      }],
    },
    async execute(args, exec) {
      if (!exec.agent) throw new Error('research_node_add requires an owning agent session')
      const session = exec.agent.session
      const state = getSessionState(session)

      const hasSandbox = Boolean(args.node.sandboxPath || args.node.content || args.node.preview)
      const nodeCopy = { ...args.node }
      if (hasSandbox) {
        nodeCopy.staged = args.node.staged !== undefined ? args.node.staged : true
      } else {
        delete nodeCopy.staged
      }
      const newNode = nodeCopy

      const currentNodes = [...(state.nodes || [])]
      const existingIndex = currentNodes.findIndex(n => n.id === newNode.id)
      let nextNodes
      if (existingIndex >= 0) {
        nextNodes = [...currentNodes]
        nextNodes[existingIndex] = newNode
      } else {
        nextNodes = [...currentNodes, newNode]
      }

      const newEdges = [...(state.edges || [])]
      if (newNode.parent) {
        const parentExists = nextNodes.some(n => n.id === newNode.parent)
        const edgeExists = newEdges.some(e => e.source === newNode.parent && e.target === newNode.id)
        if (parentExists && !edgeExists) {
          newEdges.push({
            source: newNode.parent,
            target: newNode.id,
            label: newNode.kind === 'hypothesis' ? 'branches' : 'derives',
          })
        }
      }
      if (Array.isArray(args.edges)) {
        for (const e of args.edges) {
          if (!newEdges.some(existing => existing.source === e.source && existing.target === e.target)) {
            newEdges.push(e)
          }
        }
      }

      const timeStr = new Date().toTimeString().slice(0, 5)
      const nextActivity = [
        ...(state.activity || []),
        {
          time: timeStr,
          event: args.activityEvent || `Added ${newNode.kind} "${newNode.title}"`,
          detail: newNode.detail,
        },
      ]

      const nextState = {
        ...state,
        nodes: nextNodes,
        edges: newEdges,
        activity: nextActivity,
      }

      await commitSessionState(session, nextState)
      return {
        status: 'added',
        nodeId: newNode.id,
        totalNodes: nextNodes.length,
        totalEdges: newEdges.length,
      }
    },
    presentCall: args => ({
      card: 'generic',
      title: `Add research node: ${args.node.id}`,
      kind: 'other',
      rawInput: `${args.node.kind} "${args.node.title}"`,
    }),
  }))

  // Register the research_node_update tool (Status progression & degradation)
  ctx.tools.register(defineTool({
    name: 'research_node_update',
    description: 'Update an existing research node as investigation deepens, succeeds, or encounters negative results. Supports status progression (proposed -> testing -> supported / falsified, planned -> running -> completed / failed, etc.), adding degradation/falsification reasons, updating metrics, fields, and sandbox files.',
    parameters: {
      id: { type: 'string', required: true, description: 'ID of the node to update (e.g. h1, e1, d1, f1).' },
      status: { type: 'string', description: 'Updated scientific status (e.g. supported, falsified, running, completed, failed, locked, curated, bottleneck, negative, etc.).' },
      degradationReason: { type: 'string', description: 'Scientific explanation if the entity is falsified, failed, deprecated, or blocked.' },
      stage: { type: 'string', description: 'Updated pipeline stage tag.' },
      detail: { type: 'string', description: 'Updated descriptive analysis or status note.' },
      metrics: { type: 'object', additionalProperties: true, description: 'Updated or new quantitative metrics (e.g. PPV, Sensitivity, FA_per_h).' },
      fields: { type: 'object', additionalProperties: true, description: 'Key-value pairs to update or add to structured metadata.' },
      tags: { type: 'array', items: { type: 'string' }, description: 'Updated tags.' },
      sandboxPath: { type: 'string', description: 'Virtual sandbox path.' },
      fileType: { type: 'string', enum: ['code', 'markdown', 'image', 'text'] },
      content: { type: 'string', description: 'Updated code, document, or base64 data.' },
      preview: { type: 'string', description: 'Updated preview or data URL.' },
      staged: { type: 'boolean', description: 'Updated staged status.' },
      version: { type: 'string', description: 'New version string for this iteration (e.g. "v1.1", "v2.0"). Automatically archives current state to history.' },
      history: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Directly update or overwrite historical snapshots.' },
      slices: { type: 'object', additionalProperties: true, description: 'Updated data slices for dataset nodes.' },
      dataProvenance: { type: 'object', additionalProperties: true, description: 'Updated data provenance binding.' },
      thread: { type: 'array', items: { type: 'object', additionalProperties: true }, description: 'Updated thread messages for this card.' },
      activeThreadId: {
        oneOf: [{ type: 'string' }, { type: 'null' }],
        description: 'Update active focused card ID (or null for global).',
      },
      activityEvent: { type: 'string', description: 'Optional timeline description for this update.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          status: { type: 'string', required: true },
          nodeId: { type: 'string', required: true },
          updatedStatus: { type: 'string' },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Updated research node [${value.nodeId}] (status: ${value.updatedStatus || 'unchanged'}).`,
      }],
    },
    async execute(args, exec) {
      if (!exec.agent) throw new Error('research_node_update requires an owning agent session')
      const session = exec.agent.session
      const state = getSessionState(session)

      const currentNodes = [...(state.nodes || [])]
      const nodeIndex = currentNodes.findIndex(n => n.id === args.id)
      if (nodeIndex < 0) {
        throw new Error(`Research node with id "${args.id}" not found.`)
      }

      const current = currentNodes[nodeIndex]
      const updated = {
        ...current,
        ...(args.status !== undefined && { status: args.status }),
        ...(args.degradationReason !== undefined && { degradationReason: args.degradationReason }),
        ...(args.stage !== undefined && { stage: args.stage }),
        ...(args.detail !== undefined && { detail: args.detail }),
        ...(args.metrics !== undefined && { metrics: { ...(current.metrics || {}), ...args.metrics } }),
        ...(args.fields !== undefined && { fields: { ...(current.fields || {}), ...args.fields } }),
        ...(args.tags !== undefined && { tags: args.tags }),
        ...(args.sandboxPath !== undefined && { sandboxPath: args.sandboxPath }),
        ...(args.fileType !== undefined && { fileType: args.fileType }),
        ...(args.content !== undefined && { content: args.content }),
        ...(args.preview !== undefined && { preview: args.preview }),
        ...(args.staged !== undefined && { staged: args.staged }),
        ...(args.slices !== undefined && { slices: { ...(current.slices || {}), ...args.slices } }),
        ...(args.dataProvenance !== undefined && { dataProvenance: { ...(current.dataProvenance || {}), ...args.dataProvenance } }),
        ...(args.thread !== undefined && { thread: args.thread }),
      }

      // Version snapshotting: if a new version is provided and differs from current version
      if (args.version && args.version !== current.version) {
        const previousSnapshot = {
          version: current.version || 'v1.0',
          timestamp: new Date().toTimeString().slice(0, 5),
          metrics: current.metrics ? { ...current.metrics } : undefined,
          detail: current.detail,
          degradationReason: current.degradationReason,
          stage: current.stage,
          sandboxPath: current.sandboxPath,
          content: current.content,
          preview: current.preview,
        }
        const existingHistory = Array.isArray(current.history) ? [...current.history] : []
        if (!existingHistory.some(h => h.version === previousSnapshot.version)) {
          existingHistory.push(previousSnapshot)
        }
        updated.history = existingHistory
        updated.version = args.version
      } else if (args.version !== undefined) {
        updated.version = args.version
      }

      if (args.history !== undefined) {
        updated.history = args.history
      }

      if (updated.sandboxPath && updated.staged === undefined) {
        updated.staged = true
      }

      const nextNodes = [...currentNodes]
      nextNodes[nodeIndex] = updated

      const timeStr = new Date().toTimeString().slice(0, 5)
      const eventName = args.activityEvent ||
        (args.status && args.status !== current.status
          ? `${updated.kind} "${updated.id}" status: ${current.status || 'initial'} ➔ ${args.status}`
          : `Updated ${updated.kind} "${updated.id}"`)

      const nextActivity = [
        ...(state.activity || []),
        {
          time: timeStr,
          event: eventName,
          detail: args.degradationReason || args.detail,
        },
      ]

      const nextState = {
        ...state,
        nodes: nextNodes,
        activity: nextActivity,
        ...(args.activeThreadId !== undefined ? { activeThreadId: args.activeThreadId } : {}),
      }

      await commitSessionState(session, nextState)
      return {
        status: 'updated',
        nodeId: updated.id,
        updatedStatus: updated.status,
      }
    },
    presentCall: args => ({
      card: 'generic',
      title: `Update research node: ${args.id}`,
      kind: 'other',
      rawInput: `status: ${args.status || 'keep'}, id: ${args.id}`,
    }),
  }))

  // Register the research_thread_post tool
  ctx.tools.register(defineTool({
    name: 'research_thread_post',
    description: 'Post a discussion message, analysis, or debate reply into a specific research card dedicated thread. Use this to converse specifically on a card, conduct localized debugging, address user questions about a node, or record reasoning rationale.',
    parameters: {
      nodeId: { type: 'string', required: true, description: 'ID of the research card to post to (e.g. hyp-01, exp-01, ds-01).' },
      sender: { type: 'string', enum: ['assistant', 'user', 'system'], description: 'Sender role (defaults to "assistant").' },
      text: { type: 'string', required: true, description: 'Message content of the discussion or technical analysis.' },
      updateNode: {
        type: 'object',
        additionalProperties: true,
        description: 'Optional partial update to the node (e.g. status, metrics, degradationReason, detail) if the thread discussion produced an empirical conclusion.',
      },
      setFocus: {
        type: 'boolean',
        description: 'Whether to set this card thread as the active focused thread in the session. Default is true.',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          status: { type: 'string', required: true },
          nodeId: { type: 'string', required: true },
          threadLength: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Posted message to card [${value.nodeId}] thread (${value.threadLength} messages in thread).`,
      }],
    },
    async execute(args, exec) {
      if (!exec.agent) throw new Error('research_thread_post requires an owning agent session')
      const session = exec.agent.session
      const state = getSessionState(session)

      const currentNodes = [...(state.nodes || [])]
      const nodeIndex = currentNodes.findIndex(n => n.id === args.nodeId)
      if (nodeIndex < 0) {
        throw new Error(`Research node with id "${args.nodeId}" not found.`)
      }

      const node = currentNodes[nodeIndex]
      const timeStr = new Date().toTimeString().slice(0, 5)
      const newMsg = {
        id: `msg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        sender: args.sender || 'assistant',
        timestamp: timeStr,
        text: args.text,
      }

      const existingThread = Array.isArray(node.thread) ? [...node.thread] : []
      existingThread.push(newMsg)

      const updatedNode = {
        ...node,
        thread: existingThread,
        ...(args.updateNode || {}),
      }

      const nextNodes = [...currentNodes]
      nextNodes[nodeIndex] = updatedNode

      const nextActivity = [
        ...(state.activity || []),
        {
          time: timeStr,
          event: `Discussion on ${node.kind} "${node.id}"`,
          detail: args.text.slice(0, 80),
        },
      ]

      const nextState = {
        ...state,
        nodes: nextNodes,
        activity: nextActivity,
        ...(args.setFocus !== false ? { activeThreadId: args.nodeId } : {}),
      }

      await commitSessionState(session, nextState)
      return {
        status: 'posted',
        nodeId: node.id,
        threadLength: existingThread.length,
      }
    },
    presentCall: args => ({
      card: 'generic',
      title: `Card discussion on ${args.nodeId}`,
      kind: 'other',
      rawInput: `${args.sender || 'assistant'}: ${args.text.slice(0, 60)}...`,
    }),
  }))

  // Register the research_sandbox_commit tool
  ctx.tools.register(defineTool({
    name: 'research_sandbox_commit',
    description: 'Commit staged sandbox files (code, documents, images) to the workspace disk. AUTHORIZATION GATE: Call this tool ONLY when the user explicitly instructs or approves writing/persisting sandbox files to disk. Never call this tool implicitly or without explicit confirmation. Writes the file content from sandbox nodes to their respective sandboxPath on disk, updates node staged status to false, and saves research_nodes.json.',
    parameters: {
      nodeIds: {
        type: 'array',
        description: 'Optional list of node IDs to commit to disk. If omitted or empty, commits all currently staged nodes with a sandboxPath.',
        items: { type: 'string' },
      },
      writeProjectManifest: {
        type: 'boolean',
        description: 'Whether to also write or update research_nodes.json in the workspace root. Default is true.',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          status: { type: 'string', required: true },
          committedCount: { type: 'integer', required: true },
          files: { type: 'array', items: { type: 'string' }, required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.message,
      }],
    },
    async execute(args, exec) {
      if (!exec.agent) {
        throw new Error('research_sandbox_commit requires an owning agent session')
      }
      const session = exec.agent.session
      const cwd = session.header?.cwd || session.cwd || process.cwd()

      let currentState = sessionStates.get(session)
      if (!currentState) {
        const filePath = path.join(cwd, 'research_nodes.json')
        if (fsSync.existsSync(filePath)) {
          try {
            currentState = JSON.parse(fsSync.readFileSync(filePath, 'utf8'))
          } catch {}
        }
      }

      if (!currentState || !Array.isArray(currentState.nodes)) {
        return {
          status: 'error',
          committedCount: 0,
          files: [],
          message: 'No active research state found to commit.',
        }
      }

      const targetNodeIds = Array.isArray(args.nodeIds) && args.nodeIds.length > 0 ? new Set(args.nodeIds) : null
      const committedFiles = []

      const updatedNodes = await Promise.all(currentState.nodes.map(async (node) => {
        const isTarget = targetNodeIds ? targetNodeIds.has(node.id) : true
        const shouldCommit = isTarget && node.sandboxPath && (node.staged !== false) && (node.content || node.preview)

        if (!shouldCommit) return node

        const targetPath = path.isAbsolute(node.sandboxPath)
          ? node.sandboxPath
          : path.join(cwd, node.sandboxPath)

        await fs.mkdir(path.dirname(targetPath), { recursive: true })

        const rawData = node.content || node.preview || ''
        const isImage = node.fileType === 'image' || /\.(png|jpe?g|webp|gif|bmp)$/i.test(node.sandboxPath)

        if (isImage) {
          const base64Data = rawData.replace(/^data:image\/[a-z+]+;base64,/, '')
          const buffer = Buffer.from(base64Data, 'base64')
          await fs.writeFile(targetPath, buffer)
        } else {
          await fs.writeFile(targetPath, rawData, 'utf8')
        }

        committedFiles.push(node.sandboxPath)
        return { ...node, staged: false }
      }))

      const updatedState = {
        ...currentState,
        nodes: updatedNodes,
        activity: [
          ...(currentState.activity || []),
          {
            time: new Date().toTimeString().slice(0, 5),
            event: 'sandbox committed',
            detail: `Committed ${committedFiles.length} file(s) to workspace disk: ${committedFiles.join(', ')}`,
          },
        ],
      }

      await commitSessionState(session, updatedState)

      if (args.writeProjectManifest !== false) {
        try {
          const filePath = path.join(cwd, 'research_nodes.json')
          await fs.writeFile(filePath, JSON.stringify(updatedState, null, 2), 'utf8')
        } catch (err) {
          console.error('Failed to write research_nodes.json:', err)
        }
      }

      return {
        status: 'success',
        committedCount: committedFiles.length,
        files: committedFiles,
        message: committedFiles.length > 0
          ? `Successfully committed ${committedFiles.length} file(s) from sandbox to disk: ${committedFiles.join(', ')}`
          : 'No uncommitted staged files matched the selection criteria.',
      }
    },
    presentCall: args => ({
      card: 'generic',
      title: 'Commit research sandbox to disk',
      kind: 'other',
      rawInput: args.nodeIds ? `Nodes: ${args.nodeIds.join(', ')}` : 'All staged sandbox files',
    }),
  }))

  // Register the /start-research command
  ctx.commands.register({
    name: 'start-research',
    description: 'Start a research project with a single-round interview to initialize research nodes.',
    input: { hint: '[optional topic or question]' },
    handler: (invocation) => {
      const topic = invocation.rawInput?.trim()
      const contextPrefix = topic ? `Research Topic / Question: "${topic}".\n` : ''
      const instruction = `${contextPrefix}I want to start a research project. Please conduct a single-round interview to gather necessary information and initialize the research nodes:
1. In your current response, you MUST call the ask_user_question tool to present interactive questions with selectable options (and write-in choices) to me:
   - Question 1: Core research question and objective (provide reasonable options with one recommended).
   - Question 2: Initial hypotheses or approaches to explore (provide options).
   - Question 3: Datasets and planned experiments/validation methods (multi-select options).
   - Question 4: Preferred display language for the project cards and workspace (provide options: "中文 (Recommended)", "English", "中英双语 (Bilingual)", and write-in choice). Note: while internal model reasoning and execution may be in English, all titles, details, and labels displayed on the research cards and canvas must strictly use this chosen language.
2. Call ask_user_question with all questions in this single tool call. Do not just output plain text questions in chat.
3. In your next turn immediately after I submit my answers, you MUST call the research_state_write tool to create the initial research nodes (question, hypothesis, dataset, experiment, artifact, finding) and relationships based on my answers. Strictly generate all node titles, details, and summaries in the user's chosen display language (e.g. Chinese). Keep each node title and detail concise, and provide structured metadata key-values in "fields" for dataset nodes (e.g. samples, features, format, source, access).
4. Virtual Sandbox Protocol (Zero Unapproved Disk Writes):
   - During research exploration, do NOT write scripts (.py, .sh), documentation (.md), or chart figures directly to the workspace filesystem without explicit user permission.
   - Stage them virtually by providing "sandboxPath", "fileType" ('code' | 'markdown' | 'image' | 'text'), "content" (full text/code or base64), or "preview" in research_state_write nodes with "staged: true".
   - The user can preview and copy all code, documents, and charts directly inside the Research Tab.
   - When the user explicitly permits or requests writing files to disk, call research_sandbox_commit to persist the staged files.
Ensure you output strictly valid, well-formed JSON for tool calls. Provide a concise summary in text (also in the chosen display language) and stop asking further questions.`

      invocation.agent.followup(createUserMessage({
        content: [
          {
            type: 'text',
            text: instruction,
          },
        ],
        source: { kind: 'user' },
      }))
      return {
        kind: 'success',
        text: 'Starting a single-round research interview...',
      }
    },
  })

  // Register the /load-research command (Ingest existing research from repository)
  function handleLoadResearch(invocation) {
    const targetHint = invocation.rawInput?.trim() || ''
    const targetPrefix = targetHint ? `Specified Research Source/Path: "${targetHint}".\n` : ''

    const instruction = `${targetPrefix}I want to load and ingest existing research progress from this repository into the Research Lab canvas. Other agents or prior research steps have already conducted exploration and documented findings.

Please execute the following ingestion workflow:
1. [Inspect & Locate Existing Research Documentation]:
   - If a specific file or path was specified above, read and inspect that file first.
   - Otherwise, auto-discover existing research state files in the workspace:
     * Check for 'research_nodes.json' in the workspace root.
     * Check for primary status documents: 'docs/CURRENT_STATUS.md', 'README.md', 'AGENTS.md', 'docs/status.md', 'docs/research.md', or other status notes in 'docs/' or project root.
     * Check for recent experiment/model logs or handoffs (e.g. 'experiments/', 'docs/*plan*.md', 'docs/*validation*.md', 'HANDOFF*.md').
   - Read the relevant status document(s) to thoroughly grasp the current research state, baselines, and candidates.

2. [Reverse-Engineer & Structure into Research Lab Canvas Nodes]:
   Extract and organize the findings into our standard research schema:
   - Question (kind: "question"): The core research problem, objectives, and primary KPI constraints (e.g. target PPV/Sens, device RAM/latency limits).
   - Hypothesis (kind: "hypothesis"):
     * Active/promoted hypotheses currently under validation.
     * Crucially: Also extract negative/falsified hypotheses or rejected architectural branches with their explicit failure mechanisms in 'degradationReason' and status 'falsified' or 'bottleneck'.
   - Dataset (kind: "dataset"):
     * The primary dataset(s) used.
     * Structure specific cohorts, splits, and validation frames into 'slices' (e.g. raw_all, clean_subset, train_split, holdout_test with sample count N, criteria, and holdout protection flags).
   - Experiment (kind: "experiment"):
     * Current validated candidates, baselines (e.g. low50-int8, ppg_cnn_gbdt_dualhead), and active comparators.
     * Extract real quantitative metrics into 'metrics' (e.g. PPV, Sensitivity, FA_per_h, AUROC, RAM bytes).
     * Bind data slices via 'dataProvenance' (e.g. datasetId, slice, samples, split).
     * If multiple iteration runs exist for a model, maintain 'version' and prior snapshots in 'history'.
   - Artifact (kind: "artifact"):
     * Frozen model artifacts, key recipes, exploration scripts, or evaluation reports.
     * Reference their paths (local or server read-only paths) in detail/fields or sandboxPath.
   - Finding (kind: "finding"):
     * Key empirical conclusions, limits, and validated insights.
   - Edges:
     * Connect relationships (e.g. question -> hypothesis, hypothesis -> experiment, dataset -> experiment with uses/trains_on, experiment -> finding).

3. [Display Language Alignment]:
   - Strictly honor the project language (e.g. Chinese for Chinese research projects or as designated in repo).
   - Keep titles, details, and summaries crisp, structured, and informative.

4. [Call research_state_write]:
   - Call the research_state_write tool with the structured nodes, edges, and activity log.
   - After the tool call succeeds, output a concise executive summary in chat highlighting what was ingested (number of questions, hypotheses, datasets with slices, experiments with metrics, and key findings) and the current research frontier.`

    invocation.agent.followup(createUserMessage({
      content: [
        {
          type: 'text',
          text: instruction,
        },
      ],
      source: { kind: 'user' },
    }))
    return {
      kind: 'success',
      text: 'Ingesting repository research state into Research Lab...',
    }
  }

  ctx.commands.register({
    name: 'load-research',
    description: 'Load and ingest existing research state from the repository (e.g. docs/CURRENT_STATUS.md, previous agent notes, experiment reports) into the Research Lab canvas.',
    input: { hint: '[optional file path or doc name]' },
    handler: handleLoadResearch,
  })

  // Register the /import-sync command (Synchronize new progress from other agents/commits)
  async function handleImportSync(invocation) {
    const targetHint = invocation.rawInput?.trim() || ''
    const targetPrefix = targetHint ? `Specified Synchronization Target/Source: "${targetHint}".\n` : ''

    const session = invocation.agent?.session
    if (session) {
      // Fast path: if research_nodes.json on disk was modified externally, ensure session has latest baseline
      const cwd = session.header?.cwd || session.cwd || process.cwd()
      const filePath = path.join(cwd, 'research_nodes.json')
      if (fsSync.existsSync(filePath)) {
        try {
          const diskContent = fsSync.readFileSync(filePath, 'utf8')
          const parsed = JSON.parse(diskContent)
          const validated = researchProjectionSchema.safeParse(parsed)
          if (validated.success) {
            await commitSessionState(session, validated.data)
          }
        } catch (err) {
          console.warn('Failed pre-sync disk check:', err)
        }
      }
    }

    const instruction = `${targetPrefix}I want to synchronize new progress, recent experiment results, and updated hypotheses from other agents, commits, or background tasks into the Research Lab canvas.

Please execute the following incremental synchronization workflow:
1. [Inspect External Changes & Recent Progress]:
   - First, inspect existing Research Lab canvas entities (from 'research_nodes.json' or session state) so you know all current IDs, versions, and baseline metrics.
   - Inspect recent git commit logs (e.g., run \`git log -n 5 --stat\` or inspect recent commit messages) to see what other agents, branches, or team members recently implemented or evaluated.
   - Inspect primary research documents:
     * 'docs/CURRENT_STATUS.md' (the durable single source of truth for current baselines, active candidates, and decisions).
     * Any newly modified or created files in 'docs/', 'experiments/', 'reports/', or 'HANDOFF*.md'.
     * If a specific file, commit hash, or doc was specified above, inspect that source first.
   - Identify new deltas:
     * Newly proposed hypotheses or hypotheses confirmed/falsified by recent runs.
     * New experiment runs, model training results, or benchmark comparisons (extract exact quantitative metrics: PPV, Sensitivity, FA/h, RAM, AUROC).
     * Newly defined cohort slices or holdout partitions.
     * New artifacts, recipes, or scripts.
     * Newly verified empirical findings or architectural bottleneck diagnoses.

2. [Incremental Reconciliation & Preservation]:
   - CRITICAL INVARIANT: Preserve all existing node IDs, existing discussion threads (node.thread), and staged sandbox assets. DO NOT drop or reset unrelated nodes.
   - Entity Status Transitions:
     * If an existing hypothesis was tested and failed or encountered a bottleneck, update status to 'falsified' or 'bottleneck' and provide an explicit 'degradationReason'. If validated, update to 'supported'.
     * If an existing model was re-evaluated or hyperparameter-tuned, update 'metrics', bump 'version' (e.g. v1.0 -> v1.1), and record prior metrics into 'history'.
   - Add New Entities:
     * Add newly introduced hypotheses, experiments, datasets, artifacts, or findings with concise, standardized IDs.
     * Connect appropriate relationship edges (e.g. question -> hypothesis, hypothesis -> experiment, experiment -> finding).
   - Activity Timeline:
     * Append a new entry to 'activity' recording the sync event (e.g., "Synced updates from other agent / commit <hash>").

3. [Display Language Alignment]:
   - Strictly honor the project language (e.g. Chinese for Chinese research projects or as designated in repo).
   - Keep titles, details, and summaries crisp, structured, and informative.

4. [Call research_state_write & Report]:
   - Call 'research_state_write' with the fully reconciled state (zero unapproved disk writes, instant canvas update).
   - Output a clean, high-level summary in chat:
     * 🆕 Newly synchronized entities (cards added)
     * 🔄 Status & metric transitions for existing cards (deltas)
     * 🧭 Current research frontier & recommended immediate next step.`

    invocation.agent.followup(createUserMessage({
      content: [
        {
          type: 'text',
          text: instruction,
        },
      ],
      source: { kind: 'user' },
    }))

    return {
      kind: 'success',
      text: 'Synchronizing new research progress from other agents...',
    }
  }

  ctx.commands.register({
    name: 'import-sync',
    description: 'Synchronize new progress, experiment runs, and hypotheses from other agents, git commits, or documentation into the Research Lab canvas.',
    input: { hint: '[optional doc path, commit hash, or agent log]' },
    handler: handleImportSync,
  })

  // Register the /thread command to control card-level threads from the main conversation bar
  ctx.commands.register({
    name: 'thread',
    description: 'Control and switch card discussion threads from the main conversation bar (e.g. "/thread exp-01", "/thread clear", or "/thread" to list).',
    input: { hint: '[cardId or "clear"]' },
    handler: (invocation) => {
      const arg = invocation.rawInput?.trim() || ''
      const session = invocation.agent?.session
      const state = session ? getSessionState(session) : { nodes: [] }
      const nodes = state.nodes || []

      if (!arg) {
        const threadList = nodes
          .map(n => `* [${n.id}] (${n.kind}) "${n.title}": ${n.thread ? n.thread.length : 0} messages`)
          .join('\n')
        const currentFocus = state.activeThreadId ? `Currently focused: [${state.activeThreadId}]\n\n` : 'Currently in global main line conversation.\n\n'
        return {
          kind: 'success',
          text: `${currentFocus}Research Cards Thread Directory:\n${threadList || 'No cards on canvas yet.'}\n\nUse "/thread <cardId>" to focus discussion on a card, or "/thread clear" to reset to global main line.`,
        }
      }

      if (arg.toLowerCase() === 'clear' || arg.toLowerCase() === 'global' || arg === 'none') {
        if (session) {
          state.activeThreadId = null
          commitSessionState(session, state)
        }
        invocation.agent.followup(createUserMessage({
          content: [
            {
              type: 'text',
              text: 'Reset research thread focus to global main line. All research canvas entities are in scope.',
            },
          ],
          source: { kind: 'user' },
        }))
        return {
          kind: 'success',
          text: 'Thread focus cleared: now in global main line.',
        }
      }

      const targetNode = nodes.find(n => n.id.toLowerCase() === arg.toLowerCase())
      if (!targetNode) {
        return {
          kind: 'failure',
          text: `Research card with ID "${arg}" not found. Available card IDs: ${nodes.map(n => n.id).join(', ')}`,
        }
      }

      if (session) {
        state.activeThreadId = targetNode.id
        commitSessionState(session, state)
      }

      const instruction = `Switched focus to card thread [${targetNode.id}] (${targetNode.kind}): "${targetNode.title}".
Current Status: ${targetNode.status || 'active'} | Version: ${targetNode.version || 'v1.0'} | Stage: ${targetNode.stage || 'N/A'}
Prior Thread Messages: ${targetNode.thread ? targetNode.thread.length : 0} messages.

You are now operating specifically in the context of [${targetNode.id}]. Provide focused technical analysis, answer specific questions about this card, and use research_thread_post to record key conclusions into this card's thread.`

      invocation.agent.followup(createUserMessage({
        content: [
          {
            type: 'text',
            text: instruction,
          },
        ],
        source: { kind: 'user' },
      }))

      return {
        kind: 'success',
        text: `Focused conversation thread on card [${targetNode.id}]: "${targetNode.title}".`,
      }
    },
  })
}
