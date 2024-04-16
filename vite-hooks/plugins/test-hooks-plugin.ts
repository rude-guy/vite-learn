import { ConfigEnv, ResolveOptions, ServerOptions } from 'vite';

export default function testHookPlugin() {
  return {
    name: 'test-hooks-plugin',
    // Vite 独有钩子
    config(config: ConfigEnv) {
      console.log('config');
    },
    // Vite 独有钩子
    configResolved(resolvedConfig: ConfigEnv) {
      console.log('configResolved');
    },
    // 通用钩子
    options(opts: ResolveOptions) {
      console.log('options');
      return opts;
    },
    // Vite 独有钩子
    configureServer(server: ServerOptions) {
      console.log('configureServer');
      setTimeout(() => {
        // 手动退出进程
        process.kill(process.pid, 'SIGTERM');
      }, 3000);
    },
    // 通用钩子
    buildStart() {
      console.log('buildStart');
    },
    // 通用钩子
    buildEnd() {
      console.log('buildEnd');
    },
    // 通用钩子
    closeBundle() {
      console.log('closeBundle');
    },
  };
}
