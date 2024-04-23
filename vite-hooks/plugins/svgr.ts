import { Plugin, transformWithEsbuild } from 'vite';
import * as fs from 'fs';
import type { Config } from '@svgr/core';

interface SvgrOptions {
  // svg 资源模块默认导出，url 或者组件
  defaultExport?: 'url' | 'component';
  svgrOptions?: Config;
}

export default function viteSvgrPlugin(options: SvgrOptions): Plugin {
  const { svgrOptions } = options;
  const postfixRE = /[?#].*$/s;
  return {
    name: 'vite-plugin-svgr',
    async transform(code, id) {
      // 1. 根据入参过滤svg资源
      if (!id.endsWith('.svg')) {
        return code;
      }
      const { transform } = await import('@svgr/core');
      const { default: jsx } = await import('@svgr/plugin-jsx');

      const filePath = id.replace(postfixRE, '');
      const svgCode = await fs.promises.readFile(filePath, 'utf8');

      const componentCode = await transform(svgCode, svgrOptions, {
        filePath,
        caller: {
          defaultPlugins: [jsx],
        },
      });

      // 5. 利用 esbuild，将组件中的 jsx 代码转译为浏览器可运行的代码;
      const result = await transformWithEsbuild(componentCode, id, {
        loader: 'jsx',
      });
      return {
        code: result.code,
        map: null,
      };
    },
  };
}
