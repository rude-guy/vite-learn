import { Plugin } from '../plugin';
import { ServerContext } from '../server';
import path from 'path';
import fs from 'fs-extra';
import {
  cleanUrl,
  isInternalRequest,
  normalizePath,
  removeImportQuery,
} from '../util';
import resolve from 'resolve';
import { DEFAULT_EXTERSIONS } from '../constants';

export function resolvePlugin(): Plugin {
  let serverContext: ServerContext;
  return {
    name: 'm-vite:resolve',
    configureServer(s) {
      serverContext = s;
    },
    async resolveId(id, importer) {
      id = removeImportQuery(cleanUrl(id));
      if (isInternalRequest(id)) {
        return null;
      }
      // 1. 绝对路径
      if (path.isAbsolute(id)) {
        if (await fs.pathExists(id)) {
          return { id };
        }
        // 加上 root 路径前缀，处理 /src/main.tsx 的情况
        id = path.join(serverContext.root, id);
        if (await fs.pathExists(id)) {
          return { id };
        }
      }

      // 2. 相对路径
      else if (id.startsWith('.')) {
        if (!importer) {
          throw new Error('`importer` should not be undefined');
        }
        const hasExtension = path.extname(id).length > 1;
        let resolveId;
        // 2.1 包含文件名后缀
        // 如 ./App.tsx
        if (hasExtension) {
          resolveId = normalizePath(
            resolve.sync(id, { basedir: path.dirname(importer) })
          );
          if (await fs.pathExists(resolveId)) {
            return { id: resolveId };
          }
        }
        // 2.2 不包含文件名后缀
        // 如 ./App
        else {
          // ./App -> ./App.tsx
          for (const extname of DEFAULT_EXTERSIONS) {
            try {
              const withExtension = `${id}${extname}`;
              resolveId = normalizePath(
                resolve.sync(withExtension, { basedir: path.dirname(importer) })
              );
              if (await fs.pathExists(resolveId)) {
                return { id: resolveId };
              }
            } catch (e) {
              continue;
            }
          }
        }
      }
      return null;
    },
  };
}
