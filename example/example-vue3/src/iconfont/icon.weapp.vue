<!-- !自动生成文件(by taro3-vue3-iconfont)，别动！ -->
<template>
  <view class="iconfont" :class="name" :style="sizeStyle">
    <image
      class="iconfont-image"
      :src="base64Json[name]"
      :style="sizeStyle"
    ></image>
  </view>
</template>

<script>
// @ts-nocheck
import './icon.css';
import Taro from '@tarojs/taro';
import { defineComponent, computed } from 'vue';
import base64Json from './assets/base64.json';

export default defineComponent({
  name: 'Iconfont',
  props: {
    name: String,
    size: [Number, String],
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
      base64Json,
      sizeStyle,
    };
  },
});
</script>
