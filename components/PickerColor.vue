<template>
  <view>
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
      <transition name="fade">
        <div v-if="showPlusOne" class="plus-one">+1</div>
      </transition>
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
  </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'
import { computed, ref } from 'vue'
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

const addToDB = () => {
  // 判断当前颜色是否和最后一个颜色相同
  if (store.pickerColors.length > 0) {
    const lastColor = store.pickerColors[store.pickerColors.length - 1]
    console.log("lastColor", lastColor.hexColor, store.pickerColor.hexColor);

    // console.log('lastColor', lastColor.hexColor, store.pickerColor.hexColor);
    if (lastColor.hexColor === store.pickerColor.hexColor) {
      console.log('same color');
      return
    }
  }
  console.log('different color');
  store.pickerColors.push(store.pickerColor)
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
  store.drawCursor()
  store.getImageRGB()
}

const sliderChangey = (e) => {
  store.cursorInfo.y = e.detail.value / store.imgInfo.height * store.imgInfo.data.height
  store.imgInfo.re_plot = !store.imgInfo.re_plot
  store.drawCursor()
  store.getImageRGB()
}

const switch1Change = (e) => {
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
  left: 90%;
  /* transform: translateX(0%); */
  font-size: 1.5rem;
  color: green;
  animation: bounce 1s ease-out;
}

@keyframes bounce {

  0% {
    transform: translateY(-20px);
    opacity: 1;
  }

  50% {
    transform: translateY(-30px);
    opacity: 1;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
  }
}
</style>