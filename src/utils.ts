import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import axios from 'axios';
import { PackageJson, IconfontConfig } from './types';

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
      const output = path.resolve(context, conf.output).split(path.sep).join('/');
      const symbolSourcePath = path.resolve(output, 'assets/source.js');
      const base64Path = path.resolve(output, 'assets/base64.js');
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

export const genBase64Js = (config: IconfontConfig) => {
  let str = '';
  const keys = Object.keys(config.symbolMap);
  const len = keys.length;
  keys.forEach((id, index) => {
    const isFirst = index === 0;
    const isLast = index === len - 1;
    const pre = isFirst ? '' : '  ';
    const lst = isLast ? '' : '\n';
    str += `${pre}'${id}': genBase64UrlFn('${config.symbolMap[id].viewBox}', '${config.symbolMap[id].content}'),${lst}`;
  });

  const templatePath = path.resolve(__dirname, './template/');
  let base64Tpl = fs.readFileSync(
    path.resolve(templatePath, 'base64.js'),
    'utf8',
  );
  base64Tpl = base64Tpl.replace('IconfontName: () => {},', str);
  fs.writeFileSync(config.base64Path, base64Tpl, 'utf8');
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

  fs.copySync(templatePath, config.output, {
    filter: src => !src.endsWith('base64.js'),
  });

  glob(`${config.output}/*.{vue,css,ts}`, function (err, matches) {
    if (!err) {
      matches.forEach(filePath => {
        if (filePath.endsWith('base64.js')) {
          return;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        content = content.replace(/\bComponentPrefix\b/g, config.prefix);
        content = content.replace(/\bComponentName\b/g, _ComponentName);
        content = content.replace(/('|")NameEnums('|")/g, _NameEnums);

        fs.writeFileSync(filePath, content, 'utf8');
      });
    }
  });
};
