import path from 'path';
import { ViteDevServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const cwd = process.cwd();

export async function loadEntryModule(vite: ViteDevServer | null) {
  // 在生产模式下直接require 打包后的产物
  if (isProd) {
    const entryPath = path.join(cwd, 'dist/server/entry-server.js');
    return require(entryPath);
  }

  // 开发环境下通过 no-bundle 加载
  else {
    const entryPath = path.join(cwd, 'src/entry-server.tsx');
    return vite?.ssrLoadModule(entryPath);
  }
}
