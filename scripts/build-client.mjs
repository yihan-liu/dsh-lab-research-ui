import { build } from 'esbuild'
import { readFile, unlink, writeFile } from 'node:fs/promises'

await build({
  entryPoints: ['src/client.jsx'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  loader: { '.css': 'text' },
  external: ['react', 'react/*', 'react-dom', 'react-dom/*', '@deepseek-ai/dsh-client-store'],
  outfile: '.client-body.js',
  sourcemap: false,
  define: { 'process.env.NODE_ENV': '"production"' },
})

const body = await readFile('.client-body.js', 'utf8')
const output = `window.__ModuleLoader__.load({ id: 'dsh-lab-research-ui', factory: (require) => {\n  var module = { exports: {} }\n  var exports = module.exports\n${body}\n  return module.exports\n} });\n`
await writeFile('client.js', output)
await unlink('.client-body.js')
