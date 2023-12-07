<template>
  <view v-if="store.pickerColor.hexColor && store.imgInfo.url" class="pickerview">
    <!-- <view class="pickerview" :style="{ border: `6rpx solid ` + this.hexColor }"> -->
    <view :style="{
      width: squareSize + 'px',
      height: squareSize + 'px',
      backgroundColor: store.pickerColor.hexColor,
      marginLeft: '10rpx',
      marginRight: '10rpx',
    }"></view>
    <text class="large-text"> {{ store.pickerColor.rgb }} {{ squareSize }}</text>
    <button class="m-btn" @tap="addToDB">Save</button>
  </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'
const store = useImgStore()
const squareSize = defineProps(['square-size'])



</script>

<style>
.pickerview {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  /* 右侧空隙 */
}
</style>