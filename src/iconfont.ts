#!/usr/bin/env node
import fs from 'fs-extra';
import {
  fetchSymbolSource,
  getUserConfig,
  genSourceJs,
  genComponents,
  genBase64Js,
  svgSymbolExtraReg,
  svgSymbolIdExtraReg,
  svgSymbolContentExtraReg,
  svgSymbolViewBoxExtraReg,
} from './utils';

const context = process.cwd();
const userConfig = getUserConfig(context);
if (!userConfig || !userConfig.length) {
  console.log('package.json中未找到iconfonts配置 ');
  process.exit(1);
}

(async function () {
  const configs = await Promise.all(
    userConfig
      .filter(config => {
        try {
          const str = fs.readFileSync(config.symbolSourcePath, 'utf8');
          const url = str.match(/\/\/\s####\s([\s\S]*)\s####/);

          if (!url) {
            return true;
          }

          return url[1] !== config.url;
        } catch (err) {
          console.log(err);
        }
        return true;
      })
      .map(async config => {
        const source = await fetchSymbolSource(config.url);
        return {
          ...config,
          source,
        };
      }),
  );

  configs.forEach(config => {
    const symbols = config.source.match(svgSymbolExtraReg);

    if (!symbols) {
      console.log('❌ 未找到symbol');
      process.exit(1);
    }

    const symbolMap = symbols
      .map(source => {
        const matchContent = source.match(svgSymbolContentExtraReg);

        if (!matchContent) {
          console.log('❌ 未找到symbol children');
          process.exit(1);
        }

        const matchId = source.match(svgSymbolIdExtraReg);

        if (!matchId) {
          console.log('❌ 未找到symbol id');
          process.exit(1);
        }

        const matchViewBox = source.match(svgSymbolViewBoxExtraReg);

        if (!matchViewBox) {
          console.log('❌ 未找到symbol viewBox');
          process.exit(1);
        }

        const id = matchId[1];
        const viewBox = matchViewBox[1];
        let content = matchContent[1];
        // 单色icon移除fill
        if (content.indexOf('</symbol>') === content.lastIndexOf('</symbol>')) {
          content = content.replace(/\sfill="[^"]+"/, '');
        }
        const clearedSource = source.replace(svgSymbolIdExtraReg, '');

        const item = {
          id,
          viewBox,
          content,
          source,
          clearedSource,
        };

        config.prefix = id.split('-')[0];

        return item;
      })
      .reduce((res, item) => {
        res[item.id] = item;
        return res;
      }, {});

    config.symbolMap = symbolMap;

    genSourceJs(config);
    genBase64Js(config);
    genComponents(config);
  });
})();
