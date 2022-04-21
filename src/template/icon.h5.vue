<!-- !自动生成文件(by taro3-vue3-iconfont)，别动！ -->
<template>
  <view class="ComponentPrefix" :class="name" :style="sizeStyle">
    <svg class="ComponentPrefix-inner" aria-hidden="true" :style="sizeStyle">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </view>
</template>

<script>
// @ts-nocheck
import './assets/source.js';
import './icon.css';
import Taro from '@tarojs/taro';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ComponentName',
  props: {
    name: String,
    size: [Number, String],
  },
  setup(props) {
    const sizeStyle = computed(() => {
      const _designWidth = Taro.config?.designWidth || 750;
      const _size = String(props.size || 32);
      const size =
        Math.ceil((((parseInt(_size, 10) / 40) * 640) / _designWidth) * 10000) /
          10000 +
        'rem';
      return {
        width: size,
        height: size,
      };
    });

    return {
      sizeStyle,
    };
  },
});
</script>
