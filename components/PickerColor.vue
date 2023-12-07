<template>
  <view class="pickerview" :style="{ border: `6rpx solid ` + store.pickerColor.hexColor }">
    <view :style="{
      width: squareSize,
      height: squareSize,
      backgroundColor: store.pickerColor.hexColor,
      marginLeft: '10rpx',
      marginRight: '10rpx',
    }"></view>
    <text class="large-text"> {{ store.pickerColor.rgb }}</text>
    <button class="m-btn" @tap="addToDB">Save</button>
  </view>
  <slot></slot>
  <view>
    <slider :value=sliderx @change="sliderChangex" min="0" :max=store.imgInfo.width show-value />
    <slider :value=slidery @change="sliderChangey" min="0" :max=store.imgInfo.height show-value />
  </view>
  <view class="pickerview">

    <button v-for="(color, index) in cursorColors" :key="index" @tap="setCursorColor(color.color)" :style="{
      height: '40rpx',
      color: color.color,
      border: store.cursorInfo.color === color.color ? '3px solid black' : '1px solid black',
      'background-color': color.color,
    }">
    </button>
    <switch :checked="store.cursorInfo.cover" @change="switch1Change" color="#FFCC33" style="transform:scale(0.7)" />

  </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'
import { computed } from 'vue'
const store = useImgStore()
const props = defineProps(['squaresize'])

const squareSize = computed(() => {
  console.log('squareSize', props.squaresize);
  return `${props.squaresize}px`
})


const cursorColors = [
  {
    color: 'red',
    border: '3px solid black',
    backgroundColor: 'white',
  },
  {
    color: 'black',
    border: '3px solid black',
    backgroundColor: 'white',
  },
  {
    color: 'white',
    border: '3px solid black',
    backgroundColor: 'grey',
  },
  {
    color: 'blue',
    border: '3px solid black',
    backgroundColor: 'white',
  }
]

const setCursorColor = (color) => {
  store.cursorInfo.color = color
}

const sliderx = computed(() => {
  return Math.round(store.cursorInfo.x / store.imgInfo.data.width * store.imgInfo.width)
})


const slidery = computed(() => {
  return Math.round(store.cursorInfo.y / store.imgInfo.data.height * store.imgInfo.height)
})

const sliderChangex = (e) => {
  console.log('sliderChangex', e);
  store.cursorInfo.x = e.detail.value / store.imgInfo.width * store.imgInfo.data.width
  store.imgInfo.re_plot = !store.imgInfo.re_plot
  store.getImageRGB()
  store.drawCursor()
}

const sliderChangey = (e) => {
  console.log('sliderChangey', e);
  store.cursorInfo.y = e.detail.value / store.imgInfo.height * store.imgInfo.data.height
  store.imgInfo.re_plot = !store.imgInfo.re_plot
  store.getImageRGB()
  store.drawCursor()
}

const switch1Change = (e) => {
  console.log('switch1Change', e);
  store.cursorInfo.cover = e.detail.value
  store.drawCursor()
}

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