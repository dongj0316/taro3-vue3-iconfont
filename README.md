# taro3-vue3-iconfont

在`taro3 + vue3 + volar`项目中使用`iconfont`，支持`weapp`和`h5`。

# Step1
安装：

```bash
# yarn
yarn add taro3-vue3-iconfont -D

# npm
npm i taro3-vue3-iconfont -D
```

# Step2
去`iconfont`官网获取`symbol`链接

请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库，那么可以填入这个链接去测试：`//at.alicdn.com/t/font_3348788_knd7fx1tclm.js`

![Image](https://github.com/dongj0316/taro3-vue3-iconfont/blob/main/images/c.png?raw=true)

# Step3
配置`package.json`

1. 增加`taro3-vue3-iconfont`选项，接收一个数组支持引入多个`iconfont`项目，`url`值为`iconfont symbol`链接，`output`为组件输出目录，`componentName`设置组件名称
2. 在`build`命令前增加`taro3-vue3-iconfont`

插件会读取配置的`url`在`output`目录下生成相应的图标组件，并在每次启动或者构建前，会根据`url`的变化自动更新

```json
{
  "scripts": {
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:h5": "npm run build:h5 -- --watch",
    "build:weapp": "taro3-vue3-iconfont && taro build --type weapp",
    "build:h5": "taro3-vue3-iconfont && taro build --type h5",
  },
  "taro3-vue3-iconfont": [
    {
      "url": "//at.alicdn.com/t/font_3348788_knd7fx1tclm.js",
      "output": "./src/icon",
      "componentName": "Iconfont"
    }
  ]
}
```

`taro3-vue3-iconfont`选项
| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `url` | 必须，去`iconfont`官网获取`symbol`链接 | `string` | - |
| `output` | 必须，组件的输出路径 | `string` | - |
| `componentName` | 可选，注册的组件名称，插件会进行大驼峰转换 | `string` | 默认为`设置的iconfont库的Symbol前缀`，可以在`iconfont`的`项目设置`中查看，例如Symbol前缀为`iconfont-`，那么组件名称就是`iconfont`的大驼峰表示`Iconfont` |

# Step4
在入口`app.js`中全局注册图标组件

```js
const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

// 注册Iconfont组件
import Iconfont from './icon';
App.use(Iconfont);
```

# Step5
使用组件

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | icon名称 | `string` | - |
| `size` | icon尺寸，不要单位，基于`Taro.config.designWidth`计算，默认为`750`设计稿的`32px` | `string/number` | `32` |
| `fill` | 颜色值 | `string` | `currentColor` |

```html
<template>
  <Iconfont name="iconfont-iconfont5" size="24" fill="red" />
</template>
```

配合`volar`，组件的类型提示

![Image](https://github.com/dongj0316/taro3-vue3-iconfont/blob/main/images/a.jpg?raw=true)

![Image](https://github.com/dongj0316/taro3-vue3-iconfont/blob/main/images/b.jpg?raw=true)

## 参考项目：

[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli)
