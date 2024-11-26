<template>
  <view class="main">
    <view class="title">
      <text class="titletext">Research is hard, tools should be easy</text>
    </view>
    <view class="toolslist">
      <uni-card>
        <view class="toolcard" @click="goToPickerColor" hover-class="toolcard-hover">
          <view class="toolcardimg">
            <image src="@/static/tools/rgb.png" alt="rgb" mode="aspectFit" />
          </view>
          <view class="toolcardtext">
            <text>PickerColor</text>
          </view>
        </view>
      </uni-card>
      <uni-card>
        <view class="toolcard" @click="goToLanyaba" hover-class="toolcard-hover">
          <view class="toolcardimg">
            <image src="@/static/tools/lanyaba.png" alt="rgb" mode="aspectFit" />
          </view>
          <view class="toolcardtext">
            <text>Lanyaba</text>
          </view>
        </view>
      </uni-card>
    </view>
  </view>
</template>


<script setup>
import {
  watch,
  computed,
} from 'vue'
// import {
// 	store
// } from '@/api/store.js'
import { useImgStore } from '@/stores/img'
// import AddImg from '@/components/AddImg.vue'
import { onReady } from '@dcloudio/uni-app'
// import { drawImg } from '@/api/drawimg.js'


const store = useImgStore()

onReady(() => {
  console.log("onready");
});

const goToPickerColor = () => {
  uni.navigateTo({
    url: '/pages/tools/pickercolor'
  })
}

const goToLanyaba = () => {
  wx.navigateToMiniProgram({
    appId: 'wxfa7ecaa71b2b805c', // 需要替换为目标小程序的 appId
    path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
    success(res) {
      // 打开成功
      console.log('跳转成功')
    },
    fail(err) {
      // 打开失败
      console.log('跳转失败', err)
    }
  })
}

// watch([() => store.imgInfo.re_plot], (newcover) => {
// 	if (!store.cursorInfo.cover) {
// 		store.ctxCursor.clearRect(0, 0, store.canvasInfo.width * store.drp, store.canvasInfo.height * store.drp);
// 	}
// 	store.drawCursor()
// })

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
  @include flexc();
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url('https://cos.zxing.cc/deepfood/ncs.png'); /* 背景图 */
}

.title {
  @include flexc(center, center);
  width: 100%;
  height: 10vh;
  margin: 20px 0;
}

.titletext {
  //居中
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: $df-blue;
}

.toolslist {
  @include flexc(stretch, center);
  width: 100%;
  height: 90vh;

  uni-card {
    width: 100%;
  }
}

.toolcard {
  @include flexr(space-around, center);
  padding: 5px;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  // background-color: #2b60f2;
}

.toolcard-hover {
  background-color: rgba(119, 119, 119, 0.1);
  transform: scale(0.98);
  transition: all 0.2s ease;
}



.toolcardimg {
  @include flexc(center, center);
  width: 80px;
  height: 80px;

  image {
    width: 100%;
    height: 100%;
  }
}

.toolcardtext {
  @include flexc(center, center);
  font-size: 20px;
  font-weight: bold;
  color: #b2291a;
  // background-color: #000;
}
</style>