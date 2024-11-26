<template>
  <view class="pickerColor">
    <view class="showimg" :class="{ 'showimgadd': !img.imgInfo.url }">
      <ShowImg :scale="1">
      </ShowImg>
    </view>
    <view v-if="!img.imgInfo.url" class="pcimg">
      <image src="https://cos.zxing.cc/deepfood/pickercolor.png" alt="pickerColor" mode="aspectFit" />
    </view>
    <view class="plotimg">
      <ChartData v-if="img.imgInfo.url" />
    </view>
  </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'

import ShowImg from '@/components/ShowImg.vue'

import ChartData from '@/components/chartData.vue'

const img = useImgStore()



</script>

<style lang="scss">
@mixin flexr($justify: stretch, $align: stretch) {
  display: flex;
  flex-direction: row;
  justify-content: $justify;
  align-items: $align;
}

@mixin flexc($justify: stretch, $align: stretch) {
  display: flex;
  flex-direction: column;
  justify-content: $justify; // 垂直
  align-items: $align; // 水平
}

.pickerColor {
  @include flexc(stretch, center);
  //静止左右滚动
  overflow-x: hidden;
  height: 100vh;
  /* 确保页面占满屏幕 */
  width: 100%;

}

.showimg {
  @include flexr(center, center);
  width: 100%;
  height: auto;
}

.showimgadd {
  margin-top: 20%;
}

.pcimg {
  @include flexr(center, center);
  margin-top: 20%;
  width: 100%;

  image {
    width: 100%;
  }
}
</style>