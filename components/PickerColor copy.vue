<template>
  <view>
    <!-- <canvas v-show="store.imgInfo.url" type="2d" id="myCursor" canvas-id="myCursor"
				@touchstart="store.handleTouchStart" @touchmove="store.handleTouchMove" @touchend="store.handleTouchEnd"
				:style="{
					width: store.canvasInfo.width + 'rpx',
					height: store.canvasInfo.height + 'rpx',
					border: '1px solid',
				}"></canvas> -->

<canvas id="myCanvas" canvas-id="myCanvas"
				@touchstart="store.handleTouchStart" @touchmove="store.handleTouchMove" @touchend="store.handleTouchEnd"
				></canvas>
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
      <view :style="jumpStyle">
        <transition name="fade">
          <view v-if="showPlusOne" class="plus-one">+1</view>
        </transition>
      </view>
      <view style="display: flex;flex-direction: column;justify-content: stretch;align-items: center;">
        <text>"color":{{img.pickerColor.rgb}}</text>
        <view :style="{width: '100px', height: '100px', backgroundColor: img.pickerColor.hexColor}"></view>
      </view>
    </view>
    <button @tap="drawImg">drawImg</button>
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
      {{ store.cursorInfo.cover ? 'Cluster' : 'Alone' }}
    </view>
  </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'
import { computed, ref, watch,getCurrentInstance } from 'vue'
// import { drawImg } from '@/api/drawimg.js'
const instance = getCurrentInstance()  


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

const showPlusOne = ref(false);


const jumpStyle = ref()

const setJump = (jumpheight) => {
  jumpStyle.value = [`--jumpheight_1: ${jumpheight - 5}px`, `--jumpheight_2: ${jumpheight}px`, `--jumpheight_3: ${jumpheight - 40}px`]
}

const addToDB = (e) => {
  // 判断当前颜色是否和最后一个颜色相同
  console.log(store.screenHeight, e.target.offsetTop);
  setJump(store.screenHeight - e.target.offsetTop - 220)
  if (store.dbColors.length > 0) {
    console.log(store.dbColors.length);
    const lastColor = store.dbColors[store.dbColors.length - 1]

    // console.log('lastColor', lastColor.hexColor, store.pickerColor.hexColor);
    if (lastColor.hexColor === store.pickerColor.hexColor) {
      return
    }
  }
  const pickerColor = { ...store.pickerColor };
  store.dbColors.push(pickerColor)
  showPlusOne.value = true;


  // 延迟一定时间后隐藏+1提示
  setTimeout(() => {
    showPlusOne.value = false;
  }, 1000);

}


const sliderx = computed(() => {
  return Math.round(store.cursorInfo.x / store.imgInfo.data.width * store.imgInfo.width)
})


const slidery = computed(() => {
  return Math.round(store.cursorInfo.y / store.imgInfo.data.height * store.imgInfo.height)
})

const sliderChangex = (e) => {
  store.cursorInfo.x = e.detail.value / store.imgInfo.width * store.imgInfo.data.width
  store.imgInfo.re_plot = !store.imgInfo.re_plot
  if (store.cursorInfo.x < 0) {
    store.cursorInfo.x = 0
  } else if (store.cursorInfo.x >= store.imgInfo.data.width) {
    store.cursorInfo.x = store.imgInfo.data.width - 1
  };
  console.log("x:", store.cursorInfo.x, store.imgInfo.data.width);

  store.drawCursor()
  store.getImageRGB()
}
const sliderChangey = (e) => {
  store.cursorInfo.y = e.detail.value / store.imgInfo.height * store.imgInfo.data.height
  store.imgInfo.re_plot = !store.imgInfo.re_plot
  if (store.cursorInfo.y < 0) {
    store.cursorInfo.y = 0
  } else if (store.cursorInfo.y >= store.imgInfo.data.height) {
    store.cursorInfo.y = store.imgInfo.data.height - 1
  };
  store.drawCursor()
  store.getImageRGB()
}

const switch1Change = (e) => {
  store.cursorInfo.cover = e.detail.value
  store.drawCursor()
}

// watch(() => store.imgInfo.url, (newurl) => {
// 	console.log("newurl:", newurl);
// 	setTimeout(() => {
// 		drawImg()
// 	}, 10);
// })


const drawImg = () => {
  const ctx = uni.createCanvasContext('myCanvas',instance)
  //画一个红色圆
  ctx.beginPath()
  ctx.arc(store.cursorInfo.x, store.cursorInfo.y, 10, 0, 2 * Math.PI)
  ctx.fillStyle = 'red'
  ctx.fill()
  ctx.draw()
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


.animated-button {
  transition: opacity 0.5s ease-out;
}

.animated-button-enter-active,
.animated-button-leave-active {
  transition: opacity 0.5s;
}

.animated-button-enter,
.animated-button-leave-to {
  opacity: 0;
}

.plus-one {
  position: absolute;
  left: 75%;
  font-size: 1.5rem;
  color: green;
  animation: bounce 1s ease-out;
  z-index: 100;
}

@keyframes bounce {

  0% {
    transform: translateY(var(--jumpheight_1));
    opacity: 0;
  }

  20% {

    transform: translateY(var(--jumpheight_2));
    opacity: 1;
  }

  100% {
    transform: translateY(var(--jumpheight_3));
    opacity: 0;
  }
}
</style>