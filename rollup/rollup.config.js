import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: [path.resolve(__dirname, './src/index.js')],
  output: [
    {
      // 产物输出目录
      dir: path.resolve(__dirname, './dist/es'),
      // 产物格式
      format: 'esm',
      plugins: [terser()],
    },
    {
      dir: path.resolve(__dirname, './dist/cjs'),
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};

export default buildOptions;
