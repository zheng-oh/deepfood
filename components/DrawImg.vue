<template>
  <view style="display: flex; justify-content: center">
    <canvas v-if="store.imgInfo.url" type="2d" id="myCanvas" canvas-id="myCanvas" @touchstart="handleTouchStart"
      @touchmove="handleTouchMove" @touchend="handleTouchEnd" :style="{
        width: canvasInfo.tagwidth + 'rpx',
        height: canvasInfo.tagheight + 'rpx',
      }"></canvas>
  </view>
</template>

<script setup>
import { ref, watchEffect, watch } from 'vue';
import {
  store
} from '@/api/store.js'
const canvasInfo = ref({
  tagwidth_source: 750,
  tagheight_source: 1000,
  tagwidth: 0,
  tagheight: 0,
  width: 0,
  height: 0,
});

const setCanvas = (callback) => {
  if (store.imgInfo.url === '') {
    return;
  }
  console.log("执行了DrawImg:", store.imgInfo.url);
  canvasInfo.value.tagwidth = canvasInfo.value.tagwidth_source;
  canvasInfo.value.tagheight = canvasInfo.value.tagheight_source;
  store.imgInfo.ratio = store.imgInfo.width / store.imgInfo.height;
  const canvasRatio = canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
  if (store.imgInfo.ratio > canvasRatio) {
    canvasInfo.value.width = uni.getSystemInfoSync().screenWidth;
    canvasInfo.value.height = Math.round(
      canvasInfo.value.width / store.imgInfo.ratio
    );
    canvasInfo.value.tagheight = Math.round(
      canvasInfo.value.tagwidth / store.imgInfo.ratio
    );
    store.imgInfo.is_kuan = true;
  } else {
    canvasInfo.value.height = canvasInfo.value.tagheight;
    canvasInfo.value.width = Math.round(
      canvasInfo.value.height * store.imgInfo.ratio
    );
    canvasInfo.value.tagwidth = Math.round(
      canvasInfo.value.tagheight * store.imgInfo.ratio
    );
    store.imgInfo.is_kuan = false;
  }
  if (typeof callback === 'function') {
    console.log("进入了callback");
    setTimeout(() => {
      console.log("进入了setTimeout");
      // callback()
    }, 100)
      ;
  }
};

const drawImage = () => {
  const query = uni.createSelectorQuery();
  query
    .select('#myCanvas')
    .fields({
      node: true,
      size: true,
    })
    .exec((res) => {
      const canvas = res[0].node;
      if (canvas) {
        ctx.value = canvas.getContext('2d');
        canvas.width = canvasInfo.value.width * drp.value;
        canvas.height = canvasInfo.value.height * drp.value;

        const img = canvas.createImage();
        img.src = imgInfo.value.url;

        img.onload = () => {
          ctx.value.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const imageData = ctx.value.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          imgInfo.value.data = imageData;

          if (!imgInfo.value.is_kuan) {
            touchInfo.value.y_ratio =
              canvasInfo.value.height / Math.max(res[0].height, res[0].width);
            touchInfo.value.x_ratio = touchInfo.value.y_ratio;
          } else {
            touchInfo.value.y_ratio = 1;
            touchInfo.value.x_ratio = 1;
          }
        };
      } else {
        console.error('Canvas element not found.');
      }
    });
};


const fin = () => {
  console.log("执行了fin");
  // setCanvas();
  // drawImage();
}
watch(store, () => {
  console.log('1', store.imgInfo.url);
  setCanvas(drawImage);
  // setTimeout(() => {
  //   setCanvas(() => {
  //     console.log('2222222222');
  //   })
  // }, 100)
})

</script>

<style scoped></style>