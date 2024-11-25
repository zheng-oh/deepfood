<template>
	<view class="main">
		<view class="title">
			<text class="title-text">Research is hard, tools should be easy</text>
		</view>
		<view style="display: flex; justify-content: center">
		</view>
		<button @click="goToPickerColor">Go to PickerColor</button>
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


// watch([() => store.imgInfo.re_plot], (newcover) => {
// 	if (!store.cursorInfo.cover) {
// 		store.ctxCursor.clearRect(0, 0, store.canvasInfo.width * store.drp, store.canvasInfo.height * store.drp);
// 	}
// 	store.drawCursor()
// })

</script>
<style lang="scss" scoped>
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
}

.title {
  @include flexc(center, center);
  width: 100%;
  height: 10vh;
}

.title-text {
  font-size: 20px;
  font-weight: bold;
  color: #2b60f2;
}

.showimg {
  @include flexc(center, space-around);
  width: 100%;
//   height: 50vh;
  box-sizing: border-box;
  overflow-x: hidden; /* 禁用横向滚动 */
}
</style>