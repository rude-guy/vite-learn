const { build, buildSync, serve } = require('esbuild');

async function runBuild() {
  serve(
    {
      port: 8000,
      // 静态资源目录
      servedir: './dist',
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ['esbuild/src/index.jsx'],
      bundle: true,
      format: 'esm',
      splitting: true,
      sourcemap: true,
      ignoreAnnotations: true,
      metafile: true,
    }
  ).then((server) => {
    console.log('Server is running at http://localhost:8000');
  });
}

runBuild();
