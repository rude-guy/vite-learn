import { rollup } from 'rollup';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 常用 inputOptions 配置
const inputOptions = {
  input: path.resolve(__dirname, './src/index.js'),
  external: [],
  plugins: [resolve(), commonjs()],
};

const outputOptionsList = [
  // 常用 outputOptions 配置
  {
    dir: path.resolve(__dirname, 'dist/es'),
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: 'chunk-[hash].js',
    assetFileNames: 'assets/[name]-[hash][extname]',
    format: 'es',
    sourcemap: true,
    globals: {
      lodash: '_',
    },
  },
];

async function runBuild() {
  let bundle;
  let bundleFailed = false;
  try {
    // 1. 调用rollup.rollup生成bundle对象
    bundle = await rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      // 2. 拿到 bundle 对象，根据每一份输出配置，调用 generate 和 write 方法分别生成和写入产物
      const { output } = await bundle.generate(outputOptions);
      await bundle.write(outputOptions);
    }
  } catch (e) {
    bundleFailed = true;
    console.error(e);
  }
  if (bundle) {
    // 最后调用 bundle.close 方法结束打包
    await bundle.close();
  }
  process.exit(bundleFailed ? 1 : 0);
}

runBuild();
