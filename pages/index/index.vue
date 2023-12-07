<template>
	<view>
		<view style="display: flex; justify-content: center">

			<canvas type="2d" id="myCanvas" canvas-id="myCanvas" @touchstart="store.handleTouchStart"
				@touchmove="store.handleTouchMove" @touchend="store.handleTouchEnd" :style="{
					width: canvaswidth + 'rpx',
					height: canvasheight + 'rpx',
					border: '1px solid',
				}"></canvas>
		</view>

		<PickerColor v-if="store.pickerColor.hexColor && store.imgInfo.url" squaresize="40"></PickerColor>

		<AddImg></AddImg>
		<text v-if="store.pickerColor.hexColor"> x:{{ Math.round(store.touchInfo.x) }} y: {{ Math.round(store.touchInfo.y)
		}}</text>
		<text v-if="store.pickerColor.hexColor"> x:{{ Math.round(store.cursorInfo.x) }} y: {{ Math.round(store.cursorInfo.y)
		}}</text>
		{{ Math.round(store.cursorInfo.x / store.imgInfo.data.width * store.imgInfo.width) }}
	</view>
</template>


<script setup>
import {
	ref,
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
// const ctx = ref(null);
// const drp = uni.getSystemInfoSync().pixelRatio


const canvasInfo = ref({
	tagwidth: 750,
	tagheight: 1000,
});


onReady(() => {
	console.log("onready");
});

const canvaswidth = computed(() => {
	if (store.imgInfo.is_kuan) {
		return Math.round(
			canvasInfo.value.tagwidth);
	} else {
		return Math.round(
			canvasInfo.value.tagheight * store.imgInfo.ratio
		);
	}
});

const canvasheight = computed(() => {
	if (store.imgInfo.is_kuan) {
		return Math.round(
			canvasInfo.value.tagwidth / store.imgInfo.ratio
		);
	} else {
		return canvasInfo.value.tagheight
	}
});

store.imgInfo.is_kuan = computed(() => {
	return store.imgInfo.ratio > canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
});

watch(() => store.imgInfo.url, (newurl) => {
	console.log("newurl:", newurl);
	setTimeout(() => {
		drawImg(canvaswidth, canvasheight)
	}, 10);
})


</script>
<style>
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