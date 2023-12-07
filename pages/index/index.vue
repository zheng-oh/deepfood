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

		<!-- <view style="display: flex; justify-content: center">
			<canvas v-if="imgInfo.url" type="2d" id="myCanvas" canvas-id="myCanvas" @touchstart="handleTouchStart"
				@touchmove="handleTouchMove" @touchend="handleTouchEnd" :style="{
					width: canvasInfo.tagwidth + 'rpx',
					height: canvasInfo.tagheight + 'rpx',
				}"></canvas>
		</view> -->
		<!-- 	<view class="pickerview" v-if="imgInfo.url" style="display: flex; flex-direction: row">
			<text class="large-text">Cursor Select</text>
			<button @tap="setCursorColor('red')" :style="{
				color: 'red',
				border:
					cursorInfo.color === 'red' ? '3px solid black' : '1px solid black',
				'background-color': cursorInfo.color === 'red' ? 'white' : 'grey',
			}">
				十
			</button>
			<button @tap="setCursorColor('black')" :style="{
				color: 'black',
				border:
					cursorInfo.color === 'black'
						? '3px solid black'
						: '1px solid black',
				'background-color': cursorInfo.color === 'black' ? 'white' : 'grey',
			}">
				十
			</button>
			<button @tap="setCursorColor('white')" :style="{
				color: 'white',
				border:
					cursorInfo.color === 'white'
						? '3px solid black'
						: '1px solid black',
				'background-color': 'grey',
			}">
				十
			</button>
		</view> -->
		<AddImg></AddImg>
		<PickerColor squaresize="20"></PickerColor>
		<view>
			<button @click="store.increment()">
				From Aaaa: {{ store.count }}
			</button>
		</view>
		<!-- <button @click="store.increment()">
				From Aaaa: {{ store.count }}
			</button> -->
		<view>{{ store.imgInfo }}</view>


	</view>
</template>


<script setup>
import {
	ref,
	watch,
	onMounted,
	computed,

	onUpdated,
} from 'vue'
// import {
// 	store
// } from '@/api/store.js'
import { useImgStore } from '@/stores/img'

import AddImg from '@/components/AddImg.vue'
import PickerColor from '@/components/PickerColor.vue'
import { storeToRefs } from 'pinia'
import { onReady } from '@dcloudio/uni-app'
import { drawImg } from '@/api/drawimg.js'

const store = useImgStore()
console.log("父组件storesss:", store);
// const ctx = ref(null);
// const drp = uni.getSystemInfoSync().pixelRatio


const canvasInfo = ref({
	tagwidth: 750,
	tagheight: 1000,
});

const touchInfo = ref({
	x: 0,
	y: 0,
	x_ratio: 1,
	y_ratio: 1,
	isDragging: false,
});


onReady(() => {
	console.log("onready");

	const query = wx.createSelectorQuery()
	query.select('#myCanvas')
		.fields({ node: true, size: true })
		.exec((res) => {
			const canvas = res[0].node
			const ctx = canvas.getContext('2d')

			const dpr = wx.getSystemInfoSync().pixelRatio
			canvas.width = res[0].width * dpr
			canvas.height = res[0].height * dpr
			ctx.scale(dpr, dpr)

			ctx.fillRect(0, 0, 100, 100)
		})
	drawImg(canvaswidth, canvasheight)
});
const canvaswidth = computed(() => {
	if (store.imgInfo.is_kuan) {
		console.log('screenwidth:', uni.getSystemInfoSync().screenWidth);
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
	}, 100);
	// drawImg(canvaswidth, canvasheight)
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