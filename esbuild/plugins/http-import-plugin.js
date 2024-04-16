module.exports = () => ({
  name: 'esbuild:http',
  setup(build) {
    const http = require('http');
    const https = require('https');

    // 1. 拦截CDN请求
    build.onResolve({ filter: /^https?:\/\// }, (arg) => ({
      path: arg.path,
      namespace: 'http-url',
    }));

    // 拦截间接依赖，并重写路径
    // tip：间接依赖同样会带上http-url的namespace
    build.onResolve({ filter: /.*/, namespace: 'http-url' }, (arg) => ({
      path: new URL(arg.path, arg.importer).toString(),
      namespace: 'http-url',
    }));

    // 2. 通过fetch请求CDN资源
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (arg) => {
      const contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log('downloading:', url);
          const lib = url.startsWith('https') ? https : http;
          const req = lib.get(url, (res) => {
            if ([301, 302, 307].includes(res.statusCode)) {
              fetch(new URL(res.headers.location, url).toString());
              req.destroy();
            } else if (res.statusCode === 200) {
              const chunks = [];
              res.on('data', (chunk) => {
                chunks.push(chunk);
              });
              res.on('end', () => {
                resolve(Buffer.concat(chunks));
              });
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`));
            }
          });
        }
        fetch(arg.path);
      });
      return {
        contents,
      };
    });
  },
});
