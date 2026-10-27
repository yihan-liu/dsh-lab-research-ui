import React, { useEffect, useMemo, useState, useRef } from 'react'

const FONT_SANS = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif'
const FONT_MONO = '"Cascadia Code", "Fira Code", "JetBrains Mono", SFMono-Regular, Menlo, Monaco, Consolas, "PingFang SC", "Microsoft YaHei", monospace'
const RADIUS = {
  pane: 10,
  card: 8,
  sub: 6,
  control: 6,
  badge: 4,
  round: '50%',
}

/**
 * Editorial & Warm Minimalist palette (Claude Code Desktop aesthetic).
 * Low-saturation, mineral & earthy tones that harmonize across light and dark modes.
 */
const TYPE_META = {
  question: {
    label: 'Question',
    zh: '研究问题',
    color: '#6e8299', // Warm Slate
    bg: '#6e829914',
    border: '#6e829930',
  },
  hypothesis: {
    label: 'Hypothesis',
    zh: '理论假设',
    color: '#5c8a77', // Celadon Sage
    bg: '#5c8a7714',
    border: '#5c8a7730',
  },
  dataset: {
    label: 'Dataset',
    zh: '核心数据',
    color: '#c15f3e', // Claude Terracotta / Warm Clay
    bg: '#c15f3e14',
    border: '#c15f3e30',
  },
  experiment: {
    label: 'Experiment',
    zh: '验证实验',
    color: '#b07f43', // Warm Amber / Ochre
    bg: '#b07f4314',
    border: '#b07f4330',
  },
  artifact: {
    label: 'Artifact',
    zh: '产物归档',
    color: '#8e799c', // Heather Mauve
    bg: '#8e799c14',
    border: '#8e799c30',
  },
  finding: {
    label: 'Finding',
    zh: '关键结论',
    color: '#b45353', // Oxide Red / Carmine Rust
    bg: '#b4535314',
    border: '#b4535330',
  },
}

/**
 * Scientific Lifecycle Statuses.
 * Categorizes nodes into:
 * - active: in progress, planned, testing, running, staged, etc.
 * - supported: confirmed, completed, curated, committed, frozen.
 * - degraded: falsified, failed, bottleneck, deprecated, abandoned, blocked, inconclusive.
 */
const STATUS_META = {
  // Positive progression / active
  proposed: { zh: '待验证', label: 'PROPOSED', color: '#6e8299', bg: '#6e829916', border: '#6e829935', group: 'active' },
  active: { zh: '探索中', label: 'ACTIVE', color: '#6e8299', bg: '#6e829916', border: '#6e829935', group: 'active' },
  planned: { zh: '已规划', label: 'PLANNED', color: '#8e799c', bg: '#8e799c16', border: '#8e799c35', group: 'active' },
  testing: { zh: '验证中', label: 'TESTING', color: '#b07f43', bg: '#b07f4316', border: '#b07f4335', group: 'active' },
  running: { zh: '实验中', label: 'RUNNING', color: '#b07f43', bg: '#b07f4316', border: '#b07f4335', group: 'active' },
  split: { zh: '切分完成', label: 'SPLIT', color: '#b07f43', bg: '#b07f4316', border: '#b07f4335', group: 'active' },
  staged: { zh: '沙箱暂存', label: 'STAGED', color: '#b07f43', bg: '#b07f4316', border: '#b07f4335', group: 'active' },

  // Supported / confirmed milestones
  supported: { zh: '已证实', label: 'SUPPORTED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  confirmed: { zh: '复现确认', label: 'CONFIRMED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  completed: { zh: '已完成', label: 'COMPLETED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  answered: { zh: '已解答', label: 'ANSWERED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  curated: { zh: '审计入库', label: 'CURATED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  committed: { zh: '已落盘', label: 'COMMITTED', color: '#5c8a77', bg: '#5c8a7718', border: '#5c8a7740', group: 'supported' },
  frozen: { zh: '基准冻结', label: 'FROZEN', color: '#8e799c', bg: '#8e799c18', border: '#8e799c40', group: 'supported' },
  locked: { zh: '盲测锁定', label: 'LOCKED', color: '#8e799c', bg: '#8e799c18', border: '#8e799c40', group: 'supported' },

  // Exploratory / refinement branches
  refined: { zh: '分支细化', label: 'REFINED', color: '#c15f3e', bg: '#c15f3e16', border: '#c15f3e35', group: 'active' },
  subset: { zh: '亚集切分', label: 'SUBSET', color: '#c15f3e', bg: '#c15f3e16', border: '#c15f3e35', group: 'active' },
  pivoted: { zh: '转向重构', label: 'PIVOTED', color: '#c15f3e', bg: '#c15f3e16', border: '#c15f3e35', group: 'active' },
  preliminary: { zh: '初步观察', label: 'PRELIMINARY', color: '#9c8259', bg: '#9c825916', border: '#9c825935', group: 'active' },

  // Degradation / refutation / failure
  inconclusive: { zh: '证据不足', label: 'INCONCLUSIVE', color: '#9c8259', bg: '#9c825916', border: '#9c825935', group: 'degraded', isDegraded: true },
  falsified: { zh: '已证伪', label: 'FALSIFIED', color: '#b45353', bg: '#b4535318', border: '#b4535345', group: 'degraded', isDegraded: true },
  negative: { zh: '负向发现', label: 'NEGATIVE', color: '#b45353', bg: '#b4535318', border: '#b4535345', group: 'degraded', isDegraded: true },
  failed: { zh: '实验失败', label: 'FAILED', color: '#b45353', bg: '#b4535318', border: '#b4535345', group: 'degraded', isDegraded: true },
  bottleneck: { zh: '遭遇瓶颈', label: 'BOTTLENECK', color: '#b45353', bg: '#b4535318', border: '#b4535345', group: 'degraded', isDegraded: true },
  deprecated: { zh: '已废弃', label: 'DEPRECATED', color: '#888888', bg: '#88888816', border: '#88888835', group: 'degraded', isDegraded: true },
  abandoned: { zh: '已放弃', label: 'ABANDONED', color: '#888888', bg: '#88888816', border: '#88888835', group: 'degraded', isDegraded: true },
  superseded: { zh: '结论更迭', label: 'SUPERSEDED', color: '#888888', bg: '#88888816', border: '#88888835', group: 'degraded', isDegraded: true },
  blocked: { zh: '受阻中断', label: 'BLOCKED', color: '#b45353', bg: '#b4535318', border: '#b4535345', group: 'degraded', isDegraded: true },
}

function getNodeStatusMeta(node) {
  if (!node) return null
  let s = node.status
  if (!s) {
    if (node.kind === 'question') s = 'active'
    else if (node.kind === 'hypothesis') s = 'proposed'
    else if (node.kind === 'dataset') s = 'curated'
    else if (node.kind === 'experiment') s = 'completed'
    else if (node.kind === 'finding') s = 'preliminary'
    else if (node.kind === 'artifact') s = (node.staged === false ? 'committed' : 'staged')
    else s = 'active'
  }
  const key = String(s).toLowerCase()
  return STATUS_META[key] || {
    zh: s,
    label: s.toUpperCase(),
    color: '#888888',
    bg: '#88888814',
    border: '#88888830',
    group: 'active',
    isDegraded: ['falsified', 'negative', 'failed', 'bottleneck', 'deprecated', 'abandoned', 'blocked'].includes(key),
  }
}

function MetricsGrid({ metrics, priorMetrics, priorLabel }) {
  if (!metrics || typeof metrics !== 'object') return null
  const entries = Object.entries(metrics)
  if (entries.length === 0) return null

  const formatMetricVal = (val, key) => {
    if (typeof val === 'number') {
      if (val >= 0 && val <= 1 && /(ppv|sens|spec|auc|auroc|acc|rate|pct|ratio|f1|precision|recall)/i.test(key)) {
        return `${(val * 100).toFixed(1)}%`
      }
      return Number.isInteger(val) ? String(val) : val.toFixed(3).replace(/\.?0+$/, '')
    }
    return String(val)
  }

  return React.createElement('div', {
    style: {
      marginTop: 9,
      marginBottom: 7,
    },
  },
    React.createElement('div', {
      style: {
        fontSize: 10.5,
        fontWeight: 650,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        fontFamily: FONT_MONO,
        color: 'var(--dsw-alias-label-secondary)',
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
        React.createElement('span', { style: { color: '#5c8a77', fontSize: 11 } }, '📊'),
        React.createElement('span', null, 'SCIENTIFIC METRICS / 量化指标'),
      ),
      priorMetrics && React.createElement('span', {
        style: {
          fontSize: 10,
          fontFamily: FONT_MONO,
          color: 'var(--dsw-alias-label-tertiary)',
          fontWeight: 500,
        },
      }, `对比: ${priorLabel || '上一版本'}`),
    ),
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
        gap: 6,
      },
    },
      entries.map(([k, v]) => {
        let deltaPill = null
        if (typeof v === 'number' && priorMetrics && typeof priorMetrics[k] === 'number') {
          const diff = v - priorMetrics[k]
          if (Math.abs(diff) >= 1e-4) {
            const isLowerBetter = /(mae|rmse|loss|err|error|bias|fa_per_h|overhead)/i.test(k)
            const isGood = isLowerBetter ? diff < 0 : diff > 0
            const isPct = v <= 1 && v >= 0 && /(ppv|sens|spec|auc|auroc|acc|rate|ratio|f1|precision|recall|corr)/i.test(k)
            const formattedDiff = isPct
              ? `${diff > 0 ? '+' : ''}${(diff * 100).toFixed(1)}%`
              : `${diff > 0 ? '+' : ''}${Math.abs(diff) >= 10 ? diff.toFixed(1) : diff.toFixed(2)}`
            deltaPill = React.createElement('span', {
              style: {
                fontSize: 9.5,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: isGood ? '#5c8a77' : '#b45353',
                background: isGood ? '#5c8a7714' : '#b4535314',
                border: `1px solid ${isGood ? '#5c8a7730' : '#b4535330'}`,
                padding: '1px 4px',
                borderRadius: RADIUS.badge,
                marginLeft: 4,
              },
              title: `相对 ${priorLabel || '上一版本'}: ${formattedDiff}`,
            }, formattedDiff)
          }
        }

        return React.createElement('div', {
          key: k,
          style: {
            background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)',
            padding: '6px 8px',
            borderRadius: RADIUS.sub,
            border: '1px solid var(--dsw-alias-border-l3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
        },
          React.createElement('span', {
            style: {
              color: 'var(--dsw-alias-label-secondary)',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.05em',
              fontFamily: FONT_MONO,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
            title: k,
          }, k.replace(/_/g, ' ')),
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            },
          },
            React.createElement('span', {
              style: {
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 12.5,
                fontFamily: FONT_MONO,
                fontWeight: 650,
                lineHeight: 1.25,
              },
            }, formatMetricVal(v, k)),
            deltaPill,
          ),
        )
      })
    )
  )
}

function DegradationBanner({ reason, statusMeta }) {
  if (!reason && !statusMeta?.isDegraded) return null
  return React.createElement('div', {
    style: {
      marginTop: 9,
      marginBottom: 9,
      padding: '9px 12px',
      borderRadius: RADIUS.sub,
      background: '#b4535314',
      border: '1px solid #b4535338',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5.5,
        color: '#b45353',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: FONT_MONO,
        letterSpacing: '.05em',
      },
    },
      React.createElement('span', null, '⚠️'),
      React.createElement('span', null, '证伪 / 局限分析 · DEGRADATION REASON'),
    ),
    React.createElement('div', {
      style: {
        fontSize: 12.5,
        lineHeight: 1.55,
        color: 'var(--dsw-alias-label-primary)',
        fontFamily: FONT_SANS,
      },
    }, reason || '该假设或路径在当前实验设计下未获支持，已被证伪或退化。详细依据参见相关实验记录。')
  )
}

function PlaceholderCard() {
  return React.createElement('div', {
    style: {
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: 300, boxSizing: 'border-box', padding: '22px 24px',
      border: '1px solid var(--dsw-alias-border-l2)', borderRadius: RADIUS.card,
      background: 'var(--dsw-alias-bg-layer-1)',
      boxShadow: 'var(--dsw-shadow-lv2)', zIndex: 4, textAlign: 'center',
      fontFamily: FONT_SANS,
    },
  },
  React.createElement('div', {
    style: {
      color: 'var(--dsw-alias-label-caption)',
      fontSize: 9.5,
      letterSpacing: '.12em',
      fontWeight: 650,
      textTransform: 'uppercase',
      fontFamily: FONT_MONO,
      marginBottom: 8,
    },
  }, 'RESEARCH WORKSPACE'),
  React.createElement('p', {
    style: {
      color: 'var(--dsw-alias-label-primary)',
      fontSize: 13.5,
      fontWeight: 600,
      margin: '0 0 6px',
    },
  }, 'No active research session'),
  React.createElement('p', {
    style: {
      color: 'var(--dsw-alias-label-secondary)',
      fontSize: 11.5,
      lineHeight: 1.5,
      margin: 0,
    },
  }, '在聊天框运行 /load-research 读取现有项目，或 /start-research 初始化新研究'),
  )
}

function CodeSandboxView({ code, filename }) {
  const [copied, setCopied] = useState(false)
  const lineCount = code ? code.split('\n').length : 0

  const handleCopy = (e) => {
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }).catch(() => {})
    }
  }

  return React.createElement('div', {
    style: {
      position: 'relative',
      background: 'var(--dsw-alias-bg-base)',
      borderRadius: RADIUS.sub,
      overflow: 'hidden',
      border: '1px solid var(--dsw-alias-border-l3)',
      marginTop: 8,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 11px',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)',
        borderBottom: '1px solid var(--dsw-alias-border-l3)',
        fontSize: 11.5,
        fontFamily: FONT_MONO,
      },
    },
      React.createElement('span', {
        style: { color: 'var(--dsw-alias-label-secondary)', fontWeight: 500 },
      }, `${lineCount} 行代码`),
      React.createElement('button', {
        onClick: handleCopy,
        style: {
          background: copied ? '#5c8a7718' : 'var(--dsw-alias-bg-layer-2)',
          border: `1px solid ${copied ? '#5c8a7740' : 'var(--dsw-alias-border-l3)'}`,
          borderRadius: RADIUS.control,
          padding: '3px 9px',
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 500,
          color: copied ? '#5c8a77' : 'var(--dsw-alias-label-secondary)',
          cursor: 'pointer',
          transition: 'all 120ms ease',
        },
      }, copied ? '✓ 已复制' : '复制代码'),
    ),
    React.createElement('pre', {
      style: {
        margin: 0,
        padding: '12px 14px',
        fontFamily: FONT_MONO,
        fontSize: 12,
        lineHeight: 1.65,
        color: 'var(--dsw-alias-label-primary)',
        overflowX: 'auto',
        maxHeight: 280,
        whiteSpace: 'pre',
        tabSize: 2,
      },
    }, code),
  )
}

function ImageSandboxView({ src, alt }) {
  const isSvgMarkup = typeof src === 'string' && (src.trim().startsWith('<svg') || src.trim().startsWith('<?xml'))
  return React.createElement('div', {
    style: {
      background: 'var(--dsw-alias-bg-base)',
      borderRadius: RADIUS.sub,
      overflow: 'hidden',
      border: '1px solid var(--dsw-alias-border-l3)',
      marginTop: 8,
      padding: 12,
      textAlign: 'center',
    },
  },
    isSvgMarkup
      ? React.createElement('div', {
          style: {
            maxWidth: '100%',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          dangerouslySetInnerHTML: { __html: src },
        })
      : React.createElement('img', {
          src: src,
          alt: alt || 'Sandbox Figure',
          style: {
            maxWidth: '100%',
            maxHeight: 300,
            objectFit: 'contain',
            borderRadius: RADIUS.badge,
            display: 'inline-block',
          },
        }),
  )
}

function DocSandboxView({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = (e) => {
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }).catch(() => {})
    }
  }

  return React.createElement('div', {
    style: {
      position: 'relative',
      background: 'var(--dsw-alias-bg-base)',
      borderRadius: RADIUS.sub,
      overflow: 'hidden',
      border: '1px solid var(--dsw-alias-border-l3)',
      marginTop: 8,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 11px',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)',
        borderBottom: '1px solid var(--dsw-alias-border-l3)',
        fontSize: 11.5,
        fontFamily: FONT_MONO,
      },
    },
      React.createElement('span', {
        style: { color: 'var(--dsw-alias-label-secondary)', fontSize: 11, fontWeight: 600, letterSpacing: '.05em' },
      }, 'DOCUMENT PREVIEW'),
      React.createElement('button', {
        onClick: handleCopy,
        style: {
          background: copied ? '#5c8a7718' : 'var(--dsw-alias-bg-layer-2)',
          border: `1px solid ${copied ? '#5c8a7740' : 'var(--dsw-alias-border-l3)'}`,
          borderRadius: RADIUS.control,
          padding: '3px 9px',
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 500,
          color: copied ? '#5c8a77' : 'var(--dsw-alias-label-secondary)',
          cursor: 'pointer',
          transition: 'all 120ms ease',
        },
      }, copied ? '✓ 已复制' : '复制内容'),
    ),
    React.createElement('div', {
      style: {
        padding: '12px 14px',
        fontSize: 13,
        lineHeight: 1.7,
        color: 'var(--dsw-alias-label-primary)',
        maxHeight: 280,
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        fontFamily: FONT_SANS,
      },
    }, text),
  )
}

function SandboxBlock({ node }) {
  if (!node.sandboxPath && !node.content && !node.preview) return null
  const isStaged = node.staged !== false
  const pathStr = node.sandboxPath || 'virtual/unnamed'
  const isImage = node.fileType === 'image' ||
    Boolean(node.preview && node.preview.startsWith('data:image')) ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(pathStr) ||
    Boolean(node.preview && (node.preview.trim().startsWith('<svg') || node.preview.trim().startsWith('<?xml'))) ||
    Boolean(node.content && (node.content.trim().startsWith('<svg') || node.content.trim().startsWith('<?xml')))
  const isDoc = node.fileType === 'markdown' || node.fileType === 'text' || /\.(md|txt)$/i.test(pathStr)
  const content = node.content || node.preview || ''

  return React.createElement('div', {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1px solid var(--dsw-alias-border-l3)',
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent)',
        padding: '6px 10px',
        borderRadius: RADIUS.sub,
        border: '1px solid var(--dsw-alias-border-l3)',
        fontSize: 11.5,
        fontFamily: FONT_MONO,
      },
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--dsw-alias-label-secondary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '75%',
        },
        title: pathStr,
      },
        React.createElement('span', { style: { color: isStaged ? '#b07f43' : '#5c8a77', fontSize: 12 } }, isStaged ? '📦' : '📁'),
        React.createElement('span', { style: { color: 'var(--dsw-alias-label-primary)', fontWeight: 550, fontSize: 12 } }, pathStr),
      ),
      React.createElement('span', {
        style: {
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 650,
          color: isStaged ? '#b07f43' : '#5c8a77',
          background: isStaged ? '#b07f4318' : '#5c8a7718',
          border: `1px solid ${isStaged ? '#b07f4335' : '#5c8a7735'}`,
          padding: '2px 7px',
          borderRadius: RADIUS.badge,
        },
      }, isStaged ? '未落盘' : '已落盘'),
    ),
    isImage
      ? React.createElement(ImageSandboxView, { src: content, alt: pathStr })
      : isDoc
        ? React.createElement(DocSandboxView, { text: content })
        : React.createElement(CodeSandboxView, { code: content, filename: pathStr }),
  )
}

function VersionPillsBar({ currentVersion, history, selectedVer, onSelectVer }) {
  if (!history || history.length === 0) return null

  const curVer = currentVersion || 'v1.0'
  const allVersions = [
    ...history.map(h => ({
      version: h.version,
      timestamp: h.timestamp,
      isCurrent: false,
    })),
    {
      version: curVer,
      timestamp: '最新',
      isCurrent: true,
    },
  ]

  const isHistorical = selectedVer && selectedVer !== curVer

  return React.createElement('div', {
    style: {
      marginTop: 8,
      marginBottom: 9,
      padding: '7px 10px',
      background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 75%, transparent)',
      border: '1px solid var(--dsw-alias-border-l3)',
      borderRadius: RADIUS.sub,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          fontWeight: 650,
          color: 'var(--dsw-alias-label-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '.05em',
        },
      },
        React.createElement('span', null, '⏱️'),
        React.createElement('span', null, 'VERSION HISTORY / 迭代快照'),
      ),
      isHistorical && React.createElement('button', {
        onClick: (e) => { e.stopPropagation(); onSelectVer(curVer) },
        style: {
          background: '#5c8a7718',
          border: '1px solid #5c8a7740',
          borderRadius: RADIUS.control,
          padding: '2px 7px',
          fontSize: 10.5,
          fontFamily: FONT_SANS,
          color: '#5c8a77',
          fontWeight: 600,
          cursor: 'pointer',
        },
      }, '切回最新版本 ➔'),
    ),
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        overflowX: 'auto',
      },
    },
      allVersions.map(v => {
        const isSelected = selectedVer ? selectedVer === v.version : v.isCurrent
        return React.createElement('button', {
          key: v.version,
          onClick: (e) => { e.stopPropagation(); onSelectVer(v.version) },
          style: {
            background: isSelected ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
            border: isSelected
              ? (v.isCurrent ? '1px solid var(--dsw-alias-state-business-primary)' : '1px solid var(--dsw-alias-border-l1)')
              : '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '3px 8px',
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: isSelected ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
            fontWeight: isSelected ? 650 : 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 120ms ease',
            whiteSpace: 'nowrap',
          },
          title: `版本 ${v.version} (${v.timestamp || '无时间戳'})`,
        },
          React.createElement('span', null, v.version),
          v.isCurrent && React.createElement('span', {
            style: {
              fontSize: 9.5,
              padding: '0.5px 3.5px',
              borderRadius: RADIUS.badge,
              background: '#5c8a7720',
              color: '#5c8a77',
              fontWeight: 700,
            },
          }, '最新'),
        )
      })
    ),
    isHistorical && React.createElement('div', {
      style: {
        marginTop: 6,
        padding: '4px 8px',
        borderRadius: RADIUS.sub,
        background: '#b07f4314',
        border: '1px solid #b07f4335',
        fontSize: 11,
        color: '#b07f43',
        fontFamily: FONT_SANS,
      },
    }, `🔍 正在查看历史快照 [${selectedVer}] · 对应当时的参数、代码与指标`),
  )
}

function DatasetSlicesBlock({ slices, allNodes, datasetId, onSelectNode }) {
  if (!slices || typeof slices !== 'object') return null
  const sliceEntries = Object.entries(slices)
  if (sliceEntries.length === 0) return null

  return React.createElement('div', {
    style: {
      marginTop: 10,
      marginBottom: 9,
      padding: '8px 11px',
      background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 80%, transparent)',
      border: '1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 70%, #c15f3e)',
      borderRadius: RADIUS.sub,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
      },
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          fontWeight: 650,
          color: '#c15f3e',
          textTransform: 'uppercase',
          letterSpacing: '.05em',
        },
      },
        React.createElement('span', null, '✂️'),
        React.createElement('span', null, 'DATA SLICES & COHORTS / 数据切片'),
      ),
      React.createElement('span', {
        style: { fontSize: 10.5, fontFamily: FONT_MONO, color: 'var(--dsw-alias-label-secondary)' },
      }, `${sliceEntries.length} 个定义切片`),
    ),
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 6,
      },
    },
      sliceEntries.map(([key, slice]) => {
        const isHoldout = slice.holdout === true
        const consumers = (allNodes || []).filter(n =>
          n.dataProvenance?.datasetId === datasetId && n.dataProvenance?.slice === key
        )

        return React.createElement('div', {
          key,
          style: {
            background: 'var(--dsw-alias-bg-layer-2)',
            padding: '7px 9px',
            borderRadius: RADIUS.sub,
            border: `1px solid ${isHoldout ? '#b4535345' : 'var(--dsw-alias-border-l3)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 3.5,
          },
        },
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            },
          },
            React.createElement('span', {
              style: {
                fontWeight: 650,
                fontSize: 11.5,
                color: isHoldout ? '#b45353' : 'var(--dsw-alias-label-primary)',
                fontFamily: FONT_MONO,
              },
            }, key),
            isHoldout
              ? React.createElement('span', {
                  style: {
                    fontSize: 9.5,
                    fontFamily: FONT_MONO,
                    background: '#b4535320',
                    color: '#b45353',
                    border: '1px solid #b4535340',
                    padding: '1px 4px',
                    borderRadius: RADIUS.badge,
                    fontWeight: 700,
                  },
                }, '🔒 HOLDOUT')
              : slice.split && React.createElement('span', {
                  style: {
                    fontSize: 9.5,
                    fontFamily: FONT_MONO,
                    background: 'var(--dsw-alias-bg-layer-1)',
                    color: 'var(--dsw-alias-label-secondary)',
                    padding: '1px 4px',
                    borderRadius: RADIUS.badge,
                  },
                }, slice.split),
          ),
          slice.name && React.createElement('div', {
            style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)', fontWeight: 500 },
          }, slice.name),
          (slice.samples !== undefined || slice.criteria) && React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 10.5,
              fontFamily: FONT_MONO,
              color: 'var(--dsw-alias-label-secondary)',
              flexWrap: 'wrap',
            },
          },
            slice.samples !== undefined && React.createElement('span', {
              style: { color: 'var(--dsw-alias-label-primary)', fontWeight: 600 },
            }, `N = ${slice.samples}`),
            slice.criteria && React.createElement('span', {
              style: { opacity: 0.85 },
              title: `过滤规则: ${slice.criteria}`,
            }, `规则: ${slice.criteria}`),
          ),
          consumers.length > 0 && React.createElement('div', {
            style: {
              marginTop: 4,
              paddingTop: 4,
              borderTop: '1px solid var(--dsw-alias-border-l3)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap',
            },
          },
            React.createElement('span', {
              style: { fontSize: 10, color: 'var(--dsw-alias-label-secondary)', fontFamily: FONT_MONO },
            }, '消费此切片:'),
            consumers.map(c => React.createElement('button', {
              key: c.id,
              onClick: (e) => { e.stopPropagation(); onSelectNode(c.id) },
              style: {
                background: 'var(--dsw-alias-bg-layer-1)',
                border: '1px solid var(--dsw-alias-border-l3)',
                borderRadius: RADIUS.badge,
                padding: '1px 4.5px',
                fontSize: 10,
                fontFamily: FONT_MONO,
                color: 'var(--dsw-alias-state-business-primary)',
                cursor: 'pointer',
              },
              title: `跳转至消费节点: ${c.title}`,
            }, c.id)),
          ),
        )
      })
    )
  )
}

function DataProvenanceBadge({ dataProvenance, allNodes, onSelectNode, isCompact }) {
  if (!dataProvenance || typeof dataProvenance !== 'object') return null
  const dsId = dataProvenance.datasetId
  const targetDs = (allNodes || []).find(n => n.id === dsId)
  const isHoldout = dataProvenance.holdout === true

  if (isCompact) {
    return React.createElement('span', {
      style: {
        fontSize: 10.5,
        fontFamily: FONT_MONO,
        color: isHoldout ? '#b45353' : '#c15f3e',
        background: isHoldout ? '#b4535318' : '#c15f3e12',
        border: `1px solid ${isHoldout ? '#b4535340' : '#c15f3e28'}`,
        padding: '1.5px 5.5px',
        borderRadius: RADIUS.badge,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3.5,
      },
      title: `数据血统: ${targetDs?.title || dsId || '未知数据集'}${dataProvenance.slice ? ` [${dataProvenance.slice}]` : ''}`,
    },
      React.createElement('span', null, '📊'),
      React.createElement('span', null, `${dsId || 'data'}${dataProvenance.slice ? `/${dataProvenance.slice}` : ''}`),
    )
  }

  return React.createElement('div', {
    style: {
      marginTop: 8,
      marginBottom: 8,
      padding: '7px 10px',
      borderRadius: RADIUS.sub,
      background: isHoldout ? '#b4535312' : '#c15f3e10',
      border: `1px solid ${isHoldout ? '#b4535338' : '#c15f3e30'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 3.5,
      fontFamily: FONT_SANS,
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 4,
      },
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          fontWeight: 700,
          color: isHoldout ? '#b45353' : '#c15f3e',
          textTransform: 'uppercase',
          letterSpacing: '.05em',
        },
      },
        React.createElement('span', null, '📊'),
        React.createElement('span', null, 'DATA PROVENANCE / 数据血统'),
      ),
      isHoldout && React.createElement('span', {
        style: {
          fontSize: 10,
          fontFamily: FONT_MONO,
          color: '#b45353',
          background: '#b4535324',
          border: '1px solid #b4535350',
          padding: '1px 5px',
          borderRadius: RADIUS.badge,
          fontWeight: 700,
        },
      }, '⚠️ HOLDOUT (防泄露隔离)'),
    ),
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11.5,
        fontFamily: FONT_MONO,
        color: 'var(--dsw-alias-label-primary)',
        flexWrap: 'wrap',
      },
    },
      dsId && React.createElement('button', {
        onClick: (e) => { e.stopPropagation(); onSelectNode(dsId) },
        style: {
          background: 'var(--dsw-alias-bg-layer-2)',
          border: '1px solid var(--dsw-alias-border-l2)',
          borderRadius: RADIUS.control,
          padding: '2px 7px',
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: '#c15f3e',
          fontWeight: 650,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3.5,
          transition: 'all 120ms ease',
        },
        title: `跳转至对应数据集: ${targetDs?.title || dsId}`,
      },
        React.createElement('span', null, '↳ 数据集:'),
        React.createElement('span', null, dsId),
      ),
      dataProvenance.slice && React.createElement('span', {
        style: {
          background: 'var(--dsw-alias-bg-layer-1)',
          border: '1px solid var(--dsw-alias-border-l3)',
          borderRadius: RADIUS.badge,
          padding: '2px 6px',
          fontWeight: 600,
          color: 'var(--dsw-alias-label-secondary)',
        },
      }, `切片: ${dataProvenance.slice}`),
      dataProvenance.samples !== undefined && React.createElement('span', {
        style: { color: 'var(--dsw-alias-label-secondary)', fontWeight: 550 },
      }, `N = ${dataProvenance.samples}`),
      dataProvenance.split && React.createElement('span', {
        style: {
          color: 'var(--dsw-alias-label-secondary)',
          background: 'var(--dsw-alias-bg-layer-1)',
          padding: '2px 5.5px',
          borderRadius: RADIUS.badge,
          border: '1px solid var(--dsw-alias-border-l3)',
          fontSize: 10.5,
        },
      }, dataProvenance.split),
    ),
    dataProvenance.criteria && React.createElement('div', {
      style: {
        fontSize: 11,
        color: 'var(--dsw-alias-label-secondary)',
        fontFamily: FONT_MONO,
        marginTop: 2,
      },
    }, `过滤条件: ${dataProvenance.criteria}`),
  )
}

function CardThreadPanel({ node, isFocused, onSetFocus, onSendMessage, isThinking, elapsedSec }) {
  const [inputText, setInputText] = useState('')
  const thread = Array.isArray(node.thread) ? node.thread : []
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [thread.length, isThinking])

  const handleSend = () => {
    const text = inputText.trim()
    if (!text || isThinking) return
    if (onSendMessage) {
      onSendMessage(text)
    }
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickTemplates = [
    { label: '🔍 归因分析', prompt: '请对该卡片的异常原因/瓶颈进行深入归因分析，寻找关键致错样本与变量。' },
    { label: '🧪 消融方案', prompt: '针对该卡片设计控制变量消融对比方案，并明确检验指标。' },
    { label: '📊 结果复盘', prompt: '请复盘该卡片当前的指标表现与历史对比，评估是否符合预期。' },
  ]

  return React.createElement('div', {
    style: {
      marginTop: 10,
      padding: '10px 12px 11px',
      background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)',
      border: isFocused
        ? '1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, #c15f3e)'
        : '1px solid var(--dsw-alias-border-l3)',
      borderRadius: RADIUS.sub,
      boxShadow: isFocused ? '0 0 0 1px #c15f3e30' : undefined,
    },
    onClick: (e) => e.stopPropagation(),
  },
    // Header
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingBottom: 6,
        borderBottom: '1px solid var(--dsw-alias-border-l3)',
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement('span', { style: { fontSize: 13 } }, '💬'),
        React.createElement('span', {
          style: {
            fontSize: 12,
            fontWeight: 700,
            fontFamily: FONT_SANS,
            color: 'var(--dsw-alias-label-primary)',
          },
        }, `卡片专属研讨 (${thread.length})`),
      ),
      React.createElement('button', {
        onClick: () => onSetFocus && onSetFocus(isFocused ? null : node.id),
        style: {
          background: isFocused ? '#c15f3e20' : 'var(--dsw-alias-bg-layer-2)',
          border: isFocused ? '1px solid #c15f3e55' : '1px solid var(--dsw-alias-border-l3)',
          borderRadius: RADIUS.control,
          padding: '2.5px 8px',
          fontSize: 11,
          fontFamily: FONT_SANS,
          color: isFocused ? '#c15f3e' : 'var(--dsw-alias-label-secondary)',
          fontWeight: isFocused ? 700 : 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4.5,
          transition: 'all 120ms ease',
        },
        title: isFocused ? '解除主对话焦点绑定' : '将主对话输入栏聚焦绑定到此卡片',
      },
        React.createElement('span', null, isFocused ? '🎯' : '◎'),
        React.createElement('span', null, isFocused ? '已设为主焦点 (点击解除)' : '设为主对话焦点'),
      ),
    ),
    // Messages list
    React.createElement('div', {
      ref: listRef,
      style: {
        maxHeight: 180,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        padding: '2px 2px 4px',
        marginBottom: 8,
      },
    },
      thread.length === 0
        ? React.createElement('div', {
            style: {
              textAlign: 'center',
              padding: '16px 8px',
              color: 'var(--dsw-alias-label-tertiary)',
              fontSize: 11.5,
              fontStyle: 'italic',
            },
          }, '暂无针对此卡片的讨论。点击下方快捷模板或输入问题发起专属研讨。')
        : thread.map((msg, i) => {
            const isUser = msg.sender === 'user'
            const isSys = msg.sender === 'system'
            if (isSys) {
              return React.createElement('div', {
                key: msg.id || i,
                style: {
                  textAlign: 'center',
                  fontSize: 10.5,
                  color: 'var(--dsw-alias-label-tertiary)',
                  fontFamily: FONT_MONO,
                  padding: '2px 0',
                },
              }, msg.text)
            }
            return React.createElement('div', {
              key: msg.id || i,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                gap: 2,
              },
            },
              React.createElement('div', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 10,
                  fontFamily: FONT_MONO,
                  color: 'var(--dsw-alias-label-tertiary)',
                  padding: '0 4px',
                },
              },
                React.createElement('span', { style: { fontWeight: 600, color: isUser ? '#5c8a77' : '#c15f3e' } }, isUser ? '你' : 'Agent'),
                msg.timestamp && React.createElement('span', null, msg.timestamp),
              ),
              React.createElement('div', {
                style: {
                  maxWidth: '92%',
                  padding: '6px 9.5px',
                  borderRadius: RADIUS.sub,
                  fontSize: 12,
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  background: isUser
                    ? 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #5c8a7718)'
                    : 'var(--dsw-alias-bg-layer-2)',
                  border: isUser
                    ? '1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, #5c8a7735)'
                    : '1px solid var(--dsw-alias-border-l3)',
                  color: 'var(--dsw-alias-label-primary)',
                },
              }, msg.text),
            )
          }),
      isThinking && React.createElement('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          marginTop: 4,
        },
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 10,
            fontFamily: FONT_MONO,
            color: '#c15f3e',
            padding: '0 4px',
          },
        },
          React.createElement('span', { style: { fontWeight: 600 } }, 'Agent'),
          React.createElement('span', { style: { opacity: 0.8 } }, '思考中...'),
          elapsedSec > 0 && React.createElement('span', { style: { opacity: 0.6 } }, `${elapsedSec}s`),
        ),
        React.createElement('div', {
          className: 'dsh-pulse-pill',
          style: {
            padding: '6px 11px',
            borderRadius: RADIUS.sub,
            background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #c15f3e12)',
            border: '1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 70%, #c15f3e35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          },
        },
          React.createElement('span', { className: 'dsh-typing-dot', style: { width: 5, height: 5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-2', style: { width: 5, height: 5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-3', style: { width: 5, height: 5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', {
            className: 'dsh-shimmer-text',
            style: {
              fontSize: 11.5,
              marginLeft: 5,
              fontFamily: FONT_SANS,
            },
          }, `正在针对 [${node.id}] 研讨思考...`),
        ),
      )
    ),
    // Quick Templates Chips
    React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4.5,
        marginBottom: 8,
      },
    },
      quickTemplates.map(tmpl => React.createElement('button', {
        key: tmpl.label,
        onClick: () => setInputText(tmpl.prompt),
        style: {
          background: 'var(--dsw-alias-bg-layer-2)',
          border: '1px solid var(--dsw-alias-border-l3)',
          borderRadius: RADIUS.control,
          padding: '2px 6.5px',
          fontSize: 10.5,
          color: 'var(--dsw-alias-label-secondary)',
          cursor: 'pointer',
          transition: 'all 120ms ease',
        },
        title: `点击填入: "${tmpl.prompt}"`,
      }, tmpl.label))
    ),
    // Input Box
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'flex-end',
      },
    },
      React.createElement('textarea', {
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: isThinking
          ? `Agent 正在思考处理中，可继续输入...`
          : `对 [${node.id}] 发起讨论... (Enter 发送, Shift+Enter 换行)`,
        rows: 2,
        style: {
          flex: 1,
          resize: 'none',
          padding: '6px 8px',
          borderRadius: RADIUS.control,
          border: '1px solid var(--dsw-alias-border-l2)',
          background: 'var(--dsw-alias-bg-layer-2)',
          color: 'var(--dsw-alias-label-primary)',
          fontSize: 12,
          fontFamily: FONT_SANS,
          lineHeight: 1.45,
          outline: 'none',
        },
      }),
      React.createElement('button', {
        onClick: handleSend,
        disabled: isThinking || !inputText.trim(),
        style: {
          background: isThinking
            ? '#c15f3e1c'
            : (inputText.trim() ? '#c15f3e' : 'var(--dsw-alias-bg-layer-2)'),
          color: isThinking
            ? '#c15f3e'
            : (inputText.trim() ? '#fff' : 'var(--dsw-alias-label-tertiary)'),
          border: isThinking
            ? '1px solid #c15f3e50'
            : (inputText.trim() ? '1px solid #c15f3e' : '1px solid var(--dsw-alias-border-l3)'),
          borderRadius: RADIUS.control,
          padding: '6px 11px',
          fontSize: 11.5,
          fontWeight: 600,
          cursor: isThinking ? 'wait' : (inputText.trim() ? 'pointer' : 'not-allowed'),
          whiteSpace: 'nowrap',
          height: 34,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          transition: 'all 120ms ease',
        },
      },
        isThinking && React.createElement('span', { className: 'dsh-spin', style: { fontSize: 11 } }, '⏳'),
        React.createElement('span', null, isThinking ? `思考中${elapsedSec > 0 ? ` (${elapsedSec}s)` : '...'}` : '发送'),
      ),
    )
  )
}

function ColumnCard({ node, isSelected, isExpanded, isConnected, onSelect, connectedEdges, allNodes, activeThreadId, onSetFocus, onSendMessage, isThinking, elapsedSec, onOpenChartModal }) {
  const isChart = node.kind === 'artifact' && (
    (node.tags && (node.tags.includes('chart') || node.tags.includes('plot') || node.tags.includes('figure'))) ||
    node.fileType === 'image' ||
    Boolean(node.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(node.sandboxPath)) ||
    Boolean(node.preview && (node.preview.trim().startsWith('<svg') || node.preview.trim().startsWith('data:image'))) ||
    Boolean(node.content && node.content.trim().startsWith('<svg'))
  )
  const meta = isChart
    ? { label: 'Chart', zh: '图表分析', color: '#5a82a6', bg: '#5a82a614', border: '#5a82a630' }
    : (TYPE_META[node.kind] || { label: node.kind, zh: node.kind, color: '#777', bg: '#77777712', border: '#77777724' })
  const statusMeta = getNodeStatusMeta(node)
  const isDegraded = statusMeta?.isDegraded
  const isDataset = node.kind === 'dataset'
  const isArtifact = node.kind === 'artifact'
  const isWide = isDataset || isArtifact

  // Version management:
  const curVer = node.version || 'v1.0'
  const history = Array.isArray(node.history) ? node.history : []
  const hasHistory = history.length > 0
  const [selectedVer, setSelectedVer] = useState(curVer)

  useEffect(() => {
    setSelectedVer(curVer)
  }, [curVer])

  // Active snapshot resolution:
  const isHistorical = hasHistory && selectedVer && selectedVer !== curVer
  const activeSnapshot = isHistorical ? history.find(h => h.version === selectedVer) || null : null

  const displayMetrics = activeSnapshot ? activeSnapshot.metrics : node.metrics
  const displayDetail = activeSnapshot ? activeSnapshot.detail : node.detail
  const displayDegradation = activeSnapshot ? activeSnapshot.degradationReason : node.degradationReason
  const displayStage = activeSnapshot ? (activeSnapshot.stage || node.stage) : node.stage
  const displaySandboxNode = activeSnapshot
    ? {
        ...node,
        sandboxPath: activeSnapshot.sandboxPath || node.sandboxPath,
        content: activeSnapshot.content || node.content,
        preview: activeSnapshot.preview || node.preview,
      }
    : node

  // Calculate prior metrics for delta comparison:
  let priorMetrics = null
  let priorLabel = null
  if (hasHistory) {
    if (!isHistorical) {
      const latestHist = history[history.length - 1]
      if (latestHist?.metrics) {
        priorMetrics = latestHist.metrics
        priorLabel = latestHist.version
      }
    } else {
      const histIdx = history.findIndex(h => h.version === selectedVer)
      if (histIdx > 0 && history[histIdx - 1]?.metrics) {
        priorMetrics = history[histIdx - 1].metrics
        priorLabel = history[histIdx - 1].version
      }
    }
  }

  const fields = node.fields || {}
  const fieldEntries = Object.entries(fields)
  const hasSandbox = Boolean(displaySandboxNode.sandboxPath || displaySandboxNode.content || displaySandboxNode.preview)
  const isStaged = hasSandbox && displaySandboxNode.staged !== false

  const incoming = (connectedEdges || []).filter(e => e.target === node.id)
  const outgoing = (connectedEdges || []).filter(e => e.source === node.id)
  const hasRelations = incoming.length > 0 || outgoing.length > 0

  return React.createElement('div', {
    id: `card-${node.id}`,
    onClick: () => onSelect(node.id),
    style: {
      boxSizing: 'border-box',
      borderRadius: RADIUS.card,
      border: isSelected
        ? `1px solid ${meta.color}`
        : activeThreadId === node.id
          ? '1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, #c15f3e)'
          : isDegraded
            ? '1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 65%, #b45353)'
            : isConnected
              ? `1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, ${meta.color})`
              : isWide
                ? `1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 75%, ${meta.color})`
                : '1px solid var(--dsw-alias-border-l2)',
      background: isSelected
        ? `color-mix(in srgb, var(--dsw-alias-bg-layer-2) 94%, ${meta.color})`
        : isDegraded
          ? 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 96%, #b4535312)'
          : 'var(--dsw-alias-bg-layer-2)',
      boxShadow: isSelected
        ? `0 0 0 1.5px ${meta.color}35, var(--dsw-shadow-lv2)`
        : 'var(--dsw-shadow-lv1)',
      padding: isExpanded
        ? (isWide ? '18px 20px 20px' : '15px 17px 17px')
        : (isWide ? '13px 18px' : '11px 14px'),
      marginBottom: 11,
      cursor: 'pointer',
      transition: 'opacity 140ms ease, border-color 140ms ease, box-shadow 140ms ease, padding 140ms ease',
      opacity: isConnected !== null ? (isConnected ? 1 : 0.32) : 1,
      fontFamily: FONT_SANS,
    },
  },
    // Card Header
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isExpanded ? 7 : 6,
        paddingBottom: isExpanded && isWide ? 8 : 0,
        borderBottom: isExpanded && isWide ? '1px solid var(--dsw-alias-border-l3)' : undefined,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
        React.createElement('span', {
          style: {
            color: meta.color,
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            fontSize: 11,
            fontWeight: 650,
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            padding: '2.5px 7px',
            borderRadius: RADIUS.badge,
          },
        }, meta.label),
        statusMeta && React.createElement('span', {
          style: {
            color: statusMeta.color,
            background: statusMeta.bg,
            border: `1px solid ${statusMeta.border}`,
            fontSize: 11,
            fontWeight: 650,
            padding: '2px 6.5px',
            borderRadius: RADIUS.badge,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3.5,
          },
          title: `状态: ${statusMeta.zh} (${statusMeta.label})`,
        },
          isDegraded && React.createElement('span', { style: { fontSize: 10 } }, '✕'),
          React.createElement('span', null, statusMeta.zh),
        ),
        (node.version || hasHistory) && React.createElement('span', {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            fontWeight: 650,
            color: '#6e8299',
            background: '#6e829916',
            border: '1px solid #6e829935',
            padding: '2px 5.5px',
            borderRadius: RADIUS.badge,
          },
          title: hasHistory ? `版本: ${curVer} (${history.length} 个历史快照)` : `版本: ${curVer}`,
        }, `${curVer}${hasHistory ? ` [${history.length + 1}]` : ''}`),
        (node.thread && Array.isArray(node.thread) && node.thread.length > 0) && React.createElement('span', {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            color: '#8e799c',
            background: '#8e799c15',
            border: '1px solid #8e799c35',
            padding: '2px 5.5px',
            borderRadius: RADIUS.badge,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3.5,
            fontWeight: 600,
          },
          title: `卡片研讨线索: ${node.thread.length} 条发言`,
        },
          React.createElement('span', null, '💬'),
          React.createElement('span', null, node.thread.length),
        ),
        activeThreadId === node.id && React.createElement('span', {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_SANS,
            color: '#c15f3e',
            background: '#c15f3e18',
            border: '1px solid #c15f3e45',
            padding: '2px 6.5px',
            borderRadius: RADIUS.badge,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3.5,
          },
          title: '当前处于主对话聚焦研讨状态',
        },
          React.createElement('span', null, '🎯'),
          React.createElement('span', null, '研讨焦点'),
        ),
        displayStage && React.createElement('span', {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            color: 'var(--dsw-alias-label-secondary)',
            background: 'var(--dsw-alias-bg-layer-1)',
            border: '1px solid var(--dsw-alias-border-l3)',
            padding: '2px 5.5px',
            borderRadius: RADIUS.badge,
            fontWeight: 500,
          },
          title: `阶段: ${displayStage}`,
        }, `📍 ${displayStage}`),
        !isExpanded && node.dataProvenance && React.createElement(DataProvenanceBadge, {
          dataProvenance: node.dataProvenance,
          allNodes,
          onSelectNode: onSelect,
          isCompact: true,
        }),
        hasSandbox && React.createElement('span', {
          style: {
            fontSize: 11,
            fontFamily: FONT_SANS,
            color: isStaged ? '#b07f43' : '#5c8a77',
            background: isStaged ? '#b07f4314' : '#5c8a7714',
            border: `1px solid ${isStaged ? '#b07f4335' : '#5c8a7735'}`,
            padding: '2px 7px',
            borderRadius: RADIUS.badge,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 600,
          },
          title: isStaged ? '暂存于虚拟沙箱中，尚未写入磁盘' : '已写入工作区磁盘文件',
        },
          React.createElement('span', null, isStaged ? '📦' : '✓'),
          React.createElement('span', null, isStaged ? '沙箱暂存' : '已落盘'),
        ),
        (fields.format || (isArtifact && node.fileType)) && React.createElement('span', {
          style: {
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: 'var(--dsw-alias-label-secondary)',
            background: 'var(--dsw-alias-bg-layer-1)',
            padding: '2px 6.5px',
            borderRadius: RADIUS.badge,
            border: '1px solid var(--dsw-alias-border-l3)',
            fontWeight: 600,
          },
        }, String(fields.format || node.fileType).toUpperCase()),
        // Plottable Quick Action button (for experiments, datasets, or nodes with metrics/slices)
        (node.kind === 'experiment' || node.kind === 'dataset' || (node.metrics && Object.keys(node.metrics).length > 0) || node.slices) && React.createElement('button', {
          onClick: (e) => {
            e.stopPropagation()
            if (onOpenChartModal) onOpenChartModal([node.id])
          },
          style: {
            background: 'var(--dsw-alias-bg-layer-1)',
            border: '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.badge,
            padding: '1.5px 6.5px',
            fontSize: 10.5,
            fontFamily: FONT_SANS,
            color: 'var(--dsw-alias-label-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3.5,
            fontWeight: 600,
            transition: 'all 120ms ease',
          },
          title: `以 [${node.id}] 为基准绘制科研图表`,
        },
          React.createElement('span', null, '📈'),
          React.createElement('span', null, '画图'),
        ),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
        React.createElement('span', {
          style: {
            color: 'var(--dsw-alias-label-secondary)',
            fontSize: 11.5,
            fontFamily: FONT_MONO,
            fontWeight: 500,
          },
        }, node.id),
        React.createElement('span', {
          style: {
            fontSize: 12,
            color: isExpanded ? meta.color : 'var(--dsw-alias-label-tertiary)',
            transition: 'transform 160ms ease, color 160ms ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
            lineHeight: 1,
            padding: '1px 3px',
          },
          title: isExpanded ? '收起' : '展开',
        }, '▾'),
      ),
    ),
    // Title
    React.createElement('div', {
      style: {
        fontSize: isWide ? 15.5 : 14,
        lineHeight: 1.48,
        fontWeight: 650,
        color: isDegraded ? 'color-mix(in srgb, var(--dsw-alias-label-primary) 85%, #b45353)' : 'var(--dsw-alias-label-primary)',
        marginBottom: isExpanded ? (displayDetail ? 7 : 8) : 0,
        letterSpacing: '-0.01em',
      },
    }, node.title),
    // Compact summary metrics (when not expanded)
    !isExpanded && displayMetrics && Object.keys(displayMetrics).length > 0 && React.createElement('div', {
      style: {
        marginTop: 6,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
      },
    },
      Object.entries(displayMetrics).slice(0, 3).map(([k, v]) => React.createElement('span', {
        key: k,
        style: {
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: 'var(--dsw-alias-label-secondary)',
          background: 'var(--dsw-alias-bg-layer-1)',
          padding: '2px 6px',
          borderRadius: RADIUS.badge,
          border: '1px solid var(--dsw-alias-border-l3)',
        },
      }, `${k.toUpperCase()}: ${typeof v === 'number' && v <= 1 && v >= 0 && /(ppv|sens|spec|auc|acc|rate|ratio|f1)/i.test(k) ? (v * 100).toFixed(1) + '%' : v}`))
    ),
    // Version Pills Bar (when expanded and has history)
    isExpanded && hasHistory && React.createElement(VersionPillsBar, {
      currentVersion: curVer,
      history,
      selectedVer,
      onSelectVer: setSelectedVer,
    }),
    // Data Provenance Badge (when expanded)
    isExpanded && node.dataProvenance && React.createElement(DataProvenanceBadge, {
      dataProvenance: node.dataProvenance,
      allNodes,
      onSelectNode: onSelect,
      isCompact: false,
    }),
    // Dataset Slices Block (when expanded and is a dataset node with defined slices)
    isExpanded && isDataset && node.slices && React.createElement(DatasetSlicesBlock, {
      slices: node.slices,
      allNodes,
      datasetId: node.id,
      onSelectNode: onSelect,
    }),
    // Parent derivation link (when expanded)
    isExpanded && node.parent && React.createElement('div', {
      style: {
        marginTop: 7,
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      },
    },
      React.createElement('span', {
        style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600 },
      }, '派生溯源:'),
      React.createElement('button', {
        onClick: (e) => { e.stopPropagation(); onSelect(node.parent) },
        style: {
          background: 'var(--dsw-alias-bg-layer-1)',
          border: '1px solid var(--dsw-alias-border-l3)',
          borderRadius: RADIUS.control,
          padding: '2px 7.5px',
          fontSize: 11.5,
          fontFamily: FONT_MONO,
          color: '#c15f3e',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          transition: 'all 120ms ease',
        },
        title: `点击跳转并聚焦父节点: ${node.parent}`,
      },
        React.createElement('span', null, '↳'),
        React.createElement('span', { style: { fontWeight: 600 } }, node.parent),
      ),
    ),
    // Degradation / Refutation banner (when expanded)
    isExpanded && (isDegraded || displayDegradation) && React.createElement(DegradationBanner, {
      reason: displayDegradation,
      statusMeta,
    }),
    // Detail (description) - ONLY WHEN EXPANDED!
    isExpanded && displayDetail && React.createElement('div', {
      style: {
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: 13,
        lineHeight: 1.65,
        marginTop: 8,
        marginBottom: 8,
        paddingTop: 8,
        borderTop: '1px solid var(--dsw-alias-border-l3)',
      },
    }, displayDetail),
    // Metrics Grid - ONLY WHEN EXPANDED!
    isExpanded && displayMetrics && React.createElement(MetricsGrid, {
      metrics: displayMetrics,
      priorMetrics,
      priorLabel,
    }),
    // Tags row - ONLY WHEN EXPANDED!
    isExpanded && node.tags && Array.isArray(node.tags) && node.tags.length > 0 && React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 7,
        marginBottom: 6,
      },
    },
      node.tags.map(tag => React.createElement('span', {
        key: tag,
        style: {
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          color: 'var(--dsw-alias-label-secondary)',
          background: 'var(--dsw-alias-bg-layer-1)',
          border: '1px solid var(--dsw-alias-border-l3)',
          borderRadius: RADIUS.badge,
          padding: '1.5px 5.5px',
        },
      }, `#${tag}`))
    ),
    // Metadata Matrix (Fields) - ONLY WHEN EXPANDED!
    isExpanded && fieldEntries.length > 0 && React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: isWide ? 'repeat(2, minmax(0, 1fr))' : '1fr',
        gap: 7,
        marginTop: 8,
        marginBottom: 6,
      },
    },
      fieldEntries.map(([k, v]) => React.createElement('div', {
        key: k,
        style: {
          background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent)',
          padding: isWide ? '7px 11px' : '5px 9px',
          borderRadius: RADIUS.sub,
          border: '1px solid var(--dsw-alias-border-l3)',
          display: 'flex',
          flexDirection: isWide ? 'column' : 'row',
          alignItems: isWide ? 'flex-start' : 'baseline',
          justifyContent: isWide ? 'flex-start' : 'space-between',
          gap: 3.5,
        },
      },
        React.createElement('span', {
          style: {
            color: 'var(--dsw-alias-label-secondary)',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.05em',
          },
        }, k.replace(/_/g, ' ')),
        React.createElement('span', {
          style: {
            color: 'var(--dsw-alias-label-primary)',
            fontSize: 12.5,
            fontFamily: FONT_MONO,
            fontWeight: 500,
            lineHeight: 1.4,
            wordBreak: 'break-word',
          },
          title: String(v),
        }, String(v)),
      ))
    ),
    // Sandboxed Content Preview - ONLY WHEN EXPANDED!
    isExpanded && hasSandbox && React.createElement(SandboxBlock, { node: displaySandboxNode }),
    // Dedicated Card Thread Panel - ONLY WHEN EXPANDED!
    isExpanded && React.createElement(CardThreadPanel, {
      node,
      isFocused: activeThreadId === node.id,
      onSetFocus,
      onSendMessage: (text) => onSendMessage && onSendMessage(node.id, text),
      isThinking,
      elapsedSec,
    }),
    // Explicit Relationship Badges - ONLY WHEN EXPANDED!
    isExpanded && hasRelations && React.createElement('div', {
      style: {
        marginTop: 10,
        paddingTop: 8,
        borderTop: '1px solid var(--dsw-alias-border-l3)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5.5,
        alignItems: 'center',
      },
    },
      React.createElement('span', {
        style: {
          fontSize: 11,
          color: 'var(--dsw-alias-label-secondary)',
          fontWeight: 650,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          fontFamily: FONT_MONO,
          marginRight: 4,
        },
      }, 'RELATIONS'),
      incoming.map(edge => {
        const src = (allNodes || []).find(n => n.id === edge.source)
        const srcMeta = TYPE_META[src?.kind] || meta
        return React.createElement('button', {
          key: `in-${edge.id || edge.source}`,
          onClick: (e) => { e.stopPropagation(); onSelect(edge.source) },
          style: {
            background: 'var(--dsw-alias-bg-layer-1)',
            border: `1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, ${srcMeta.color})`,
            borderRadius: RADIUS.control,
            padding: '3px 8.5px',
            fontSize: 11.5,
            color: 'var(--dsw-alias-label-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4.5,
            lineHeight: 1.3,
            transition: 'border-color 120ms ease, background 120ms ease',
          },
          title: `来源于: ${src?.title || edge.source} (${edge.label || '关联'})`,
        },
          React.createElement('span', { style: { color: srcMeta.color, fontWeight: 700, fontSize: 12 } }, '←'),
          React.createElement('span', { style: { fontWeight: 600, color: srcMeta.color, fontFamily: FONT_MONO } }, edge.source),
          edge.label && React.createElement('span', { style: { opacity: 0.75, fontSize: 11 } }, `(${edge.label})`),
        )
      }),
      outgoing.map(edge => {
        const tgt = (allNodes || []).find(n => n.id === edge.target)
        const tgtMeta = TYPE_META[tgt?.kind] || meta
        return React.createElement('button', {
          key: `out-${edge.id || edge.target}`,
          onClick: (e) => { e.stopPropagation(); onSelect(edge.target) },
          style: {
            background: 'var(--dsw-alias-bg-layer-1)',
            border: `1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, ${tgtMeta.color})`,
            borderRadius: RADIUS.control,
            padding: '3px 8.5px',
            fontSize: 11.5,
            color: 'var(--dsw-alias-label-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4.5,
            lineHeight: 1.3,
            transition: 'border-color 120ms ease, background 120ms ease',
          },
          title: `指向: ${tgt?.title || edge.target} (${edge.label || '关联'})`,
        },
          React.createElement('span', { style: { fontWeight: 600, color: tgtMeta.color, fontFamily: FONT_MONO } }, edge.target),
          edge.label && React.createElement('span', { style: { opacity: 0.75, fontSize: 11 } }, `(${edge.label})`),
          React.createElement('span', { style: { color: tgtMeta.color, fontWeight: 700, fontSize: 12 } }, '→'),
        )
      }),
    )
  )
}

function ColumnHeader({
  title,
  dotColor,
  nodes,
  activeFilter,
  onFilterChange,
  validLabel = '有效进展',
  degradedLabel = '已废弃/证伪',
  hideDegraded = false,
  subTabs,
  activeSubTab,
  onSubTabChange,
  extraAction,
}) {
  const currentNodes = useMemo(() => {
    if (!subTabs || !activeSubTab || activeSubTab === 'all') return nodes
    return nodes.filter(n => n.kind === activeSubTab)
  }, [nodes, subTabs, activeSubTab])

  const supportedCount = currentNodes.filter(n => getNodeStatusMeta(n)?.group === 'supported').length
  const degradedCount = currentNodes.filter(n => getNodeStatusMeta(n)?.group === 'degraded').length
  const activeCount = currentNodes.filter(n => getNodeStatusMeta(n)?.group === 'active').length
  const validCount = currentNodes.length - degradedCount

  const filterTabs = [
    { id: 'all', label: '全部', count: currentNodes.length },
    ...(degradedCount > 0 ? [{ id: 'valid', label: validLabel, count: validCount }] : []),
    { id: 'active', label: '进行中', count: activeCount },
    { id: 'supported', label: '已证实', count: supportedCount },
    { id: 'degraded', label: degradedLabel, count: degradedCount },
  ]

  return React.createElement('div', {
    style: {
      padding: '9px 12px 8px',
      borderBottom: '1px solid var(--dsw-alias-border-l3)',
      background: 'var(--dsw-alias-bg-layer-1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
    },
  },
    // Title row
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
        React.createElement('span', {
          style: { width: 6, height: 6, borderRadius: RADIUS.round, background: dotColor, display: 'inline-block' },
        }),
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: 650, color: 'var(--dsw-alias-label-primary)' },
        }, title),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
        extraAction,
        React.createElement('span', {
          style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', fontFamily: FONT_MONO, fontWeight: 600 },
        }, hideDegraded && degradedCount > 0 ? `${validCount}/${currentNodes.length}` : currentNodes.length),
      ),
    ),
    // Primary Category Sub-tabs Segmented Control
    subTabs && subTabs.length > 1 && React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, transparent)',
        padding: 2,
        borderRadius: RADIUS.control,
        border: '1px solid var(--dsw-alias-border-l3)',
        gap: 2,
      },
    },
      subTabs.map(tab => {
        const isCurrent = (activeSubTab || 'all') === tab.id
        return React.createElement('button', {
          key: tab.id,
          onClick: () => onSubTabChange && onSubTabChange(tab.id),
          style: {
            flex: 1,
            background: isCurrent ? 'var(--dsw-alias-bg-layer-1)' : 'transparent',
            border: isCurrent ? '1px solid var(--dsw-alias-border-l2)' : '1px solid transparent',
            boxShadow: isCurrent ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            borderRadius: RADIUS.badge,
            padding: '2.5px 6px',
            fontSize: 11,
            fontFamily: FONT_SANS,
            color: isCurrent ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
            fontWeight: isCurrent ? 650 : 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            transition: 'all 120ms ease',
            whiteSpace: 'nowrap',
          },
        },
          tab.icon && React.createElement('span', { style: { fontSize: 10.5 } }, tab.icon),
          React.createElement('span', null, tab.label),
          React.createElement('span', {
            style: {
              fontSize: 9.5,
              fontFamily: FONT_MONO,
              padding: '0.5px 4px',
              borderRadius: RADIUS.badge,
              background: isCurrent ? 'var(--dsw-alias-bg-layer-2)' : 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 50%, transparent)',
              color: isCurrent ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-tertiary)',
              fontWeight: 600,
            },
          }, tab.count),
        )
      })
    ),
    // Status Filter row
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 3.5,
        overflowX: 'auto',
      },
    },
      filterTabs.map(tab => {
        const isCurrent = activeFilter === tab.id
        if (tab.count === 0 && tab.id !== 'all') return null
        return React.createElement('button', {
          key: tab.id,
          onClick: () => onFilterChange(tab.id),
          style: {
            background: isCurrent ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
            border: isCurrent ? '1px solid var(--dsw-alias-border-l2)' : '1px solid transparent',
            borderRadius: RADIUS.control,
            padding: '2px 7px',
            fontSize: 11,
            color: isCurrent ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
            fontWeight: isCurrent ? 600 : 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 120ms ease',
            whiteSpace: 'nowrap',
          },
        },
          React.createElement('span', null, tab.label),
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontFamily: FONT_MONO,
              opacity: isCurrent ? 0.9 : 0.65,
              fontWeight: 600,
            },
          }, tab.count),
        )
      })
    )
  )
}

function WorkspaceThreadBar({ activeNode, allNodes, onSetFocus, onSendMessage, isBusy, busyTarget, elapsedSec }) {
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    const text = inputText.trim()
    if (!text || isBusy) return
    if (onSendMessage) {
      onSendMessage(activeNode ? activeNode.id : null, text)
    }
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickTemplates = activeNode
    ? [
        { label: '🔍 瓶颈归因', prompt: `请对 [${activeNode.id}] 进行瓶颈归因分析，寻找关键致错样本。` },
        { label: '🧪 消融对比', prompt: `针对 [${activeNode.id}] 提出一组严谨的控制变量消融实验。` },
        { label: '📝 更新状态', prompt: `请更新 [${activeNode.id}] 的状态并记录本次研讨结论。` },
      ]
    : [
        { label: '🔄 同步进展', prompt: '/import-sync' },
        { label: '🧭 盘点现状', prompt: '/load-research' },
        { label: '🚀 初始化研究', prompt: '/start-research' },
        { label: '📋 总结进展', prompt: '请盘点当前所有卡片与实验进展，给出下一步推荐动作。' },
      ]

  return React.createElement('div', {
    style: {
      flexShrink: 0,
      background: 'var(--dsw-alias-bg-layer-1)',
      borderTop: '1px solid var(--dsw-alias-border-l3)',
      padding: '7px 18px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5.5,
      zIndex: 6,
      userSelect: 'none',
      fontFamily: FONT_SANS,
    },
  },
    // Top indicator and context bar
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 6,
      },
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 7 },
      },
        activeNode
          ? React.createElement('div', {
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5.5,
                background: '#c15f3e16',
                border: '1px solid #c15f3e45',
                borderRadius: RADIUS.badge,
                padding: '2.5px 8px',
                fontSize: 11.5,
                color: '#c15f3e',
                fontFamily: FONT_MONO,
                fontWeight: 600,
              },
            },
              React.createElement('span', null, '🎯 聚焦研讨:'),
              React.createElement('span', { style: { fontWeight: 700 } }, `[${activeNode.kind}] ${activeNode.id}`),
              React.createElement('span', {
                style: {
                  maxWidth: 240,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 400,
                  color: 'var(--dsw-alias-label-primary)',
                  fontFamily: FONT_SANS,
                },
              }, activeNode.title),
              React.createElement('button', {
                onClick: () => onSetFocus && onSetFocus(null),
                style: {
                  background: 'transparent',
                  border: 'none',
                  color: '#c15f3e',
                  cursor: 'pointer',
                  padding: '0 2px',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                },
                title: '清除焦点，回到全局讨论',
              }, '✕'),
            )
          : React.createElement('div', {
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11.5,
                color: 'var(--dsw-alias-label-secondary)',
              },
            },
              React.createElement('span', null, '🌐 全局科研主线'),
              React.createElement('span', {
                style: { color: 'var(--dsw-alias-label-tertiary)', fontSize: 11 },
              }, '(点击任意卡片上的"设为主对话焦点"可绑定特定卡片研讨)'),
            ),
        isBusy && React.createElement('div', {
          className: 'dsh-pulse-pill',
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: '#c15f3e16',
            border: '1px solid #c15f3e45',
            borderRadius: RADIUS.badge,
            padding: '2px 8px',
            fontSize: 11,
            color: '#c15f3e',
            fontFamily: FONT_SANS,
            fontWeight: 600,
            marginLeft: 4,
          },
        },
          React.createElement('span', { className: 'dsh-typing-dot', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-2', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-3', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-shimmer-text', style: { marginLeft: 2 } },
            busyTarget === 'sync'
              ? '正在同步新进展...'
              : (busyTarget && busyTarget !== 'global' ? `正在针对 [${busyTarget}] 研讨...` : 'Agent 正在思考...')
          ),
          elapsedSec > 0 && React.createElement('span', {
            style: {
              fontSize: 10,
              fontFamily: FONT_MONO,
              color: 'var(--dsw-alias-label-secondary)',
            },
          }, `${elapsedSec}s`),
        ),
      ),
      // Quick templates
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 5 },
      },
        quickTemplates.map(tmpl => React.createElement('button', {
          key: tmpl.label,
          onClick: () => setInputText(tmpl.prompt),
          style: {
            background: 'var(--dsw-alias-bg-layer-2)',
            border: '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '2px 7px',
            fontSize: 11,
            color: 'var(--dsw-alias-label-secondary)',
            cursor: 'pointer',
            transition: 'all 120ms ease',
          },
          title: `点击填入: "${tmpl.prompt}"`,
        }, tmpl.label)),
      ),
    ),
    // Input row
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      },
    },
      React.createElement('input', {
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: isBusy
          ? 'Agent 正在思考处理中，可继续输入追加指令... (Enter 发送)'
          : (activeNode
              ? `对 [${activeNode.id}] 发起研讨、消融建议或分析需求... (Enter 发送)`
              : '输入科研指令、全局提问或探讨研究方向... (Enter 发送)'),
        style: {
          flex: 1,
          height: 32,
          padding: '0 10px',
          borderRadius: RADIUS.control,
          border: '1px solid var(--dsw-alias-border-l2)',
          background: 'var(--dsw-alias-bg-layer-2)',
          color: 'var(--dsw-alias-label-primary)',
          fontSize: 12.5,
          fontFamily: FONT_SANS,
          outline: 'none',
        },
      }),
      React.createElement('button', {
        onClick: handleSend,
        disabled: isBusy || !inputText.trim(),
        style: {
          height: 32,
          background: isBusy
            ? '#c15f3e1c'
            : (inputText.trim() ? '#c15f3e' : 'var(--dsw-alias-bg-layer-2)'),
          color: isBusy
            ? '#c15f3e'
            : (inputText.trim() ? '#fff' : 'var(--dsw-alias-label-tertiary)'),
          border: isBusy
            ? '1px solid #c15f3e55'
            : (inputText.trim() ? '1px solid #c15f3e' : '1px solid var(--dsw-alias-border-l3)'),
          borderRadius: RADIUS.control,
          padding: '0 14px',
          fontSize: 12,
          fontWeight: 650,
          cursor: isBusy ? 'wait' : (inputText.trim() ? 'pointer' : 'not-allowed'),
          transition: 'all 120ms ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5.5,
        },
      },
        isBusy && React.createElement('span', { className: 'dsh-spin', style: { fontSize: 11 } }, '⏳'),
        React.createElement('span', null, isBusy ? `思考中${elapsedSec > 0 ? ` (${elapsedSec}s)` : '...'}` : '发送'),
      ),
    ),
  )
}

// ==========================================
// Scientific Vector SVG Charting Engine
// ==========================================

function generateGroupedBarSvg({ title = '核心指标对比柱状图', nodes = [], metricKeys = ['ppv', 'sensitivity'], width = 640, height = 320 }) {
  const padLeft = 58, padRight = 36, padTop = 46, padBottom = 55
  const plotW = width - padLeft - padRight
  const plotH = height - padTop - padBottom
  const colors = ['#c15f3e', '#5c8a77', '#5a82a6', '#b07f43', '#8b6fb5', '#d48806']

  const data = nodes.map(n => {
    const vals = {}
    metricKeys.forEach(k => {
      let v = n.metrics?.[k]
      if (typeof v === 'string') v = parseFloat(v)
      vals[k] = (typeof v === 'number' && !isNaN(v)) ? v : 0
    })
    return { id: n.id, title: n.title, vals }
  })

  const maxVal = Math.max(...data.flatMap(d => metricKeys.map(k => d.vals[k] || 0)), 0.01)
  const ceiling = maxVal <= 1 ? 1 : Math.ceil(maxVal * 1.15)

  const groupCount = data.length || 1
  const groupWidth = plotW / groupCount
  const barWidth = Math.min(26, (groupWidth * 0.74) / (metricKeys.length || 1))

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`
  
  // Title
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`
  
  // Legend
  metricKeys.forEach((k, i) => {
    const lx = width - padRight - (metricKeys.length - i) * 88
    const color = colors[i % colors.length]
    svg += `<rect x="${lx}" y="17" width="10" height="10" rx="2" fill="${color}" />`
    svg += `<text x="${lx + 14}" y="26" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="500">${k.toUpperCase()}</text>`
  })

  // Grid lines & Y ticks
  const ticks = [0, 0.25, 0.5, 0.75, 1.0].map(r => r * ceiling)
  ticks.forEach(t => {
    const y = padTop + plotH - (t / ceiling) * plotH
    svg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + plotW}" y2="${y}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`
    svg += `<text x="${padLeft - 8}" y="${y + 4}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="end" font-family="monospace">${ceiling <= 1 ? (t * 100).toFixed(0) + '%' : t.toFixed(1)}</text>`
  })

  // Bars
  data.forEach((d, gIdx) => {
    const gx = padLeft + gIdx * groupWidth + (groupWidth - metricKeys.length * barWidth) / 2
    metricKeys.forEach((k, mIdx) => {
      const val = d.vals[k]
      const barH = (val / ceiling) * plotH
      const bx = gx + mIdx * barWidth
      const by = padTop + plotH - barH
      const color = colors[mIdx % colors.length]
      
      svg += `<rect x="${bx}" y="${by}" width="${barWidth - 3}" height="${Math.max(1, barH)}" rx="3" fill="${color}" opacity="0.92" />`
      if (barH > 14) {
        svg += `<text x="${bx + (barWidth - 3) / 2}" y="${by - 4}" fill="var(--dsw-alias-label-primary, #c5c2b9)" font-size="9.5" font-weight="600" text-anchor="middle" font-family="monospace">${ceiling <= 1 ? (val * 100).toFixed(1) + '%' : val}</text>`
      }
    })

    const labelX = padLeft + gIdx * groupWidth + groupWidth / 2
    svg += `<text x="${labelX}" y="${padTop + plotH + 18}" fill="var(--dsw-alias-label-primary, #c5c2b9)" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${d.id}</text>`
    svg += `<text x="${labelX}" y="${padTop + plotH + 32}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="9.5" text-anchor="middle">${(d.title || '').slice(0, 10)}</text>`
  })

  // X Axis
  svg += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`
  svg += `</svg>`
  return svg
}

function generateParetoScatterSvg({ title = 'Pareto 权衡前沿散点图', nodes = [], xKey = 'sensitivity', yKey = 'ppv', width = 640, height = 320 }) {
  const padLeft = 60, padRight = 45, padTop = 45, padBottom = 50
  const plotW = width - padLeft - padRight
  const plotH = height - padTop - padBottom

  const points = nodes.map(n => {
    let xv = n.metrics?.[xKey]
    let yv = n.metrics?.[yKey]
    if (typeof xv === 'string') xv = parseFloat(xv)
    if (typeof yv === 'string') yv = parseFloat(yv)
    return {
      id: n.id,
      title: n.title,
      x: typeof xv === 'number' && !isNaN(xv) ? xv : 0,
      y: typeof yv === 'number' && !isNaN(yv) ? yv : 0,
    }
  }).filter(p => p.x > 0 || p.y > 0)

  // Axes limits
  const maxX = Math.max(...points.map(p => p.x), 1)
  const maxY = Math.max(...points.map(p => p.y), 1)
  const ceilingX = maxX <= 1 ? 1 : Math.ceil(maxX * 1.1)
  const ceilingY = maxY <= 1 ? 1 : Math.ceil(maxY * 1.1)
  const minX = ceilingX <= 1 ? Math.max(0, Math.floor(Math.min(...points.map(p => p.x), 0.7) * 10) / 10) : 0
  const minY = ceilingY <= 1 ? Math.max(0, Math.floor(Math.min(...points.map(p => p.y), 0.7) * 10) / 10) : 0

  // Identify Pareto optimal frontier points
  const sortedByX = [...points].sort((a, b) => b.x - a.x)
  const paretoPoints = []
  let maxSeenY = -Infinity
  for (const pt of sortedByX) {
    if (pt.y >= maxSeenY) {
      paretoPoints.push(pt)
      maxSeenY = pt.y
    }
  }
  paretoPoints.sort((a, b) => a.x - b.x)
  const paretoSet = new Set(paretoPoints.map(p => p.id))

  const scaleX = (val) => padLeft + ((val - minX) / (ceilingX - minX || 1)) * plotW
  const scaleY = (val) => padTop + plotH - ((val - minY) / (ceilingY - minY || 1)) * plotH

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`

  // Title
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`

  // Legend
  const lx = width - 240
  svg += `<line x1="${lx}" y1="21" x2="${lx + 20}" y2="21" stroke="#c15f3e" stroke-width="2" stroke-dasharray="4 2" />`
  svg += `<circle cx="${lx + 10}" cy="21" r="3.5" fill="#c15f3e" />`
  svg += `<text x="${lx + 26}" y="25" fill="#c15f3e" font-size="11" font-weight="600">Pareto 最优前沿</text>`

  svg += `<circle cx="${lx + 145}" cy="21" r="3.5" fill="#5c8a77" />`
  svg += `<text x="${lx + 153}" y="25" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11">其他候选</text>`

  // Grid
  const xTicks = [0, 0.33, 0.66, 1].map(r => minX + r * (ceilingX - minX))
  const yTicks = [0, 0.33, 0.66, 1].map(r => minY + r * (ceilingY - minY))

  yTicks.forEach(t => {
    const y = scaleY(t)
    svg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + plotW}" y2="${y}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`
    svg += `<text x="${padLeft - 8}" y="${y + 4}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="end" font-family="monospace">${ceilingY <= 1 ? (t * 100).toFixed(0) + '%' : t.toFixed(1)}</text>`
  })

  xTicks.forEach(t => {
    const x = scaleX(t)
    svg += `<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`
    svg += `<text x="${x}" y="${padTop + plotH + 16}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="middle" font-family="monospace">${ceilingX <= 1 ? (t * 100).toFixed(0) + '%' : t.toFixed(1)}</text>`
  })

  // Axis Labels
  svg += `<text x="${padLeft + plotW / 2}" y="${height - 10}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="600" text-anchor="middle">${xKey.toUpperCase()} (横轴)</text>`
  svg += `<text x="18" y="${padTop + plotH / 2}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="600" text-anchor="middle" transform="rotate(-90 18 ${padTop + plotH / 2})">${yKey.toUpperCase()} (纵轴)</text>`

  // Pareto Frontier Curve
  if (paretoPoints.length > 1) {
    const pathD = paretoPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ')
    svg += `<path d="${pathD}" fill="none" stroke="#c15f3e" stroke-width="2.2" stroke-dasharray="5 3" />`
  }

  // Points
  points.forEach(p => {
    const px = scaleX(p.x)
    const py = scaleY(p.y)
    const isPareto = paretoSet.has(p.id)
    const color = isPareto ? '#c15f3e' : '#5c8a77'
    const radius = isPareto ? 6 : 4.5

    svg += `<circle cx="${px}" cy="${py}" r="${radius}" fill="${color}" stroke="#ffffff" stroke-width="${isPareto ? 1.5 : 1}" />`
    svg += `<text x="${px}" y="${py - 9}" fill="${isPareto ? '#f19b80' : '#88c7af'}" font-size="10.5" font-weight="700" text-anchor="middle" font-family="monospace">${p.id}</text>`
  })

  // Axes lines
  svg += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`
  svg += `<line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`

  svg += `</svg>`
  return svg
}

function generateRadarSvg({ title = '多维综合画像雷达图', nodes = [], metricKeys = ['ppv', 'sensitivity', 'specificity', 'auc'], width = 640, height = 320 }) {
  const cx = 210, cy = 165, radius = 105
  const colors = ['#c15f3e', '#5c8a77', '#5a82a6', '#b07f43', '#8b6fb5']
  const nSides = metricKeys.length || 3

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`

  // Concentric Web
  ;[0.25, 0.5, 0.75, 1.0].forEach(level => {
    const r = radius * level
    const pts = []
    for (let i = 0; i < nSides; i++) {
      const angle = (Math.PI * 2 * i) / nSides - Math.PI / 2
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`)
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-width="1" />`
    svg += `<text x="${cx + 4}" y="${(cy - r + 10).toFixed(1)}" fill="var(--dsw-alias-label-secondary, #605d56)" font-size="8.5" font-family="monospace">${(level * 100).toFixed(0)}%</text>`
  })

  // Spokes & Axis Labels
  metricKeys.forEach((k, i) => {
    const angle = (Math.PI * 2 * i) / nSides - Math.PI / 2
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--dsw-alias-border-l3, #35332e)" stroke-dasharray="2 2" />`

    const labelR = radius + 22
    const lx = cx + labelR * Math.cos(angle)
    const ly = cy + labelR * Math.sin(angle)
    const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : (Math.cos(angle) > 0 ? 'start' : 'end')
    svg += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="10.5" font-weight="600" text-anchor="${anchor}">${k.toUpperCase()}</text>`
  })

  // Model Polygons
  nodes.forEach((n, idx) => {
    const color = colors[idx % colors.length]
    const polyPts = []
    metricKeys.forEach((k, i) => {
      let v = n.metrics?.[k]
      if (typeof v === 'string') v = parseFloat(v)
      const norm = Math.min(1, Math.max(0, (typeof v === 'number' && !isNaN(v)) ? v : 0))
      const r = radius * norm
      const angle = (Math.PI * 2 * i) / nSides - Math.PI / 2
      polyPts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`)
    })

    svg += `<polygon points="${polyPts.join(' ')}" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="2" />`
    polyPts.forEach(pt => {
      const [px, py] = pt.split(',')
      svg += `<circle cx="${px}" cy="${py}" r="3" fill="${color}" stroke="#ffffff" stroke-width="1" />`
    })
  })

  // Legend on right side
  const legX = 420
  let legY = 62
  nodes.forEach((n, idx) => {
    const color = colors[idx % colors.length]
    svg += `<rect x="${legX}" y="${legY}" width="12" height="12" rx="3" fill="${color}" />`
    svg += `<text x="${legX + 18}" y="${legY + 10}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="11.5" font-weight="650" font-family="monospace">${n.id}</text>`
    svg += `<text x="${legX + 18}" y="${legY + 24}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10">${(n.title || '').slice(0, 18)}</text>`
    legY += 40
  })

  svg += `</svg>`
  return svg
}

function generateSlicesDonutSvg({ title = '队列切片分布环形图', slices = {}, width = 640, height = 320 }) {
  const cx = 185, cy = 165, rOut = 95, rIn = 55
  const colors = ['#5c8a77', '#c15f3e', '#5a82a6', '#b07f43', '#8b6fb5', '#d48806']

  const entries = Object.entries(slices).map(([name, count]) => {
    const c = typeof count === 'number' ? count : (parseInt(count) || 0)
    return { name, count: c }
  }).filter(e => e.count > 0)

  const total = entries.reduce((acc, e) => acc + e.count, 0) || 1

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`

  let currentAngle = -Math.PI / 2
  entries.forEach((e, idx) => {
    const sliceAngle = (e.count / total) * Math.PI * 2
    const endAngle = currentAngle + sliceAngle
    const color = colors[idx % colors.length]

    const x1Out = cx + rOut * Math.cos(currentAngle)
    const y1Out = cy + rOut * Math.sin(currentAngle)
    const x2Out = cx + rOut * Math.cos(endAngle)
    const y2Out = cy + rOut * Math.sin(endAngle)

    const x1In = cx + rIn * Math.cos(endAngle)
    const y1In = cy + rIn * Math.sin(endAngle)
    const x2In = cx + rIn * Math.cos(currentAngle)
    const y2In = cy + rIn * Math.sin(currentAngle)

    const largeArc = sliceAngle > Math.PI ? 1 : 0
    const d = `M ${x1Out.toFixed(1)} ${y1Out.toFixed(1)} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2Out.toFixed(1)} ${y2Out.toFixed(1)} L ${x1In.toFixed(1)} ${y1In.toFixed(1)} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x2In.toFixed(1)} ${y2In.toFixed(1)} Z`

    svg += `<path d="${d}" fill="${color}" stroke="var(--dsw-alias-bg-base, #1c1b18)" stroke-width="2" />`
    currentAngle = endAngle
  })

  // Center total
  svg += `<text x="${cx}" y="${cy - 3}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="18" font-weight="700" text-anchor="middle" font-family="monospace">${total.toLocaleString()}</text>`
  svg += `<text x="${cx}" y="${cy + 15}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10" text-anchor="middle">TOTAL N</text>`

  // Right side legend
  const legX = 350
  let legY = 62
  entries.forEach((e, idx) => {
    const color = colors[idx % colors.length]
    const pct = ((e.count / total) * 100).toFixed(1)
    svg += `<rect x="${legX}" y="${legY}" width="12" height="12" rx="3" fill="${color}" />`
    svg += `<text x="${legX + 18}" y="${legY + 10}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="11.5" font-weight="650">${e.name}</text>`
    svg += `<text x="${legX + 18}" y="${legY + 24}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10" font-family="monospace">${e.count.toLocaleString()} (${pct}%)</text>`
    legY += 36
  })

  svg += `</svg>`
  return svg
}

// ==========================================
// Data Charting & AI Suggestions Modal
// ==========================================

function DataChartingModal({
  isOpen,
  onClose,
  allNodes = [],
  initialSelectedIds = [],
  onSaveChart,
  onAskAiDeepPlot,
}) {
  if (!isOpen) return null

  const plottableNodes = useMemo(() => {
    return (allNodes || []).filter(n =>
      n.kind === 'experiment' ||
      n.kind === 'dataset' ||
      (n.metrics && Object.keys(n.metrics).length > 0) ||
      (n.slices && Object.keys(n.slices).length > 0)
    )
  }, [allNodes])

  const [selectedIds, setSelectedIds] = useState(() => {
    if (initialSelectedIds && initialSelectedIds.length > 0) {
      return new Set(initialSelectedIds)
    }
    const exps = plottableNodes.filter(n => n.kind === 'experiment').map(n => n.id)
    if (exps.length > 0) {
      return new Set(exps.slice(0, 4))
    }
    return new Set(plottableNodes.slice(0, 3).map(n => n.id))
  })

  const selectedNodes = useMemo(() => {
    return plottableNodes.filter(n => selectedIds.has(n.id))
  }, [plottableNodes, selectedIds])

  const availableMetrics = useMemo(() => {
    const keys = new Set()
    selectedNodes.forEach(n => {
      if (n.metrics) {
        Object.keys(n.metrics).forEach(k => {
          const v = n.metrics[k]
          if (typeof v === 'number' || (!isNaN(parseFloat(v)) && isFinite(v))) {
            keys.add(k)
          }
        })
      }
    })
    return Array.from(keys)
  }, [selectedNodes])

  const hasSlices = useMemo(() => {
    return selectedNodes.some(n => n.slices && Object.keys(n.slices).length > 0)
  }, [selectedNodes])

  const aggregatedSlices = useMemo(() => {
    const agg = {}
    selectedNodes.forEach(n => {
      if (n.slices) {
        Object.entries(n.slices).forEach(([k, v]) => {
          const num = typeof v === 'number' ? v : (parseInt(v) || 0)
          agg[k] = (agg[k] || 0) + num
        })
      }
    })
    return agg
  }, [selectedNodes])

  const aiAnalysis = useMemo(() => {
    const expCount = selectedNodes.filter(n => n.kind === 'experiment' || n.metrics).length
    const hasSensitivity = availableMetrics.some(m => /(sens|recall)/i.test(m))
    const hasPPV = availableMetrics.some(m => /(ppv|precision)/i.test(m))
    const hasMultipleMetrics = availableMetrics.length >= 3

    if (hasSlices && expCount === 0) {
      return {
        recommendedType: 'donut',
        title: '队列样本切片分布分析',
        name: '切片分布环形图',
        rationale: '检测到队列切片分布数据。环形分布图可清晰展现各子集（训练集、验证集、盲测集、高危切片）的样本占比与长尾特征。',
      }
    }
    if (expCount >= 2 && hasSensitivity && hasPPV) {
      return {
        recommendedType: 'pareto',
        title: '模型性能 Pareto 权衡前沿分析',
        name: 'Pareto 权衡散点图',
        rationale: '检测到 2 个以上对比实验包含查准率（PPV）与召回率（Sensitivity）指标对。Pareto 散点图可精准描绘效率前沿曲线，定位帕累托最优模型。',
      }
    }
    if (hasMultipleMetrics && expCount >= 2) {
      return {
        recommendedType: 'radar',
        title: '多模型综合画像多维雷达图',
        name: '多维画像雷达图',
        rationale: `检测到 ${availableMetrics.length} 个维度的评估指标。雷达图适合综合评价不同方案的均衡度，杜绝单一指标偏颇，暴露短板。`,
      }
    }
    return {
      recommendedType: 'bar',
      title: '实验核心指标横向对比柱状图',
      name: '分组指标柱状图',
      rationale: '分组对比柱状图能清晰直观地对比各方案在选定核心指标上的绝对数值与升降幅度，适合清晰严谨的横向汇报。',
    }
  }, [selectedNodes, availableMetrics, hasSlices])

  const [chartType, setChartType] = useState('pareto')

  useEffect(() => {
    if (aiAnalysis.recommendedType) {
      setChartType(aiAnalysis.recommendedType)
    }
  }, [aiAnalysis.recommendedType])

  const [selectedMetrics, setSelectedMetrics] = useState([])
  useEffect(() => {
    if (availableMetrics.length > 0) {
      setSelectedMetrics(availableMetrics.slice(0, 4))
    }
  }, [availableMetrics.join(',')])

  const [xMetric, setXMetric] = useState('sensitivity')
  const [yMetric, setYMetric] = useState('ppv')

  useEffect(() => {
    const sensKey = availableMetrics.find(m => /(sens|recall)/i.test(m)) || availableMetrics[0] || 'sensitivity'
    const ppvKey = availableMetrics.find(m => /(ppv|precision)/i.test(m)) || availableMetrics[1] || availableMetrics[0] || 'ppv'
    setXMetric(sensKey)
    setYMetric(ppvKey)
  }, [availableMetrics.join(',')])

  const [customTitle, setCustomTitle] = useState('')
  const displayTitle = customTitle || aiAnalysis.title

  const generatedSvg = useMemo(() => {
    if (selectedNodes.length === 0) return ''
    if (chartType === 'bar') {
      const keys = selectedMetrics.length > 0 ? selectedMetrics : availableMetrics.slice(0, 2)
      return generateGroupedBarSvg({ title: displayTitle, nodes: selectedNodes, metricKeys: keys })
    }
    if (chartType === 'pareto') {
      return generateParetoScatterSvg({ title: displayTitle, nodes: selectedNodes, xKey: xMetric, yKey: yMetric })
    }
    if (chartType === 'radar') {
      const keys = selectedMetrics.length >= 3 ? selectedMetrics : (availableMetrics.length >= 3 ? availableMetrics.slice(0, 5) : ['dim1', 'dim2', 'dim3'])
      return generateRadarSvg({ title: displayTitle, nodes: selectedNodes, metricKeys: keys })
    }
    if (chartType === 'donut') {
      return generateSlicesDonutSvg({ title: displayTitle, slices: aggregatedSlices })
    }
    return ''
  }, [chartType, selectedNodes, selectedMetrics, availableMetrics, xMetric, yMetric, displayTitle, aggregatedSlices])

  const toggleNodeSelection = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectAllExps = () => {
    const ids = plottableNodes.filter(n => n.kind === 'experiment').map(n => n.id)
    setSelectedIds(new Set(ids))
  }

  const handleClearAll = () => {
    setSelectedIds(new Set())
  }

  const handleSaveToMiddleColumn = () => {
    if (!generatedSvg) return
    const chartTypeName = {
      pareto: 'Pareto 权衡散点图',
      bar: '分组指标柱状图',
      radar: '多维画像雷达图',
      donut: '队列切片环形图',
    }[chartType] || '科研图表'

    const metricsSummary = chartType === 'pareto'
      ? `- **X 轴 (${xMetric})** 与 **Y 轴 (${yMetric})** 权衡\n` + selectedNodes.map(n => `  - **${n.id}** (${n.title}): ${xMetric}=${n.metrics?.[xMetric] ?? '-'}, ${yMetric}=${n.metrics?.[yMetric] ?? '-'}`).join('\n')
      : (chartType === 'donut'
        ? Object.entries(aggregatedSlices).map(([k, v]) => `  - **${k}**: ${v}`).join('\n')
        : selectedNodes.map(n => `  - **${n.id}** (${n.title}): ` + Object.entries(n.metrics || {}).map(([k, v]) => `${k}=${v}`).join(', ')).join('\n'))

    const detailText = `### ${displayTitle}

**图表类型**: ${chartTypeName}
**关联实体**: ${selectedNodes.map(n => n.id).join(', ')}

**AI 研判分析**:
${aiAnalysis.rationale}

**数据摘要**:
${metricsSummary}
`

    const newChartNode = {
      id: `fig-${Date.now().toString().slice(-6)}`,
      kind: 'artifact',
      title: displayTitle,
      summary: `${chartTypeName}: 基于 ${selectedNodes.map(n => n.id).join(', ')} 绘制的科研可视化图表。`,
      detail: detailText,
      fileType: 'image',
      tags: ['chart', chartType, ...selectedNodes.map(n => n.id.toLowerCase())],
      sandboxPath: `figures/plot_${chartType}_${Date.now().toString().slice(-6)}.svg`,
      content: generatedSvg,
      preview: generatedSvg,
      staged: true,
      dataProvenance: selectedNodes.map(n => n.id),
      thread: [],
    }

    const newEdges = selectedNodes.map(src => ({
      id: `edge-${src.id}-${newChartNode.id}`,
      source: src.id,
      target: newChartNode.id,
      label: '可视化',
    }))

    onSaveChart(newChartNode, newEdges)
  }

  const handleAskAiDeep = () => {
    const chartTypeName = {
      pareto: 'Pareto 权衡散点图',
      bar: '分组指标对比柱状图',
      radar: '多维画像雷达图',
      donut: '队列切片环形图',
    }[chartType] || '科研图表'

    const nodesStr = selectedNodes.map(n => `[${n.id}] ${n.title}`).join('、')
    const metricsStr = (chartType === 'pareto' ? [xMetric, yMetric] : selectedMetrics).join(', ')
    const prompt = `请针对选定的实体 ${nodesStr} 绘制论文级科研高清图表（推荐图表类型：${chartTypeName}，核心评估维度：${metricsStr}）。请在 figures/ 目录生成对应的 Python (Matplotlib/Seaborn) 绘图脚本与矢量图，并给出严密的定量对比分析与消融结论。`

    onAskAiDeepPlot(prompt)
  }

  const chartOptions = [
    {
      id: 'pareto',
      icon: '📈',
      name: 'Pareto 权衡散点图',
      desc: '展示模型在两个对立指标间的权衡前沿与帕累托最优解',
      disabled: availableMetrics.length < 2 || selectedNodes.length < 1,
    },
    {
      id: 'bar',
      icon: '📊',
      name: '分组指标柱状图',
      desc: '横向对比多个实验在选定指标上的绝对数值与阶跃差异',
      disabled: availableMetrics.length < 1 || selectedNodes.length < 1,
    },
    {
      id: 'radar',
      icon: '🕸️',
      name: '多维画像雷达图',
      desc: '3 维以上指标综合均衡度刻画，暴露短板与综合优势',
      disabled: availableMetrics.length < 3 || selectedNodes.length < 1,
    },
    {
      id: 'donut',
      icon: '🍰',
      name: '队列切片环形图',
      desc: '样本切片、分期、数据集拆分占比与样本量分布',
      disabled: !hasSlices,
    },
  ]

  return React.createElement('div', {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(3px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_SANS,
    },
  },
    React.createElement('div', {
      onClick: (e) => e.stopPropagation(),
      style: {
        background: 'var(--dsw-alias-bg-layer-1)',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: RADIUS.pane,
        width: 780,
        maxWidth: '92vw',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--dsw-shadow-lv3, 0 12px 36px rgba(0,0,0,0.45))',
      },
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '14px 20px',
          borderBottom: '1px solid var(--dsw-alias-border-l3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--dsw-alias-bg-layer-1)',
        },
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--dsw-alias-label-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            },
          },
            React.createElement('span', null, '📈'),
            React.createElement('span', null, '数据画图与多维分析'),
          ),
          React.createElement('div', {
            style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', marginTop: 2 },
          }, '从选定实验指标或数据切片即时生成科研矢量图并保存至中间栏，或发起 AI 深度科研绘图'),
        ),
        React.createElement('button', {
          onClick: onClose,
          style: {
            background: 'transparent',
            border: 'none',
            fontSize: 16,
            color: 'var(--dsw-alias-label-tertiary)',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          },
        }, '✕'),
      ),
      // Body
      React.createElement('div', {
        style: {
          padding: '16px 20px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        },
      },
        // Step 1: Select Plottable Entities
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            },
          },
            React.createElement('div', {
              style: { fontSize: 12, fontWeight: 700, color: 'var(--dsw-alias-label-primary)', letterSpacing: '.02em' },
            }, `1. 选择待绘图实体 (${selectedIds.size}/${plottableNodes.length})`),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              React.createElement('button', {
                onClick: handleSelectAllExps,
                style: {
                  background: 'var(--dsw-alias-bg-layer-2)',
                  border: '1px solid var(--dsw-alias-border-l3)',
                  borderRadius: RADIUS.badge,
                  padding: '2px 8px',
                  fontSize: 10.5,
                  color: 'var(--dsw-alias-label-secondary)',
                  cursor: 'pointer',
                },
              }, '全选实验'),
              React.createElement('button', {
                onClick: handleClearAll,
                style: {
                  background: 'var(--dsw-alias-bg-layer-2)',
                  border: '1px solid var(--dsw-alias-border-l3)',
                  borderRadius: RADIUS.badge,
                  padding: '2px 8px',
                  fontSize: 10.5,
                  color: 'var(--dsw-alias-label-secondary)',
                  cursor: 'pointer',
                },
              }, '清空选择'),
            ),
          ),
          React.createElement('div', {
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              maxHeight: 110,
              overflowY: 'auto',
              padding: '4px 0',
            },
          },
            plottableNodes.map(node => {
              const isSelected = selectedIds.has(node.id)
              const icon = node.kind === 'experiment' ? '🧪' : (node.kind === 'dataset' ? '📊' : '💡')
              return React.createElement('button', {
                key: node.id,
                onClick: () => toggleNodeSelection(node.id),
                style: {
                  background: isSelected ? '#c15f3e16' : 'var(--dsw-alias-bg-layer-2)',
                  border: isSelected ? '1px solid #c15f3e65' : '1px solid var(--dsw-alias-border-l3)',
                  borderRadius: RADIUS.control,
                  padding: '4px 9px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  cursor: 'pointer',
                  color: isSelected ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
                  fontSize: 11.5,
                  fontFamily: FONT_SANS,
                  fontWeight: isSelected ? 650 : 500,
                  transition: 'all 120ms ease',
                },
              },
                React.createElement('span', { style: { fontSize: 11 } }, isSelected ? '✓' : '＋'),
                React.createElement('span', null, icon),
                React.createElement('span', { style: { fontFamily: FONT_MONO, fontWeight: 700 } }, node.id),
                React.createElement('span', { style: { opacity: 0.8, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, node.title),
              )
            })
          ),
        ),

        // Step 2: AI Suggestions & Options
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 12, fontWeight: 700, color: 'var(--dsw-alias-label-primary)', marginBottom: 8, letterSpacing: '.02em' },
          }, '2. AI 研判建议与图表类型选项'),
          // AI Rationale Banner
          React.createElement('div', {
            style: {
              background: '#c15f3e12',
              border: '1px solid #c15f3e40',
              borderRadius: RADIUS.sub,
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              marginBottom: 10,
            },
          },
            React.createElement('span', { style: { fontSize: 16 } }, '✨'),
            React.createElement('div', { style: { flex: 1, fontSize: 12, lineHeight: 1.55 } },
              React.createElement('div', { style: { fontWeight: 650, color: '#c15f3e', marginBottom: 2 } },
                `AI 研判建议: 推荐「${aiAnalysis.name}」`
              ),
              React.createElement('div', { style: { color: 'var(--dsw-alias-label-secondary)' } },
                aiAnalysis.rationale
              ),
            ),
          ),
          // Chart Options Grid
          React.createElement('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 8,
            },
          },
            chartOptions.map(opt => {
              const isAiRec = aiAnalysis.recommendedType === opt.id
              const isSelected = chartType === opt.id
              return React.createElement('div', {
                key: opt.id,
                onClick: () => !opt.disabled && setChartType(opt.id),
                style: {
                  background: isSelected
                    ? 'color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #c15f3e18)'
                    : 'var(--dsw-alias-bg-layer-2)',
                  border: isSelected
                    ? '1.5px solid #c15f3e'
                    : '1px solid var(--dsw-alias-border-l3)',
                  borderRadius: RADIUS.card,
                  padding: '10px 11px',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  opacity: opt.disabled ? 0.45 : 1,
                  transition: 'all 120ms ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                },
              },
                isAiRec && React.createElement('span', {
                  style: {
                    position: 'absolute',
                    top: 6,
                    right: 8,
                    fontSize: 9.5,
                    fontFamily: FONT_SANS,
                    fontWeight: 700,
                    color: '#c15f3e',
                    background: '#c15f3e18',
                    border: '1px solid #c15f3e40',
                    padding: '1px 5px',
                    borderRadius: RADIUS.badge,
                  },
                }, '✨ AI 推荐'),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('span', { style: { fontSize: 14 } }, opt.icon),
                  React.createElement('span', {
                    style: {
                      fontSize: 12,
                      fontWeight: 650,
                      color: isSelected ? '#c15f3e' : 'var(--dsw-alias-label-primary)',
                    },
                  }, opt.name),
                ),
                React.createElement('div', {
                  style: { fontSize: 10.5, color: 'var(--dsw-alias-label-secondary)', lineHeight: 1.4 },
                }, opt.desc),
              )
            })
          ),
        ),

        // Step 3: Dimension & Axis Configuration
        React.createElement('div', {
          style: {
            background: 'var(--dsw-alias-bg-layer-2)',
            borderRadius: RADIUS.sub,
            padding: '10px 14px',
            border: '1px solid var(--dsw-alias-border-l3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 9,
          },
        },
          chartType === 'pareto' && React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
          },
            React.createElement('span', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600 } }, '横轴 (X 维度):'),
            React.createElement('select', {
              value: xMetric,
              onChange: (e) => setXMetric(e.target.value),
              style: {
                background: 'var(--dsw-alias-bg-layer-1)',
                border: '1px solid var(--dsw-alias-border-l2)',
                borderRadius: RADIUS.control,
                padding: '3px 8px',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 11.5,
                fontFamily: FONT_MONO,
                outline: 'none',
              },
            },
              availableMetrics.map(m => React.createElement('option', { key: m, value: m }, m.toUpperCase()))
            ),
            React.createElement('span', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600, marginLeft: 8 } }, '纵轴 (Y 维度):'),
            React.createElement('select', {
              value: yMetric,
              onChange: (e) => setYMetric(e.target.value),
              style: {
                background: 'var(--dsw-alias-bg-layer-1)',
                border: '1px solid var(--dsw-alias-border-l2)',
                borderRadius: RADIUS.control,
                padding: '3px 8px',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 11.5,
                fontFamily: FONT_MONO,
                outline: 'none',
              },
            },
              availableMetrics.map(m => React.createElement('option', { key: m, value: m }, m.toUpperCase()))
            ),
          ),

          (chartType === 'bar' || chartType === 'radar') && React.createElement('div', {
            style: { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
          },
            React.createElement('span', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600 } }, '评估维度:'),
            availableMetrics.map(m => {
              const isChecked = selectedMetrics.includes(m)
              return React.createElement('button', {
                key: m,
                onClick: () => {
                  setSelectedMetrics(prev => isChecked ? prev.filter(x => x !== m) : [...prev, m])
                },
                style: {
                  background: isChecked ? '#c15f3e18' : 'var(--dsw-alias-bg-layer-1)',
                  border: isChecked ? '1px solid #c15f3e60' : '1px solid var(--dsw-alias-border-l3)',
                  color: isChecked ? '#c15f3e' : 'var(--dsw-alias-label-secondary)',
                  borderRadius: RADIUS.badge,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontFamily: FONT_MONO,
                  fontWeight: isChecked ? 650 : 500,
                  cursor: 'pointer',
                },
              }, `${isChecked ? '✓ ' : ''}${m.toUpperCase()}`)
            })
          ),

          // Title Input
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8 },
          },
            React.createElement('span', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600 } }, '图表标题:'),
            React.createElement('input', {
              value: customTitle,
              placeholder: aiAnalysis.title,
              onChange: (e) => setCustomTitle(e.target.value),
              style: {
                flex: 1,
                background: 'var(--dsw-alias-bg-layer-1)',
                border: '1px solid var(--dsw-alias-border-l2)',
                borderRadius: RADIUS.control,
                padding: '4px 10px',
                fontSize: 12,
                color: 'var(--dsw-alias-label-primary)',
                fontFamily: FONT_SANS,
                outline: 'none',
              },
            }),
          ),
        ),

        // Step 4: Live Vector SVG Preview
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 12, fontWeight: 700, color: 'var(--dsw-alias-label-primary)', marginBottom: 8, letterSpacing: '.02em' },
          }, '3. 矢量图表实时预览'),
          React.createElement('div', {
            style: {
              background: 'var(--dsw-alias-bg-base)',
              border: '1px solid var(--dsw-alias-border-l3)',
              borderRadius: RADIUS.sub,
              padding: 12,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 240,
              overflowX: 'auto',
            },
          },
            generatedSvg
              ? React.createElement('div', {
                  style: { width: '100%', display: 'flex', justifyContent: 'center' },
                  dangerouslySetInnerHTML: { __html: generatedSvg },
                })
              : React.createElement('div', {
                  style: { color: 'var(--dsw-alias-label-tertiary)', fontSize: 12 },
                }, '请至少选择 1 个有效数据实体以生成图表预览')
          ),
        ),
      ),

      // Footer
      React.createElement('div', {
        style: {
          padding: '12px 20px',
          borderTop: '1px solid var(--dsw-alias-border-l3)',
          background: 'var(--dsw-alias-bg-layer-1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        },
      },
        React.createElement('button', {
          onClick: handleAskAiDeep,
          disabled: selectedNodes.length === 0,
          style: {
            background: 'var(--dsw-alias-bg-layer-2)',
            border: '1px solid var(--dsw-alias-border-l2)',
            borderRadius: RADIUS.control,
            padding: '6px 14px',
            fontSize: 12,
            color: 'var(--dsw-alias-label-primary)',
            cursor: selectedNodes.length === 0 ? 'not-allowed' : 'pointer',
            opacity: selectedNodes.length === 0 ? 0.5 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontWeight: 550,
            transition: 'all 120ms ease',
          },
          title: '向主对话 Agent 发送需求，编写 Python 绘图代码并输出高分辨率论文图表',
        },
          React.createElement('span', null, '🤖'),
          React.createElement('span', null, '让 AI 深度绘图与分析'),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('button', {
            onClick: onClose,
            style: {
              background: 'transparent',
              border: '1px solid var(--dsw-alias-border-l3)',
              borderRadius: RADIUS.control,
              padding: '6px 14px',
              fontSize: 12,
              color: 'var(--dsw-alias-label-secondary)',
              cursor: 'pointer',
            },
          }, '取消'),
          React.createElement('button', {
            onClick: handleSaveToMiddleColumn,
            disabled: !generatedSvg || selectedNodes.length === 0,
            style: {
              background: (!generatedSvg || selectedNodes.length === 0) ? 'var(--dsw-alias-bg-layer-2)' : '#c15f3e',
              color: (!generatedSvg || selectedNodes.length === 0) ? 'var(--dsw-alias-label-tertiary)' : '#fff',
              border: (!generatedSvg || selectedNodes.length === 0) ? '1px solid var(--dsw-alias-border-l3)' : '1px solid #c15f3e',
              borderRadius: RADIUS.control,
              padding: '6px 16px',
              fontSize: 12,
              fontWeight: 650,
              cursor: (!generatedSvg || selectedNodes.length === 0) ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 120ms ease',
            },
            title: '将当前生成的矢量图表暂存为中间栏产物卡片',
          },
            React.createElement('span', null, '💾'),
            React.createElement('span', null, '保存图表到中间栏'),
          ),
        ),
      ),
    )
  )
}

function ColumnarWorkspace({
  state,
  selectedId,
  expandedIds,
  onSelect,
  connected,
  activeThreadId,
  onSetFocus,
  onSendMessage,
  hideDegraded = false,
  busyState,
  isBusy,
  elapsedSec,
  onOpenChartModal,
}) {
  const allNodes = state.nodes || []
  const edges = state.edges || []

  // Sub-tab selection for each column ('all' or specific kind)
  const [leftSubTab, setLeftSubTab] = useState('all')
  const [middleSubTab, setMiddleSubTab] = useState('all')
  const [rightSubTab, setRightSubTab] = useState('all')

  // Status filters for each column ('all', 'valid', 'active', 'supported', 'degraded')
  const [leftFilter, setLeftFilter] = useState('all')
  const [middleFilter, setMiddleFilter] = useState('all')
  const [rightFilter, setRightFilter] = useState('all')

  // Auto-switch sub-tab when selectedId changes so user sees the focused/selected card
  useEffect(() => {
    if (!selectedId) return
    const node = allNodes.find(n => n.id === selectedId)
    if (!node) return
    if (node.kind === 'question' || node.kind === 'hypothesis') {
      if (leftSubTab !== 'all' && leftSubTab !== node.kind) {
        setLeftSubTab(node.kind)
      }
    } else if (node.kind === 'dataset' || node.kind === 'artifact') {
      const isChart = node.kind === 'artifact' && (
        (node.tags && (node.tags.includes('chart') || node.tags.includes('plot') || node.tags.includes('figure'))) ||
        node.fileType === 'image' ||
        Boolean(node.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(node.sandboxPath)) ||
        Boolean(node.preview && (node.preview.trim().startsWith('<svg') || node.preview.trim().startsWith('data:image'))) ||
        Boolean(node.content && node.content.trim().startsWith('<svg'))
      )
      const targetSub = node.kind === 'dataset' ? 'dataset' : (isChart ? 'chart' : 'artifact')
      if (middleSubTab !== 'all' && middleSubTab !== targetSub) {
        setMiddleSubTab(targetSub)
      }
    } else if (node.kind === 'experiment' || node.kind === 'finding') {
      if (rightSubTab !== 'all' && rightSubTab !== node.kind) {
        setRightSubTab(node.kind)
      }
    }
  }, [selectedId, allNodes])

  const renderCard = (node) => {
    const isThisThinking = isBusy && (busyState?.target === node.id || (!busyState?.target && activeThreadId === node.id))
    return React.createElement(ColumnCard, {
      key: node.id,
      node,
      isSelected: node.id === selectedId,
      isExpanded: expandedIds ? expandedIds.has(node.id) : node.id === selectedId,
      isConnected: selectedId ? connected.has(node.id) : null,
      onSelect,
      connectedEdges: edges,
      allNodes,
      activeThreadId,
      onSetFocus,
      onSendMessage,
      isThinking: isThisThinking,
      elapsedSec,
      onOpenChartModal,
    })
  }

  // 1. Left nodes: question, hypothesis
  const leftNodes = allNodes.filter(n => n.kind === 'question' || n.kind === 'hypothesis')
  leftNodes.sort((a, b) => (a.kind === 'question' ? -1 : 1))
  const qCount = leftNodes.filter(n => n.kind === 'question').length
  const hCount = leftNodes.filter(n => n.kind === 'hypothesis').length
  const leftSubTabs = [
    { id: 'all', label: '全部', count: leftNodes.length },
    { id: 'question', label: '研究问题', count: qCount, icon: '❓' },
    { id: 'hypothesis', label: '理论假设', count: hCount, icon: '🌿' },
  ]

  // 2. Middle nodes: dataset, chart, and artifact
  const isChartNode = (n) => n.kind === 'artifact' && (
    (n.tags && (n.tags.includes('chart') || n.tags.includes('plot') || n.tags.includes('figure'))) ||
    n.fileType === 'image' ||
    Boolean(n.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(n.sandboxPath)) ||
    Boolean(n.preview && (n.preview.trim().startsWith('<svg') || n.preview.trim().startsWith('data:image'))) ||
    Boolean(n.content && n.content.trim().startsWith('<svg'))
  )
  const datasetNodes = allNodes.filter(n => n.kind === 'dataset')
  const chartNodes = allNodes.filter(isChartNode)
  const chartNodeIds = new Set(chartNodes.map(n => n.id))
  const artifactNodes = allNodes.filter(n => n.kind === 'artifact' && !chartNodeIds.has(n.id))
  const middleNodes = [...datasetNodes, ...chartNodes, ...artifactNodes]
  const dCount = datasetNodes.length
  const cCount = chartNodes.length
  const aCount = artifactNodes.length
  const middleSubTabs = [
    { id: 'all', label: '全部', count: middleNodes.length },
    { id: 'dataset', label: '核心数据', count: dCount, icon: '📊' },
    { id: 'chart', label: '图表分析', count: cCount, icon: '📈' },
    { id: 'artifact', label: '产物归档', count: aCount, icon: '📦' },
  ]

  // 3. Right nodes: finding, experiment (and any other unclassified entities)
  const rightNodes = allNodes.filter(n => ['finding', 'experiment'].includes(n.kind) || (!['question', 'hypothesis', 'dataset', 'artifact'].includes(n.kind)))
  rightNodes.sort((a, b) => {
    const order = { experiment: 0, finding: 1 }
    return (order[a.kind] ?? 9) - (order[b.kind] ?? 9)
  })
  const eCount = rightNodes.filter(n => n.kind === 'experiment').length
  const fCount = rightNodes.filter(n => n.kind === 'finding').length
  const rightSubTabs = [
    { id: 'all', label: '全部', count: rightNodes.length },
    { id: 'experiment', label: '实验探索', count: eCount, icon: '🧪' },
    { id: 'finding', label: '实证结论', count: fCount, icon: '💡' },
  ]

  const filterNodes = (nodes, filter) => {
    return nodes.filter(n => {
      const meta = getNodeStatusMeta(n)
      const isDegraded = meta?.group === 'degraded'

      // If global hideDegraded is active, hide degraded unless user explicitly chooses 'degraded' tab or it is selected
      if (hideDegraded && isDegraded && filter !== 'degraded' && n.id !== selectedId) {
        return false
      }

      if (filter === 'all') return true
      if (filter === 'valid') return !isDegraded
      return meta?.group === filter
    })
  }

  // Apply sub-tab filtering then status filtering
  const leftSubNodes = leftSubTab === 'all' ? leftNodes : leftNodes.filter(n => n.kind === leftSubTab)
  const filteredLeft = filterNodes(leftSubNodes, leftFilter)

  const middleSubNodes = middleSubTab === 'all'
    ? middleNodes
    : (middleSubTab === 'dataset' ? datasetNodes : (middleSubTab === 'chart' ? chartNodes : artifactNodes))
  const filteredMiddle = filterNodes(middleSubNodes, middleFilter)

  const rightSubNodes = rightSubTab === 'all'
    ? rightNodes
    : (rightSubTab === 'experiment' ? rightNodes.filter(n => n.kind === 'experiment') : rightNodes.filter(n => n.kind === 'finding'))
  const filteredRight = filterNodes(rightSubNodes, rightFilter)

  return React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(260px, 1fr) minmax(480px, 2fr) minmax(260px, 1fr)',
      gap: 16,
      height: '100%',
      padding: '14px 18px 16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: FONT_SANS,
    },
  },
    // Left Column - Motivation & Hypothesis with Sub-tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)',
        borderRadius: RADIUS.pane,
        border: '1px solid var(--dsw-alias-border-l3)',
        overflow: 'hidden',
      },
    },
      React.createElement(ColumnHeader, {
        title: '问题与假设',
        dotColor: '#5c8a77',
        nodes: leftNodes,
        activeFilter: leftFilter,
        onFilterChange: setLeftFilter,
        validLabel: '有效假说',
        degradedLabel: '已证伪',
        hideDegraded,
        subTabs: leftSubTabs,
        activeSubTab: leftSubTab,
        onSubTabChange: setLeftSubTab,
      }),
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          padding: '12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        },
      },
        filteredLeft.length > 0
          ? (
              leftSubTab === 'all' && qCount > 0 && hCount > 0
                ? React.createElement(React.Fragment, null,
                    filteredLeft.some(n => n.kind === 'question') && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '2px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '❓'),
                      React.createElement('span', null, '研究问题'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredLeft.filter(n => n.kind === 'question').length})`),
                    ),
                    filteredLeft.filter(n => n.kind === 'question').map(renderCard),
                    filteredLeft.some(n => n.kind === 'hypothesis') && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '10px 0 2px',
                        borderTop: '1px solid var(--dsw-alias-border-l3)',
                        marginTop: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '🌿'),
                      React.createElement('span', null, '理论假设'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredLeft.filter(n => n.kind === 'hypothesis').length})`),
                    ),
                    filteredLeft.filter(n => n.kind === 'hypothesis').map(renderCard),
                  )
                : filteredLeft.map(renderCard)
            )
          : React.createElement('div', {
              style: { textAlign: 'center', padding: '30px 16px', color: 'var(--dsw-alias-label-secondary)', fontSize: 12 },
            }, hideDegraded ? '当前已隐藏证伪假说，点击顶部按钮可恢复显示' : '当前筛选条件下暂无卡片')
      ),
    ),

    // Middle Column - Datasets & Artifacts with Sub-tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)',
        borderRadius: RADIUS.pane,
        border: '1px solid var(--dsw-alias-border-l3)',
        overflow: 'hidden',
      },
    },
      React.createElement(ColumnHeader, {
        title: '数据与产物',
        dotColor: '#c15f3e',
        nodes: middleNodes,
        activeFilter: middleFilter,
        onFilterChange: setMiddleFilter,
        validLabel: '有效实体',
        degradedLabel: '已废弃',
        hideDegraded,
        subTabs: middleSubTabs,
        activeSubTab: middleSubTab,
        onSubTabChange: setMiddleSubTab,
        extraAction: React.createElement('button', {
          onClick: () => onOpenChartModal && onOpenChartModal(),
          style: {
            background: '#c15f3e18',
            border: '1px solid #c15f3e55',
            borderRadius: RADIUS.control,
            padding: '2px 8.5px',
            fontSize: 11,
            color: '#c15f3e',
            fontFamily: FONT_SANS,
            fontWeight: 650,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 120ms ease',
          },
          title: '将选定实验指标或数据切片生成可视化图表并归档至本栏',
        },
          React.createElement('span', null, '📈'),
          React.createElement('span', null, '数据画图'),
        ),
      }),
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        },
      },
        filteredMiddle.length > 0
          ? (
              middleSubTab === 'all' && (dCount > 0 || cCount > 0 || aCount > 0)
                ? React.createElement(React.Fragment, null,
                    filteredMiddle.some(n => n.kind === 'dataset') && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '2px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '📊'),
                      React.createElement('span', null, '核心数据'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter(n => n.kind === 'dataset').length})`),
                    ),
                    filteredMiddle.filter(n => n.kind === 'dataset').map(renderCard),
                    filteredMiddle.some(n => chartNodeIds.has(n.id)) && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '10px 0 2px',
                        borderTop: '1px solid var(--dsw-alias-border-l3)',
                        marginTop: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '📈'),
                      React.createElement('span', null, '图表分析'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter(n => chartNodeIds.has(n.id)).length})`),
                    ),
                    filteredMiddle.filter(n => chartNodeIds.has(n.id)).map(renderCard),
                    filteredMiddle.some(n => n.kind === 'artifact' && !chartNodeIds.has(n.id)) && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '10px 0 2px',
                        borderTop: '1px solid var(--dsw-alias-border-l3)',
                        marginTop: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '📦'),
                      React.createElement('span', null, '产物归档'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter(n => n.kind === 'artifact' && !chartNodeIds.has(n.id)).length})`),
                    ),
                    filteredMiddle.filter(n => n.kind === 'artifact' && !chartNodeIds.has(n.id)).map(renderCard),
                  )
                : filteredMiddle.map(renderCard)
            )
          : React.createElement('div', {
              style: {
                textAlign: 'center',
                padding: '30px 16px',
                color: 'var(--dsw-alias-label-secondary)',
                fontSize: 12.5,
              },
            }, middleNodes.length === 0 ? '暂无数据或图表产物节点' : (hideDegraded ? '当前已隐藏废弃数据/产物节点' : '当前筛选条件下暂无卡片'))
      ),
    ),

    // Right Column - Findings & Experiments with Sub-tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: 'color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)',
        borderRadius: RADIUS.pane,
        border: '1px solid var(--dsw-alias-border-l3)',
        overflow: 'hidden',
      },
    },
      React.createElement(ColumnHeader, {
        title: '实验与结论',
        dotColor: '#b45353',
        nodes: rightNodes,
        activeFilter: rightFilter,
        onFilterChange: setRightFilter,
        validLabel: '有效结论',
        degradedLabel: '已废弃/证伪',
        hideDegraded,
        subTabs: rightSubTabs,
        activeSubTab: rightSubTab,
        onSubTabChange: setRightSubTab,
      }),
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          padding: '12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        },
      },
        filteredRight.length > 0
          ? (
              rightSubTab === 'all' && eCount > 0 && fCount > 0
                ? React.createElement(React.Fragment, null,
                    filteredRight.some(n => n.kind === 'experiment') && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '2px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '🧪'),
                      React.createElement('span', null, '实验探索'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredRight.filter(n => n.kind === 'experiment').length})`),
                    ),
                    filteredRight.filter(n => n.kind === 'experiment').map(renderCard),
                    filteredRight.some(n => n.kind === 'finding') && React.createElement('div', {
                      style: {
                        fontSize: 11,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: 'var(--dsw-alias-label-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        padding: '10px 0 2px',
                        borderTop: '1px solid var(--dsw-alias-border-l3)',
                        marginTop: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      },
                    },
                      React.createElement('span', null, '💡'),
                      React.createElement('span', null, '实证结论'),
                      React.createElement('span', { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredRight.filter(n => n.kind === 'finding').length})`),
                    ),
                    filteredRight.filter(n => n.kind === 'finding').map(renderCard),
                  )
                : filteredRight.map(renderCard)
            )
          : React.createElement('div', {
              style: { textAlign: 'center', padding: '30px 16px', color: 'var(--dsw-alias-label-secondary)', fontSize: 12 },
            }, hideDegraded ? '当前已隐藏废弃/负向结论与实验，点击顶部按钮可恢复显示' : '当前筛选条件下暂无卡片')
      ),
    )
  )
}

function ResearchWorkspace({ state, onSendMessage, onExecuteCommand, sessionRunning }) {
  const [selectedId, setSelectedId] = useState(null)
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [localActiveThreadId, setLocalActiveThreadId] = useState(null)
  const [optimisticThreads, setOptimisticThreads] = useState({})
  const [hideDegraded, setHideDegraded] = useState(false)
  const [busyState, setBusyState] = useState({ target: null, label: '', startTime: null })
  const [elapsedSec, setElapsedSec] = useState(0)
  const [isChartModalOpen, setIsChartModalOpen] = useState(false)
  const [chartInitialIds, setChartInitialIds] = useState([])
  const [localArtifactNodes, setLocalArtifactNodes] = useState([])
  const [localEdges, setLocalEdges] = useState([])

  const handleOpenChartModal = (ids = []) => {
    setChartInitialIds(ids)
    setIsChartModalOpen(true)
  }

  const handleCloseChartModal = () => {
    setIsChartModalOpen(false)
  }

  const handleSaveChart = (newChartNode, newEdges) => {
    setLocalArtifactNodes(prev => [newChartNode, ...prev])
    if (newEdges && newEdges.length > 0) {
      setLocalEdges(prev => [...prev, ...newEdges])
    }
    setSelectedId(newChartNode.id)
    setExpandedIds(prev => new Set(prev).add(newChartNode.id))
    setIsChartModalOpen(false)
    setTimeout(() => {
      const el = document.getElementById(`card-${newChartNode.id}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 80)
  }

  const handleAskAiDeepPlot = (prompt) => {
    setIsChartModalOpen(false)
    handleSendMessage(null, prompt)
  }

  const isBusy = Boolean(sessionRunning) || Boolean(busyState.target)

  // Timer for elapsed seconds
  useEffect(() => {
    if (!isBusy) {
      setElapsedSec(0)
      return
    }
    const start = busyState.startTime || Date.now()
    const timer = setInterval(() => {
      setElapsedSec(Math.max(1, Math.floor((Date.now() - start) / 1000)))
    }, 1000)
    return () => clearInterval(timer)
  }, [isBusy, busyState.startTime])

  // Clear busyState when agent finishes running
  const prevSessionRunningRef = useRef(sessionRunning)
  useEffect(() => {
    if (prevSessionRunningRef.current && !sessionRunning) {
      setBusyState({ target: null, label: '', startTime: null })
    }
    prevSessionRunningRef.current = sessionRunning
  }, [sessionRunning])

  // Clear sync busy state when state updates
  const prevStateRef = useRef(state)
  useEffect(() => {
    if (prevStateRef.current !== state && busyState.target === 'sync') {
      setBusyState({ target: null, label: '', startTime: null })
    }
    prevStateRef.current = state
  }, [state, busyState.target])

  // Safety fallback timeout: clear busy state after 25s if sessionRunning is false
  useEffect(() => {
    if (busyState.target && !sessionRunning) {
      const timer = setTimeout(() => {
        setBusyState({ target: null, label: '', startTime: null })
      }, 25000)
      return () => clearTimeout(timer)
    }
  }, [busyState.target, sessionRunning])

  const activeThreadId = localActiveThreadId !== null ? localActiveThreadId : (state?.activeThreadId || null)

  const totalDegradedCount = useMemo(() => {
    if (!state || !state.nodes) return 0
    return state.nodes.filter(n => getNodeStatusMeta(n)?.group === 'degraded').length
  }, [state])

  const stagedCount = useMemo(() => {
    if (!state || !state.nodes) return 0
    return state.nodes.filter(n => (n.sandboxPath || n.content || n.preview) && n.staged !== false).length
  }, [state])

  const connected = useMemo(() => {
    if (!selectedId || !state || !state.edges) return new Set()
    const result = new Set([selectedId])
    state.edges.forEach(edge => {
      if (edge.source === selectedId) result.add(edge.target)
      if (edge.target === selectedId) result.add(edge.source)
    })
    return result
  }, [selectedId, state])

  const handleSelect = (id) => {
    if (!id) {
      setSelectedId(null)
      return
    }
    setSelectedId(prev => (prev === id ? null : id))
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }

  const handleClearSelection = () => {
    setSelectedId(null)
    setExpandedIds(new Set())
  }

  const handleSetFocus = (id) => {
    setLocalActiveThreadId(id)
    if (id) {
      setSelectedId(id)
      setExpandedIds(prev => new Set(prev).add(id))
      setTimeout(() => {
        const el = document.getElementById(`card-${id}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    }
  }

  const handleSendMessage = (targetNodeId, text) => {
    if (!text) return
    setBusyState({
      target: targetNodeId || 'global',
      label: targetNodeId ? `对 [${targetNodeId}] 思考中...` : '思考中...',
      startTime: Date.now(),
    })
    if (targetNodeId) {
      const newMsg = {
        id: `opt-${Date.now()}`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text,
      }
      setOptimisticThreads(prev => ({
        ...prev,
        [targetNodeId]: [...(prev[targetNodeId] || []), newMsg],
      }))
    }
    if (onSendMessage) {
      onSendMessage(targetNodeId, text)
    }
  }

  const handleSyncClick = () => {
    setBusyState({
      target: 'sync',
      label: '正在同步进展...',
      startTime: Date.now(),
    })
    if (typeof onExecuteCommand === 'function') {
      onExecuteCommand('/import-sync')
    } else {
      handleSendMessage(null, '/import-sync')
    }
  }

  const mergedNodes = useMemo(() => {
    const baseNodes = state?.nodes || []
    const all = [...baseNodes, ...localArtifactNodes]
    return all.map(node => {
      const optList = optimisticThreads[node.id]
      if (!optList || optList.length === 0) return node
      const existing = node.thread || []
      const dedupedOpt = optList.filter(o => !existing.some(e => e.text === o.text && e.sender === 'user'))
      if (dedupedOpt.length === 0) return node
      return {
        ...node,
        thread: [...existing, ...dedupedOpt],
      }
    })
  }, [state, localArtifactNodes, optimisticThreads])

  const mergedState = useMemo(() => {
    if (!state) return null
    return {
      ...state,
      nodes: mergedNodes,
      edges: [...(state.edges || []), ...localEdges],
      activeThreadId,
    }
  }, [state, mergedNodes, localEdges, activeThreadId])

  const activeNode = useMemo(() => {
    if (!activeThreadId || !mergedNodes) return null
    return mergedNodes.find(n => n.id === activeThreadId) || null
  }, [mergedNodes, activeThreadId])

  useEffect(() => {
    const style = document.createElement('style')
    style.dataset.researchFlow = 'true'
    style.textContent = `
      /* Hide conversation composer and maximize display area when Research workspace is active */
      :has([data-research-workspace]) [data-composer-seat],
      [data-conversation-scroll]:has([data-research-workspace]) > [data-composer-seat] {
        display: none !important;
      }
      [data-conversation-scroll]:has([data-research-workspace]) {
        overflow: hidden !important;
      }
      [data-conversation-scroll]:has([data-research-workspace]) > [data-slot='conversation.session'],
      [data-conversation-scroll]:has([data-research-workspace]) .viewArea {
        flex: 1 1 0 !important;
        height: 100% !important;
        min-height: 0 !important;
        overflow: hidden !important;
      }

      /* Editorial Quiet Scrollbars */
      [data-research-workspace] ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      [data-research-workspace] ::-webkit-scrollbar-track {
        background: transparent;
      }
      [data-research-workspace] ::-webkit-scrollbar-thumb {
        background: var(--dsw-alias-border-l3);
        border-radius: 3px;
      }
      [data-research-workspace] ::-webkit-scrollbar-thumb:hover {
        background: var(--dsw-alias-border-l2);
      }

      /* Refined typography & smoothing */
      [data-research-workspace] {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      /* Quiet link/button transitions */
      [data-research-workspace] button {
        font-family: inherit;
        outline: none;
      }
      [data-research-workspace] button:focus-visible {
        box-shadow: 0 0 0 1.5px var(--dsw-alias-border-l1) !important;
      }

      /* Dynamic Spinners & Thinking Animations */
      @keyframes dsh-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .dsh-spin {
        display: inline-block;
        animation: dsh-spin 1s linear infinite;
      }

      @keyframes dsh-pulse-dot {
        0%, 80%, 100% {
          transform: scale(0.65);
          opacity: 0.35;
        }
        40% {
          transform: scale(1.15);
          opacity: 1;
        }
      }
      .dsh-typing-dot {
        display: inline-block;
        animation: dsh-pulse-dot 1.4s ease-in-out infinite;
      }
      .dsh-typing-dot.dsh-dot-2 {
        animation-delay: 0.2s;
      }
      .dsh-typing-dot.dsh-dot-3 {
        animation-delay: 0.4s;
      }

      @keyframes dsh-status-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      .dsh-shimmer-text {
        background: linear-gradient(90deg, #c15f3e 0%, #c15f3e 30%, #e8a892 50%, #c15f3e 70%, #c15f3e 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: dsh-status-shimmer 2.2s linear infinite;
      }

      @keyframes dsh-breathing-pill {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(193, 95, 62, 0);
          border-color: rgba(193, 95, 62, 0.35);
        }
        50% {
          box-shadow: 0 0 0 3px rgba(193, 95, 62, 0.18);
          border-color: rgba(193, 95, 62, 0.65);
        }
      }
      .dsh-pulse-pill {
        animation: dsh-breathing-pill 2s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [])

  if (!state) {
    return React.createElement('section', {
      'aria-label': 'Research Workspace',
      'data-conversation-composer-overlay': '',
      'data-research-workspace': '',
      style: WORKSPACE_STYLE,
    },
      React.createElement(PlaceholderCard),
    )
  }

  return React.createElement('section', {
    'aria-label': 'Research Workspace',
    'data-conversation-composer-overlay': '',
    'data-research-workspace': '',
    style: {
      ...WORKSPACE_STYLE,
      display: 'flex',
      flexDirection: 'column',
    },
  },
    // Top Bar with Summary
    React.createElement('header', {
      style: {
        height: 44,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px',
        borderBottom: '1px solid var(--dsw-alias-border-l3)',
        background: 'var(--dsw-alias-bg-layer-1)',
        userSelect: 'none',
        zIndex: 5,
        fontFamily: FONT_SANS,
      },
    },
      // Left stats & brand
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 9 },
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6.5,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.08em',
            fontFamily: FONT_MONO,
            color: 'var(--dsw-alias-label-primary)',
          },
        },
          React.createElement('span', { style: { width: 6, height: 6, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', null, 'RESEARCH'),
        ),
        React.createElement('span', {
          style: { color: 'var(--dsw-alias-border-l1)', opacity: 0.45, fontSize: 11 },
        }, '·'),
        React.createElement('span', {
          style: {
            fontSize: 11.5,
            fontFamily: FONT_MONO,
            color: 'var(--dsw-alias-label-secondary)',
            fontWeight: 500,
          },
        }, hideDegraded && totalDegradedCount > 0
          ? `${(state.nodes || []).length - totalDegradedCount} 有效 / ${(state.nodes || []).length} 实体 · ${(state.edges || []).length} 关系`
          : `${(state.nodes || []).length} 实体 · ${(state.edges || []).length} 关系`),
        isBusy && React.createElement('div', {
          className: 'dsh-pulse-pill',
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '2.5px 9px',
            borderRadius: RADIUS.badge,
            background: '#c15f3e14',
            border: '1px solid #c15f3e45',
            fontSize: 11.5,
            fontFamily: FONT_SANS,
            color: '#c15f3e',
            fontWeight: 600,
            marginLeft: 6,
          },
        },
          React.createElement('span', { className: 'dsh-typing-dot', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-2', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-typing-dot dsh-dot-3', style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: '#c15f3e', display: 'inline-block' } }),
          React.createElement('span', { className: 'dsh-shimmer-text', style: { marginLeft: 2 } },
            busyState.target === 'sync'
              ? '正在同步最新科研进展与画布...'
              : (busyState.target && busyState.target !== 'global' ? `Agent 正在研讨 [${busyState.target}]...` : 'Agent 正在思考处理中...')
          ),
          elapsedSec > 0 && React.createElement('span', {
            style: {
              fontSize: 10.5,
              fontFamily: FONT_MONO,
              color: 'var(--dsw-alias-label-secondary)',
              fontWeight: 500,
            },
          }, `${elapsedSec}s`),
        ),
        stagedCount > 0 && React.createElement('div', {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 9px',
            borderRadius: RADIUS.badge,
            background: '#b07f4316',
            border: '1px solid #b07f4335',
            fontSize: 11.5,
            color: '#b07f43',
            fontFamily: FONT_MONO,
            marginLeft: 4,
          },
          title: '探索产物暂存于界面沙箱中，尚未写入磁盘。经确认后可通过 research_sandbox_commit 工具落盘保存。',
        },
          React.createElement('span', null, '📦'),
          React.createElement('span', { style: { fontWeight: 650 } }, `${stagedCount} 项沙箱待落盘`),
        ),
        selectedId && React.createElement('button', {
          onClick: handleClearSelection,
          style: {
            marginLeft: 6,
            background: 'var(--dsw-alias-bg-layer-2)',
            border: '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '2.5px 8px',
            fontSize: 11.5,
            color: 'var(--dsw-alias-label-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          },
          title: '清除高亮聚焦与展开',
        },
          React.createElement('span', null, `聚焦: ${selectedId}`),
          React.createElement('span', { style: { opacity: 0.6 } }, '✕'),
        ),
      ),
      // Right header controls: Hide Degraded Toggle, Quick Sync & Thread Focus Selector
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8 },
      },
        totalDegradedCount > 0 && React.createElement('button', {
          onClick: () => setHideDegraded(prev => !prev),
          style: {
            background: hideDegraded ? '#b4535318' : 'var(--dsw-alias-bg-layer-2)',
            border: hideDegraded ? '1px solid #b4535350' : '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '3px 9px',
            fontSize: 11.5,
            color: hideDegraded ? '#b45353' : 'var(--dsw-alias-label-primary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontFamily: FONT_SANS,
            fontWeight: hideDegraded ? 600 : 500,
            transition: 'all 0.15s ease',
          },
          title: hideDegraded ? '当前已隐藏废弃/证伪结论与假说，点击恢复显示全部' : '点击隐藏所有已废弃、证伪或失败的结论与假说',
        },
          React.createElement('span', null, hideDegraded ? '🚫' : '👁'),
          React.createElement('span', null, hideDegraded ? `已隐藏废弃 (${totalDegradedCount})` : `隐藏已废弃 (${totalDegradedCount})`),
        ),
        React.createElement('button', {
          onClick: handleSyncClick,
          disabled: isBusy,
          className: isBusy && busyState.target === 'sync' ? 'dsh-pulse-pill' : undefined,
          style: {
            background: isBusy && busyState.target === 'sync'
              ? '#c15f3e18'
              : 'var(--dsw-alias-bg-layer-2)',
            border: isBusy && busyState.target === 'sync'
              ? '1px solid #c15f3e55'
              : '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '3px 10px',
            fontSize: 11.5,
            color: isBusy && busyState.target === 'sync' ? '#c15f3e' : 'var(--dsw-alias-label-primary)',
            cursor: isBusy ? 'wait' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: FONT_SANS,
            fontWeight: isBusy && busyState.target === 'sync' ? 650 : 500,
            transition: 'all 0.15s ease',
            opacity: isBusy && busyState.target !== 'sync' ? 0.65 : 1,
          },
          title: isBusy && busyState.target === 'sync'
            ? '正在增量同步最新科研进展与画布...'
            : '从其他 agent、git 提交或文档增量同步最新进展到画布 (/import-sync)',
        },
          React.createElement('span', {
            className: isBusy && busyState.target === 'sync' ? 'dsh-spin' : undefined,
            style: { fontSize: 12, display: 'inline-block' },
          }, '🔄'),
          React.createElement('span', null, isBusy && busyState.target === 'sync'
            ? `正在同步${elapsedSec > 0 ? ` (${elapsedSec}s)` : '...'}`
            : '同步进展'),
        ),
        React.createElement('span', {
          style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)', fontWeight: 600, marginLeft: 2 },
        }, '💬 研讨焦点:'),
        React.createElement('select', {
          value: activeThreadId || '',
          onChange: (e) => handleSetFocus(e.target.value || null),
          style: {
            background: activeThreadId ? '#c15f3e18' : 'var(--dsw-alias-bg-layer-2)',
            color: activeThreadId ? '#c15f3e' : 'var(--dsw-alias-label-primary)',
            border: activeThreadId ? '1px solid #c15f3e55' : '1px solid var(--dsw-alias-border-l3)',
            borderRadius: RADIUS.control,
            padding: '3px 8px',
            fontSize: 11.5,
            fontFamily: FONT_SANS,
            outline: 'none',
            cursor: 'pointer',
            maxWidth: 240,
          },
          title: '切换当前研讨绑定的卡片或全局主线',
        },
          React.createElement('option', { value: '' }, '🌐 全局主线 (全部卡片)'),
          (mergedNodes || []).map(n => {
            const kMeta = TYPE_META[n.kind] || { zh: n.kind }
            const thLen = (n.thread?.length || 0)
            return React.createElement('option', {
              key: n.id,
              value: n.id,
            }, `[${kMeta.zh}] ${n.id}: ${n.title.slice(0, 22)}${thLen > 0 ? ` (${thLen}条)` : ''}`)
          })
        ),
      ),
    ),
    // Workspace Body
    React.createElement('div', {
      style: {
        flex: 1,
        position: 'relative',
        minHeight: 0,
        overflow: 'hidden',
      },
    },
      React.createElement(ColumnarWorkspace, {
        state: mergedState,
        selectedId,
        expandedIds,
        onSelect: handleSelect,
        connected,
        activeThreadId,
        onSetFocus: handleSetFocus,
        onSendMessage: handleSendMessage,
        hideDegraded,
        busyState,
        isBusy,
        elapsedSec,
        onOpenChartModal: handleOpenChartModal,
      }),
    ),
    // Docked Workspace Thread Bar at Bottom
    React.createElement(WorkspaceThreadBar, {
      activeNode,
      allNodes: mergedNodes,
      onSetFocus: handleSetFocus,
      onSendMessage: handleSendMessage,
      isBusy,
      busyTarget: busyState.target,
      elapsedSec,
    }),
    // Data Charting & AI Suggestions Modal
    isChartModalOpen && React.createElement(DataChartingModal, {
      isOpen: isChartModalOpen,
      onClose: handleCloseChartModal,
      allNodes: mergedNodes,
      initialSelectedIds: chartInitialIds,
      onSaveChart: handleSaveChart,
      onAskAiDeepPlot: handleAskAiDeepPlot,
    }),
  )
}

const WORKSPACE_STYLE = { position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--dsw-alias-bg-base)', color: 'var(--dsw-alias-label-primary)', fontFamily: FONT_SANS }

export const inject = ['slots', 'sessions']

export function apply(ctx) {
  // Register the Research tab
  ctx.slots.inject('conversation.view', () => ctx.slots.register({
    name: 'conversation.view',
    id: 'research',
    order: 20,
    label: 'Research',
    inject: (sessionId) => {
      const binding = ctx.sessions.binding(sessionId)
      if (binding === undefined) {
        throw new Error(`dsh-lab-research-ui: session "${sessionId}" is unavailable`)
      }
      return {
        hooks: { researchState: binding.session.projections.faceOf('research') },
        session: binding.session,
        sendMessage: (text) => binding.session.prompt([{ type: 'text', text }], 'queue'),
      }
    },
  }, (props) => {
    // Prefer standard session-scoped keyed hook useProjection('research'), with graceful fallback to useResearchState
    const state = typeof props.useProjection === 'function'
      ? props.useProjection('research')
      : (typeof props.useResearchState === 'function' ? props.useResearchState(s => s) : null)

    const sessionRunning = typeof props.useSession === 'function'
      ? props.useSession(s => Boolean(s?.running))
      : false

    const onExecuteCommand = async (line) => {
      if (props.session && typeof props.session.command === 'function') {
        return props.session.command(line)
      }
      if (ctx.remote?.commands?.execute && props.sessionId) {
        return ctx.remote.commands.execute(props.sessionId, line, [])
      }
      if (typeof props.sendMessage === 'function') {
        props.sendMessage(line)
      }
    }

    return React.createElement(ResearchWorkspace, {
      state,
      onExecuteCommand,
      sessionRunning,
      onSendMessage: (targetNodeId, text) => {
        const promptText = targetNodeId
          ? `[卡片研讨 · ${targetNodeId}]: ${text}`
          : text
        if (typeof props.sendMessage === 'function') {
          props.sendMessage(promptText)
        } else if (props.session && typeof props.session.prompt === 'function') {
          props.session.prompt([{ type: 'text', text: promptText }], 'queue')
        }
      },
    })
  }))
}
