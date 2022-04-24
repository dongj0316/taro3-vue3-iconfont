// !自动生成文件(by taro3-vue3-iconfont)，别动！
import { DefineComponent, App } from 'vue';

interface Props {
  name: 'NameEnums';
  size?: number | string;
  fill?: string;
}

declare const ComponentName: DefineComponent<Props> & {
  install: (app: App) => void;
};

export default ComponentName;

// volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ComponentName: DefineComponent<{
      name: 'NameEnums';
      size?: number | string;
      fill?: string;
    }>;
  }
}
