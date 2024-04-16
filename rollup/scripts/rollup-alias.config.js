import { rollup } from 'rollup';
import alias from '../plugins/plugin-alias.js';

const config = {
  input: 'rollup/src/index.js',
  output: {
    dir: 'rollup/output',
    format: 'cjs',
  },
  plugins: [
    alias({
      entries: [
        // 将把 import xxx from 'module-a'
        // 转换为 import xxx from './module-a'
        { find: 'module-a', replacement: './module-a.js' },
      ],
    }),
  ],
};

async function runBuild() {
  const bundle = await rollup(config);
  const { output } = await bundle.generate(config.output);
  console.log(output);
  await bundle.write(config.output);
  bundle.close();
}

runBuild();
