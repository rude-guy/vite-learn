const { build, buildSync, serve } = require('esbuild');
const httpImportPlugin = require('./plugins/http-import-plugin');

async function runBuild() {
  // 异步方法返回已promise
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: ['esbuild/src/index.jsx'],
    outdir: 'esbuild/dist',
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [httpImportPlugin()],
  });
  console.log(result);
}

runBuild();
