# 🧭 dsh-lab-research-ui

> **Hypothesis-Driven Scientific Research Workbench for DeepSeek Harness (DSH)**  
> 一套专为科学研究与算法迭代设计的假说驱动工作台插件，提供直观的三栏科研看板、多维数据矢量绘图、AI 智能研判与沙箱产物暂存。

---

## 🌟 核心特性 (Key Features)

### 1. 🌿 假说驱动的三栏研讨流 (Hypothesis-Driven Three-Column Flow)
* **左栏：问题与假设 (Questions & Hypotheses)**
  * 聚焦科研核心动机与理论假说，支持假说状态跟踪（进行中、已证实、已证伪）。
  * 顶栏支持一键过滤隐藏已证伪/已废弃假说，保持研究主线整洁。
* **中栏：数据与产物 (Datasets, Charts & Artifacts)**
  * 统一归档核心基准数据集（含切片样本量）、可视化分析图表以及多格式产物。
  * 细分四维子 Tab：`全部` · `📊 核心数据` · `📈 图表分析` · `📦 产物归档`。
* **右栏：探索与结论 (Experiments & Empirical Findings)**
  * 记录消融实验方案、评估指标、版本演进快照与实证结论。
  * 细分子 Tab：`全部` · `🧪 实验探索` · `💡 实证结论`。

### 2. 📈 纯矢量科研绘图引擎与 AI 研判 (Vector SVG Plotting Engine & AI Suggestions)
零第三方图表库依赖，内置自适应矢量 SVG 生成引擎：
* **Pareto 权衡前沿散点图 (Pareto Frontier Scatter)**：精准拟合代偿性指标（如 PPV vs Sensitivity、MAE vs 吞吐量）的效率前沿曲线，自动定位帕累托最优解。
* **多维综合画像雷达图 (Multi-metric Radar Chart)**：同心多边形网格，多模型半透明叠加，全方位暴露短板与综合均衡度。
* **分组核心指标对比柱状图 (Grouped Bar Chart)**：清晰展示多方案在核心指标上的绝对数值与升降幅度，附带精确数值标签。
* **队列切片分布环形图 (Cohort Slice Donut)**：直观展现训练集、验证集、盲测集与高危切片的比例与总样本量 $N$。
* **✨ AI 智能研判矩阵**：根据选定数据实体的维度特征，自动推荐最恰当的图表类型并附带严密的科研研判理由。
* **双轨执行**：
  * **一键保存到中间栏**：即时生成高清矢量图并作为产物卡片收录到中间栏。
  * **委托 AI 深度绘图**：自动组装结构化科研 prompt，由 Agent 编写 Python (Matplotlib/Seaborn) 脚本并输出论文级高清图表。

### 3. 📦 虚拟沙箱与多格式预览 (Staged Virtual Sandbox)
* **无污染沙箱暂存 (`staged: true`)**：所有探索性代码、分析图表与文档均可在界面沙箱中实时预览，确认无误前不污染本地 Git 仓库。
* **多格式原生预览**：
  * 原生矢量 SVG 与高清图片自适应呈现。
  * Markdown / 纯文本文档支持一键复制。
  * 代码文件自带行号、语法着色与等宽排版。

### 4. ⚡ 动态感知与思考态动效 (Dynamic Thinking & Shimmer Feedback)
* Agent 执行与后台研讨时，顶部状态条、快捷同步按钮、底部 Dock 栏与卡片内嵌气泡均展示呼吸光效、打字机跳动点与实时秒级计时器 (`Xs`)。
* 支持多轮卡片级聚焦研讨（Card-scoped Thread），精准向 Agent 发送消融归因、瓶颈分析与状态更新指令。

### 5. 🔄 跨 Agent 进展增量同步
* 内置 `/import-sync`、`/start-research`、`/load-research` 指令。
* 支持从外部 Agent 研讨记录、文档变更或 Git 提交中一键增量同步实体与关系到画布。

---

## 🏗️ 架构与技术栈 (Architecture)

* **双端架构 (Dual Architecture)**:
  * **Host 端 (`index.js`)**: 基于 Cordis 插件体系，注册 Host 级 Tools (`research_upsert_node`, `research_sandbox_stage` 等)、Command 与 Session Projection。
  * **Client 端 (`src/client.jsx`)**: 纯 React 渲染，无任何外部 UI 组件库包袱，采用 5 级同心圆角设计系统 (`RADIUS.*`) 与 Minimalist 暖色矿物调色盘。
* **构建产物 (`client.js`)**: 单文件 esbuild 极速打包，大小优化且无多余运行时。

---

## 🚀 快速上手 (Getting Started)

### 1. 安装依赖
```bash
pnpm install
```

### 2. 编译 Client Bundle
```bash
npm run build
```

### 3. 接入 DeepSeek Harness / Cordis 环境
在 `package.json` 或 `cordis.patch.yml` 中声明插件引入：

```yaml
# cordis.patch.yml
- insert:
    - id: research-lab-ui
      name: dsh-lab-research-ui
```

启动 Harness 后，即可在会话界面顶栏看到 **Research** 选项卡。

---

## 📄 开源许可证 (License)

本项目基于 [MIT License](LICENSE) 开源。
