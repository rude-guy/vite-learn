const fs = require('fs/promises');
const path = require('path');
const { createScript, createLink, generateHTML } = require('./utils');

module.exports = () => {
  return {
    name: 'esbuild:html',
    setup(build) {
      const { absWorkingDir, outdir } = build.initialOptions;
      build.onEnd(async (buildResult) => {
        if (buildResult.errors.length) {
          return;
        }
        const { metafile } = buildResult;
        // 1. 拿到metafile下的js和css产物路径
        const script = [];
        const link = [];
        if (metafile) {
          const { outputs } = metafile;
          const assets = Object.keys(outputs);
          assets.forEach((asset) => {
            if (asset.endsWith('.js')) {
              script.push(createScript(asset));
            } else if (asset.endsWith('.css')) {
              link.push(createLink(asset));
            }
          });
        }

        // 2. 拼接html
        const templateContent = generateHTML(script, link);
        // 3. HTML 写入磁盘
        const templatePath = path.join(absWorkingDir, outdir, 'index.html');
        await fs.writeFile(templatePath, templateContent);
      });
    },
  };
};
