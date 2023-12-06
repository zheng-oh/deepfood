<template>
  <view style="display: flex; justify-content: center">
    <canvas v-if="store.imgInfo.url" type="2d" id="myCanvas" canvas-id="myCanvas" @touchstart="handleTouchStart"
      @touchmove="handleTouchMove" @touchend="handleTouchEnd" :style="{
        width: canvasInfo.tagwidth + 'rpx',
        height: canvasInfo.tagheight + 'rpx',
      }"></canvas>
    <!-- <view>{{ store.imgInfo.url }}</view> -->
  </view>
</template>

<script setup>
import { ref, watchEffect, onReady } from 'vue';
import { useImgStore } from '../stores/img';
const canvasInfo = ref({
  tagwidth_source: 750,
  tagheight_source: 750,
  tagwidth: 750,
  tagheight: 750,
  width: 0,
  height: 0,
});

const store = useImgStore();
const imgurl = (store.imgInfo.url);

const setCanvas = () => {
  console.log("进入setCanvas");
  if (store.imgInfo.url === '') {
    return;
  }
  console.log("执行了setCanvas:", store.imgInfo.url);
  // canvasInfo.value.tagwidth = canvasInfo.value.tagwidth_source;
  // canvasInfo.value.tagheight = canvasInfo.value.tagheight_source;
  const canvasRatio = canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
  if (store.imgInfo.ratio > canvasRatio) {
    canvasInfo.value.width = uni.getSystemInfoSync().screenWidth;
    canvasInfo.value.height = Math.round(
      canvasInfo.value.width / store.imgInfo.ratio
    );
    // canvasInfo.value.tagheight = Math.round(
    //   canvasInfo.value.tagwidth / store.imgInfo.ratio
    // );
    store.imgInfo.is_kuan = true;
  } else {
    canvasInfo.value.height = canvasInfo.value.tagheight;
    canvasInfo.value.width = Math.round(
      canvasInfo.value.height * store.imgInfo.ratio
    );
    // canvasInfo.value.tagwidth = Math.round(
    //   canvasInfo.value.tagheight * store.imgInfo.ratio
    // );
    store.imgInfo.is_kuan = false;
  }

  console.log("canvas 设置完成,canvasInfo:", canvasInfo.value);
  const query = uni.createSelectorQuery();
  query
    .select('#myCanvas')
    .fields({
      node: true,
      size: true,
    })
    .exec((res) => {
      console.log("res:", res);
    }
    );

};




const drawImage = () => {
  console.log("执行了drawImageddddddd");
  const query = uni.createSelectorQuery();
  query
    .select('#myCanvas')
    .fields({
      node: true,
      size: true,
    })
    .exec((res) => {
      console.log("res:", res);
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


// watch(canvasInfo, () => {
//   console.log("watch:");
//   setCanvas(drawImage);
// })


// drawImage
// setTimeout(() => {
//   setCanvas(() => {
//     console.log('2222222222');
//   })
// }, 100)
// })
defineExpose({
  canvasInfo,
  setCanvas,
  drawImage,
})

</script>

<style scoped></style>