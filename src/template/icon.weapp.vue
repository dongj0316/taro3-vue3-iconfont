<!-- !自动生成文件(by taro3-vue3-iconfont)，别动！ -->
<template>
  <view class="ComponentPrefix" :class="name" :style="sizeStyle">
    <image
      class="ComponentPrefix-image"
      :src="base64Map[name](fill)"
      :style="sizeStyle"
    ></image>
  </view>
</template>

<script>
// @ts-nocheck
import './icon.css';
import Taro from '@tarojs/taro';
import { defineComponent, computed } from 'vue';
import base64Map from './assets/base64.js';

export default defineComponent({
  name: 'ComponentName',
  props: {
    name: String,
    size: [Number, String],
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
  setup(props) {
    const sizeStyle = computed(() => {
      const _size = String(props.size || 32);
      const size =
        parseInt(_size, 10) *
          (Taro.config?.deviceRatio[Taro.config?.designWidth || 750] || 1) +
        'rpx';
      return {
        width: size,
        height: size,
      };
    });

    return {
      base64Map,
      sizeStyle,
    };
  },
});
</script>
