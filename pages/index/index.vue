<template>
	<view>
		<view style="display: flex; justify-content: center">
			<canvas v-show="store.imgInfo.url" type="2d" id="myCursor" canvas-id="myCursor"
				@touchstart="store.handleTouchStart" @touchmove="store.handleTouchMove" @touchend="store.handleTouchEnd"
				:style="{
					width: store.canvasInfo.width + 'rpx',
					height: store.canvasInfo.height + 'rpx',
					border: '1px solid',
				}"></canvas>

			<canvas v-show="store.imgInfo.url" type="2d" id="myCanvas" canvas-id="myCanvas" :style="{
				width: store.canvasInfo.width + 'rpx',
				height: store.canvasInfo.height + 'rpx',
				border: '1px solid',
			}"></canvas>
		</view>
		<PickerColor v-if=store.imgInfo.url squaresize="40"></PickerColor>
		<AddImg></AddImg>
		<view v-show="!store.imgInfo.url" style="marginTop:15rpx"> <u--text :margin="20" align="center" bold :size="20"
				type="primary" text="Research is hard, tool should be easy"></u--text></view>

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
import AddImg from '@/components/AddImg.vue'
import PickerColor from '@/components/PickerColor.vue'
import { onReady } from '@dcloudio/uni-app'
import { drawImg } from '@/api/drawimg.js'

const store = useImgStore()

onReady(() => {
	console.log("onready");
	store.canvasInfo.width = store.canvasInfo.tagwidth
	store.canvasInfo.height = store.canvasInfo.tagheight

});


store.imgInfo.is_kuan = computed(() => {
	return store.imgInfo.ratio > store.canvasInfo.tagwidth / store.canvasInfo.tagheight;
});

watch(() => store.imgInfo.url, (newurl) => {
	console.log("newurl:", newurl);
	setTimeout(() => {
		drawImg()
	}, 10);
})


watch([() => store.imgInfo.re_plot], (newcover) => {
	if (!store.cursorInfo.cover) {
		store.ctxCursor.clearRect(0, 0, store.canvasInfo.width * store.drp, store.canvasInfo.height * store.drp);
	}
	store.drawCursor()
})

</script>
<style>
#myCanvas {
	position: absolute;
	z-index: 1;
}

#myCursor {
	position: relative;
	z-index: 200;
}


.m-btn {
	font-size: 25rpx;
	/* background-color: #6a717b; */
	background-color: #c2dfff;
	/* 使用蓝色的十六进制值 */

	/* 调试用的红色边框 */
}

.large-text {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
}
</style>