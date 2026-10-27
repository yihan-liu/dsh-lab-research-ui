window.__ModuleLoader__.load({ id: 'dsh-lab-research-ui', factory: (require) => {
  var module = { exports: {} }
  var exports = module.exports
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react = __toESM(require("react"), 1);
var FONT_SANS = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif';
var FONT_MONO = '"Cascadia Code", "Fira Code", "JetBrains Mono", SFMono-Regular, Menlo, Monaco, Consolas, "PingFang SC", "Microsoft YaHei", monospace';
var RADIUS = {
  pane: 10,
  card: 8,
  sub: 6,
  control: 6,
  badge: 4,
  round: "50%"
};
var TYPE_META = {
  question: {
    label: "Question",
    zh: "\u7814\u7A76\u95EE\u9898",
    color: "#6e8299",
    // Warm Slate
    bg: "#6e829914",
    border: "#6e829930"
  },
  hypothesis: {
    label: "Hypothesis",
    zh: "\u7406\u8BBA\u5047\u8BBE",
    color: "#5c8a77",
    // Celadon Sage
    bg: "#5c8a7714",
    border: "#5c8a7730"
  },
  dataset: {
    label: "Dataset",
    zh: "\u6838\u5FC3\u6570\u636E",
    color: "#c15f3e",
    // Claude Terracotta / Warm Clay
    bg: "#c15f3e14",
    border: "#c15f3e30"
  },
  experiment: {
    label: "Experiment",
    zh: "\u9A8C\u8BC1\u5B9E\u9A8C",
    color: "#b07f43",
    // Warm Amber / Ochre
    bg: "#b07f4314",
    border: "#b07f4330"
  },
  artifact: {
    label: "Artifact",
    zh: "\u4EA7\u7269\u5F52\u6863",
    color: "#8e799c",
    // Heather Mauve
    bg: "#8e799c14",
    border: "#8e799c30"
  },
  finding: {
    label: "Finding",
    zh: "\u5173\u952E\u7ED3\u8BBA",
    color: "#b45353",
    // Oxide Red / Carmine Rust
    bg: "#b4535314",
    border: "#b4535330"
  }
};
var STATUS_META = {
  // Positive progression / active
  proposed: { zh: "\u5F85\u9A8C\u8BC1", label: "PROPOSED", color: "#6e8299", bg: "#6e829916", border: "#6e829935", group: "active" },
  active: { zh: "\u63A2\u7D22\u4E2D", label: "ACTIVE", color: "#6e8299", bg: "#6e829916", border: "#6e829935", group: "active" },
  planned: { zh: "\u5DF2\u89C4\u5212", label: "PLANNED", color: "#8e799c", bg: "#8e799c16", border: "#8e799c35", group: "active" },
  testing: { zh: "\u9A8C\u8BC1\u4E2D", label: "TESTING", color: "#b07f43", bg: "#b07f4316", border: "#b07f4335", group: "active" },
  running: { zh: "\u5B9E\u9A8C\u4E2D", label: "RUNNING", color: "#b07f43", bg: "#b07f4316", border: "#b07f4335", group: "active" },
  split: { zh: "\u5207\u5206\u5B8C\u6210", label: "SPLIT", color: "#b07f43", bg: "#b07f4316", border: "#b07f4335", group: "active" },
  staged: { zh: "\u6C99\u7BB1\u6682\u5B58", label: "STAGED", color: "#b07f43", bg: "#b07f4316", border: "#b07f4335", group: "active" },
  // Supported / confirmed milestones
  supported: { zh: "\u5DF2\u8BC1\u5B9E", label: "SUPPORTED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  confirmed: { zh: "\u590D\u73B0\u786E\u8BA4", label: "CONFIRMED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  completed: { zh: "\u5DF2\u5B8C\u6210", label: "COMPLETED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  answered: { zh: "\u5DF2\u89E3\u7B54", label: "ANSWERED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  curated: { zh: "\u5BA1\u8BA1\u5165\u5E93", label: "CURATED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  committed: { zh: "\u5DF2\u843D\u76D8", label: "COMMITTED", color: "#5c8a77", bg: "#5c8a7718", border: "#5c8a7740", group: "supported" },
  frozen: { zh: "\u57FA\u51C6\u51BB\u7ED3", label: "FROZEN", color: "#8e799c", bg: "#8e799c18", border: "#8e799c40", group: "supported" },
  locked: { zh: "\u76F2\u6D4B\u9501\u5B9A", label: "LOCKED", color: "#8e799c", bg: "#8e799c18", border: "#8e799c40", group: "supported" },
  // Exploratory / refinement branches
  refined: { zh: "\u5206\u652F\u7EC6\u5316", label: "REFINED", color: "#c15f3e", bg: "#c15f3e16", border: "#c15f3e35", group: "active" },
  subset: { zh: "\u4E9A\u96C6\u5207\u5206", label: "SUBSET", color: "#c15f3e", bg: "#c15f3e16", border: "#c15f3e35", group: "active" },
  pivoted: { zh: "\u8F6C\u5411\u91CD\u6784", label: "PIVOTED", color: "#c15f3e", bg: "#c15f3e16", border: "#c15f3e35", group: "active" },
  preliminary: { zh: "\u521D\u6B65\u89C2\u5BDF", label: "PRELIMINARY", color: "#9c8259", bg: "#9c825916", border: "#9c825935", group: "active" },
  // Degradation / refutation / failure
  inconclusive: { zh: "\u8BC1\u636E\u4E0D\u8DB3", label: "INCONCLUSIVE", color: "#9c8259", bg: "#9c825916", border: "#9c825935", group: "degraded", isDegraded: true },
  falsified: { zh: "\u5DF2\u8BC1\u4F2A", label: "FALSIFIED", color: "#b45353", bg: "#b4535318", border: "#b4535345", group: "degraded", isDegraded: true },
  negative: { zh: "\u8D1F\u5411\u53D1\u73B0", label: "NEGATIVE", color: "#b45353", bg: "#b4535318", border: "#b4535345", group: "degraded", isDegraded: true },
  failed: { zh: "\u5B9E\u9A8C\u5931\u8D25", label: "FAILED", color: "#b45353", bg: "#b4535318", border: "#b4535345", group: "degraded", isDegraded: true },
  bottleneck: { zh: "\u906D\u9047\u74F6\u9888", label: "BOTTLENECK", color: "#b45353", bg: "#b4535318", border: "#b4535345", group: "degraded", isDegraded: true },
  deprecated: { zh: "\u5DF2\u5E9F\u5F03", label: "DEPRECATED", color: "#888888", bg: "#88888816", border: "#88888835", group: "degraded", isDegraded: true },
  abandoned: { zh: "\u5DF2\u653E\u5F03", label: "ABANDONED", color: "#888888", bg: "#88888816", border: "#88888835", group: "degraded", isDegraded: true },
  superseded: { zh: "\u7ED3\u8BBA\u66F4\u8FED", label: "SUPERSEDED", color: "#888888", bg: "#88888816", border: "#88888835", group: "degraded", isDegraded: true },
  blocked: { zh: "\u53D7\u963B\u4E2D\u65AD", label: "BLOCKED", color: "#b45353", bg: "#b4535318", border: "#b4535345", group: "degraded", isDegraded: true }
};
function getNodeStatusMeta(node) {
  if (!node) return null;
  let s = node.status;
  if (!s) {
    if (node.kind === "question") s = "active";
    else if (node.kind === "hypothesis") s = "proposed";
    else if (node.kind === "dataset") s = "curated";
    else if (node.kind === "experiment") s = "completed";
    else if (node.kind === "finding") s = "preliminary";
    else if (node.kind === "artifact") s = node.staged === false ? "committed" : "staged";
    else s = "active";
  }
  const key = String(s).toLowerCase();
  return STATUS_META[key] || {
    zh: s,
    label: s.toUpperCase(),
    color: "#888888",
    bg: "#88888814",
    border: "#88888830",
    group: "active",
    isDegraded: ["falsified", "negative", "failed", "bottleneck", "deprecated", "abandoned", "blocked"].includes(key)
  };
}
function MetricsGrid({ metrics, priorMetrics, priorLabel }) {
  if (!metrics || typeof metrics !== "object") return null;
  const entries = Object.entries(metrics);
  if (entries.length === 0) return null;
  const formatMetricVal = (val, key) => {
    if (typeof val === "number") {
      if (val >= 0 && val <= 1 && /(ppv|sens|spec|auc|auroc|acc|rate|pct|ratio|f1|precision|recall)/i.test(key)) {
        return `${(val * 100).toFixed(1)}%`;
      }
      return Number.isInteger(val) ? String(val) : val.toFixed(3).replace(/\.?0+$/, "");
    }
    return String(val);
  };
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 9,
        marginBottom: 7
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          fontSize: 10.5,
          fontWeight: 650,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          fontFamily: FONT_MONO,
          color: "var(--dsw-alias-label-secondary)",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }
      },
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 5 } },
        import_react.default.createElement("span", { style: { color: "#5c8a77", fontSize: 11 } }, "\u{1F4CA}"),
        import_react.default.createElement("span", null, "SCIENTIFIC METRICS / \u91CF\u5316\u6307\u6807")
      ),
      priorMetrics && import_react.default.createElement("span", {
        style: {
          fontSize: 10,
          fontFamily: FONT_MONO,
          color: "var(--dsw-alias-label-tertiary)",
          fontWeight: 500
        }
      }, `\u5BF9\u6BD4: ${priorLabel || "\u4E0A\u4E00\u7248\u672C"}`)
    ),
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
          gap: 6
        }
      },
      entries.map(([k, v]) => {
        let deltaPill = null;
        if (typeof v === "number" && priorMetrics && typeof priorMetrics[k] === "number") {
          const diff = v - priorMetrics[k];
          if (Math.abs(diff) >= 1e-4) {
            const isLowerBetter = /(mae|rmse|loss|err|error|bias|fa_per_h|overhead)/i.test(k);
            const isGood = isLowerBetter ? diff < 0 : diff > 0;
            const isPct = v <= 1 && v >= 0 && /(ppv|sens|spec|auc|auroc|acc|rate|ratio|f1|precision|recall|corr)/i.test(k);
            const formattedDiff = isPct ? `${diff > 0 ? "+" : ""}${(diff * 100).toFixed(1)}%` : `${diff > 0 ? "+" : ""}${Math.abs(diff) >= 10 ? diff.toFixed(1) : diff.toFixed(2)}`;
            deltaPill = import_react.default.createElement("span", {
              style: {
                fontSize: 9.5,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: isGood ? "#5c8a77" : "#b45353",
                background: isGood ? "#5c8a7714" : "#b4535314",
                border: `1px solid ${isGood ? "#5c8a7730" : "#b4535330"}`,
                padding: "1px 4px",
                borderRadius: RADIUS.badge,
                marginLeft: 4
              },
              title: `\u76F8\u5BF9 ${priorLabel || "\u4E0A\u4E00\u7248\u672C"}: ${formattedDiff}`
            }, formattedDiff);
          }
        }
        return import_react.default.createElement(
          "div",
          {
            key: k,
            style: {
              background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)",
              padding: "6px 8px",
              borderRadius: RADIUS.sub,
              border: "1px solid var(--dsw-alias-border-l3)",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }
          },
          import_react.default.createElement("span", {
            style: {
              color: "var(--dsw-alias-label-secondary)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".05em",
              fontFamily: FONT_MONO,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            },
            title: k
          }, k.replace(/_/g, " ")),
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              }
            },
            import_react.default.createElement("span", {
              style: {
                color: "var(--dsw-alias-label-primary)",
                fontSize: 12.5,
                fontFamily: FONT_MONO,
                fontWeight: 650,
                lineHeight: 1.25
              }
            }, formatMetricVal(v, k)),
            deltaPill
          )
        );
      })
    )
  );
}
function DegradationBanner({ reason, statusMeta }) {
  if (!reason && !statusMeta?.isDegraded) return null;
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 9,
        marginBottom: 9,
        padding: "9px 12px",
        borderRadius: RADIUS.sub,
        background: "#b4535314",
        border: "1px solid #b4535338",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 5.5,
          color: "#b45353",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: FONT_MONO,
          letterSpacing: ".05em"
        }
      },
      import_react.default.createElement("span", null, "\u26A0\uFE0F"),
      import_react.default.createElement("span", null, "\u8BC1\u4F2A / \u5C40\u9650\u5206\u6790 \xB7 DEGRADATION REASON")
    ),
    import_react.default.createElement("div", {
      style: {
        fontSize: 12.5,
        lineHeight: 1.55,
        color: "var(--dsw-alias-label-primary)",
        fontFamily: FONT_SANS
      }
    }, reason || "\u8BE5\u5047\u8BBE\u6216\u8DEF\u5F84\u5728\u5F53\u524D\u5B9E\u9A8C\u8BBE\u8BA1\u4E0B\u672A\u83B7\u652F\u6301\uFF0C\u5DF2\u88AB\u8BC1\u4F2A\u6216\u9000\u5316\u3002\u8BE6\u7EC6\u4F9D\u636E\u53C2\u89C1\u76F8\u5173\u5B9E\u9A8C\u8BB0\u5F55\u3002")
  );
}
function PlaceholderCard() {
  return import_react.default.createElement(
    "div",
    {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        boxSizing: "border-box",
        padding: "22px 24px",
        border: "1px solid var(--dsw-alias-border-l2)",
        borderRadius: RADIUS.card,
        background: "var(--dsw-alias-bg-layer-1)",
        boxShadow: "var(--dsw-shadow-lv2)",
        zIndex: 4,
        textAlign: "center",
        fontFamily: FONT_SANS
      }
    },
    import_react.default.createElement("div", {
      style: {
        color: "var(--dsw-alias-label-caption)",
        fontSize: 9.5,
        letterSpacing: ".12em",
        fontWeight: 650,
        textTransform: "uppercase",
        fontFamily: FONT_MONO,
        marginBottom: 8
      }
    }, "RESEARCH WORKSPACE"),
    import_react.default.createElement("p", {
      style: {
        color: "var(--dsw-alias-label-primary)",
        fontSize: 13.5,
        fontWeight: 600,
        margin: "0 0 6px"
      }
    }, "No active research session"),
    import_react.default.createElement("p", {
      style: {
        color: "var(--dsw-alias-label-secondary)",
        fontSize: 11.5,
        lineHeight: 1.5,
        margin: 0
      }
    }, "\u5728\u804A\u5929\u6846\u8FD0\u884C /load-research \u8BFB\u53D6\u73B0\u6709\u9879\u76EE\uFF0C\u6216 /start-research \u521D\u59CB\u5316\u65B0\u7814\u7A76")
  );
}
function CodeSandboxView({ code, filename }) {
  const [copied, setCopied] = (0, import_react.useState)(false);
  const lineCount = code ? code.split("\n").length : 0;
  const handleCopy = (e) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }).catch(() => {
      });
    }
  };
  return import_react.default.createElement(
    "div",
    {
      style: {
        position: "relative",
        background: "var(--dsw-alias-bg-base)",
        borderRadius: RADIUS.sub,
        overflow: "hidden",
        border: "1px solid var(--dsw-alias-border-l3)",
        marginTop: 8
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 11px",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)",
          borderBottom: "1px solid var(--dsw-alias-border-l3)",
          fontSize: 11.5,
          fontFamily: FONT_MONO
        }
      },
      import_react.default.createElement("span", {
        style: { color: "var(--dsw-alias-label-secondary)", fontWeight: 500 }
      }, `${lineCount} \u884C\u4EE3\u7801`),
      import_react.default.createElement("button", {
        onClick: handleCopy,
        style: {
          background: copied ? "#5c8a7718" : "var(--dsw-alias-bg-layer-2)",
          border: `1px solid ${copied ? "#5c8a7740" : "var(--dsw-alias-border-l3)"}`,
          borderRadius: RADIUS.control,
          padding: "3px 9px",
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 500,
          color: copied ? "#5c8a77" : "var(--dsw-alias-label-secondary)",
          cursor: "pointer",
          transition: "all 120ms ease"
        }
      }, copied ? "\u2713 \u5DF2\u590D\u5236" : "\u590D\u5236\u4EE3\u7801")
    ),
    import_react.default.createElement("pre", {
      style: {
        margin: 0,
        padding: "12px 14px",
        fontFamily: FONT_MONO,
        fontSize: 12,
        lineHeight: 1.65,
        color: "var(--dsw-alias-label-primary)",
        overflowX: "auto",
        maxHeight: 280,
        whiteSpace: "pre",
        tabSize: 2
      }
    }, code)
  );
}
function ImageSandboxView({ src, alt }) {
  const isSvgMarkup = typeof src === "string" && (src.trim().startsWith("<svg") || src.trim().startsWith("<?xml"));
  return import_react.default.createElement(
    "div",
    {
      style: {
        background: "var(--dsw-alias-bg-base)",
        borderRadius: RADIUS.sub,
        overflow: "hidden",
        border: "1px solid var(--dsw-alias-border-l3)",
        marginTop: 8,
        padding: 12,
        textAlign: "center"
      }
    },
    isSvgMarkup ? import_react.default.createElement("div", {
      style: {
        maxWidth: "100%",
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      dangerouslySetInnerHTML: { __html: src }
    }) : import_react.default.createElement("img", {
      src,
      alt: alt || "Sandbox Figure",
      style: {
        maxWidth: "100%",
        maxHeight: 300,
        objectFit: "contain",
        borderRadius: RADIUS.badge,
        display: "inline-block"
      }
    })
  );
}
function DocSandboxView({ text }) {
  const [copied, setCopied] = (0, import_react.useState)(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }).catch(() => {
      });
    }
  };
  return import_react.default.createElement(
    "div",
    {
      style: {
        position: "relative",
        background: "var(--dsw-alias-bg-base)",
        borderRadius: RADIUS.sub,
        overflow: "hidden",
        border: "1px solid var(--dsw-alias-border-l3)",
        marginTop: 8
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 11px",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)",
          borderBottom: "1px solid var(--dsw-alias-border-l3)",
          fontSize: 11.5,
          fontFamily: FONT_MONO
        }
      },
      import_react.default.createElement("span", {
        style: { color: "var(--dsw-alias-label-secondary)", fontSize: 11, fontWeight: 600, letterSpacing: ".05em" }
      }, "DOCUMENT PREVIEW"),
      import_react.default.createElement("button", {
        onClick: handleCopy,
        style: {
          background: copied ? "#5c8a7718" : "var(--dsw-alias-bg-layer-2)",
          border: `1px solid ${copied ? "#5c8a7740" : "var(--dsw-alias-border-l3)"}`,
          borderRadius: RADIUS.control,
          padding: "3px 9px",
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 500,
          color: copied ? "#5c8a77" : "var(--dsw-alias-label-secondary)",
          cursor: "pointer",
          transition: "all 120ms ease"
        }
      }, copied ? "\u2713 \u5DF2\u590D\u5236" : "\u590D\u5236\u5185\u5BB9")
    ),
    import_react.default.createElement("div", {
      style: {
        padding: "12px 14px",
        fontSize: 13,
        lineHeight: 1.7,
        color: "var(--dsw-alias-label-primary)",
        maxHeight: 280,
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        fontFamily: FONT_SANS
      }
    }, text)
  );
}
function SandboxBlock({ node }) {
  if (!node.sandboxPath && !node.content && !node.preview) return null;
  const isStaged = node.staged !== false;
  const pathStr = node.sandboxPath || "virtual/unnamed";
  const isImage = node.fileType === "image" || Boolean(node.preview && node.preview.startsWith("data:image")) || /\.(png|jpe?g|webp|gif|svg)$/i.test(pathStr) || Boolean(node.preview && (node.preview.trim().startsWith("<svg") || node.preview.trim().startsWith("<?xml"))) || Boolean(node.content && (node.content.trim().startsWith("<svg") || node.content.trim().startsWith("<?xml")));
  const isDoc = node.fileType === "markdown" || node.fileType === "text" || /\.(md|txt)$/i.test(pathStr);
  const content = node.content || node.preview || "";
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: "1px solid var(--dsw-alias-border-l3)"
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent)",
          padding: "6px 10px",
          borderRadius: RADIUS.sub,
          border: "1px solid var(--dsw-alias-border-l3)",
          fontSize: 11.5,
          fontFamily: FONT_MONO
        }
      },
      import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--dsw-alias-label-secondary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "75%"
          },
          title: pathStr
        },
        import_react.default.createElement("span", { style: { color: isStaged ? "#b07f43" : "#5c8a77", fontSize: 12 } }, isStaged ? "\u{1F4E6}" : "\u{1F4C1}"),
        import_react.default.createElement("span", { style: { color: "var(--dsw-alias-label-primary)", fontWeight: 550, fontSize: 12 } }, pathStr)
      ),
      import_react.default.createElement("span", {
        style: {
          fontSize: 11,
          fontFamily: FONT_SANS,
          fontWeight: 650,
          color: isStaged ? "#b07f43" : "#5c8a77",
          background: isStaged ? "#b07f4318" : "#5c8a7718",
          border: `1px solid ${isStaged ? "#b07f4335" : "#5c8a7735"}`,
          padding: "2px 7px",
          borderRadius: RADIUS.badge
        }
      }, isStaged ? "\u672A\u843D\u76D8" : "\u5DF2\u843D\u76D8")
    ),
    isImage ? import_react.default.createElement(ImageSandboxView, { src: content, alt: pathStr }) : isDoc ? import_react.default.createElement(DocSandboxView, { text: content }) : import_react.default.createElement(CodeSandboxView, { code: content, filename: pathStr })
  );
}
function VersionPillsBar({ currentVersion, history, selectedVer, onSelectVer }) {
  if (!history || history.length === 0) return null;
  const curVer = currentVersion || "v1.0";
  const allVersions = [
    ...history.map((h) => ({
      version: h.version,
      timestamp: h.timestamp,
      isCurrent: false
    })),
    {
      version: curVer,
      timestamp: "\u6700\u65B0",
      isCurrent: true
    }
  ];
  const isHistorical = selectedVer && selectedVer !== curVer;
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 8,
        marginBottom: 9,
        padding: "7px 10px",
        background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 75%, transparent)",
        border: "1px solid var(--dsw-alias-border-l3)",
        borderRadius: RADIUS.sub
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6
        }
      },
      import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            fontWeight: 650,
            color: "var(--dsw-alias-label-secondary)",
            textTransform: "uppercase",
            letterSpacing: ".05em"
          }
        },
        import_react.default.createElement("span", null, "\u23F1\uFE0F"),
        import_react.default.createElement("span", null, "VERSION HISTORY / \u8FED\u4EE3\u5FEB\u7167")
      ),
      isHistorical && import_react.default.createElement("button", {
        onClick: (e) => {
          e.stopPropagation();
          onSelectVer(curVer);
        },
        style: {
          background: "#5c8a7718",
          border: "1px solid #5c8a7740",
          borderRadius: RADIUS.control,
          padding: "2px 7px",
          fontSize: 10.5,
          fontFamily: FONT_SANS,
          color: "#5c8a77",
          fontWeight: 600,
          cursor: "pointer"
        }
      }, "\u5207\u56DE\u6700\u65B0\u7248\u672C \u2794")
    ),
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 5,
          overflowX: "auto"
        }
      },
      allVersions.map((v) => {
        const isSelected = selectedVer ? selectedVer === v.version : v.isCurrent;
        return import_react.default.createElement(
          "button",
          {
            key: v.version,
            onClick: (e) => {
              e.stopPropagation();
              onSelectVer(v.version);
            },
            style: {
              background: isSelected ? "var(--dsw-alias-bg-layer-2)" : "transparent",
              border: isSelected ? v.isCurrent ? "1px solid var(--dsw-alias-state-business-primary)" : "1px solid var(--dsw-alias-border-l1)" : "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "3px 8px",
              fontSize: 11,
              fontFamily: FONT_MONO,
              color: isSelected ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-secondary)",
              fontWeight: isSelected ? 650 : 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "all 120ms ease",
              whiteSpace: "nowrap"
            },
            title: `\u7248\u672C ${v.version} (${v.timestamp || "\u65E0\u65F6\u95F4\u6233"})`
          },
          import_react.default.createElement("span", null, v.version),
          v.isCurrent && import_react.default.createElement("span", {
            style: {
              fontSize: 9.5,
              padding: "0.5px 3.5px",
              borderRadius: RADIUS.badge,
              background: "#5c8a7720",
              color: "#5c8a77",
              fontWeight: 700
            }
          }, "\u6700\u65B0")
        );
      })
    ),
    isHistorical && import_react.default.createElement("div", {
      style: {
        marginTop: 6,
        padding: "4px 8px",
        borderRadius: RADIUS.sub,
        background: "#b07f4314",
        border: "1px solid #b07f4335",
        fontSize: 11,
        color: "#b07f43",
        fontFamily: FONT_SANS
      }
    }, `\u{1F50D} \u6B63\u5728\u67E5\u770B\u5386\u53F2\u5FEB\u7167 [${selectedVer}] \xB7 \u5BF9\u5E94\u5F53\u65F6\u7684\u53C2\u6570\u3001\u4EE3\u7801\u4E0E\u6307\u6807`)
  );
}
function DatasetSlicesBlock({ slices, allNodes, datasetId, onSelectNode }) {
  if (!slices || typeof slices !== "object") return null;
  const sliceEntries = Object.entries(slices);
  if (sliceEntries.length === 0) return null;
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 10,
        marginBottom: 9,
        padding: "8px 11px",
        background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 80%, transparent)",
        border: "1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 70%, #c15f3e)",
        borderRadius: RADIUS.sub
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 7
        }
      },
      import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            fontWeight: 650,
            color: "#c15f3e",
            textTransform: "uppercase",
            letterSpacing: ".05em"
          }
        },
        import_react.default.createElement("span", null, "\u2702\uFE0F"),
        import_react.default.createElement("span", null, "DATA SLICES & COHORTS / \u6570\u636E\u5207\u7247")
      ),
      import_react.default.createElement("span", {
        style: { fontSize: 10.5, fontFamily: FONT_MONO, color: "var(--dsw-alias-label-secondary)" }
      }, `${sliceEntries.length} \u4E2A\u5B9A\u4E49\u5207\u7247`)
    ),
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 6
        }
      },
      sliceEntries.map(([key, slice]) => {
        const isHoldout = slice.holdout === true;
        const consumers = (allNodes || []).filter(
          (n) => n.dataProvenance?.datasetId === datasetId && n.dataProvenance?.slice === key
        );
        return import_react.default.createElement(
          "div",
          {
            key,
            style: {
              background: "var(--dsw-alias-bg-layer-2)",
              padding: "7px 9px",
              borderRadius: RADIUS.sub,
              border: `1px solid ${isHoldout ? "#b4535345" : "var(--dsw-alias-border-l3)"}`,
              display: "flex",
              flexDirection: "column",
              gap: 3.5
            }
          },
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 4
              }
            },
            import_react.default.createElement("span", {
              style: {
                fontWeight: 650,
                fontSize: 11.5,
                color: isHoldout ? "#b45353" : "var(--dsw-alias-label-primary)",
                fontFamily: FONT_MONO
              }
            }, key),
            isHoldout ? import_react.default.createElement("span", {
              style: {
                fontSize: 9.5,
                fontFamily: FONT_MONO,
                background: "#b4535320",
                color: "#b45353",
                border: "1px solid #b4535340",
                padding: "1px 4px",
                borderRadius: RADIUS.badge,
                fontWeight: 700
              }
            }, "\u{1F512} HOLDOUT") : slice.split && import_react.default.createElement("span", {
              style: {
                fontSize: 9.5,
                fontFamily: FONT_MONO,
                background: "var(--dsw-alias-bg-layer-1)",
                color: "var(--dsw-alias-label-secondary)",
                padding: "1px 4px",
                borderRadius: RADIUS.badge
              }
            }, slice.split)
          ),
          slice.name && import_react.default.createElement("div", {
            style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)", fontWeight: 500 }
          }, slice.name),
          (slice.samples !== void 0 || slice.criteria) && import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10.5,
                fontFamily: FONT_MONO,
                color: "var(--dsw-alias-label-secondary)",
                flexWrap: "wrap"
              }
            },
            slice.samples !== void 0 && import_react.default.createElement("span", {
              style: { color: "var(--dsw-alias-label-primary)", fontWeight: 600 }
            }, `N = ${slice.samples}`),
            slice.criteria && import_react.default.createElement("span", {
              style: { opacity: 0.85 },
              title: `\u8FC7\u6EE4\u89C4\u5219: ${slice.criteria}`
            }, `\u89C4\u5219: ${slice.criteria}`)
          ),
          consumers.length > 0 && import_react.default.createElement(
            "div",
            {
              style: {
                marginTop: 4,
                paddingTop: 4,
                borderTop: "1px solid var(--dsw-alias-border-l3)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap"
              }
            },
            import_react.default.createElement("span", {
              style: { fontSize: 10, color: "var(--dsw-alias-label-secondary)", fontFamily: FONT_MONO }
            }, "\u6D88\u8D39\u6B64\u5207\u7247:"),
            consumers.map((c) => import_react.default.createElement("button", {
              key: c.id,
              onClick: (e) => {
                e.stopPropagation();
                onSelectNode(c.id);
              },
              style: {
                background: "var(--dsw-alias-bg-layer-1)",
                border: "1px solid var(--dsw-alias-border-l3)",
                borderRadius: RADIUS.badge,
                padding: "1px 4.5px",
                fontSize: 10,
                fontFamily: FONT_MONO,
                color: "var(--dsw-alias-state-business-primary)",
                cursor: "pointer"
              },
              title: `\u8DF3\u8F6C\u81F3\u6D88\u8D39\u8282\u70B9: ${c.title}`
            }, c.id))
          )
        );
      })
    )
  );
}
function DataProvenanceBadge({ dataProvenance, allNodes, onSelectNode, isCompact }) {
  if (!dataProvenance || typeof dataProvenance !== "object") return null;
  const dsId = dataProvenance.datasetId;
  const targetDs = (allNodes || []).find((n) => n.id === dsId);
  const isHoldout = dataProvenance.holdout === true;
  if (isCompact) {
    return import_react.default.createElement(
      "span",
      {
        style: {
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          color: isHoldout ? "#b45353" : "#c15f3e",
          background: isHoldout ? "#b4535318" : "#c15f3e12",
          border: `1px solid ${isHoldout ? "#b4535340" : "#c15f3e28"}`,
          padding: "1.5px 5.5px",
          borderRadius: RADIUS.badge,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 3.5
        },
        title: `\u6570\u636E\u8840\u7EDF: ${targetDs?.title || dsId || "\u672A\u77E5\u6570\u636E\u96C6"}${dataProvenance.slice ? ` [${dataProvenance.slice}]` : ""}`
      },
      import_react.default.createElement("span", null, "\u{1F4CA}"),
      import_react.default.createElement("span", null, `${dsId || "data"}${dataProvenance.slice ? `/${dataProvenance.slice}` : ""}`)
    );
  }
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 8,
        marginBottom: 8,
        padding: "7px 10px",
        borderRadius: RADIUS.sub,
        background: isHoldout ? "#b4535312" : "#c15f3e10",
        border: `1px solid ${isHoldout ? "#b4535338" : "#c15f3e30"}`,
        display: "flex",
        flexDirection: "column",
        gap: 3.5,
        fontFamily: FONT_SANS
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4
        }
      },
      import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            fontWeight: 700,
            color: isHoldout ? "#b45353" : "#c15f3e",
            textTransform: "uppercase",
            letterSpacing: ".05em"
          }
        },
        import_react.default.createElement("span", null, "\u{1F4CA}"),
        import_react.default.createElement("span", null, "DATA PROVENANCE / \u6570\u636E\u8840\u7EDF")
      ),
      isHoldout && import_react.default.createElement("span", {
        style: {
          fontSize: 10,
          fontFamily: FONT_MONO,
          color: "#b45353",
          background: "#b4535324",
          border: "1px solid #b4535350",
          padding: "1px 5px",
          borderRadius: RADIUS.badge,
          fontWeight: 700
        }
      }, "\u26A0\uFE0F HOLDOUT (\u9632\u6CC4\u9732\u9694\u79BB)")
    ),
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11.5,
          fontFamily: FONT_MONO,
          color: "var(--dsw-alias-label-primary)",
          flexWrap: "wrap"
        }
      },
      dsId && import_react.default.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            onSelectNode(dsId);
          },
          style: {
            background: "var(--dsw-alias-bg-layer-2)",
            border: "1px solid var(--dsw-alias-border-l2)",
            borderRadius: RADIUS.control,
            padding: "2px 7px",
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "#c15f3e",
            fontWeight: 650,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 3.5,
            transition: "all 120ms ease"
          },
          title: `\u8DF3\u8F6C\u81F3\u5BF9\u5E94\u6570\u636E\u96C6: ${targetDs?.title || dsId}`
        },
        import_react.default.createElement("span", null, "\u21B3 \u6570\u636E\u96C6:"),
        import_react.default.createElement("span", null, dsId)
      ),
      dataProvenance.slice && import_react.default.createElement("span", {
        style: {
          background: "var(--dsw-alias-bg-layer-1)",
          border: "1px solid var(--dsw-alias-border-l3)",
          borderRadius: RADIUS.badge,
          padding: "2px 6px",
          fontWeight: 600,
          color: "var(--dsw-alias-label-secondary)"
        }
      }, `\u5207\u7247: ${dataProvenance.slice}`),
      dataProvenance.samples !== void 0 && import_react.default.createElement("span", {
        style: { color: "var(--dsw-alias-label-secondary)", fontWeight: 550 }
      }, `N = ${dataProvenance.samples}`),
      dataProvenance.split && import_react.default.createElement("span", {
        style: {
          color: "var(--dsw-alias-label-secondary)",
          background: "var(--dsw-alias-bg-layer-1)",
          padding: "2px 5.5px",
          borderRadius: RADIUS.badge,
          border: "1px solid var(--dsw-alias-border-l3)",
          fontSize: 10.5
        }
      }, dataProvenance.split)
    ),
    dataProvenance.criteria && import_react.default.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--dsw-alias-label-secondary)",
        fontFamily: FONT_MONO,
        marginTop: 2
      }
    }, `\u8FC7\u6EE4\u6761\u4EF6: ${dataProvenance.criteria}`)
  );
}
function CardThreadPanel({ node, isFocused, onSetFocus, onSendMessage, isThinking, elapsedSec }) {
  const [inputText, setInputText] = (0, import_react.useState)("");
  const thread = Array.isArray(node.thread) ? node.thread : [];
  const listRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [thread.length, isThinking]);
  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isThinking) return;
    if (onSendMessage) {
      onSendMessage(text);
    }
    setInputText("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const quickTemplates = [
    { label: "\u{1F50D} \u5F52\u56E0\u5206\u6790", prompt: "\u8BF7\u5BF9\u8BE5\u5361\u7247\u7684\u5F02\u5E38\u539F\u56E0/\u74F6\u9888\u8FDB\u884C\u6DF1\u5165\u5F52\u56E0\u5206\u6790\uFF0C\u5BFB\u627E\u5173\u952E\u81F4\u9519\u6837\u672C\u4E0E\u53D8\u91CF\u3002" },
    { label: "\u{1F9EA} \u6D88\u878D\u65B9\u6848", prompt: "\u9488\u5BF9\u8BE5\u5361\u7247\u8BBE\u8BA1\u63A7\u5236\u53D8\u91CF\u6D88\u878D\u5BF9\u6BD4\u65B9\u6848\uFF0C\u5E76\u660E\u786E\u68C0\u9A8C\u6307\u6807\u3002" },
    { label: "\u{1F4CA} \u7ED3\u679C\u590D\u76D8", prompt: "\u8BF7\u590D\u76D8\u8BE5\u5361\u7247\u5F53\u524D\u7684\u6307\u6807\u8868\u73B0\u4E0E\u5386\u53F2\u5BF9\u6BD4\uFF0C\u8BC4\u4F30\u662F\u5426\u7B26\u5408\u9884\u671F\u3002" }
  ];
  return import_react.default.createElement(
    "div",
    {
      style: {
        marginTop: 10,
        padding: "10px 12px 11px",
        background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 85%, transparent)",
        border: isFocused ? "1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, #c15f3e)" : "1px solid var(--dsw-alias-border-l3)",
        borderRadius: RADIUS.sub,
        boxShadow: isFocused ? "0 0 0 1px #c15f3e30" : void 0
      },
      onClick: (e) => e.stopPropagation()
    },
    // Header
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          paddingBottom: 6,
          borderBottom: "1px solid var(--dsw-alias-border-l3)"
        }
      },
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 6 } },
        import_react.default.createElement("span", { style: { fontSize: 13 } }, "\u{1F4AC}"),
        import_react.default.createElement("span", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            fontFamily: FONT_SANS,
            color: "var(--dsw-alias-label-primary)"
          }
        }, `\u5361\u7247\u4E13\u5C5E\u7814\u8BA8 (${thread.length})`)
      ),
      import_react.default.createElement(
        "button",
        {
          onClick: () => onSetFocus && onSetFocus(isFocused ? null : node.id),
          style: {
            background: isFocused ? "#c15f3e20" : "var(--dsw-alias-bg-layer-2)",
            border: isFocused ? "1px solid #c15f3e55" : "1px solid var(--dsw-alias-border-l3)",
            borderRadius: RADIUS.control,
            padding: "2.5px 8px",
            fontSize: 11,
            fontFamily: FONT_SANS,
            color: isFocused ? "#c15f3e" : "var(--dsw-alias-label-secondary)",
            fontWeight: isFocused ? 700 : 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4.5,
            transition: "all 120ms ease"
          },
          title: isFocused ? "\u89E3\u9664\u4E3B\u5BF9\u8BDD\u7126\u70B9\u7ED1\u5B9A" : "\u5C06\u4E3B\u5BF9\u8BDD\u8F93\u5165\u680F\u805A\u7126\u7ED1\u5B9A\u5230\u6B64\u5361\u7247"
        },
        import_react.default.createElement("span", null, isFocused ? "\u{1F3AF}" : "\u25CE"),
        import_react.default.createElement("span", null, isFocused ? "\u5DF2\u8BBE\u4E3A\u4E3B\u7126\u70B9 (\u70B9\u51FB\u89E3\u9664)" : "\u8BBE\u4E3A\u4E3B\u5BF9\u8BDD\u7126\u70B9")
      )
    ),
    // Messages list
    import_react.default.createElement(
      "div",
      {
        ref: listRef,
        style: {
          maxHeight: 180,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          padding: "2px 2px 4px",
          marginBottom: 8
        }
      },
      thread.length === 0 ? import_react.default.createElement("div", {
        style: {
          textAlign: "center",
          padding: "16px 8px",
          color: "var(--dsw-alias-label-tertiary)",
          fontSize: 11.5,
          fontStyle: "italic"
        }
      }, "\u6682\u65E0\u9488\u5BF9\u6B64\u5361\u7247\u7684\u8BA8\u8BBA\u3002\u70B9\u51FB\u4E0B\u65B9\u5FEB\u6377\u6A21\u677F\u6216\u8F93\u5165\u95EE\u9898\u53D1\u8D77\u4E13\u5C5E\u7814\u8BA8\u3002") : thread.map((msg, i) => {
        const isUser = msg.sender === "user";
        const isSys = msg.sender === "system";
        if (isSys) {
          return import_react.default.createElement("div", {
            key: msg.id || i,
            style: {
              textAlign: "center",
              fontSize: 10.5,
              color: "var(--dsw-alias-label-tertiary)",
              fontFamily: FONT_MONO,
              padding: "2px 0"
            }
          }, msg.text);
        }
        return import_react.default.createElement(
          "div",
          {
            key: msg.id || i,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: isUser ? "flex-end" : "flex-start",
              gap: 2
            }
          },
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10,
                fontFamily: FONT_MONO,
                color: "var(--dsw-alias-label-tertiary)",
                padding: "0 4px"
              }
            },
            import_react.default.createElement("span", { style: { fontWeight: 600, color: isUser ? "#5c8a77" : "#c15f3e" } }, isUser ? "\u4F60" : "Agent"),
            msg.timestamp && import_react.default.createElement("span", null, msg.timestamp)
          ),
          import_react.default.createElement("div", {
            style: {
              maxWidth: "92%",
              padding: "6px 9.5px",
              borderRadius: RADIUS.sub,
              fontSize: 12,
              lineHeight: 1.5,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              background: isUser ? "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #5c8a7718)" : "var(--dsw-alias-bg-layer-2)",
              border: isUser ? "1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, #5c8a7735)" : "1px solid var(--dsw-alias-border-l3)",
              color: "var(--dsw-alias-label-primary)"
            }
          }, msg.text)
        );
      }),
      isThinking && import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            marginTop: 4
          }
        },
        import_react.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10,
              fontFamily: FONT_MONO,
              color: "#c15f3e",
              padding: "0 4px"
            }
          },
          import_react.default.createElement("span", { style: { fontWeight: 600 } }, "Agent"),
          import_react.default.createElement("span", { style: { opacity: 0.8 } }, "\u601D\u8003\u4E2D..."),
          elapsedSec > 0 && import_react.default.createElement("span", { style: { opacity: 0.6 } }, `${elapsedSec}s`)
        ),
        import_react.default.createElement(
          "div",
          {
            className: "dsh-pulse-pill",
            style: {
              padding: "6px 11px",
              borderRadius: RADIUS.sub,
              background: "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #c15f3e12)",
              border: "1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 70%, #c15f3e35)",
              display: "inline-flex",
              alignItems: "center",
              gap: 5
            }
          },
          import_react.default.createElement("span", { className: "dsh-typing-dot", style: { width: 5, height: 5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-2", style: { width: 5, height: 5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-3", style: { width: 5, height: 5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", {
            className: "dsh-shimmer-text",
            style: {
              fontSize: 11.5,
              marginLeft: 5,
              fontFamily: FONT_SANS
            }
          }, `\u6B63\u5728\u9488\u5BF9 [${node.id}] \u7814\u8BA8\u601D\u8003...`)
        )
      )
    ),
    // Quick Templates Chips
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 4.5,
          marginBottom: 8
        }
      },
      quickTemplates.map((tmpl) => import_react.default.createElement("button", {
        key: tmpl.label,
        onClick: () => setInputText(tmpl.prompt),
        style: {
          background: "var(--dsw-alias-bg-layer-2)",
          border: "1px solid var(--dsw-alias-border-l3)",
          borderRadius: RADIUS.control,
          padding: "2px 6.5px",
          fontSize: 10.5,
          color: "var(--dsw-alias-label-secondary)",
          cursor: "pointer",
          transition: "all 120ms ease"
        },
        title: `\u70B9\u51FB\u586B\u5165: "${tmpl.prompt}"`
      }, tmpl.label))
    ),
    // Input Box
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: 6,
          alignItems: "flex-end"
        }
      },
      import_react.default.createElement("textarea", {
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: isThinking ? `Agent \u6B63\u5728\u601D\u8003\u5904\u7406\u4E2D\uFF0C\u53EF\u7EE7\u7EED\u8F93\u5165...` : `\u5BF9 [${node.id}] \u53D1\u8D77\u8BA8\u8BBA... (Enter \u53D1\u9001, Shift+Enter \u6362\u884C)`,
        rows: 2,
        style: {
          flex: 1,
          resize: "none",
          padding: "6px 8px",
          borderRadius: RADIUS.control,
          border: "1px solid var(--dsw-alias-border-l2)",
          background: "var(--dsw-alias-bg-layer-2)",
          color: "var(--dsw-alias-label-primary)",
          fontSize: 12,
          fontFamily: FONT_SANS,
          lineHeight: 1.45,
          outline: "none"
        }
      }),
      import_react.default.createElement(
        "button",
        {
          onClick: handleSend,
          disabled: isThinking || !inputText.trim(),
          style: {
            background: isThinking ? "#c15f3e1c" : inputText.trim() ? "#c15f3e" : "var(--dsw-alias-bg-layer-2)",
            color: isThinking ? "#c15f3e" : inputText.trim() ? "#fff" : "var(--dsw-alias-label-tertiary)",
            border: isThinking ? "1px solid #c15f3e50" : inputText.trim() ? "1px solid #c15f3e" : "1px solid var(--dsw-alias-border-l3)",
            borderRadius: RADIUS.control,
            padding: "6px 11px",
            fontSize: 11.5,
            fontWeight: 600,
            cursor: isThinking ? "wait" : inputText.trim() ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
            height: 34,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            transition: "all 120ms ease"
          }
        },
        isThinking && import_react.default.createElement("span", { className: "dsh-spin", style: { fontSize: 11 } }, "\u23F3"),
        import_react.default.createElement("span", null, isThinking ? `\u601D\u8003\u4E2D${elapsedSec > 0 ? ` (${elapsedSec}s)` : "..."}` : "\u53D1\u9001")
      )
    )
  );
}
function ColumnCard({ node, isSelected, isExpanded, isConnected, onSelect, connectedEdges, allNodes, activeThreadId, onSetFocus, onSendMessage, isThinking, elapsedSec, onOpenChartModal }) {
  const isChart = node.kind === "artifact" && (node.tags && (node.tags.includes("chart") || node.tags.includes("plot") || node.tags.includes("figure")) || node.fileType === "image" || Boolean(node.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(node.sandboxPath)) || Boolean(node.preview && (node.preview.trim().startsWith("<svg") || node.preview.trim().startsWith("data:image"))) || Boolean(node.content && node.content.trim().startsWith("<svg")));
  const meta = isChart ? { label: "Chart", zh: "\u56FE\u8868\u5206\u6790", color: "#5a82a6", bg: "#5a82a614", border: "#5a82a630" } : TYPE_META[node.kind] || { label: node.kind, zh: node.kind, color: "#777", bg: "#77777712", border: "#77777724" };
  const statusMeta = getNodeStatusMeta(node);
  const isDegraded = statusMeta?.isDegraded;
  const isDataset = node.kind === "dataset";
  const isArtifact = node.kind === "artifact";
  const isWide = isDataset || isArtifact;
  const curVer = node.version || "v1.0";
  const history = Array.isArray(node.history) ? node.history : [];
  const hasHistory = history.length > 0;
  const [selectedVer, setSelectedVer] = (0, import_react.useState)(curVer);
  (0, import_react.useEffect)(() => {
    setSelectedVer(curVer);
  }, [curVer]);
  const isHistorical = hasHistory && selectedVer && selectedVer !== curVer;
  const activeSnapshot = isHistorical ? history.find((h) => h.version === selectedVer) || null : null;
  const displayMetrics = activeSnapshot ? activeSnapshot.metrics : node.metrics;
  const displayDetail = activeSnapshot ? activeSnapshot.detail : node.detail;
  const displayDegradation = activeSnapshot ? activeSnapshot.degradationReason : node.degradationReason;
  const displayStage = activeSnapshot ? activeSnapshot.stage || node.stage : node.stage;
  const displaySandboxNode = activeSnapshot ? {
    ...node,
    sandboxPath: activeSnapshot.sandboxPath || node.sandboxPath,
    content: activeSnapshot.content || node.content,
    preview: activeSnapshot.preview || node.preview
  } : node;
  let priorMetrics = null;
  let priorLabel = null;
  if (hasHistory) {
    if (!isHistorical) {
      const latestHist = history[history.length - 1];
      if (latestHist?.metrics) {
        priorMetrics = latestHist.metrics;
        priorLabel = latestHist.version;
      }
    } else {
      const histIdx = history.findIndex((h) => h.version === selectedVer);
      if (histIdx > 0 && history[histIdx - 1]?.metrics) {
        priorMetrics = history[histIdx - 1].metrics;
        priorLabel = history[histIdx - 1].version;
      }
    }
  }
  const fields = node.fields || {};
  const fieldEntries = Object.entries(fields);
  const hasSandbox = Boolean(displaySandboxNode.sandboxPath || displaySandboxNode.content || displaySandboxNode.preview);
  const isStaged = hasSandbox && displaySandboxNode.staged !== false;
  const incoming = (connectedEdges || []).filter((e) => e.target === node.id);
  const outgoing = (connectedEdges || []).filter((e) => e.source === node.id);
  const hasRelations = incoming.length > 0 || outgoing.length > 0;
  return import_react.default.createElement(
    "div",
    {
      id: `card-${node.id}`,
      onClick: () => onSelect(node.id),
      style: {
        boxSizing: "border-box",
        borderRadius: RADIUS.card,
        border: isSelected ? `1px solid ${meta.color}` : activeThreadId === node.id ? "1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, #c15f3e)" : isDegraded ? "1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 65%, #b45353)" : isConnected ? `1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, ${meta.color})` : isWide ? `1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 75%, ${meta.color})` : "1px solid var(--dsw-alias-border-l2)",
        background: isSelected ? `color-mix(in srgb, var(--dsw-alias-bg-layer-2) 94%, ${meta.color})` : isDegraded ? "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 96%, #b4535312)" : "var(--dsw-alias-bg-layer-2)",
        boxShadow: isSelected ? `0 0 0 1.5px ${meta.color}35, var(--dsw-shadow-lv2)` : "var(--dsw-shadow-lv1)",
        padding: isExpanded ? isWide ? "18px 20px 20px" : "15px 17px 17px" : isWide ? "13px 18px" : "11px 14px",
        marginBottom: 11,
        cursor: "pointer",
        transition: "opacity 140ms ease, border-color 140ms ease, box-shadow 140ms ease, padding 140ms ease",
        opacity: isConnected !== null ? isConnected ? 1 : 0.32 : 1,
        fontFamily: FONT_SANS
      }
    },
    // Card Header
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: isExpanded ? 7 : 6,
          paddingBottom: isExpanded && isWide ? 8 : 0,
          borderBottom: isExpanded && isWide ? "1px solid var(--dsw-alias-border-l3)" : void 0
        }
      },
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } },
        import_react.default.createElement("span", {
          style: {
            color: meta.color,
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            fontSize: 11,
            fontWeight: 650,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            padding: "2.5px 7px",
            borderRadius: RADIUS.badge
          }
        }, meta.label),
        statusMeta && import_react.default.createElement(
          "span",
          {
            style: {
              color: statusMeta.color,
              background: statusMeta.bg,
              border: `1px solid ${statusMeta.border}`,
              fontSize: 11,
              fontWeight: 650,
              padding: "2px 6.5px",
              borderRadius: RADIUS.badge,
              display: "inline-flex",
              alignItems: "center",
              gap: 3.5
            },
            title: `\u72B6\u6001: ${statusMeta.zh} (${statusMeta.label})`
          },
          isDegraded && import_react.default.createElement("span", { style: { fontSize: 10 } }, "\u2715"),
          import_react.default.createElement("span", null, statusMeta.zh)
        ),
        (node.version || hasHistory) && import_react.default.createElement("span", {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            fontWeight: 650,
            color: "#6e8299",
            background: "#6e829916",
            border: "1px solid #6e829935",
            padding: "2px 5.5px",
            borderRadius: RADIUS.badge
          },
          title: hasHistory ? `\u7248\u672C: ${curVer} (${history.length} \u4E2A\u5386\u53F2\u5FEB\u7167)` : `\u7248\u672C: ${curVer}`
        }, `${curVer}${hasHistory ? ` [${history.length + 1}]` : ""}`),
        node.thread && Array.isArray(node.thread) && node.thread.length > 0 && import_react.default.createElement(
          "span",
          {
            style: {
              fontSize: 10.5,
              fontFamily: FONT_MONO,
              color: "#8e799c",
              background: "#8e799c15",
              border: "1px solid #8e799c35",
              padding: "2px 5.5px",
              borderRadius: RADIUS.badge,
              display: "inline-flex",
              alignItems: "center",
              gap: 3.5,
              fontWeight: 600
            },
            title: `\u5361\u7247\u7814\u8BA8\u7EBF\u7D22: ${node.thread.length} \u6761\u53D1\u8A00`
          },
          import_react.default.createElement("span", null, "\u{1F4AC}"),
          import_react.default.createElement("span", null, node.thread.length)
        ),
        activeThreadId === node.id && import_react.default.createElement(
          "span",
          {
            style: {
              fontSize: 10.5,
              fontFamily: FONT_SANS,
              color: "#c15f3e",
              background: "#c15f3e18",
              border: "1px solid #c15f3e45",
              padding: "2px 6.5px",
              borderRadius: RADIUS.badge,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 3.5
            },
            title: "\u5F53\u524D\u5904\u4E8E\u4E3B\u5BF9\u8BDD\u805A\u7126\u7814\u8BA8\u72B6\u6001"
          },
          import_react.default.createElement("span", null, "\u{1F3AF}"),
          import_react.default.createElement("span", null, "\u7814\u8BA8\u7126\u70B9")
        ),
        displayStage && import_react.default.createElement("span", {
          style: {
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            color: "var(--dsw-alias-label-secondary)",
            background: "var(--dsw-alias-bg-layer-1)",
            border: "1px solid var(--dsw-alias-border-l3)",
            padding: "2px 5.5px",
            borderRadius: RADIUS.badge,
            fontWeight: 500
          },
          title: `\u9636\u6BB5: ${displayStage}`
        }, `\u{1F4CD} ${displayStage}`),
        !isExpanded && node.dataProvenance && import_react.default.createElement(DataProvenanceBadge, {
          dataProvenance: node.dataProvenance,
          allNodes,
          onSelectNode: onSelect,
          isCompact: true
        }),
        hasSandbox && import_react.default.createElement(
          "span",
          {
            style: {
              fontSize: 11,
              fontFamily: FONT_SANS,
              color: isStaged ? "#b07f43" : "#5c8a77",
              background: isStaged ? "#b07f4314" : "#5c8a7714",
              border: `1px solid ${isStaged ? "#b07f4335" : "#5c8a7735"}`,
              padding: "2px 7px",
              borderRadius: RADIUS.badge,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontWeight: 600
            },
            title: isStaged ? "\u6682\u5B58\u4E8E\u865A\u62DF\u6C99\u7BB1\u4E2D\uFF0C\u5C1A\u672A\u5199\u5165\u78C1\u76D8" : "\u5DF2\u5199\u5165\u5DE5\u4F5C\u533A\u78C1\u76D8\u6587\u4EF6"
          },
          import_react.default.createElement("span", null, isStaged ? "\u{1F4E6}" : "\u2713"),
          import_react.default.createElement("span", null, isStaged ? "\u6C99\u7BB1\u6682\u5B58" : "\u5DF2\u843D\u76D8")
        ),
        (fields.format || isArtifact && node.fileType) && import_react.default.createElement("span", {
          style: {
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "var(--dsw-alias-label-secondary)",
            background: "var(--dsw-alias-bg-layer-1)",
            padding: "2px 6.5px",
            borderRadius: RADIUS.badge,
            border: "1px solid var(--dsw-alias-border-l3)",
            fontWeight: 600
          }
        }, String(fields.format || node.fileType).toUpperCase()),
        // Plottable Quick Action button (for experiments, datasets, or nodes with metrics/slices)
        (node.kind === "experiment" || node.kind === "dataset" || node.metrics && Object.keys(node.metrics).length > 0 || node.slices) && import_react.default.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              if (onOpenChartModal) onOpenChartModal([node.id]);
            },
            style: {
              background: "var(--dsw-alias-bg-layer-1)",
              border: "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.badge,
              padding: "1.5px 6.5px",
              fontSize: 10.5,
              fontFamily: FONT_SANS,
              color: "var(--dsw-alias-label-secondary)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 3.5,
              fontWeight: 600,
              transition: "all 120ms ease"
            },
            title: `\u4EE5 [${node.id}] \u4E3A\u57FA\u51C6\u7ED8\u5236\u79D1\u7814\u56FE\u8868`
          },
          import_react.default.createElement("span", null, "\u{1F4C8}"),
          import_react.default.createElement("span", null, "\u753B\u56FE")
        )
      ),
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 7 } },
        import_react.default.createElement("span", {
          style: {
            color: "var(--dsw-alias-label-secondary)",
            fontSize: 11.5,
            fontFamily: FONT_MONO,
            fontWeight: 500
          }
        }, node.id),
        import_react.default.createElement("span", {
          style: {
            fontSize: 12,
            color: isExpanded ? meta.color : "var(--dsw-alias-label-tertiary)",
            transition: "transform 160ms ease, color 160ms ease",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
            lineHeight: 1,
            padding: "1px 3px"
          },
          title: isExpanded ? "\u6536\u8D77" : "\u5C55\u5F00"
        }, "\u25BE")
      )
    ),
    // Title
    import_react.default.createElement("div", {
      style: {
        fontSize: isWide ? 15.5 : 14,
        lineHeight: 1.48,
        fontWeight: 650,
        color: isDegraded ? "color-mix(in srgb, var(--dsw-alias-label-primary) 85%, #b45353)" : "var(--dsw-alias-label-primary)",
        marginBottom: isExpanded ? displayDetail ? 7 : 8 : 0,
        letterSpacing: "-0.01em"
      }
    }, node.title),
    // Compact summary metrics (when not expanded)
    !isExpanded && displayMetrics && Object.keys(displayMetrics).length > 0 && import_react.default.createElement(
      "div",
      {
        style: {
          marginTop: 6,
          display: "flex",
          flexWrap: "wrap",
          gap: 5
        }
      },
      Object.entries(displayMetrics).slice(0, 3).map(([k, v]) => import_react.default.createElement("span", {
        key: k,
        style: {
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: "var(--dsw-alias-label-secondary)",
          background: "var(--dsw-alias-bg-layer-1)",
          padding: "2px 6px",
          borderRadius: RADIUS.badge,
          border: "1px solid var(--dsw-alias-border-l3)"
        }
      }, `${k.toUpperCase()}: ${typeof v === "number" && v <= 1 && v >= 0 && /(ppv|sens|spec|auc|acc|rate|ratio|f1)/i.test(k) ? (v * 100).toFixed(1) + "%" : v}`))
    ),
    // Version Pills Bar (when expanded and has history)
    isExpanded && hasHistory && import_react.default.createElement(VersionPillsBar, {
      currentVersion: curVer,
      history,
      selectedVer,
      onSelectVer: setSelectedVer
    }),
    // Data Provenance Badge (when expanded)
    isExpanded && node.dataProvenance && import_react.default.createElement(DataProvenanceBadge, {
      dataProvenance: node.dataProvenance,
      allNodes,
      onSelectNode: onSelect,
      isCompact: false
    }),
    // Dataset Slices Block (when expanded and is a dataset node with defined slices)
    isExpanded && isDataset && node.slices && import_react.default.createElement(DatasetSlicesBlock, {
      slices: node.slices,
      allNodes,
      datasetId: node.id,
      onSelectNode: onSelect
    }),
    // Parent derivation link (when expanded)
    isExpanded && node.parent && import_react.default.createElement(
      "div",
      {
        style: {
          marginTop: 7,
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      },
      import_react.default.createElement("span", {
        style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)", fontWeight: 600 }
      }, "\u6D3E\u751F\u6EAF\u6E90:"),
      import_react.default.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            onSelect(node.parent);
          },
          style: {
            background: "var(--dsw-alias-bg-layer-1)",
            border: "1px solid var(--dsw-alias-border-l3)",
            borderRadius: RADIUS.control,
            padding: "2px 7.5px",
            fontSize: 11.5,
            fontFamily: FONT_MONO,
            color: "#c15f3e",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            transition: "all 120ms ease"
          },
          title: `\u70B9\u51FB\u8DF3\u8F6C\u5E76\u805A\u7126\u7236\u8282\u70B9: ${node.parent}`
        },
        import_react.default.createElement("span", null, "\u21B3"),
        import_react.default.createElement("span", { style: { fontWeight: 600 } }, node.parent)
      )
    ),
    // Degradation / Refutation banner (when expanded)
    isExpanded && (isDegraded || displayDegradation) && import_react.default.createElement(DegradationBanner, {
      reason: displayDegradation,
      statusMeta
    }),
    // Detail (description) - ONLY WHEN EXPANDED!
    isExpanded && displayDetail && import_react.default.createElement("div", {
      style: {
        color: "var(--dsw-alias-label-secondary)",
        fontSize: 13,
        lineHeight: 1.65,
        marginTop: 8,
        marginBottom: 8,
        paddingTop: 8,
        borderTop: "1px solid var(--dsw-alias-border-l3)"
      }
    }, displayDetail),
    // Metrics Grid - ONLY WHEN EXPANDED!
    isExpanded && displayMetrics && import_react.default.createElement(MetricsGrid, {
      metrics: displayMetrics,
      priorMetrics,
      priorLabel
    }),
    // Tags row - ONLY WHEN EXPANDED!
    isExpanded && node.tags && Array.isArray(node.tags) && node.tags.length > 0 && import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          marginTop: 7,
          marginBottom: 6
        }
      },
      node.tags.map((tag) => import_react.default.createElement("span", {
        key: tag,
        style: {
          fontSize: 10.5,
          fontFamily: FONT_MONO,
          color: "var(--dsw-alias-label-secondary)",
          background: "var(--dsw-alias-bg-layer-1)",
          border: "1px solid var(--dsw-alias-border-l3)",
          borderRadius: RADIUS.badge,
          padding: "1.5px 5.5px"
        }
      }, `#${tag}`))
    ),
    // Metadata Matrix (Fields) - ONLY WHEN EXPANDED!
    isExpanded && fieldEntries.length > 0 && import_react.default.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: isWide ? "repeat(2, minmax(0, 1fr))" : "1fr",
          gap: 7,
          marginTop: 8,
          marginBottom: 6
        }
      },
      fieldEntries.map(([k, v]) => import_react.default.createElement(
        "div",
        {
          key: k,
          style: {
            background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent)",
            padding: isWide ? "7px 11px" : "5px 9px",
            borderRadius: RADIUS.sub,
            border: "1px solid var(--dsw-alias-border-l3)",
            display: "flex",
            flexDirection: isWide ? "column" : "row",
            alignItems: isWide ? "flex-start" : "baseline",
            justifyContent: isWide ? "flex-start" : "space-between",
            gap: 3.5
          }
        },
        import_react.default.createElement("span", {
          style: {
            color: "var(--dsw-alias-label-secondary)",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".05em"
          }
        }, k.replace(/_/g, " ")),
        import_react.default.createElement("span", {
          style: {
            color: "var(--dsw-alias-label-primary)",
            fontSize: 12.5,
            fontFamily: FONT_MONO,
            fontWeight: 500,
            lineHeight: 1.4,
            wordBreak: "break-word"
          },
          title: String(v)
        }, String(v))
      ))
    ),
    // Sandboxed Content Preview - ONLY WHEN EXPANDED!
    isExpanded && hasSandbox && import_react.default.createElement(SandboxBlock, { node: displaySandboxNode }),
    // Dedicated Card Thread Panel - ONLY WHEN EXPANDED!
    isExpanded && import_react.default.createElement(CardThreadPanel, {
      node,
      isFocused: activeThreadId === node.id,
      onSetFocus,
      onSendMessage: (text) => onSendMessage && onSendMessage(node.id, text),
      isThinking,
      elapsedSec
    }),
    // Explicit Relationship Badges - ONLY WHEN EXPANDED!
    isExpanded && hasRelations && import_react.default.createElement(
      "div",
      {
        style: {
          marginTop: 10,
          paddingTop: 8,
          borderTop: "1px solid var(--dsw-alias-border-l3)",
          display: "flex",
          flexWrap: "wrap",
          gap: 5.5,
          alignItems: "center"
        }
      },
      import_react.default.createElement("span", {
        style: {
          fontSize: 11,
          color: "var(--dsw-alias-label-secondary)",
          fontWeight: 650,
          textTransform: "uppercase",
          letterSpacing: ".06em",
          fontFamily: FONT_MONO,
          marginRight: 4
        }
      }, "RELATIONS"),
      incoming.map((edge) => {
        const src = (allNodes || []).find((n) => n.id === edge.source);
        const srcMeta = TYPE_META[src?.kind] || meta;
        return import_react.default.createElement(
          "button",
          {
            key: `in-${edge.id || edge.source}`,
            onClick: (e) => {
              e.stopPropagation();
              onSelect(edge.source);
            },
            style: {
              background: "var(--dsw-alias-bg-layer-1)",
              border: `1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, ${srcMeta.color})`,
              borderRadius: RADIUS.control,
              padding: "3px 8.5px",
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4.5,
              lineHeight: 1.3,
              transition: "border-color 120ms ease, background 120ms ease"
            },
            title: `\u6765\u6E90\u4E8E: ${src?.title || edge.source} (${edge.label || "\u5173\u8054"})`
          },
          import_react.default.createElement("span", { style: { color: srcMeta.color, fontWeight: 700, fontSize: 12 } }, "\u2190"),
          import_react.default.createElement("span", { style: { fontWeight: 600, color: srcMeta.color, fontFamily: FONT_MONO } }, edge.source),
          edge.label && import_react.default.createElement("span", { style: { opacity: 0.75, fontSize: 11 } }, `(${edge.label})`)
        );
      }),
      outgoing.map((edge) => {
        const tgt = (allNodes || []).find((n) => n.id === edge.target);
        const tgtMeta = TYPE_META[tgt?.kind] || meta;
        return import_react.default.createElement(
          "button",
          {
            key: `out-${edge.id || edge.target}`,
            onClick: (e) => {
              e.stopPropagation();
              onSelect(edge.target);
            },
            style: {
              background: "var(--dsw-alias-bg-layer-1)",
              border: `1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 75%, ${tgtMeta.color})`,
              borderRadius: RADIUS.control,
              padding: "3px 8.5px",
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4.5,
              lineHeight: 1.3,
              transition: "border-color 120ms ease, background 120ms ease"
            },
            title: `\u6307\u5411: ${tgt?.title || edge.target} (${edge.label || "\u5173\u8054"})`
          },
          import_react.default.createElement("span", { style: { fontWeight: 600, color: tgtMeta.color, fontFamily: FONT_MONO } }, edge.target),
          edge.label && import_react.default.createElement("span", { style: { opacity: 0.75, fontSize: 11 } }, `(${edge.label})`),
          import_react.default.createElement("span", { style: { color: tgtMeta.color, fontWeight: 700, fontSize: 12 } }, "\u2192")
        );
      })
    )
  );
}
function ColumnHeader({
  title,
  dotColor,
  nodes,
  activeFilter,
  onFilterChange,
  validLabel = "\u6709\u6548\u8FDB\u5C55",
  degradedLabel = "\u5DF2\u5E9F\u5F03/\u8BC1\u4F2A",
  hideDegraded = false,
  subTabs,
  activeSubTab,
  onSubTabChange,
  extraAction
}) {
  const currentNodes = (0, import_react.useMemo)(() => {
    if (!subTabs || !activeSubTab || activeSubTab === "all") return nodes;
    return nodes.filter((n) => n.kind === activeSubTab);
  }, [nodes, subTabs, activeSubTab]);
  const supportedCount = currentNodes.filter((n) => getNodeStatusMeta(n)?.group === "supported").length;
  const degradedCount = currentNodes.filter((n) => getNodeStatusMeta(n)?.group === "degraded").length;
  const activeCount = currentNodes.filter((n) => getNodeStatusMeta(n)?.group === "active").length;
  const validCount = currentNodes.length - degradedCount;
  const filterTabs = [
    { id: "all", label: "\u5168\u90E8", count: currentNodes.length },
    ...degradedCount > 0 ? [{ id: "valid", label: validLabel, count: validCount }] : [],
    { id: "active", label: "\u8FDB\u884C\u4E2D", count: activeCount },
    { id: "supported", label: "\u5DF2\u8BC1\u5B9E", count: supportedCount },
    { id: "degraded", label: degradedLabel, count: degradedCount }
  ];
  return import_react.default.createElement(
    "div",
    {
      style: {
        padding: "9px 12px 8px",
        borderBottom: "1px solid var(--dsw-alias-border-l3)",
        background: "var(--dsw-alias-bg-layer-1)",
        display: "flex",
        flexDirection: "column",
        gap: 7
      }
    },
    // Title row
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }
      },
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 7 } },
        import_react.default.createElement("span", {
          style: { width: 6, height: 6, borderRadius: RADIUS.round, background: dotColor, display: "inline-block" }
        }),
        import_react.default.createElement("span", {
          style: { fontSize: 13, fontWeight: 650, color: "var(--dsw-alias-label-primary)" }
        }, title)
      ),
      import_react.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 7 } },
        extraAction,
        import_react.default.createElement("span", {
          style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", fontFamily: FONT_MONO, fontWeight: 600 }
        }, hideDegraded && degradedCount > 0 ? `${validCount}/${currentNodes.length}` : currentNodes.length)
      )
    ),
    // Primary Category Sub-tabs Segmented Control
    subTabs && subTabs.length > 1 && import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, transparent)",
          padding: 2,
          borderRadius: RADIUS.control,
          border: "1px solid var(--dsw-alias-border-l3)",
          gap: 2
        }
      },
      subTabs.map((tab) => {
        const isCurrent = (activeSubTab || "all") === tab.id;
        return import_react.default.createElement(
          "button",
          {
            key: tab.id,
            onClick: () => onSubTabChange && onSubTabChange(tab.id),
            style: {
              flex: 1,
              background: isCurrent ? "var(--dsw-alias-bg-layer-1)" : "transparent",
              border: isCurrent ? "1px solid var(--dsw-alias-border-l2)" : "1px solid transparent",
              boxShadow: isCurrent ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              borderRadius: RADIUS.badge,
              padding: "2.5px 6px",
              fontSize: 11,
              fontFamily: FONT_SANS,
              color: isCurrent ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-secondary)",
              fontWeight: isCurrent ? 650 : 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              transition: "all 120ms ease",
              whiteSpace: "nowrap"
            }
          },
          tab.icon && import_react.default.createElement("span", { style: { fontSize: 10.5 } }, tab.icon),
          import_react.default.createElement("span", null, tab.label),
          import_react.default.createElement("span", {
            style: {
              fontSize: 9.5,
              fontFamily: FONT_MONO,
              padding: "0.5px 4px",
              borderRadius: RADIUS.badge,
              background: isCurrent ? "var(--dsw-alias-bg-layer-2)" : "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 50%, transparent)",
              color: isCurrent ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-tertiary)",
              fontWeight: 600
            }
          }, tab.count)
        );
      })
    ),
    // Status Filter row
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 3.5,
          overflowX: "auto"
        }
      },
      filterTabs.map((tab) => {
        const isCurrent = activeFilter === tab.id;
        if (tab.count === 0 && tab.id !== "all") return null;
        return import_react.default.createElement(
          "button",
          {
            key: tab.id,
            onClick: () => onFilterChange(tab.id),
            style: {
              background: isCurrent ? "var(--dsw-alias-bg-layer-2)" : "transparent",
              border: isCurrent ? "1px solid var(--dsw-alias-border-l2)" : "1px solid transparent",
              borderRadius: RADIUS.control,
              padding: "2px 7px",
              fontSize: 11,
              color: isCurrent ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-secondary)",
              fontWeight: isCurrent ? 600 : 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "all 120ms ease",
              whiteSpace: "nowrap"
            }
          },
          import_react.default.createElement("span", null, tab.label),
          import_react.default.createElement("span", {
            style: {
              fontSize: 10,
              fontFamily: FONT_MONO,
              opacity: isCurrent ? 0.9 : 0.65,
              fontWeight: 600
            }
          }, tab.count)
        );
      })
    )
  );
}
function WorkspaceThreadBar({ activeNode, allNodes, onSetFocus, onSendMessage, isBusy, busyTarget, elapsedSec }) {
  const [inputText, setInputText] = (0, import_react.useState)("");
  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isBusy) return;
    if (onSendMessage) {
      onSendMessage(activeNode ? activeNode.id : null, text);
    }
    setInputText("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const quickTemplates = activeNode ? [
    { label: "\u{1F50D} \u74F6\u9888\u5F52\u56E0", prompt: `\u8BF7\u5BF9 [${activeNode.id}] \u8FDB\u884C\u74F6\u9888\u5F52\u56E0\u5206\u6790\uFF0C\u5BFB\u627E\u5173\u952E\u81F4\u9519\u6837\u672C\u3002` },
    { label: "\u{1F9EA} \u6D88\u878D\u5BF9\u6BD4", prompt: `\u9488\u5BF9 [${activeNode.id}] \u63D0\u51FA\u4E00\u7EC4\u4E25\u8C28\u7684\u63A7\u5236\u53D8\u91CF\u6D88\u878D\u5B9E\u9A8C\u3002` },
    { label: "\u{1F4DD} \u66F4\u65B0\u72B6\u6001", prompt: `\u8BF7\u66F4\u65B0 [${activeNode.id}] \u7684\u72B6\u6001\u5E76\u8BB0\u5F55\u672C\u6B21\u7814\u8BA8\u7ED3\u8BBA\u3002` }
  ] : [
    { label: "\u{1F504} \u540C\u6B65\u8FDB\u5C55", prompt: "/import-sync" },
    { label: "\u{1F9ED} \u76D8\u70B9\u73B0\u72B6", prompt: "/load-research" },
    { label: "\u{1F680} \u521D\u59CB\u5316\u7814\u7A76", prompt: "/start-research" },
    { label: "\u{1F4CB} \u603B\u7ED3\u8FDB\u5C55", prompt: "\u8BF7\u76D8\u70B9\u5F53\u524D\u6240\u6709\u5361\u7247\u4E0E\u5B9E\u9A8C\u8FDB\u5C55\uFF0C\u7ED9\u51FA\u4E0B\u4E00\u6B65\u63A8\u8350\u52A8\u4F5C\u3002" }
  ];
  return import_react.default.createElement(
    "div",
    {
      style: {
        flexShrink: 0,
        background: "var(--dsw-alias-bg-layer-1)",
        borderTop: "1px solid var(--dsw-alias-border-l3)",
        padding: "7px 18px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 5.5,
        zIndex: 6,
        userSelect: "none",
        fontFamily: FONT_SANS
      }
    },
    // Top indicator and context bar
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 6
        }
      },
      import_react.default.createElement(
        "div",
        {
          style: { display: "flex", alignItems: "center", gap: 7 }
        },
        activeNode ? import_react.default.createElement(
          "div",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5.5,
              background: "#c15f3e16",
              border: "1px solid #c15f3e45",
              borderRadius: RADIUS.badge,
              padding: "2.5px 8px",
              fontSize: 11.5,
              color: "#c15f3e",
              fontFamily: FONT_MONO,
              fontWeight: 600
            }
          },
          import_react.default.createElement("span", null, "\u{1F3AF} \u805A\u7126\u7814\u8BA8:"),
          import_react.default.createElement("span", { style: { fontWeight: 700 } }, `[${activeNode.kind}] ${activeNode.id}`),
          import_react.default.createElement("span", {
            style: {
              maxWidth: 240,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 400,
              color: "var(--dsw-alias-label-primary)",
              fontFamily: FONT_SANS
            }
          }, activeNode.title),
          import_react.default.createElement("button", {
            onClick: () => onSetFocus && onSetFocus(null),
            style: {
              background: "transparent",
              border: "none",
              color: "#c15f3e",
              cursor: "pointer",
              padding: "0 2px",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1
            },
            title: "\u6E05\u9664\u7126\u70B9\uFF0C\u56DE\u5230\u5168\u5C40\u8BA8\u8BBA"
          }, "\u2715")
        ) : import_react.default.createElement(
          "div",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)"
            }
          },
          import_react.default.createElement("span", null, "\u{1F310} \u5168\u5C40\u79D1\u7814\u4E3B\u7EBF"),
          import_react.default.createElement("span", {
            style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 11 }
          }, '(\u70B9\u51FB\u4EFB\u610F\u5361\u7247\u4E0A\u7684"\u8BBE\u4E3A\u4E3B\u5BF9\u8BDD\u7126\u70B9"\u53EF\u7ED1\u5B9A\u7279\u5B9A\u5361\u7247\u7814\u8BA8)')
        ),
        isBusy && import_react.default.createElement(
          "div",
          {
            className: "dsh-pulse-pill",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "#c15f3e16",
              border: "1px solid #c15f3e45",
              borderRadius: RADIUS.badge,
              padding: "2px 8px",
              fontSize: 11,
              color: "#c15f3e",
              fontFamily: FONT_SANS,
              fontWeight: 600,
              marginLeft: 4
            }
          },
          import_react.default.createElement("span", { className: "dsh-typing-dot", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-2", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-3", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement(
            "span",
            { className: "dsh-shimmer-text", style: { marginLeft: 2 } },
            busyTarget === "sync" ? "\u6B63\u5728\u540C\u6B65\u65B0\u8FDB\u5C55..." : busyTarget && busyTarget !== "global" ? `\u6B63\u5728\u9488\u5BF9 [${busyTarget}] \u7814\u8BA8...` : "Agent \u6B63\u5728\u601D\u8003..."
          ),
          elapsedSec > 0 && import_react.default.createElement("span", {
            style: {
              fontSize: 10,
              fontFamily: FONT_MONO,
              color: "var(--dsw-alias-label-secondary)"
            }
          }, `${elapsedSec}s`)
        )
      ),
      // Quick templates
      import_react.default.createElement(
        "div",
        {
          style: { display: "flex", alignItems: "center", gap: 5 }
        },
        quickTemplates.map((tmpl) => import_react.default.createElement("button", {
          key: tmpl.label,
          onClick: () => setInputText(tmpl.prompt),
          style: {
            background: "var(--dsw-alias-bg-layer-2)",
            border: "1px solid var(--dsw-alias-border-l3)",
            borderRadius: RADIUS.control,
            padding: "2px 7px",
            fontSize: 11,
            color: "var(--dsw-alias-label-secondary)",
            cursor: "pointer",
            transition: "all 120ms ease"
          },
          title: `\u70B9\u51FB\u586B\u5165: "${tmpl.prompt}"`
        }, tmpl.label))
      )
    ),
    // Input row
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "center"
        }
      },
      import_react.default.createElement("input", {
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: isBusy ? "Agent \u6B63\u5728\u601D\u8003\u5904\u7406\u4E2D\uFF0C\u53EF\u7EE7\u7EED\u8F93\u5165\u8FFD\u52A0\u6307\u4EE4... (Enter \u53D1\u9001)" : activeNode ? `\u5BF9 [${activeNode.id}] \u53D1\u8D77\u7814\u8BA8\u3001\u6D88\u878D\u5EFA\u8BAE\u6216\u5206\u6790\u9700\u6C42... (Enter \u53D1\u9001)` : "\u8F93\u5165\u79D1\u7814\u6307\u4EE4\u3001\u5168\u5C40\u63D0\u95EE\u6216\u63A2\u8BA8\u7814\u7A76\u65B9\u5411... (Enter \u53D1\u9001)",
        style: {
          flex: 1,
          height: 32,
          padding: "0 10px",
          borderRadius: RADIUS.control,
          border: "1px solid var(--dsw-alias-border-l2)",
          background: "var(--dsw-alias-bg-layer-2)",
          color: "var(--dsw-alias-label-primary)",
          fontSize: 12.5,
          fontFamily: FONT_SANS,
          outline: "none"
        }
      }),
      import_react.default.createElement(
        "button",
        {
          onClick: handleSend,
          disabled: isBusy || !inputText.trim(),
          style: {
            height: 32,
            background: isBusy ? "#c15f3e1c" : inputText.trim() ? "#c15f3e" : "var(--dsw-alias-bg-layer-2)",
            color: isBusy ? "#c15f3e" : inputText.trim() ? "#fff" : "var(--dsw-alias-label-tertiary)",
            border: isBusy ? "1px solid #c15f3e55" : inputText.trim() ? "1px solid #c15f3e" : "1px solid var(--dsw-alias-border-l3)",
            borderRadius: RADIUS.control,
            padding: "0 14px",
            fontSize: 12,
            fontWeight: 650,
            cursor: isBusy ? "wait" : inputText.trim() ? "pointer" : "not-allowed",
            transition: "all 120ms ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 5.5
          }
        },
        isBusy && import_react.default.createElement("span", { className: "dsh-spin", style: { fontSize: 11 } }, "\u23F3"),
        import_react.default.createElement("span", null, isBusy ? `\u601D\u8003\u4E2D${elapsedSec > 0 ? ` (${elapsedSec}s)` : "..."}` : "\u53D1\u9001")
      )
    )
  );
}
function generateGroupedBarSvg({ title = "\u6838\u5FC3\u6307\u6807\u5BF9\u6BD4\u67F1\u72B6\u56FE", nodes = [], metricKeys = ["ppv", "sensitivity"], width = 640, height = 320 }) {
  const padLeft = 58, padRight = 36, padTop = 46, padBottom = 55;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const colors = ["#c15f3e", "#5c8a77", "#5a82a6", "#b07f43", "#8b6fb5", "#d48806"];
  const data = nodes.map((n) => {
    const vals = {};
    metricKeys.forEach((k) => {
      let v = n.metrics?.[k];
      if (typeof v === "string") v = parseFloat(v);
      vals[k] = typeof v === "number" && !isNaN(v) ? v : 0;
    });
    return { id: n.id, title: n.title, vals };
  });
  const maxVal = Math.max(...data.flatMap((d) => metricKeys.map((k) => d.vals[k] || 0)), 0.01);
  const ceiling = maxVal <= 1 ? 1 : Math.ceil(maxVal * 1.15);
  const groupCount = data.length || 1;
  const groupWidth = plotW / groupCount;
  const barWidth = Math.min(26, groupWidth * 0.74 / (metricKeys.length || 1));
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`;
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`;
  metricKeys.forEach((k, i) => {
    const lx = width - padRight - (metricKeys.length - i) * 88;
    const color = colors[i % colors.length];
    svg += `<rect x="${lx}" y="17" width="10" height="10" rx="2" fill="${color}" />`;
    svg += `<text x="${lx + 14}" y="26" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="500">${k.toUpperCase()}</text>`;
  });
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((r) => r * ceiling);
  ticks.forEach((t) => {
    const y = padTop + plotH - t / ceiling * plotH;
    svg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + plotW}" y2="${y}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`;
    svg += `<text x="${padLeft - 8}" y="${y + 4}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="end" font-family="monospace">${ceiling <= 1 ? (t * 100).toFixed(0) + "%" : t.toFixed(1)}</text>`;
  });
  data.forEach((d, gIdx) => {
    const gx = padLeft + gIdx * groupWidth + (groupWidth - metricKeys.length * barWidth) / 2;
    metricKeys.forEach((k, mIdx) => {
      const val = d.vals[k];
      const barH = val / ceiling * plotH;
      const bx = gx + mIdx * barWidth;
      const by = padTop + plotH - barH;
      const color = colors[mIdx % colors.length];
      svg += `<rect x="${bx}" y="${by}" width="${barWidth - 3}" height="${Math.max(1, barH)}" rx="3" fill="${color}" opacity="0.92" />`;
      if (barH > 14) {
        svg += `<text x="${bx + (barWidth - 3) / 2}" y="${by - 4}" fill="var(--dsw-alias-label-primary, #c5c2b9)" font-size="9.5" font-weight="600" text-anchor="middle" font-family="monospace">${ceiling <= 1 ? (val * 100).toFixed(1) + "%" : val}</text>`;
      }
    });
    const labelX = padLeft + gIdx * groupWidth + groupWidth / 2;
    svg += `<text x="${labelX}" y="${padTop + plotH + 18}" fill="var(--dsw-alias-label-primary, #c5c2b9)" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${d.id}</text>`;
    svg += `<text x="${labelX}" y="${padTop + plotH + 32}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="9.5" text-anchor="middle">${(d.title || "").slice(0, 10)}</text>`;
  });
  svg += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`;
  svg += `</svg>`;
  return svg;
}
function generateParetoScatterSvg({ title = "Pareto \u6743\u8861\u524D\u6CBF\u6563\u70B9\u56FE", nodes = [], xKey = "sensitivity", yKey = "ppv", width = 640, height = 320 }) {
  const padLeft = 60, padRight = 45, padTop = 45, padBottom = 50;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const points = nodes.map((n) => {
    let xv = n.metrics?.[xKey];
    let yv = n.metrics?.[yKey];
    if (typeof xv === "string") xv = parseFloat(xv);
    if (typeof yv === "string") yv = parseFloat(yv);
    return {
      id: n.id,
      title: n.title,
      x: typeof xv === "number" && !isNaN(xv) ? xv : 0,
      y: typeof yv === "number" && !isNaN(yv) ? yv : 0
    };
  }).filter((p) => p.x > 0 || p.y > 0);
  const maxX = Math.max(...points.map((p) => p.x), 1);
  const maxY = Math.max(...points.map((p) => p.y), 1);
  const ceilingX = maxX <= 1 ? 1 : Math.ceil(maxX * 1.1);
  const ceilingY = maxY <= 1 ? 1 : Math.ceil(maxY * 1.1);
  const minX = ceilingX <= 1 ? Math.max(0, Math.floor(Math.min(...points.map((p) => p.x), 0.7) * 10) / 10) : 0;
  const minY = ceilingY <= 1 ? Math.max(0, Math.floor(Math.min(...points.map((p) => p.y), 0.7) * 10) / 10) : 0;
  const sortedByX = [...points].sort((a, b) => b.x - a.x);
  const paretoPoints = [];
  let maxSeenY = -Infinity;
  for (const pt of sortedByX) {
    if (pt.y >= maxSeenY) {
      paretoPoints.push(pt);
      maxSeenY = pt.y;
    }
  }
  paretoPoints.sort((a, b) => a.x - b.x);
  const paretoSet = new Set(paretoPoints.map((p) => p.id));
  const scaleX = (val) => padLeft + (val - minX) / (ceilingX - minX || 1) * plotW;
  const scaleY = (val) => padTop + plotH - (val - minY) / (ceilingY - minY || 1) * plotH;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`;
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`;
  const lx = width - 240;
  svg += `<line x1="${lx}" y1="21" x2="${lx + 20}" y2="21" stroke="#c15f3e" stroke-width="2" stroke-dasharray="4 2" />`;
  svg += `<circle cx="${lx + 10}" cy="21" r="3.5" fill="#c15f3e" />`;
  svg += `<text x="${lx + 26}" y="25" fill="#c15f3e" font-size="11" font-weight="600">Pareto \u6700\u4F18\u524D\u6CBF</text>`;
  svg += `<circle cx="${lx + 145}" cy="21" r="3.5" fill="#5c8a77" />`;
  svg += `<text x="${lx + 153}" y="25" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11">\u5176\u4ED6\u5019\u9009</text>`;
  const xTicks = [0, 0.33, 0.66, 1].map((r) => minX + r * (ceilingX - minX));
  const yTicks = [0, 0.33, 0.66, 1].map((r) => minY + r * (ceilingY - minY));
  yTicks.forEach((t) => {
    const y = scaleY(t);
    svg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + plotW}" y2="${y}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`;
    svg += `<text x="${padLeft - 8}" y="${y + 4}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="end" font-family="monospace">${ceilingY <= 1 ? (t * 100).toFixed(0) + "%" : t.toFixed(1)}</text>`;
  });
  xTicks.forEach((t) => {
    const x = scaleX(t);
    svg += `<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-dasharray="3 3" />`;
    svg += `<text x="${x}" y="${padTop + plotH + 16}" fill="var(--dsw-alias-label-secondary, #78756d)" font-size="10" text-anchor="middle" font-family="monospace">${ceilingX <= 1 ? (t * 100).toFixed(0) + "%" : t.toFixed(1)}</text>`;
  });
  svg += `<text x="${padLeft + plotW / 2}" y="${height - 10}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="600" text-anchor="middle">${xKey.toUpperCase()} (\u6A2A\u8F74)</text>`;
  svg += `<text x="18" y="${padTop + plotH / 2}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="11" font-weight="600" text-anchor="middle" transform="rotate(-90 18 ${padTop + plotH / 2})">${yKey.toUpperCase()} (\u7EB5\u8F74)</text>`;
  if (paretoPoints.length > 1) {
    const pathD = paretoPoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(" ");
    svg += `<path d="${pathD}" fill="none" stroke="#c15f3e" stroke-width="2.2" stroke-dasharray="5 3" />`;
  }
  points.forEach((p) => {
    const px = scaleX(p.x);
    const py = scaleY(p.y);
    const isPareto = paretoSet.has(p.id);
    const color = isPareto ? "#c15f3e" : "#5c8a77";
    const radius = isPareto ? 6 : 4.5;
    svg += `<circle cx="${px}" cy="${py}" r="${radius}" fill="${color}" stroke="#ffffff" stroke-width="${isPareto ? 1.5 : 1}" />`;
    svg += `<text x="${px}" y="${py - 9}" fill="${isPareto ? "#f19b80" : "#88c7af"}" font-size="10.5" font-weight="700" text-anchor="middle" font-family="monospace">${p.id}</text>`;
  });
  svg += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`;
  svg += `<line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="var(--dsw-alias-border-l2, #44413b)" stroke-width="1.5" />`;
  svg += `</svg>`;
  return svg;
}
function generateRadarSvg({ title = "\u591A\u7EF4\u7EFC\u5408\u753B\u50CF\u96F7\u8FBE\u56FE", nodes = [], metricKeys = ["ppv", "sensitivity", "specificity", "auc"], width = 640, height = 320 }) {
  const cx = 210, cy = 165, radius = 105;
  const colors = ["#c15f3e", "#5c8a77", "#5a82a6", "#b07f43", "#8b6fb5"];
  const nSides = metricKeys.length || 3;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`;
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`;
  [0.25, 0.5, 0.75, 1].forEach((level) => {
    const r = radius * level;
    const pts = [];
    for (let i = 0; i < nSides; i++) {
      const angle = Math.PI * 2 * i / nSides - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    svg += `<polygon points="${pts.join(" ")}" fill="none" stroke="var(--dsw-alias-border-l3, #2d2b27)" stroke-width="1" />`;
    svg += `<text x="${cx + 4}" y="${(cy - r + 10).toFixed(1)}" fill="var(--dsw-alias-label-secondary, #605d56)" font-size="8.5" font-family="monospace">${(level * 100).toFixed(0)}%</text>`;
  });
  metricKeys.forEach((k, i) => {
    const angle = Math.PI * 2 * i / nSides - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--dsw-alias-border-l3, #35332e)" stroke-dasharray="2 2" />`;
    const labelR = radius + 22;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.2 ? "middle" : Math.cos(angle) > 0 ? "start" : "end";
    svg += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="var(--dsw-alias-label-secondary, #a09d95)" font-size="10.5" font-weight="600" text-anchor="${anchor}">${k.toUpperCase()}</text>`;
  });
  nodes.forEach((n, idx) => {
    const color = colors[idx % colors.length];
    const polyPts = [];
    metricKeys.forEach((k, i) => {
      let v = n.metrics?.[k];
      if (typeof v === "string") v = parseFloat(v);
      const norm = Math.min(1, Math.max(0, typeof v === "number" && !isNaN(v) ? v : 0));
      const r = radius * norm;
      const angle = Math.PI * 2 * i / nSides - Math.PI / 2;
      polyPts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    });
    svg += `<polygon points="${polyPts.join(" ")}" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="2" />`;
    polyPts.forEach((pt) => {
      const [px, py] = pt.split(",");
      svg += `<circle cx="${px}" cy="${py}" r="3" fill="${color}" stroke="#ffffff" stroke-width="1" />`;
    });
  });
  const legX = 420;
  let legY = 62;
  nodes.forEach((n, idx) => {
    const color = colors[idx % colors.length];
    svg += `<rect x="${legX}" y="${legY}" width="12" height="12" rx="3" fill="${color}" />`;
    svg += `<text x="${legX + 18}" y="${legY + 10}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="11.5" font-weight="650" font-family="monospace">${n.id}</text>`;
    svg += `<text x="${legX + 18}" y="${legY + 24}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10">${(n.title || "").slice(0, 18)}</text>`;
    legY += 40;
  });
  svg += `</svg>`;
  return svg;
}
function generateSlicesDonutSvg({ title = "\u961F\u5217\u5207\u7247\u5206\u5E03\u73AF\u5F62\u56FE", slices = {}, width = 640, height = 320 }) {
  const cx = 185, cy = 165, rOut = 95, rIn = 55;
  const colors = ["#5c8a77", "#c15f3e", "#5a82a6", "#b07f43", "#8b6fb5", "#d48806"];
  const entries = Object.entries(slices).map(([name, count]) => {
    const c = typeof count === "number" ? count : parseInt(count) || 0;
    return { name, count: c };
  }).filter((e) => e.count > 0);
  const total = entries.reduce((acc, e) => acc + e.count, 0) || 1;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;background:var(--dsw-alias-bg-base, #1c1b18);color:var(--dsw-alias-label-primary, #f0efe8);border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">`;
  svg += `<text x="22" y="27" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="13.5" font-weight="650">${title}</text>`;
  let currentAngle = -Math.PI / 2;
  entries.forEach((e, idx) => {
    const sliceAngle = e.count / total * Math.PI * 2;
    const endAngle = currentAngle + sliceAngle;
    const color = colors[idx % colors.length];
    const x1Out = cx + rOut * Math.cos(currentAngle);
    const y1Out = cy + rOut * Math.sin(currentAngle);
    const x2Out = cx + rOut * Math.cos(endAngle);
    const y2Out = cy + rOut * Math.sin(endAngle);
    const x1In = cx + rIn * Math.cos(endAngle);
    const y1In = cy + rIn * Math.sin(endAngle);
    const x2In = cx + rIn * Math.cos(currentAngle);
    const y2In = cy + rIn * Math.sin(currentAngle);
    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    const d = `M ${x1Out.toFixed(1)} ${y1Out.toFixed(1)} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2Out.toFixed(1)} ${y2Out.toFixed(1)} L ${x1In.toFixed(1)} ${y1In.toFixed(1)} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x2In.toFixed(1)} ${y2In.toFixed(1)} Z`;
    svg += `<path d="${d}" fill="${color}" stroke="var(--dsw-alias-bg-base, #1c1b18)" stroke-width="2" />`;
    currentAngle = endAngle;
  });
  svg += `<text x="${cx}" y="${cy - 3}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="18" font-weight="700" text-anchor="middle" font-family="monospace">${total.toLocaleString()}</text>`;
  svg += `<text x="${cx}" y="${cy + 15}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10" text-anchor="middle">TOTAL N</text>`;
  const legX = 350;
  let legY = 62;
  entries.forEach((e, idx) => {
    const color = colors[idx % colors.length];
    const pct = (e.count / total * 100).toFixed(1);
    svg += `<rect x="${legX}" y="${legY}" width="12" height="12" rx="3" fill="${color}" />`;
    svg += `<text x="${legX + 18}" y="${legY + 10}" fill="var(--dsw-alias-label-primary, #e8e6df)" font-size="11.5" font-weight="650">${e.name}</text>`;
    svg += `<text x="${legX + 18}" y="${legY + 24}" fill="var(--dsw-alias-label-secondary, #8c8980)" font-size="10" font-family="monospace">${e.count.toLocaleString()} (${pct}%)</text>`;
    legY += 36;
  });
  svg += `</svg>`;
  return svg;
}
function DataChartingModal({
  isOpen,
  onClose,
  allNodes = [],
  initialSelectedIds = [],
  onSaveChart,
  onAskAiDeepPlot
}) {
  if (!isOpen) return null;
  const plottableNodes = (0, import_react.useMemo)(() => {
    return (allNodes || []).filter(
      (n) => n.kind === "experiment" || n.kind === "dataset" || n.metrics && Object.keys(n.metrics).length > 0 || n.slices && Object.keys(n.slices).length > 0
    );
  }, [allNodes]);
  const [selectedIds, setSelectedIds] = (0, import_react.useState)(() => {
    if (initialSelectedIds && initialSelectedIds.length > 0) {
      return new Set(initialSelectedIds);
    }
    const exps = plottableNodes.filter((n) => n.kind === "experiment").map((n) => n.id);
    if (exps.length > 0) {
      return new Set(exps.slice(0, 4));
    }
    return new Set(plottableNodes.slice(0, 3).map((n) => n.id));
  });
  const selectedNodes = (0, import_react.useMemo)(() => {
    return plottableNodes.filter((n) => selectedIds.has(n.id));
  }, [plottableNodes, selectedIds]);
  const availableMetrics = (0, import_react.useMemo)(() => {
    const keys = /* @__PURE__ */ new Set();
    selectedNodes.forEach((n) => {
      if (n.metrics) {
        Object.keys(n.metrics).forEach((k) => {
          const v = n.metrics[k];
          if (typeof v === "number" || !isNaN(parseFloat(v)) && isFinite(v)) {
            keys.add(k);
          }
        });
      }
    });
    return Array.from(keys);
  }, [selectedNodes]);
  const hasSlices = (0, import_react.useMemo)(() => {
    return selectedNodes.some((n) => n.slices && Object.keys(n.slices).length > 0);
  }, [selectedNodes]);
  const aggregatedSlices = (0, import_react.useMemo)(() => {
    const agg = {};
    selectedNodes.forEach((n) => {
      if (n.slices) {
        Object.entries(n.slices).forEach(([k, v]) => {
          const num = typeof v === "number" ? v : parseInt(v) || 0;
          agg[k] = (agg[k] || 0) + num;
        });
      }
    });
    return agg;
  }, [selectedNodes]);
  const aiAnalysis = (0, import_react.useMemo)(() => {
    const expCount = selectedNodes.filter((n) => n.kind === "experiment" || n.metrics).length;
    const hasSensitivity = availableMetrics.some((m) => /(sens|recall)/i.test(m));
    const hasPPV = availableMetrics.some((m) => /(ppv|precision)/i.test(m));
    const hasMultipleMetrics = availableMetrics.length >= 3;
    if (hasSlices && expCount === 0) {
      return {
        recommendedType: "donut",
        title: "\u961F\u5217\u6837\u672C\u5207\u7247\u5206\u5E03\u5206\u6790",
        name: "\u5207\u7247\u5206\u5E03\u73AF\u5F62\u56FE",
        rationale: "\u68C0\u6D4B\u5230\u961F\u5217\u5207\u7247\u5206\u5E03\u6570\u636E\u3002\u73AF\u5F62\u5206\u5E03\u56FE\u53EF\u6E05\u6670\u5C55\u73B0\u5404\u5B50\u96C6\uFF08\u8BAD\u7EC3\u96C6\u3001\u9A8C\u8BC1\u96C6\u3001\u76F2\u6D4B\u96C6\u3001\u9AD8\u5371\u5207\u7247\uFF09\u7684\u6837\u672C\u5360\u6BD4\u4E0E\u957F\u5C3E\u7279\u5F81\u3002"
      };
    }
    if (expCount >= 2 && hasSensitivity && hasPPV) {
      return {
        recommendedType: "pareto",
        title: "\u6A21\u578B\u6027\u80FD Pareto \u6743\u8861\u524D\u6CBF\u5206\u6790",
        name: "Pareto \u6743\u8861\u6563\u70B9\u56FE",
        rationale: "\u68C0\u6D4B\u5230 2 \u4E2A\u4EE5\u4E0A\u5BF9\u6BD4\u5B9E\u9A8C\u5305\u542B\u67E5\u51C6\u7387\uFF08PPV\uFF09\u4E0E\u53EC\u56DE\u7387\uFF08Sensitivity\uFF09\u6307\u6807\u5BF9\u3002Pareto \u6563\u70B9\u56FE\u53EF\u7CBE\u51C6\u63CF\u7ED8\u6548\u7387\u524D\u6CBF\u66F2\u7EBF\uFF0C\u5B9A\u4F4D\u5E15\u7D2F\u6258\u6700\u4F18\u6A21\u578B\u3002"
      };
    }
    if (hasMultipleMetrics && expCount >= 2) {
      return {
        recommendedType: "radar",
        title: "\u591A\u6A21\u578B\u7EFC\u5408\u753B\u50CF\u591A\u7EF4\u96F7\u8FBE\u56FE",
        name: "\u591A\u7EF4\u753B\u50CF\u96F7\u8FBE\u56FE",
        rationale: `\u68C0\u6D4B\u5230 ${availableMetrics.length} \u4E2A\u7EF4\u5EA6\u7684\u8BC4\u4F30\u6307\u6807\u3002\u96F7\u8FBE\u56FE\u9002\u5408\u7EFC\u5408\u8BC4\u4EF7\u4E0D\u540C\u65B9\u6848\u7684\u5747\u8861\u5EA6\uFF0C\u675C\u7EDD\u5355\u4E00\u6307\u6807\u504F\u9887\uFF0C\u66B4\u9732\u77ED\u677F\u3002`
      };
    }
    return {
      recommendedType: "bar",
      title: "\u5B9E\u9A8C\u6838\u5FC3\u6307\u6807\u6A2A\u5411\u5BF9\u6BD4\u67F1\u72B6\u56FE",
      name: "\u5206\u7EC4\u6307\u6807\u67F1\u72B6\u56FE",
      rationale: "\u5206\u7EC4\u5BF9\u6BD4\u67F1\u72B6\u56FE\u80FD\u6E05\u6670\u76F4\u89C2\u5730\u5BF9\u6BD4\u5404\u65B9\u6848\u5728\u9009\u5B9A\u6838\u5FC3\u6307\u6807\u4E0A\u7684\u7EDD\u5BF9\u6570\u503C\u4E0E\u5347\u964D\u5E45\u5EA6\uFF0C\u9002\u5408\u6E05\u6670\u4E25\u8C28\u7684\u6A2A\u5411\u6C47\u62A5\u3002"
    };
  }, [selectedNodes, availableMetrics, hasSlices]);
  const [chartType, setChartType] = (0, import_react.useState)("pareto");
  (0, import_react.useEffect)(() => {
    if (aiAnalysis.recommendedType) {
      setChartType(aiAnalysis.recommendedType);
    }
  }, [aiAnalysis.recommendedType]);
  const [selectedMetrics, setSelectedMetrics] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    if (availableMetrics.length > 0) {
      setSelectedMetrics(availableMetrics.slice(0, 4));
    }
  }, [availableMetrics.join(",")]);
  const [xMetric, setXMetric] = (0, import_react.useState)("sensitivity");
  const [yMetric, setYMetric] = (0, import_react.useState)("ppv");
  (0, import_react.useEffect)(() => {
    const sensKey = availableMetrics.find((m) => /(sens|recall)/i.test(m)) || availableMetrics[0] || "sensitivity";
    const ppvKey = availableMetrics.find((m) => /(ppv|precision)/i.test(m)) || availableMetrics[1] || availableMetrics[0] || "ppv";
    setXMetric(sensKey);
    setYMetric(ppvKey);
  }, [availableMetrics.join(",")]);
  const [customTitle, setCustomTitle] = (0, import_react.useState)("");
  const displayTitle = customTitle || aiAnalysis.title;
  const generatedSvg = (0, import_react.useMemo)(() => {
    if (selectedNodes.length === 0) return "";
    if (chartType === "bar") {
      const keys = selectedMetrics.length > 0 ? selectedMetrics : availableMetrics.slice(0, 2);
      return generateGroupedBarSvg({ title: displayTitle, nodes: selectedNodes, metricKeys: keys });
    }
    if (chartType === "pareto") {
      return generateParetoScatterSvg({ title: displayTitle, nodes: selectedNodes, xKey: xMetric, yKey: yMetric });
    }
    if (chartType === "radar") {
      const keys = selectedMetrics.length >= 3 ? selectedMetrics : availableMetrics.length >= 3 ? availableMetrics.slice(0, 5) : ["dim1", "dim2", "dim3"];
      return generateRadarSvg({ title: displayTitle, nodes: selectedNodes, metricKeys: keys });
    }
    if (chartType === "donut") {
      return generateSlicesDonutSvg({ title: displayTitle, slices: aggregatedSlices });
    }
    return "";
  }, [chartType, selectedNodes, selectedMetrics, availableMetrics, xMetric, yMetric, displayTitle, aggregatedSlices]);
  const toggleNodeSelection = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleSelectAllExps = () => {
    const ids = plottableNodes.filter((n) => n.kind === "experiment").map((n) => n.id);
    setSelectedIds(new Set(ids));
  };
  const handleClearAll = () => {
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const handleSaveToMiddleColumn = () => {
    if (!generatedSvg) return;
    const chartTypeName = {
      pareto: "Pareto \u6743\u8861\u6563\u70B9\u56FE",
      bar: "\u5206\u7EC4\u6307\u6807\u67F1\u72B6\u56FE",
      radar: "\u591A\u7EF4\u753B\u50CF\u96F7\u8FBE\u56FE",
      donut: "\u961F\u5217\u5207\u7247\u73AF\u5F62\u56FE"
    }[chartType] || "\u79D1\u7814\u56FE\u8868";
    const metricsSummary = chartType === "pareto" ? `- **X \u8F74 (${xMetric})** \u4E0E **Y \u8F74 (${yMetric})** \u6743\u8861
` + selectedNodes.map((n) => `  - **${n.id}** (${n.title}): ${xMetric}=${n.metrics?.[xMetric] ?? "-"}, ${yMetric}=${n.metrics?.[yMetric] ?? "-"}`).join("\n") : chartType === "donut" ? Object.entries(aggregatedSlices).map(([k, v]) => `  - **${k}**: ${v}`).join("\n") : selectedNodes.map((n) => `  - **${n.id}** (${n.title}): ` + Object.entries(n.metrics || {}).map(([k, v]) => `${k}=${v}`).join(", ")).join("\n");
    const detailText = `### ${displayTitle}

**\u56FE\u8868\u7C7B\u578B**: ${chartTypeName}
**\u5173\u8054\u5B9E\u4F53**: ${selectedNodes.map((n) => n.id).join(", ")}

**AI \u7814\u5224\u5206\u6790**:
${aiAnalysis.rationale}

**\u6570\u636E\u6458\u8981**:
${metricsSummary}
`;
    const newChartNode = {
      id: `fig-${Date.now().toString().slice(-6)}`,
      kind: "artifact",
      title: displayTitle,
      summary: `${chartTypeName}: \u57FA\u4E8E ${selectedNodes.map((n) => n.id).join(", ")} \u7ED8\u5236\u7684\u79D1\u7814\u53EF\u89C6\u5316\u56FE\u8868\u3002`,
      detail: detailText,
      fileType: "image",
      tags: ["chart", chartType, ...selectedNodes.map((n) => n.id.toLowerCase())],
      sandboxPath: `figures/plot_${chartType}_${Date.now().toString().slice(-6)}.svg`,
      content: generatedSvg,
      preview: generatedSvg,
      staged: true,
      dataProvenance: selectedNodes.map((n) => n.id),
      thread: []
    };
    const newEdges = selectedNodes.map((src) => ({
      id: `edge-${src.id}-${newChartNode.id}`,
      source: src.id,
      target: newChartNode.id,
      label: "\u53EF\u89C6\u5316"
    }));
    onSaveChart(newChartNode, newEdges);
  };
  const handleAskAiDeep = () => {
    const chartTypeName = {
      pareto: "Pareto \u6743\u8861\u6563\u70B9\u56FE",
      bar: "\u5206\u7EC4\u6307\u6807\u5BF9\u6BD4\u67F1\u72B6\u56FE",
      radar: "\u591A\u7EF4\u753B\u50CF\u96F7\u8FBE\u56FE",
      donut: "\u961F\u5217\u5207\u7247\u73AF\u5F62\u56FE"
    }[chartType] || "\u79D1\u7814\u56FE\u8868";
    const nodesStr = selectedNodes.map((n) => `[${n.id}] ${n.title}`).join("\u3001");
    const metricsStr = (chartType === "pareto" ? [xMetric, yMetric] : selectedMetrics).join(", ");
    const prompt = `\u8BF7\u9488\u5BF9\u9009\u5B9A\u7684\u5B9E\u4F53 ${nodesStr} \u7ED8\u5236\u8BBA\u6587\u7EA7\u79D1\u7814\u9AD8\u6E05\u56FE\u8868\uFF08\u63A8\u8350\u56FE\u8868\u7C7B\u578B\uFF1A${chartTypeName}\uFF0C\u6838\u5FC3\u8BC4\u4F30\u7EF4\u5EA6\uFF1A${metricsStr}\uFF09\u3002\u8BF7\u5728 figures/ \u76EE\u5F55\u751F\u6210\u5BF9\u5E94\u7684 Python (Matplotlib/Seaborn) \u7ED8\u56FE\u811A\u672C\u4E0E\u77E2\u91CF\u56FE\uFF0C\u5E76\u7ED9\u51FA\u4E25\u5BC6\u7684\u5B9A\u91CF\u5BF9\u6BD4\u5206\u6790\u4E0E\u6D88\u878D\u7ED3\u8BBA\u3002`;
    onAskAiDeepPlot(prompt);
  };
  const chartOptions = [
    {
      id: "pareto",
      icon: "\u{1F4C8}",
      name: "Pareto \u6743\u8861\u6563\u70B9\u56FE",
      desc: "\u5C55\u793A\u6A21\u578B\u5728\u4E24\u4E2A\u5BF9\u7ACB\u6307\u6807\u95F4\u7684\u6743\u8861\u524D\u6CBF\u4E0E\u5E15\u7D2F\u6258\u6700\u4F18\u89E3",
      disabled: availableMetrics.length < 2 || selectedNodes.length < 1
    },
    {
      id: "bar",
      icon: "\u{1F4CA}",
      name: "\u5206\u7EC4\u6307\u6807\u67F1\u72B6\u56FE",
      desc: "\u6A2A\u5411\u5BF9\u6BD4\u591A\u4E2A\u5B9E\u9A8C\u5728\u9009\u5B9A\u6307\u6807\u4E0A\u7684\u7EDD\u5BF9\u6570\u503C\u4E0E\u9636\u8DC3\u5DEE\u5F02",
      disabled: availableMetrics.length < 1 || selectedNodes.length < 1
    },
    {
      id: "radar",
      icon: "\u{1F578}\uFE0F",
      name: "\u591A\u7EF4\u753B\u50CF\u96F7\u8FBE\u56FE",
      desc: "3 \u7EF4\u4EE5\u4E0A\u6307\u6807\u7EFC\u5408\u5747\u8861\u5EA6\u523B\u753B\uFF0C\u66B4\u9732\u77ED\u677F\u4E0E\u7EFC\u5408\u4F18\u52BF",
      disabled: availableMetrics.length < 3 || selectedNodes.length < 1
    },
    {
      id: "donut",
      icon: "\u{1F370}",
      name: "\u961F\u5217\u5207\u7247\u73AF\u5F62\u56FE",
      desc: "\u6837\u672C\u5207\u7247\u3001\u5206\u671F\u3001\u6570\u636E\u96C6\u62C6\u5206\u5360\u6BD4\u4E0E\u6837\u672C\u91CF\u5206\u5E03",
      disabled: !hasSlices
    }
  ];
  return import_react.default.createElement(
    "div",
    {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(3px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_SANS
      }
    },
    import_react.default.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        style: {
          background: "var(--dsw-alias-bg-layer-1)",
          border: "1px solid var(--dsw-alias-border-l2)",
          borderRadius: RADIUS.pane,
          width: 780,
          maxWidth: "92vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "var(--dsw-shadow-lv3, 0 12px 36px rgba(0,0,0,0.45))"
        }
      },
      // Header
      import_react.default.createElement(
        "div",
        {
          style: {
            padding: "14px 20px",
            borderBottom: "1px solid var(--dsw-alias-border-l3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--dsw-alias-bg-layer-1)"
          }
        },
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 15,
                fontWeight: 700,
                color: "var(--dsw-alias-label-primary)",
                display: "flex",
                alignItems: "center",
                gap: 7
              }
            },
            import_react.default.createElement("span", null, "\u{1F4C8}"),
            import_react.default.createElement("span", null, "\u6570\u636E\u753B\u56FE\u4E0E\u591A\u7EF4\u5206\u6790")
          ),
          import_react.default.createElement("div", {
            style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", marginTop: 2 }
          }, "\u4ECE\u9009\u5B9A\u5B9E\u9A8C\u6307\u6807\u6216\u6570\u636E\u5207\u7247\u5373\u65F6\u751F\u6210\u79D1\u7814\u77E2\u91CF\u56FE\u5E76\u4FDD\u5B58\u81F3\u4E2D\u95F4\u680F\uFF0C\u6216\u53D1\u8D77 AI \u6DF1\u5EA6\u79D1\u7814\u7ED8\u56FE")
        ),
        import_react.default.createElement("button", {
          onClick: onClose,
          style: {
            background: "transparent",
            border: "none",
            fontSize: 16,
            color: "var(--dsw-alias-label-tertiary)",
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1
          }
        }, "\u2715")
      ),
      // Body
      import_react.default.createElement(
        "div",
        {
          style: {
            padding: "16px 20px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }
        },
        // Step 1: Select Plottable Entities
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8
              }
            },
            import_react.default.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: "var(--dsw-alias-label-primary)", letterSpacing: ".02em" }
            }, `1. \u9009\u62E9\u5F85\u7ED8\u56FE\u5B9E\u4F53 (${selectedIds.size}/${plottableNodes.length})`),
            import_react.default.createElement(
              "div",
              { style: { display: "flex", gap: 6 } },
              import_react.default.createElement("button", {
                onClick: handleSelectAllExps,
                style: {
                  background: "var(--dsw-alias-bg-layer-2)",
                  border: "1px solid var(--dsw-alias-border-l3)",
                  borderRadius: RADIUS.badge,
                  padding: "2px 8px",
                  fontSize: 10.5,
                  color: "var(--dsw-alias-label-secondary)",
                  cursor: "pointer"
                }
              }, "\u5168\u9009\u5B9E\u9A8C"),
              import_react.default.createElement("button", {
                onClick: handleClearAll,
                style: {
                  background: "var(--dsw-alias-bg-layer-2)",
                  border: "1px solid var(--dsw-alias-border-l3)",
                  borderRadius: RADIUS.badge,
                  padding: "2px 8px",
                  fontSize: 10.5,
                  color: "var(--dsw-alias-label-secondary)",
                  cursor: "pointer"
                }
              }, "\u6E05\u7A7A\u9009\u62E9")
            )
          ),
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                maxHeight: 110,
                overflowY: "auto",
                padding: "4px 0"
              }
            },
            plottableNodes.map((node) => {
              const isSelected = selectedIds.has(node.id);
              const icon = node.kind === "experiment" ? "\u{1F9EA}" : node.kind === "dataset" ? "\u{1F4CA}" : "\u{1F4A1}";
              return import_react.default.createElement(
                "button",
                {
                  key: node.id,
                  onClick: () => toggleNodeSelection(node.id),
                  style: {
                    background: isSelected ? "#c15f3e16" : "var(--dsw-alias-bg-layer-2)",
                    border: isSelected ? "1px solid #c15f3e65" : "1px solid var(--dsw-alias-border-l3)",
                    borderRadius: RADIUS.control,
                    padding: "4px 9px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                    color: isSelected ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-secondary)",
                    fontSize: 11.5,
                    fontFamily: FONT_SANS,
                    fontWeight: isSelected ? 650 : 500,
                    transition: "all 120ms ease"
                  }
                },
                import_react.default.createElement("span", { style: { fontSize: 11 } }, isSelected ? "\u2713" : "\uFF0B"),
                import_react.default.createElement("span", null, icon),
                import_react.default.createElement("span", { style: { fontFamily: FONT_MONO, fontWeight: 700 } }, node.id),
                import_react.default.createElement("span", { style: { opacity: 0.8, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, node.title)
              );
            })
          )
        ),
        // Step 2: AI Suggestions & Options
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement("div", {
            style: { fontSize: 12, fontWeight: 700, color: "var(--dsw-alias-label-primary)", marginBottom: 8, letterSpacing: ".02em" }
          }, "2. AI \u7814\u5224\u5EFA\u8BAE\u4E0E\u56FE\u8868\u7C7B\u578B\u9009\u9879"),
          // AI Rationale Banner
          import_react.default.createElement(
            "div",
            {
              style: {
                background: "#c15f3e12",
                border: "1px solid #c15f3e40",
                borderRadius: RADIUS.sub,
                padding: "9px 12px",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 10
              }
            },
            import_react.default.createElement("span", { style: { fontSize: 16 } }, "\u2728"),
            import_react.default.createElement(
              "div",
              { style: { flex: 1, fontSize: 12, lineHeight: 1.55 } },
              import_react.default.createElement(
                "div",
                { style: { fontWeight: 650, color: "#c15f3e", marginBottom: 2 } },
                `AI \u7814\u5224\u5EFA\u8BAE: \u63A8\u8350\u300C${aiAnalysis.name}\u300D`
              ),
              import_react.default.createElement(
                "div",
                { style: { color: "var(--dsw-alias-label-secondary)" } },
                aiAnalysis.rationale
              )
            )
          ),
          // Chart Options Grid
          import_react.default.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 8
              }
            },
            chartOptions.map((opt) => {
              const isAiRec = aiAnalysis.recommendedType === opt.id;
              const isSelected = chartType === opt.id;
              return import_react.default.createElement(
                "div",
                {
                  key: opt.id,
                  onClick: () => !opt.disabled && setChartType(opt.id),
                  style: {
                    background: isSelected ? "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, #c15f3e18)" : "var(--dsw-alias-bg-layer-2)",
                    border: isSelected ? "1.5px solid #c15f3e" : "1px solid var(--dsw-alias-border-l3)",
                    borderRadius: RADIUS.card,
                    padding: "10px 11px",
                    cursor: opt.disabled ? "not-allowed" : "pointer",
                    opacity: opt.disabled ? 0.45 : 1,
                    transition: "all 120ms ease",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                  }
                },
                isAiRec && import_react.default.createElement("span", {
                  style: {
                    position: "absolute",
                    top: 6,
                    right: 8,
                    fontSize: 9.5,
                    fontFamily: FONT_SANS,
                    fontWeight: 700,
                    color: "#c15f3e",
                    background: "#c15f3e18",
                    border: "1px solid #c15f3e40",
                    padding: "1px 5px",
                    borderRadius: RADIUS.badge
                  }
                }, "\u2728 AI \u63A8\u8350"),
                import_react.default.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 6 } },
                  import_react.default.createElement("span", { style: { fontSize: 14 } }, opt.icon),
                  import_react.default.createElement("span", {
                    style: {
                      fontSize: 12,
                      fontWeight: 650,
                      color: isSelected ? "#c15f3e" : "var(--dsw-alias-label-primary)"
                    }
                  }, opt.name)
                ),
                import_react.default.createElement("div", {
                  style: { fontSize: 10.5, color: "var(--dsw-alias-label-secondary)", lineHeight: 1.4 }
                }, opt.desc)
              );
            })
          )
        ),
        // Step 3: Dimension & Axis Configuration
        import_react.default.createElement(
          "div",
          {
            style: {
              background: "var(--dsw-alias-bg-layer-2)",
              borderRadius: RADIUS.sub,
              padding: "10px 14px",
              border: "1px solid var(--dsw-alias-border-l3)",
              display: "flex",
              flexDirection: "column",
              gap: 9
            }
          },
          chartType === "pareto" && import_react.default.createElement(
            "div",
            {
              style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }
            },
            import_react.default.createElement("span", { style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", fontWeight: 600 } }, "\u6A2A\u8F74 (X \u7EF4\u5EA6):"),
            import_react.default.createElement(
              "select",
              {
                value: xMetric,
                onChange: (e) => setXMetric(e.target.value),
                style: {
                  background: "var(--dsw-alias-bg-layer-1)",
                  border: "1px solid var(--dsw-alias-border-l2)",
                  borderRadius: RADIUS.control,
                  padding: "3px 8px",
                  color: "var(--dsw-alias-label-primary)",
                  fontSize: 11.5,
                  fontFamily: FONT_MONO,
                  outline: "none"
                }
              },
              availableMetrics.map((m) => import_react.default.createElement("option", { key: m, value: m }, m.toUpperCase()))
            ),
            import_react.default.createElement("span", { style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", fontWeight: 600, marginLeft: 8 } }, "\u7EB5\u8F74 (Y \u7EF4\u5EA6):"),
            import_react.default.createElement(
              "select",
              {
                value: yMetric,
                onChange: (e) => setYMetric(e.target.value),
                style: {
                  background: "var(--dsw-alias-bg-layer-1)",
                  border: "1px solid var(--dsw-alias-border-l2)",
                  borderRadius: RADIUS.control,
                  padding: "3px 8px",
                  color: "var(--dsw-alias-label-primary)",
                  fontSize: 11.5,
                  fontFamily: FONT_MONO,
                  outline: "none"
                }
              },
              availableMetrics.map((m) => import_react.default.createElement("option", { key: m, value: m }, m.toUpperCase()))
            )
          ),
          (chartType === "bar" || chartType === "radar") && import_react.default.createElement(
            "div",
            {
              style: { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }
            },
            import_react.default.createElement("span", { style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", fontWeight: 600 } }, "\u8BC4\u4F30\u7EF4\u5EA6:"),
            availableMetrics.map((m) => {
              const isChecked = selectedMetrics.includes(m);
              return import_react.default.createElement("button", {
                key: m,
                onClick: () => {
                  setSelectedMetrics((prev) => isChecked ? prev.filter((x) => x !== m) : [...prev, m]);
                },
                style: {
                  background: isChecked ? "#c15f3e18" : "var(--dsw-alias-bg-layer-1)",
                  border: isChecked ? "1px solid #c15f3e60" : "1px solid var(--dsw-alias-border-l3)",
                  color: isChecked ? "#c15f3e" : "var(--dsw-alias-label-secondary)",
                  borderRadius: RADIUS.badge,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontFamily: FONT_MONO,
                  fontWeight: isChecked ? 650 : 500,
                  cursor: "pointer"
                }
              }, `${isChecked ? "\u2713 " : ""}${m.toUpperCase()}`);
            })
          ),
          // Title Input
          import_react.default.createElement(
            "div",
            {
              style: { display: "flex", alignItems: "center", gap: 8 }
            },
            import_react.default.createElement("span", { style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)", fontWeight: 600 } }, "\u56FE\u8868\u6807\u9898:"),
            import_react.default.createElement("input", {
              value: customTitle,
              placeholder: aiAnalysis.title,
              onChange: (e) => setCustomTitle(e.target.value),
              style: {
                flex: 1,
                background: "var(--dsw-alias-bg-layer-1)",
                border: "1px solid var(--dsw-alias-border-l2)",
                borderRadius: RADIUS.control,
                padding: "4px 10px",
                fontSize: 12,
                color: "var(--dsw-alias-label-primary)",
                fontFamily: FONT_SANS,
                outline: "none"
              }
            })
          )
        ),
        // Step 4: Live Vector SVG Preview
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement("div", {
            style: { fontSize: 12, fontWeight: 700, color: "var(--dsw-alias-label-primary)", marginBottom: 8, letterSpacing: ".02em" }
          }, "3. \u77E2\u91CF\u56FE\u8868\u5B9E\u65F6\u9884\u89C8"),
          import_react.default.createElement(
            "div",
            {
              style: {
                background: "var(--dsw-alias-bg-base)",
                border: "1px solid var(--dsw-alias-border-l3)",
                borderRadius: RADIUS.sub,
                padding: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 240,
                overflowX: "auto"
              }
            },
            generatedSvg ? import_react.default.createElement("div", {
              style: { width: "100%", display: "flex", justifyContent: "center" },
              dangerouslySetInnerHTML: { __html: generatedSvg }
            }) : import_react.default.createElement("div", {
              style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 12 }
            }, "\u8BF7\u81F3\u5C11\u9009\u62E9 1 \u4E2A\u6709\u6548\u6570\u636E\u5B9E\u4F53\u4EE5\u751F\u6210\u56FE\u8868\u9884\u89C8")
          )
        )
      ),
      // Footer
      import_react.default.createElement(
        "div",
        {
          style: {
            padding: "12px 20px",
            borderTop: "1px solid var(--dsw-alias-border-l3)",
            background: "var(--dsw-alias-bg-layer-1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
          }
        },
        import_react.default.createElement(
          "button",
          {
            onClick: handleAskAiDeep,
            disabled: selectedNodes.length === 0,
            style: {
              background: "var(--dsw-alias-bg-layer-2)",
              border: "1px solid var(--dsw-alias-border-l2)",
              borderRadius: RADIUS.control,
              padding: "6px 14px",
              fontSize: 12,
              color: "var(--dsw-alias-label-primary)",
              cursor: selectedNodes.length === 0 ? "not-allowed" : "pointer",
              opacity: selectedNodes.length === 0 ? 0.5 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 550,
              transition: "all 120ms ease"
            },
            title: "\u5411\u4E3B\u5BF9\u8BDD Agent \u53D1\u9001\u9700\u6C42\uFF0C\u7F16\u5199 Python \u7ED8\u56FE\u4EE3\u7801\u5E76\u8F93\u51FA\u9AD8\u5206\u8FA8\u7387\u8BBA\u6587\u56FE\u8868"
          },
          import_react.default.createElement("span", null, "\u{1F916}"),
          import_react.default.createElement("span", null, "\u8BA9 AI \u6DF1\u5EA6\u7ED8\u56FE\u4E0E\u5206\u6790")
        ),
        import_react.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 8 } },
          import_react.default.createElement("button", {
            onClick: onClose,
            style: {
              background: "transparent",
              border: "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "6px 14px",
              fontSize: 12,
              color: "var(--dsw-alias-label-secondary)",
              cursor: "pointer"
            }
          }, "\u53D6\u6D88"),
          import_react.default.createElement(
            "button",
            {
              onClick: handleSaveToMiddleColumn,
              disabled: !generatedSvg || selectedNodes.length === 0,
              style: {
                background: !generatedSvg || selectedNodes.length === 0 ? "var(--dsw-alias-bg-layer-2)" : "#c15f3e",
                color: !generatedSvg || selectedNodes.length === 0 ? "var(--dsw-alias-label-tertiary)" : "#fff",
                border: !generatedSvg || selectedNodes.length === 0 ? "1px solid var(--dsw-alias-border-l3)" : "1px solid #c15f3e",
                borderRadius: RADIUS.control,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 650,
                cursor: !generatedSvg || selectedNodes.length === 0 ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "all 120ms ease"
              },
              title: "\u5C06\u5F53\u524D\u751F\u6210\u7684\u77E2\u91CF\u56FE\u8868\u6682\u5B58\u4E3A\u4E2D\u95F4\u680F\u4EA7\u7269\u5361\u7247"
            },
            import_react.default.createElement("span", null, "\u{1F4BE}"),
            import_react.default.createElement("span", null, "\u4FDD\u5B58\u56FE\u8868\u5230\u4E2D\u95F4\u680F")
          )
        )
      )
    )
  );
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
  onOpenChartModal
}) {
  const allNodes = state.nodes || [];
  const edges = state.edges || [];
  const [leftSubTab, setLeftSubTab] = (0, import_react.useState)("all");
  const [middleSubTab, setMiddleSubTab] = (0, import_react.useState)("all");
  const [rightSubTab, setRightSubTab] = (0, import_react.useState)("all");
  const [leftFilter, setLeftFilter] = (0, import_react.useState)("all");
  const [middleFilter, setMiddleFilter] = (0, import_react.useState)("all");
  const [rightFilter, setRightFilter] = (0, import_react.useState)("all");
  (0, import_react.useEffect)(() => {
    if (!selectedId) return;
    const node = allNodes.find((n) => n.id === selectedId);
    if (!node) return;
    if (node.kind === "question" || node.kind === "hypothesis") {
      if (leftSubTab !== "all" && leftSubTab !== node.kind) {
        setLeftSubTab(node.kind);
      }
    } else if (node.kind === "dataset" || node.kind === "artifact") {
      const isChart = node.kind === "artifact" && (node.tags && (node.tags.includes("chart") || node.tags.includes("plot") || node.tags.includes("figure")) || node.fileType === "image" || Boolean(node.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(node.sandboxPath)) || Boolean(node.preview && (node.preview.trim().startsWith("<svg") || node.preview.trim().startsWith("data:image"))) || Boolean(node.content && node.content.trim().startsWith("<svg")));
      const targetSub = node.kind === "dataset" ? "dataset" : isChart ? "chart" : "artifact";
      if (middleSubTab !== "all" && middleSubTab !== targetSub) {
        setMiddleSubTab(targetSub);
      }
    } else if (node.kind === "experiment" || node.kind === "finding") {
      if (rightSubTab !== "all" && rightSubTab !== node.kind) {
        setRightSubTab(node.kind);
      }
    }
  }, [selectedId, allNodes]);
  const renderCard = (node) => {
    const isThisThinking = isBusy && (busyState?.target === node.id || !busyState?.target && activeThreadId === node.id);
    return import_react.default.createElement(ColumnCard, {
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
      onOpenChartModal
    });
  };
  const leftNodes = allNodes.filter((n) => n.kind === "question" || n.kind === "hypothesis");
  leftNodes.sort((a, b) => a.kind === "question" ? -1 : 1);
  const qCount = leftNodes.filter((n) => n.kind === "question").length;
  const hCount = leftNodes.filter((n) => n.kind === "hypothesis").length;
  const leftSubTabs = [
    { id: "all", label: "\u5168\u90E8", count: leftNodes.length },
    { id: "question", label: "\u7814\u7A76\u95EE\u9898", count: qCount, icon: "\u2753" },
    { id: "hypothesis", label: "\u7406\u8BBA\u5047\u8BBE", count: hCount, icon: "\u{1F33F}" }
  ];
  const isChartNode = (n) => n.kind === "artifact" && (n.tags && (n.tags.includes("chart") || n.tags.includes("plot") || n.tags.includes("figure")) || n.fileType === "image" || Boolean(n.sandboxPath && /\.(svg|png|jpe?g|webp)$/i.test(n.sandboxPath)) || Boolean(n.preview && (n.preview.trim().startsWith("<svg") || n.preview.trim().startsWith("data:image"))) || Boolean(n.content && n.content.trim().startsWith("<svg")));
  const datasetNodes = allNodes.filter((n) => n.kind === "dataset");
  const chartNodes = allNodes.filter(isChartNode);
  const chartNodeIds = new Set(chartNodes.map((n) => n.id));
  const artifactNodes = allNodes.filter((n) => n.kind === "artifact" && !chartNodeIds.has(n.id));
  const middleNodes = [...datasetNodes, ...chartNodes, ...artifactNodes];
  const dCount = datasetNodes.length;
  const cCount = chartNodes.length;
  const aCount = artifactNodes.length;
  const middleSubTabs = [
    { id: "all", label: "\u5168\u90E8", count: middleNodes.length },
    { id: "dataset", label: "\u6838\u5FC3\u6570\u636E", count: dCount, icon: "\u{1F4CA}" },
    { id: "chart", label: "\u56FE\u8868\u5206\u6790", count: cCount, icon: "\u{1F4C8}" },
    { id: "artifact", label: "\u4EA7\u7269\u5F52\u6863", count: aCount, icon: "\u{1F4E6}" }
  ];
  const rightNodes = allNodes.filter((n) => ["finding", "experiment"].includes(n.kind) || !["question", "hypothesis", "dataset", "artifact"].includes(n.kind));
  rightNodes.sort((a, b) => {
    const order = { experiment: 0, finding: 1 };
    return (order[a.kind] ?? 9) - (order[b.kind] ?? 9);
  });
  const eCount = rightNodes.filter((n) => n.kind === "experiment").length;
  const fCount = rightNodes.filter((n) => n.kind === "finding").length;
  const rightSubTabs = [
    { id: "all", label: "\u5168\u90E8", count: rightNodes.length },
    { id: "experiment", label: "\u5B9E\u9A8C\u63A2\u7D22", count: eCount, icon: "\u{1F9EA}" },
    { id: "finding", label: "\u5B9E\u8BC1\u7ED3\u8BBA", count: fCount, icon: "\u{1F4A1}" }
  ];
  const filterNodes = (nodes, filter) => {
    return nodes.filter((n) => {
      const meta = getNodeStatusMeta(n);
      const isDegraded = meta?.group === "degraded";
      if (hideDegraded && isDegraded && filter !== "degraded" && n.id !== selectedId) {
        return false;
      }
      if (filter === "all") return true;
      if (filter === "valid") return !isDegraded;
      return meta?.group === filter;
    });
  };
  const leftSubNodes = leftSubTab === "all" ? leftNodes : leftNodes.filter((n) => n.kind === leftSubTab);
  const filteredLeft = filterNodes(leftSubNodes, leftFilter);
  const middleSubNodes = middleSubTab === "all" ? middleNodes : middleSubTab === "dataset" ? datasetNodes : middleSubTab === "chart" ? chartNodes : artifactNodes;
  const filteredMiddle = filterNodes(middleSubNodes, middleFilter);
  const rightSubNodes = rightSubTab === "all" ? rightNodes : rightSubTab === "experiment" ? rightNodes.filter((n) => n.kind === "experiment") : rightNodes.filter((n) => n.kind === "finding");
  const filteredRight = filterNodes(rightSubNodes, rightFilter);
  return import_react.default.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(260px, 1fr) minmax(480px, 2fr) minmax(260px, 1fr)",
        gap: 16,
        height: "100%",
        padding: "14px 18px 16px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: FONT_SANS
      }
    },
    // Left Column - Motivation & Hypothesis with Sub-tabs
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)",
          borderRadius: RADIUS.pane,
          border: "1px solid var(--dsw-alias-border-l3)",
          overflow: "hidden"
        }
      },
      import_react.default.createElement(ColumnHeader, {
        title: "\u95EE\u9898\u4E0E\u5047\u8BBE",
        dotColor: "#5c8a77",
        nodes: leftNodes,
        activeFilter: leftFilter,
        onFilterChange: setLeftFilter,
        validLabel: "\u6709\u6548\u5047\u8BF4",
        degradedLabel: "\u5DF2\u8BC1\u4F2A",
        hideDegraded,
        subTabs: leftSubTabs,
        activeSubTab: leftSubTab,
        onSubTabChange: setLeftSubTab
      }),
      import_react.default.createElement(
        "div",
        {
          style: {
            flex: 1,
            overflowY: "auto",
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        },
        filteredLeft.length > 0 ? leftSubTab === "all" && qCount > 0 && hCount > 0 ? import_react.default.createElement(
          import_react.default.Fragment,
          null,
          filteredLeft.some((n) => n.kind === "question") && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "2px 0",
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u2753"),
            import_react.default.createElement("span", null, "\u7814\u7A76\u95EE\u9898"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredLeft.filter((n) => n.kind === "question").length})`)
          ),
          filteredLeft.filter((n) => n.kind === "question").map(renderCard),
          filteredLeft.some((n) => n.kind === "hypothesis") && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "10px 0 2px",
                borderTop: "1px solid var(--dsw-alias-border-l3)",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F33F}"),
            import_react.default.createElement("span", null, "\u7406\u8BBA\u5047\u8BBE"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredLeft.filter((n) => n.kind === "hypothesis").length})`)
          ),
          filteredLeft.filter((n) => n.kind === "hypothesis").map(renderCard)
        ) : filteredLeft.map(renderCard) : import_react.default.createElement("div", {
          style: { textAlign: "center", padding: "30px 16px", color: "var(--dsw-alias-label-secondary)", fontSize: 12 }
        }, hideDegraded ? "\u5F53\u524D\u5DF2\u9690\u85CF\u8BC1\u4F2A\u5047\u8BF4\uFF0C\u70B9\u51FB\u9876\u90E8\u6309\u94AE\u53EF\u6062\u590D\u663E\u793A" : "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u6682\u65E0\u5361\u7247")
      )
    ),
    // Middle Column - Datasets & Artifacts with Sub-tabs
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)",
          borderRadius: RADIUS.pane,
          border: "1px solid var(--dsw-alias-border-l3)",
          overflow: "hidden"
        }
      },
      import_react.default.createElement(ColumnHeader, {
        title: "\u6570\u636E\u4E0E\u4EA7\u7269",
        dotColor: "#c15f3e",
        nodes: middleNodes,
        activeFilter: middleFilter,
        onFilterChange: setMiddleFilter,
        validLabel: "\u6709\u6548\u5B9E\u4F53",
        degradedLabel: "\u5DF2\u5E9F\u5F03",
        hideDegraded,
        subTabs: middleSubTabs,
        activeSubTab: middleSubTab,
        onSubTabChange: setMiddleSubTab,
        extraAction: import_react.default.createElement(
          "button",
          {
            onClick: () => onOpenChartModal && onOpenChartModal(),
            style: {
              background: "#c15f3e18",
              border: "1px solid #c15f3e55",
              borderRadius: RADIUS.control,
              padding: "2px 8.5px",
              fontSize: 11,
              color: "#c15f3e",
              fontFamily: FONT_SANS,
              fontWeight: 650,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "all 120ms ease"
            },
            title: "\u5C06\u9009\u5B9A\u5B9E\u9A8C\u6307\u6807\u6216\u6570\u636E\u5207\u7247\u751F\u6210\u53EF\u89C6\u5316\u56FE\u8868\u5E76\u5F52\u6863\u81F3\u672C\u680F"
          },
          import_react.default.createElement("span", null, "\u{1F4C8}"),
          import_react.default.createElement("span", null, "\u6570\u636E\u753B\u56FE")
        )
      }),
      import_react.default.createElement(
        "div",
        {
          style: {
            flex: 1,
            overflowY: "auto",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        },
        filteredMiddle.length > 0 ? middleSubTab === "all" && (dCount > 0 || cCount > 0 || aCount > 0) ? import_react.default.createElement(
          import_react.default.Fragment,
          null,
          filteredMiddle.some((n) => n.kind === "dataset") && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "2px 0",
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F4CA}"),
            import_react.default.createElement("span", null, "\u6838\u5FC3\u6570\u636E"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter((n) => n.kind === "dataset").length})`)
          ),
          filteredMiddle.filter((n) => n.kind === "dataset").map(renderCard),
          filteredMiddle.some((n) => chartNodeIds.has(n.id)) && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "10px 0 2px",
                borderTop: "1px solid var(--dsw-alias-border-l3)",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F4C8}"),
            import_react.default.createElement("span", null, "\u56FE\u8868\u5206\u6790"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter((n) => chartNodeIds.has(n.id)).length})`)
          ),
          filteredMiddle.filter((n) => chartNodeIds.has(n.id)).map(renderCard),
          filteredMiddle.some((n) => n.kind === "artifact" && !chartNodeIds.has(n.id)) && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "10px 0 2px",
                borderTop: "1px solid var(--dsw-alias-border-l3)",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F4E6}"),
            import_react.default.createElement("span", null, "\u4EA7\u7269\u5F52\u6863"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredMiddle.filter((n) => n.kind === "artifact" && !chartNodeIds.has(n.id)).length})`)
          ),
          filteredMiddle.filter((n) => n.kind === "artifact" && !chartNodeIds.has(n.id)).map(renderCard)
        ) : filteredMiddle.map(renderCard) : import_react.default.createElement("div", {
          style: {
            textAlign: "center",
            padding: "30px 16px",
            color: "var(--dsw-alias-label-secondary)",
            fontSize: 12.5
          }
        }, middleNodes.length === 0 ? "\u6682\u65E0\u6570\u636E\u6216\u56FE\u8868\u4EA7\u7269\u8282\u70B9" : hideDegraded ? "\u5F53\u524D\u5DF2\u9690\u85CF\u5E9F\u5F03\u6570\u636E/\u4EA7\u7269\u8282\u70B9" : "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u6682\u65E0\u5361\u7247")
      )
    ),
    // Right Column - Findings & Experiments with Sub-tabs
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          background: "color-mix(in srgb, var(--dsw-alias-bg-layer-1) 40%, transparent)",
          borderRadius: RADIUS.pane,
          border: "1px solid var(--dsw-alias-border-l3)",
          overflow: "hidden"
        }
      },
      import_react.default.createElement(ColumnHeader, {
        title: "\u5B9E\u9A8C\u4E0E\u7ED3\u8BBA",
        dotColor: "#b45353",
        nodes: rightNodes,
        activeFilter: rightFilter,
        onFilterChange: setRightFilter,
        validLabel: "\u6709\u6548\u7ED3\u8BBA",
        degradedLabel: "\u5DF2\u5E9F\u5F03/\u8BC1\u4F2A",
        hideDegraded,
        subTabs: rightSubTabs,
        activeSubTab: rightSubTab,
        onSubTabChange: setRightSubTab
      }),
      import_react.default.createElement(
        "div",
        {
          style: {
            flex: 1,
            overflowY: "auto",
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        },
        filteredRight.length > 0 ? rightSubTab === "all" && eCount > 0 && fCount > 0 ? import_react.default.createElement(
          import_react.default.Fragment,
          null,
          filteredRight.some((n) => n.kind === "experiment") && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "2px 0",
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F9EA}"),
            import_react.default.createElement("span", null, "\u5B9E\u9A8C\u63A2\u7D22"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredRight.filter((n) => n.kind === "experiment").length})`)
          ),
          filteredRight.filter((n) => n.kind === "experiment").map(renderCard),
          filteredRight.some((n) => n.kind === "finding") && import_react.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                color: "var(--dsw-alias-label-secondary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                padding: "10px 0 2px",
                borderTop: "1px solid var(--dsw-alias-border-l3)",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 6
              }
            },
            import_react.default.createElement("span", null, "\u{1F4A1}"),
            import_react.default.createElement("span", null, "\u5B9E\u8BC1\u7ED3\u8BBA"),
            import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 10 } }, `(${filteredRight.filter((n) => n.kind === "finding").length})`)
          ),
          filteredRight.filter((n) => n.kind === "finding").map(renderCard)
        ) : filteredRight.map(renderCard) : import_react.default.createElement("div", {
          style: { textAlign: "center", padding: "30px 16px", color: "var(--dsw-alias-label-secondary)", fontSize: 12 }
        }, hideDegraded ? "\u5F53\u524D\u5DF2\u9690\u85CF\u5E9F\u5F03/\u8D1F\u5411\u7ED3\u8BBA\u4E0E\u5B9E\u9A8C\uFF0C\u70B9\u51FB\u9876\u90E8\u6309\u94AE\u53EF\u6062\u590D\u663E\u793A" : "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u6682\u65E0\u5361\u7247")
      )
    )
  );
}
function ResearchWorkspace({ state, onSendMessage, onExecuteCommand, sessionRunning }) {
  const [selectedId, setSelectedId] = (0, import_react.useState)(null);
  const [expandedIds, setExpandedIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
  const [localActiveThreadId, setLocalActiveThreadId] = (0, import_react.useState)(null);
  const [optimisticThreads, setOptimisticThreads] = (0, import_react.useState)({});
  const [hideDegraded, setHideDegraded] = (0, import_react.useState)(false);
  const [busyState, setBusyState] = (0, import_react.useState)({ target: null, label: "", startTime: null });
  const [elapsedSec, setElapsedSec] = (0, import_react.useState)(0);
  const [isChartModalOpen, setIsChartModalOpen] = (0, import_react.useState)(false);
  const [chartInitialIds, setChartInitialIds] = (0, import_react.useState)([]);
  const [localArtifactNodes, setLocalArtifactNodes] = (0, import_react.useState)([]);
  const [localEdges, setLocalEdges] = (0, import_react.useState)([]);
  const handleOpenChartModal = (ids = []) => {
    setChartInitialIds(ids);
    setIsChartModalOpen(true);
  };
  const handleCloseChartModal = () => {
    setIsChartModalOpen(false);
  };
  const handleSaveChart = (newChartNode, newEdges) => {
    setLocalArtifactNodes((prev) => [newChartNode, ...prev]);
    if (newEdges && newEdges.length > 0) {
      setLocalEdges((prev) => [...prev, ...newEdges]);
    }
    setSelectedId(newChartNode.id);
    setExpandedIds((prev) => new Set(prev).add(newChartNode.id));
    setIsChartModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`card-${newChartNode.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  };
  const handleAskAiDeepPlot = (prompt) => {
    setIsChartModalOpen(false);
    handleSendMessage(null, prompt);
  };
  const isBusy = Boolean(sessionRunning) || Boolean(busyState.target);
  (0, import_react.useEffect)(() => {
    if (!isBusy) {
      setElapsedSec(0);
      return;
    }
    const start = busyState.startTime || Date.now();
    const timer = setInterval(() => {
      setElapsedSec(Math.max(1, Math.floor((Date.now() - start) / 1e3)));
    }, 1e3);
    return () => clearInterval(timer);
  }, [isBusy, busyState.startTime]);
  const prevSessionRunningRef = (0, import_react.useRef)(sessionRunning);
  (0, import_react.useEffect)(() => {
    if (prevSessionRunningRef.current && !sessionRunning) {
      setBusyState({ target: null, label: "", startTime: null });
    }
    prevSessionRunningRef.current = sessionRunning;
  }, [sessionRunning]);
  const prevStateRef = (0, import_react.useRef)(state);
  (0, import_react.useEffect)(() => {
    if (prevStateRef.current !== state && busyState.target === "sync") {
      setBusyState({ target: null, label: "", startTime: null });
    }
    prevStateRef.current = state;
  }, [state, busyState.target]);
  (0, import_react.useEffect)(() => {
    if (busyState.target && !sessionRunning) {
      const timer = setTimeout(() => {
        setBusyState({ target: null, label: "", startTime: null });
      }, 25e3);
      return () => clearTimeout(timer);
    }
  }, [busyState.target, sessionRunning]);
  const activeThreadId = localActiveThreadId !== null ? localActiveThreadId : state?.activeThreadId || null;
  const totalDegradedCount = (0, import_react.useMemo)(() => {
    if (!state || !state.nodes) return 0;
    return state.nodes.filter((n) => getNodeStatusMeta(n)?.group === "degraded").length;
  }, [state]);
  const stagedCount = (0, import_react.useMemo)(() => {
    if (!state || !state.nodes) return 0;
    return state.nodes.filter((n) => (n.sandboxPath || n.content || n.preview) && n.staged !== false).length;
  }, [state]);
  const connected = (0, import_react.useMemo)(() => {
    if (!selectedId || !state || !state.edges) return /* @__PURE__ */ new Set();
    const result = /* @__PURE__ */ new Set([selectedId]);
    state.edges.forEach((edge) => {
      if (edge.source === selectedId) result.add(edge.target);
      if (edge.target === selectedId) result.add(edge.source);
    });
    return result;
  }, [selectedId, state]);
  const handleSelect = (id) => {
    if (!id) {
      setSelectedId(null);
      return;
    }
    setSelectedId((prev) => prev === id ? null : id);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };
  const handleClearSelection = () => {
    setSelectedId(null);
    setExpandedIds(/* @__PURE__ */ new Set());
  };
  const handleSetFocus = (id) => {
    setLocalActiveThreadId(id);
    if (id) {
      setSelectedId(id);
      setExpandedIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        const el = document.getElementById(`card-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    }
  };
  const handleSendMessage = (targetNodeId, text) => {
    if (!text) return;
    setBusyState({
      target: targetNodeId || "global",
      label: targetNodeId ? `\u5BF9 [${targetNodeId}] \u601D\u8003\u4E2D...` : "\u601D\u8003\u4E2D...",
      startTime: Date.now()
    });
    if (targetNodeId) {
      const newMsg = {
        id: `opt-${Date.now()}`,
        sender: "user",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text
      };
      setOptimisticThreads((prev) => ({
        ...prev,
        [targetNodeId]: [...prev[targetNodeId] || [], newMsg]
      }));
    }
    if (onSendMessage) {
      onSendMessage(targetNodeId, text);
    }
  };
  const handleSyncClick = () => {
    setBusyState({
      target: "sync",
      label: "\u6B63\u5728\u540C\u6B65\u8FDB\u5C55...",
      startTime: Date.now()
    });
    if (typeof onExecuteCommand === "function") {
      onExecuteCommand("/import-sync");
    } else {
      handleSendMessage(null, "/import-sync");
    }
  };
  const mergedNodes = (0, import_react.useMemo)(() => {
    const baseNodes = state?.nodes || [];
    const all = [...baseNodes, ...localArtifactNodes];
    return all.map((node) => {
      const optList = optimisticThreads[node.id];
      if (!optList || optList.length === 0) return node;
      const existing = node.thread || [];
      const dedupedOpt = optList.filter((o) => !existing.some((e) => e.text === o.text && e.sender === "user"));
      if (dedupedOpt.length === 0) return node;
      return {
        ...node,
        thread: [...existing, ...dedupedOpt]
      };
    });
  }, [state, localArtifactNodes, optimisticThreads]);
  const mergedState = (0, import_react.useMemo)(() => {
    if (!state) return null;
    return {
      ...state,
      nodes: mergedNodes,
      edges: [...state.edges || [], ...localEdges],
      activeThreadId
    };
  }, [state, mergedNodes, localEdges, activeThreadId]);
  const activeNode = (0, import_react.useMemo)(() => {
    if (!activeThreadId || !mergedNodes) return null;
    return mergedNodes.find((n) => n.id === activeThreadId) || null;
  }, [mergedNodes, activeThreadId]);
  (0, import_react.useEffect)(() => {
    const style = document.createElement("style");
    style.dataset.researchFlow = "true";
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
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);
  if (!state) {
    return import_react.default.createElement(
      "section",
      {
        "aria-label": "Research Workspace",
        "data-conversation-composer-overlay": "",
        "data-research-workspace": "",
        style: WORKSPACE_STYLE
      },
      import_react.default.createElement(PlaceholderCard)
    );
  }
  return import_react.default.createElement(
    "section",
    {
      "aria-label": "Research Workspace",
      "data-conversation-composer-overlay": "",
      "data-research-workspace": "",
      style: {
        ...WORKSPACE_STYLE,
        display: "flex",
        flexDirection: "column"
      }
    },
    // Top Bar with Summary
    import_react.default.createElement(
      "header",
      {
        style: {
          height: 44,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          borderBottom: "1px solid var(--dsw-alias-border-l3)",
          background: "var(--dsw-alias-bg-layer-1)",
          userSelect: "none",
          zIndex: 5,
          fontFamily: FONT_SANS
        }
      },
      // Left stats & brand
      import_react.default.createElement(
        "div",
        {
          style: { display: "flex", alignItems: "center", gap: 9 }
        },
        import_react.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6.5,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".08em",
              fontFamily: FONT_MONO,
              color: "var(--dsw-alias-label-primary)"
            }
          },
          import_react.default.createElement("span", { style: { width: 6, height: 6, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", null, "RESEARCH")
        ),
        import_react.default.createElement("span", {
          style: { color: "var(--dsw-alias-border-l1)", opacity: 0.45, fontSize: 11 }
        }, "\xB7"),
        import_react.default.createElement("span", {
          style: {
            fontSize: 11.5,
            fontFamily: FONT_MONO,
            color: "var(--dsw-alias-label-secondary)",
            fontWeight: 500
          }
        }, hideDegraded && totalDegradedCount > 0 ? `${(state.nodes || []).length - totalDegradedCount} \u6709\u6548 / ${(state.nodes || []).length} \u5B9E\u4F53 \xB7 ${(state.edges || []).length} \u5173\u7CFB` : `${(state.nodes || []).length} \u5B9E\u4F53 \xB7 ${(state.edges || []).length} \u5173\u7CFB`),
        isBusy && import_react.default.createElement(
          "div",
          {
            className: "dsh-pulse-pill",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "2.5px 9px",
              borderRadius: RADIUS.badge,
              background: "#c15f3e14",
              border: "1px solid #c15f3e45",
              fontSize: 11.5,
              fontFamily: FONT_SANS,
              color: "#c15f3e",
              fontWeight: 600,
              marginLeft: 6
            }
          },
          import_react.default.createElement("span", { className: "dsh-typing-dot", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-2", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement("span", { className: "dsh-typing-dot dsh-dot-3", style: { width: 4.5, height: 4.5, borderRadius: RADIUS.round, background: "#c15f3e", display: "inline-block" } }),
          import_react.default.createElement(
            "span",
            { className: "dsh-shimmer-text", style: { marginLeft: 2 } },
            busyState.target === "sync" ? "\u6B63\u5728\u540C\u6B65\u6700\u65B0\u79D1\u7814\u8FDB\u5C55\u4E0E\u753B\u5E03..." : busyState.target && busyState.target !== "global" ? `Agent \u6B63\u5728\u7814\u8BA8 [${busyState.target}]...` : "Agent \u6B63\u5728\u601D\u8003\u5904\u7406\u4E2D..."
          ),
          elapsedSec > 0 && import_react.default.createElement("span", {
            style: {
              fontSize: 10.5,
              fontFamily: FONT_MONO,
              color: "var(--dsw-alias-label-secondary)",
              fontWeight: 500
            }
          }, `${elapsedSec}s`)
        ),
        stagedCount > 0 && import_react.default.createElement(
          "div",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 9px",
              borderRadius: RADIUS.badge,
              background: "#b07f4316",
              border: "1px solid #b07f4335",
              fontSize: 11.5,
              color: "#b07f43",
              fontFamily: FONT_MONO,
              marginLeft: 4
            },
            title: "\u63A2\u7D22\u4EA7\u7269\u6682\u5B58\u4E8E\u754C\u9762\u6C99\u7BB1\u4E2D\uFF0C\u5C1A\u672A\u5199\u5165\u78C1\u76D8\u3002\u7ECF\u786E\u8BA4\u540E\u53EF\u901A\u8FC7 research_sandbox_commit \u5DE5\u5177\u843D\u76D8\u4FDD\u5B58\u3002"
          },
          import_react.default.createElement("span", null, "\u{1F4E6}"),
          import_react.default.createElement("span", { style: { fontWeight: 650 } }, `${stagedCount} \u9879\u6C99\u7BB1\u5F85\u843D\u76D8`)
        ),
        selectedId && import_react.default.createElement(
          "button",
          {
            onClick: handleClearSelection,
            style: {
              marginLeft: 6,
              background: "var(--dsw-alias-bg-layer-2)",
              border: "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "2.5px 8px",
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5
            },
            title: "\u6E05\u9664\u9AD8\u4EAE\u805A\u7126\u4E0E\u5C55\u5F00"
          },
          import_react.default.createElement("span", null, `\u805A\u7126: ${selectedId}`),
          import_react.default.createElement("span", { style: { opacity: 0.6 } }, "\u2715")
        )
      ),
      // Right header controls: Hide Degraded Toggle, Quick Sync & Thread Focus Selector
      import_react.default.createElement(
        "div",
        {
          style: { display: "flex", alignItems: "center", gap: 8 }
        },
        totalDegradedCount > 0 && import_react.default.createElement(
          "button",
          {
            onClick: () => setHideDegraded((prev) => !prev),
            style: {
              background: hideDegraded ? "#b4535318" : "var(--dsw-alias-bg-layer-2)",
              border: hideDegraded ? "1px solid #b4535350" : "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "3px 9px",
              fontSize: 11.5,
              color: hideDegraded ? "#b45353" : "var(--dsw-alias-label-primary)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontFamily: FONT_SANS,
              fontWeight: hideDegraded ? 600 : 500,
              transition: "all 0.15s ease"
            },
            title: hideDegraded ? "\u5F53\u524D\u5DF2\u9690\u85CF\u5E9F\u5F03/\u8BC1\u4F2A\u7ED3\u8BBA\u4E0E\u5047\u8BF4\uFF0C\u70B9\u51FB\u6062\u590D\u663E\u793A\u5168\u90E8" : "\u70B9\u51FB\u9690\u85CF\u6240\u6709\u5DF2\u5E9F\u5F03\u3001\u8BC1\u4F2A\u6216\u5931\u8D25\u7684\u7ED3\u8BBA\u4E0E\u5047\u8BF4"
          },
          import_react.default.createElement("span", null, hideDegraded ? "\u{1F6AB}" : "\u{1F441}"),
          import_react.default.createElement("span", null, hideDegraded ? `\u5DF2\u9690\u85CF\u5E9F\u5F03 (${totalDegradedCount})` : `\u9690\u85CF\u5DF2\u5E9F\u5F03 (${totalDegradedCount})`)
        ),
        import_react.default.createElement(
          "button",
          {
            onClick: handleSyncClick,
            disabled: isBusy,
            className: isBusy && busyState.target === "sync" ? "dsh-pulse-pill" : void 0,
            style: {
              background: isBusy && busyState.target === "sync" ? "#c15f3e18" : "var(--dsw-alias-bg-layer-2)",
              border: isBusy && busyState.target === "sync" ? "1px solid #c15f3e55" : "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "3px 10px",
              fontSize: 11.5,
              color: isBusy && busyState.target === "sync" ? "#c15f3e" : "var(--dsw-alias-label-primary)",
              cursor: isBusy ? "wait" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: FONT_SANS,
              fontWeight: isBusy && busyState.target === "sync" ? 650 : 500,
              transition: "all 0.15s ease",
              opacity: isBusy && busyState.target !== "sync" ? 0.65 : 1
            },
            title: isBusy && busyState.target === "sync" ? "\u6B63\u5728\u589E\u91CF\u540C\u6B65\u6700\u65B0\u79D1\u7814\u8FDB\u5C55\u4E0E\u753B\u5E03..." : "\u4ECE\u5176\u4ED6 agent\u3001git \u63D0\u4EA4\u6216\u6587\u6863\u589E\u91CF\u540C\u6B65\u6700\u65B0\u8FDB\u5C55\u5230\u753B\u5E03 (/import-sync)"
          },
          import_react.default.createElement("span", {
            className: isBusy && busyState.target === "sync" ? "dsh-spin" : void 0,
            style: { fontSize: 12, display: "inline-block" }
          }, "\u{1F504}"),
          import_react.default.createElement("span", null, isBusy && busyState.target === "sync" ? `\u6B63\u5728\u540C\u6B65${elapsedSec > 0 ? ` (${elapsedSec}s)` : "..."}` : "\u540C\u6B65\u8FDB\u5C55")
        ),
        import_react.default.createElement("span", {
          style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)", fontWeight: 600, marginLeft: 2 }
        }, "\u{1F4AC} \u7814\u8BA8\u7126\u70B9:"),
        import_react.default.createElement(
          "select",
          {
            value: activeThreadId || "",
            onChange: (e) => handleSetFocus(e.target.value || null),
            style: {
              background: activeThreadId ? "#c15f3e18" : "var(--dsw-alias-bg-layer-2)",
              color: activeThreadId ? "#c15f3e" : "var(--dsw-alias-label-primary)",
              border: activeThreadId ? "1px solid #c15f3e55" : "1px solid var(--dsw-alias-border-l3)",
              borderRadius: RADIUS.control,
              padding: "3px 8px",
              fontSize: 11.5,
              fontFamily: FONT_SANS,
              outline: "none",
              cursor: "pointer",
              maxWidth: 240
            },
            title: "\u5207\u6362\u5F53\u524D\u7814\u8BA8\u7ED1\u5B9A\u7684\u5361\u7247\u6216\u5168\u5C40\u4E3B\u7EBF"
          },
          import_react.default.createElement("option", { value: "" }, "\u{1F310} \u5168\u5C40\u4E3B\u7EBF (\u5168\u90E8\u5361\u7247)"),
          (mergedNodes || []).map((n) => {
            const kMeta = TYPE_META[n.kind] || { zh: n.kind };
            const thLen = n.thread?.length || 0;
            return import_react.default.createElement("option", {
              key: n.id,
              value: n.id
            }, `[${kMeta.zh}] ${n.id}: ${n.title.slice(0, 22)}${thLen > 0 ? ` (${thLen}\u6761)` : ""}`);
          })
        )
      )
    ),
    // Workspace Body
    import_react.default.createElement(
      "div",
      {
        style: {
          flex: 1,
          position: "relative",
          minHeight: 0,
          overflow: "hidden"
        }
      },
      import_react.default.createElement(ColumnarWorkspace, {
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
        onOpenChartModal: handleOpenChartModal
      })
    ),
    // Docked Workspace Thread Bar at Bottom
    import_react.default.createElement(WorkspaceThreadBar, {
      activeNode,
      allNodes: mergedNodes,
      onSetFocus: handleSetFocus,
      onSendMessage: handleSendMessage,
      isBusy,
      busyTarget: busyState.target,
      elapsedSec
    }),
    // Data Charting & AI Suggestions Modal
    isChartModalOpen && import_react.default.createElement(DataChartingModal, {
      isOpen: isChartModalOpen,
      onClose: handleCloseChartModal,
      allNodes: mergedNodes,
      initialSelectedIds: chartInitialIds,
      onSaveChart: handleSaveChart,
      onAskAiDeepPlot: handleAskAiDeepPlot
    })
  );
}
var WORKSPACE_STYLE = { position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "var(--dsw-alias-bg-base)", color: "var(--dsw-alias-label-primary)", fontFamily: FONT_SANS };
var inject = ["slots", "sessions"];
function apply(ctx) {
  ctx.slots.inject("conversation.view", () => ctx.slots.register({
    name: "conversation.view",
    id: "research",
    order: 20,
    label: "Research",
    inject: (sessionId) => {
      const binding = ctx.sessions.binding(sessionId);
      if (binding === void 0) {
        throw new Error(`dsh-lab-research-ui: session "${sessionId}" is unavailable`);
      }
      return {
        hooks: { researchState: binding.session.projections.faceOf("research") },
        session: binding.session,
        sendMessage: (text) => binding.session.prompt([{ type: "text", text }], "queue")
      };
    }
  }, (props) => {
    const state = typeof props.useProjection === "function" ? props.useProjection("research") : typeof props.useResearchState === "function" ? props.useResearchState((s) => s) : null;
    const sessionRunning = typeof props.useSession === "function" ? props.useSession((s) => Boolean(s?.running)) : false;
    const onExecuteCommand = async (line) => {
      if (props.session && typeof props.session.command === "function") {
        return props.session.command(line);
      }
      if (ctx.remote?.commands?.execute && props.sessionId) {
        return ctx.remote.commands.execute(props.sessionId, line, []);
      }
      if (typeof props.sendMessage === "function") {
        props.sendMessage(line);
      }
    };
    return import_react.default.createElement(ResearchWorkspace, {
      state,
      onExecuteCommand,
      sessionRunning,
      onSendMessage: (targetNodeId, text) => {
        const promptText = targetNodeId ? `[\u5361\u7247\u7814\u8BA8 \xB7 ${targetNodeId}]: ${text}` : text;
        if (typeof props.sendMessage === "function") {
          props.sendMessage(promptText);
        } else if (props.session && typeof props.session.prompt === "function") {
          props.session.prompt([{ type: "text", text: promptText }], "queue");
        }
      }
    });
  }));
}

  return module.exports
} });
