import { watch } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watcher = watch({
  // 和 rollup 配置文件中的属性基本一致，只不过多了`watch`配置
  input: path.resolve(__dirname, './src/index.js'),
  output: [
    {
      dir: path.resolve(__dirname, 'dist/es'),
      format: 'esm',
    },
    {
      dir: path.resolve(__dirname, 'dist/cjs'),
      format: 'cjs',
    },
  ],
  plugins: [resolve(), commonjs()],
  watch: {
    exclude: ['../node_modules/**'],
    include: [path.join(__dirname, './src/**')],
  },
});

// 监听 watch 各种事件
watcher.on('restart', () => {
  console.log('重新构建...');
});

watcher.on('change', (id) => {
  console.log('发生变动的模块id: ', id);
});

watcher.on('event', (e) => {
  if (e.code === 'BUNDLE_END') {
    console.log('打包信息:', e);
  }
});
