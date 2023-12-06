<template>
	<view>
		<DrawImg ref="drawimg"></DrawImg>
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
		<!-- 		<view v-if="this.hexColor && this.imgInfo.url" class="pickerview"
			:style="{ border: `6rpx solid ` + this.hexColor }">
			<view :style="{
				width: squareSize + 'px',
				height: squareSize + 'px',
				backgroundColor: hexColor,
				marginLeft: '10rpx',
				marginRight: '10rpx',
			}"></view>
			<text class="large-text"> {{ rgb }}</text>
			<button class="m-btn" @tap="addToDB">Save</button>
		</view> -->
		<AddImg></AddImg>
		<view>
			<button @click="store.increment()">
				From Aaaa: {{ store.count }}
			</button>
			Img Url: {{ store.imgInfo.url }}

		</view>
		<!-- <button @click="store.increment()">
				From Aaaa: {{ store.count }}
			</button> -->
		<button @tap="callChildMethod">Call Child Method</button>

	</view>
</template>


<script setup>
import {
	ref,
	onMounted,
	onUpdated,
} from 'vue'
// import {
// 	store
// } from '@/api/store.js'
import { useImgStore } from '@/stores/img'

import {
	AddImg,
} from '@/components/AddImg.vue'
import { DrawImg } from '@/components/DrawImg.vue'
import { storeToRefs } from 'pinia'


const store = useImgStore()
console.log("父组件store:", store);
const drawimg = ref(null)

// const { canvasInfo, setCanvas, drawImage } = inject();
const callChildMethod = () => {
	// drawimg.value.setCanvas()
	drawimg.value.setCanvas()
	drawimg.value.drawImage()
	console.log("drawing finish:", store.imgInfo.url, store.imgInfo.is_kuan, store.imgInfo.ratio);

}
// const { imgInfo } = storeToRefs(store)
// console.log("imgInfo:", imgInfo);
// console.log("imgInfo:", imgInfo);
// const ctx = ref(null);
// const drp = ref(0);
// const rgb = ref('');
// const hexColor = ref('');
// const squareSize = ref(40);

// const sendPickerColors = () => {
// 	// Send event to event bus
// 	uni.$emit('pickerColorsEvent', pickerColors.value);
// };

// const deleteImage = () => {
// 	imgInfo.value.url = '';
// };



// const addToDB = () => {
// 	pickerColors.value.push(pickerColor.value);
// 	sendPickerColors();
// };
// const setCanvas = () => {
// 	console.log("执行了setcanvas");
// canvasInfo.value.tagwidth = canvasInfo.value.tagwidth_source;
// canvasInfo.value.tagheight = canvasInfo.value.tagheight_source;
// imgInfo.value.ratio = imgInfo.value.width / imgInfo.value.height;
// const canvasRatio = canvasInfo.value.tagwidth / canvasInfo.value.tagheight;

// if (imgInfo.value.ratio > canvasRatio) {
// 	canvasInfo.value.width = uni.getSystemInfoSync().screenWidth;
// 	canvasInfo.value.height = Math.round(
// 		canvasInfo.value.width / imgInfo.value.ratio
// 	);
// 	canvasInfo.value.tagheight = Math.round(
// 		canvasInfo.value.tagwidth / imgInfo.value.ratio
// 	);
// 	imgInfo.value.is_kuan = true;
// } else {
// 	canvasInfo.value.height = canvasInfo.value.tagheight;
// 	canvasInfo.value.width = Math.round(
// 		canvasInfo.value.height * imgInfo.value.ratio
// 	);
// 	canvasInfo.value.tagwidth = Math.round(
// 		canvasInfo.value.tagheight * imgInfo.value.ratio
// 	);
// 	imgInfo.value.is_kuan = false;
// }

// if (typeof callback === 'function') {
// 	callback();
// }
// };
// const drawImage = () => {
// 	const query = uni.createSelectorQuery();
// 	query
// 		.select('#myCanvas')
// 		.fields({
// 			node: true,
// 			size: true,
// 		})
// 		.exec((res) => {
// 			const canvas = res[0].node;
// 			if (canvas) {
// 				ctx.value = canvas.getContext('2d');
// 				canvas.width = canvasInfo.value.width * drp.value;
// 				canvas.height = canvasInfo.value.height * drp.value;

// 				const img = canvas.createImage();
// 				img.src = imgInfo.value.url;

// 				img.onload = () => {
// 					ctx.value.drawImage(
// 						img,
// 						0,
// 						0,
// 						canvas.width,
// 						canvas.height
// 					);

// 					const imageData = ctx.value.getImageData(
// 						0,
// 						0,
// 						canvas.width,
// 						canvas.height
// 					);
// 					imgInfo.value.data = imageData;

// 					if (!imgInfo.value.is_kuan) {
// 						touchInfo.value.y_ratio =
// 							canvasInfo.value.height / Math.max(res[0].height, res[0].width);
// 						touchInfo.value.x_ratio = touchInfo.value.y_ratio;
// 					} else {
// 						touchInfo.value.y_ratio = 1;
// 						touchInfo.value.x_ratio = 1;
// 					}
// 				};
// 			} else {
// 				console.error('Canvas element not found.');
// 			}
// 		});
// };

// const drawCursor = () => {
// 	ctx.value.beginPath();
// 	ctx.value.lineWidth = cursorInfo.value.lineWidth;
// 	ctx.value.moveTo(
// 		cursorInfo.value.x,
// 		cursorInfo.value.y - cursorInfo.value.radius
// 	);
// 	ctx.value.lineTo(
// 		cursorInfo.value.x,
// 		cursorInfo.value.y + cursorInfo.value.radius
// 	);

// 	ctx.value.moveTo(
// 		cursorInfo.value.x - cursorInfo.value.radius,
// 		cursorInfo.value.y
// 	);
// 	ctx.value.lineTo(
// 		cursorInfo.value.x + cursorInfo.value.radius,
// 		cursorInfo.value.y
// 	);

// 	ctx.value.strokeStyle = cursorInfo.value.color;
// 	ctx.value.stroke();
// };
// const getImageRGB = () => {
// 	const x = Math.round(cursorInfo.value.x);
// 	const y = Math.round(cursorInfo.value.y);
// 	const pixelIndex = (y * imgInfo.value.data.width + x) * 4;
// 	const red = imgInfo.value.data.data[pixelIndex];
// 	const green = imgInfo.value.data.data[pixelIndex + 1];
// 	const blue = imgInfo.value.data.data[pixelIndex + 2];

// 	hexColor.value = rgbToHex(red, green, blue);
// 	rgb.value = `RGB(${red}, ${green}, ${blue})  Hex(${hexColor.value})`;

// 	return {
// 		red: red,
// 		green: green,
// 		blue: blue,
// 	};
// };

// const rgbToHex = (red, green, blue) => {
// 	const toHex = (value) => {
// 		const hex = value.toString(16);
// 		return hex.length === 1 ? '0' + hex : hex;
// 	};

// 	const hexRed = toHex(red);
// 	const hexGreen = toHex(green);
// 	const hexBlue = toHex(blue);

// 	return `#${hexRed}${hexGreen}${hexBlue}`;
// };

// const setCursorColor = (color) => {
// 	cursorInfo.value.color = color;
// 	drawImage();
// };

// const handleTouchStart = (event) => {
// 	const touch = event.touches[0];
// 	touchInfo.value.x = Math.round(touch.x);
// 	touchInfo.value.y = Math.round(touch.y);
// 	console.log("touchInfo:", touchInfo);
// 	if (!imgInfo.is_kuan) {
// 		// console.log("进入非宽屏");
// 		cursorInfo.x = touchInfo.x * touchInfo.x_ratio * drp;
// 		cursorInfo.y = touchInfo.y * touchInfo.y_ratio * drp;
// 	} else {
// 		cursorInfo.x = touchInfo.x * drp;
// 		cursorInfo.y = touchInfo.y * drp;
// 	}
// 	console.log("touchInfo start", touchInfo.x, touchInfo.y);
// 	console.log("cursorInfo start", cursorInfo.x, cursorInfo.y);
// 	touchInfo.isDragging = true;
// 	pickerColor = getImageRGB();
// };

// const handleTouchMove = (event) => {
// 	if (!touchInfo.isDragging) return;

// 	const touch = event.touches[0];
// 	const deltaX = touch.x - touchInfo.x;
// 	const deltaY = touch.y - this.touchInfo.y;
// 	// console.log("deltaX,deltaY:", deltaX, deltaY);
// 	if (!this.imgInfo.is_kuan) {
// 		this.cursorInfo.x += deltaX * this.touchInfo.x_ratio * this.drp;
// 		this.cursorInfo.y += deltaY * this.touchInfo.y_ratio * this.drp;
// 	} else {
// 		this.cursorInfo.x += deltaX * this.drp;
// 		this.cursorInfo.y += deltaY * this.drp;
// 	}

// 	// Update start position for the next move event
// 	this.touchInfo.x = touch.x;
// 	this.touchInfo.y = touch.y;
// 	// console.log("move x,y:", this.cursorInfo.x, this.cursorInfo.y);
// 	this.pickerColor = this.getImageRGB();
// }

// const handleTouchEnd = (event) => {
// 	this.drawCursor();
// 	this.touchInfo.isDragging = false;
// }

// const onShareAppMessage = (res) = > {
// 	if (res.from === 'button') { // 来自页面内分享按钮
// 		console.log(res.target)
// 	}
// 	return {
// 		title: '科研图分析',
// 		path: '/pages/index/index'
// 	}
// }

// const onShareTimeline = (res) => {
// 	return {
// 		title: '科研图分析',
// 		path: '/pages/index/index'
// 	}
// }
//获取子组件addimg中暴露的的数据imgInfo
// const imgInfo = ref({
// 	width: 0,
// 	height: 0,



onMounted(() => {
	console.log("onload");
	// console.log(imgInfo);;
})

onUpdated(() => {
	console.log("onupdate");
	// console.log("open imgInfo:", addimg.value.imgInfo);
	// console.log(imgInfo);;
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