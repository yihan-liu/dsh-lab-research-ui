# Repository Guidelines

This repository (`dsh-lab-research-ui`) is the implementation package for the Research Workbench plugin.

When referencing upstream DeepSeek Harness (`deepseek-harness`):
- Use upstream repositories freely for source inspection and architecture reference.
- Treat upstream dependencies as read-only by default.
- Implement all plugin and extension features directly within this repository.

## Contribution Guidelines
1. Maintain zero external component library dependencies; use pure semantic DOM and SVG.
2. Adhere strictly to the concentric 5-tier `RADIUS.*` token system (`RADIUS.pane`, `RADIUS.card`, `RADIUS.sub`, `RADIUS.control`, `RADIUS.badge`).
3. Rebuild client bundle (`npm run build`) before release and verify with `node --check`.
