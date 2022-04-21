import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import axios from 'axios';
import { PackageJson, IconfontConfig } from './types';
import { encode } from 'js-base64';
import { SymbolMap } from './types';

export const svgSymbolExtraReg = /<symbol[\s\S]*?<\/symbol>/g;
export const svgSymbolIdExtraReg = /\sid="([\w-]+)"/;
export const svgSymbolViewBoxExtraReg = /\sviewBox="([\s\d\.]+)"/;
export const svgSymbolContentExtraReg = /<symbol[\s\w"-=]*>(.*)<\/symbol>/;

export const strToCamel = (str: string) => {
  return str.replace(/(^|-)(\w)/g, (_m, _$1, $2) => $2.toUpperCase());
};

export const getUserConfig = context => {
  const packageJson = require(path.resolve(
    context,
    'package.json',
  )) as PackageJson;
  const config: IconfontConfig[] = packageJson['taro3-vue3-iconfont'].map(
    conf => {
      const output = path.resolve(context, conf.output);
      const symbolSourcePath = path.resolve(output, 'assets/source.js');
      const base64Path = path.resolve(output, 'assets/base64.json');
      fs.ensureFileSync(symbolSourcePath);
      fs.ensureFileSync(base64Path);
      return {
        ...conf,
        url: conf.url.startsWith('//') ? `https:${conf.url}` : conf.url,
        output,
        symbolSourcePath,
        base64Path,
      };
    },
  );

  return config;
};

export const getOutputPath = (context: string, config: IconfontConfig) => {
  const filepath = path.resolve(context, config.output);
  fs.emptyDirSync(filepath);

  return filepath;
};

export const fetchSymbolSource = async (url: string) => {
  if (url.startsWith('//')) {
    url = `https:${url}`;
  }

  const { data } = await axios.get<string>(url);
  return data;
};

export const genBase64Url = (symbolMap: SymbolMap) => {
  const str = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg viewBox="${symbolMap.viewBox}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${symbolMap.content}</svg>`;
  return `data:image/svg+xml;base64,${encode(str)}`;
};

export const genBase64Json = (config: IconfontConfig) => {
  const base64Map = Object.keys(config.symbolMap).reduce((res, id) => {
    res[id] = config.symbolMap[id].base64;
    return res;
  }, {});
  fs.writeFileSync(config.base64Path, JSON.stringify(base64Map), 'utf8');
};

export const genSourceJs = (config: IconfontConfig) => {
  fs.writeFileSync(
    config.symbolSourcePath,
    `// !自动生成文件(by taro3-vue3-iconfont)，别动！\n// #### ${config.url} ####\n/* eslint-disable */\n// prettier-ignore\n// @ts-ignore\n${config.source}`,
    'utf8',
  );
};

export const genComponents = (config: IconfontConfig) => {
  const _ComponentName = strToCamel(config.componentName || config.prefix);
  const _NameEnums = Object.keys(config.symbolMap)
    .map(s => `'${s}'`)
    .join(' | ');
  const templatePath = path.resolve(__dirname, './template/');

  fs.copySync(templatePath, config.output);

  glob(`${config.output}/*.{vue,css,ts}`, function (err, matches) {
    if (!err) {
      matches.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');

        content = content.replace(/\bComponentPrefix\b/g, config.prefix);
        content = content.replace(/\bComponentName\b/g, _ComponentName);
        content = content.replace(/('|")NameEnums('|")/g, _NameEnums);

        fs.writeFileSync(filePath, content, 'utf8');
      });
    }
  });
};
