export interface SymbolMap {
  id: string;
  viewBox: string;
  content: string;
  source: string;
  clearedSource: string;
  base64?: (fill: string) => string;
}

export interface IconfontConfig {
  url: string;
  output: string;
  prefix: string;
  componentName: string;
  symbolSourcePath: string;
  base64Path: string;
  source: string;
  symbolMap: {
    [key: string]: SymbolMap;
  };
}
export interface PackageJson {
  'taro3-vue3-iconfont': IconfontConfig[];
  [key: string]: any;
}
