const { build, buildSync, serve } = require('esbuild');

async function runBuild() {
  // 异步方法返回已promise
  const result = await build({
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为了一个数组
    entryPoints: ['esbuild/src/index.jsx'],
    // 打包产物目录
    outdir: 'esbuild/dist',
    // 是否需要打包
    bundle: true,
    // 模块格式，包括 esm、commonjs 和 IIFE
    format: 'esm',
    // 需要排除打包依赖项目
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // 是否开启watch模式，在watch模式下代码变动会则会触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调试不同的loader进行加载
    loader: {
      '.png': 'base64',
    },
  });
  console.log(result);
}

runBuild();
