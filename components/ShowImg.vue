<template>
  <view class="main">
    <view class="canvasview">
      <view v-if="img.imgInfo.url" class="canvas-container">
        <canvas id="myCanvas" canvas-id="myCanvas" @touchstart="img.handleTouchStart" @touchmove="img.handleTouchMove"
          @touchend="img.handleTouchEnd" :style="canvasStyle"></canvas>
        <canvas id="myCursor" canvas-id="myCursor" :style="{
          position: 'absolute',
          top: img.cursorInfo.y - img.cursorInfo.radius + 'px',
          left: img.cursorInfo.x - img.cursorInfo.radius + 'px',
          pointerEvents: 'none',
          // zIndex: 999,  // 确保在最上层
        }"></canvas>

      </view>
      <view v-if="!img.imgInfo.url" class="onebutview">
        <button size="large" @tap="addImage" style="color: #ffffff; background-color: #3A42B9">
          Add image
        </button>
      </view>
      <view v-else class="pickerview">
        <view class="magview">
          <canvas id="magnifier" canvas-id="magnifier" :style="{
            width: img.magnifier.width + 'px',
            height: img.magnifier.height + 'px',
            pointerEvents: 'none',
            // zIndex: 999,  // 确保在最上层
            backgroundColor: 'rgba(0,0,0,0.1)'
          }"></canvas>
        </view>
        <view class="colorview" :style="{ border: `6rpx solid ` + img.pickerColor.hexColor }">
          <view :style="{
            width: '50px',
            height: '50px',
            marginLeft: '10rpx',
            marginRight: '10rpx',
            backgroundColor: img.pickerColor.hexColor
          }"></view>
          <view class="colortext"> 
            <text> {{ img.pickerColor.rgb }}</text>
          </view>
          <!-- <button class="m-btn" @tap="addToDB">Save</button> -->
        </view>

        <view class="butview">
          <button size="mini" @tap="addImage" style="color: #ffffff; background-color: #3A42B9">
            {{ !img.imgInfo.url ? "Add image" : "Alter image" }}
          </button>
          <button v-if="img.imgInfo.url" size="mini" type="warn" @click="img.deleteImage" style="color: #ffffff; background-color: #b62924">Delete</button>
        </view>

      </view>
    </view>
    <!-- <view>
          {{ img.imgInfo.width }}x{{ img.imgInfo.height }}
        </view>
        <view>
          canvasInfo: {{ img.canvasInfo.x }}x{{ img.canvasInfo.y }}
        </view>
        <view>canvasInfo.tag: {{ img.canvasInfo.tagwidth }} x {{ img.canvasInfo.tagheight }} __ {{ img.imgInfo.data.length }}
        </view>
        <view>
         touchInfo: {{ img.touchInfo.x }}x{{ img.touchInfo.y }}
        </view>
        <view>
          cursorInfo: {{ img.cursorInfo.x }}x{{ img.cursorInfo.y }}
        </view>
        <view>
          pickerColor: {{ img.pickerColor.x }}x{{ img.pickerColor.y }}
        </view> -->
  </view>

</template>

<script setup>
import { useImgStore } from '@/stores/img'
import { computed, ref, watch, getCurrentInstance } from 'vue'

const img = useImgStore()
img.instance = getCurrentInstance()

const props = defineProps(['scale'])

const ratio = ref(1.5);
const screenWidth = uni.getWindowInfo().screenWidth * props.scale;
const canvasStyle = computed(() => {

  return {
    width: `${screenWidth}px`,
    height: `${screenWidth / ratio.value}px`,
    // backgroundColor: 'rgb(0, 0, 0)',
  }
})


const addImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths;
      img.imgInfo.url = tempFilePaths[0];
      uni.getImageInfo({
        src: tempFilePaths[0],
        success: (res) => {
          img.imgInfo.url = res.path;
          img.imgInfo.width = res.width;
          img.imgInfo.height = res.height;
          img.imgInfo.ratio = img.imgInfo.width / img.imgInfo.height;
          img.canvasInfo.width = screenWidth;
          img.canvasInfo.height = parseFloat(canvasStyle.value.height.replace("px", ''));
        },
      });
    },
  });
};

const drawImg = () => {
  img.imgInfo.data = [];
  img.ctxImg = uni.createCanvasContext('myCanvas', img.instance);
  //画布的宽高
  img.setCanvas(canvasStyle, ratio);


  img.ctxImg.clearRect(0, 0, screenWidth, screenWidth / ratio.value);  // Clear the canvas

  // Draw the image
  img.ctxImg.drawImage(
    img.imgInfo.url,  // Image path
    img.canvasInfo.x, img.canvasInfo.y,             // Position to draw (top left)
    img.canvasInfo.tagwidth, img.canvasInfo.tagheight        // Scaled width
  );
  img.ctxImg.draw();
  console.log("draw finish");
  setTimeout(() => {
    uni.canvasGetImageData({
      canvasId: 'myCanvas',
      x: img.cursorInfo.x,
      y: img.cursorInfo.y,
      width: img.canvasInfo.tagwidth,
      height: img.canvasInfo.tagheight,
      componentInstance: img.instance, // 传入组件实例

      success(res) {
        img.imgInfo.data = res.data;
        console.log("获取图像数据成功");
        // console.log(img.imgInfo.data);
      },
      fail(err) {
        console.error("获取图像数据失败:", err);
      },
      complete() {
        console.log("获取图像数据完成");
      }
    }, img.instance);
  }, 300); // 延迟 10ms
  // Log canvas and image size for debugging
  // 获取图像数据

  // img.imgInfo.data = ctx.getImageData(0, 0, img.canvasInfo.tagwidth, img.canvasInfo.tagheight);
};

watch(() => img.imgInfo.url, () => {
  if (img.imgInfo.url) {
    setTimeout(() => {
      drawImg();
    }, 100);
  }
})

</script>

<style lang="scss" scoped>
@import '@/static/deepfood.scss';
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

.main {
  @include flexc(center, stretch);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.canvasview {
  @include flexc(center, center);
  width: 100%;
  height: 100%;
  canvas {
    touch-action: none; /* 禁止触摸滚动 */
  }
}


.pickerview {
  @include flexr(space-around, center);
  width: 100%;
  height: 100px;
  // background-color: rgb(143, 129, 129);
  border-width: 1px;
  border-style: solid;
  border-color: $df-gray2;
  padding: 2px;
}

.magview {
  @include flexc(center, center);
  width: 30%;
  height: 100%;
}

.colorview {
  @include flexr(space-around, center);
  width: 50%;
  height: 80px;
  border-radius: 2rpx;
  // background-color: aqua
}

.colortext {
  @include flexc(center, center);
  width: 60%;
  font-size: 12px;
}

.onebutview {
  @include flexc(center, center);
  padding: 10%;
  width: 100%;
  height: 100%;
}

.butview {
  @include flexc(space-around, center);
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  width: 20%;
  button {
    // 按钮居中
    display: flex;
    justify-content: center;
    align-items: center;
    //字体间距
    letter-spacing: 1px;
    //行间距
    line-height: 1.2;
    width: 80%;
    height: 40%;
    font-size: 12px;
  }
}


</style>
