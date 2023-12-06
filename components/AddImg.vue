<template>
	<view class="pickerview">
		<button type="primary" @tap="addImage">
			{{ !imgInfo.url ? "Add Image" : "Alter Image" }}
		</button>
		<button v-if="imgInfo.url" type="warn" @tap="deleteImage">Delete</button>
	</view>
</template>

<script setup>
import {
	ref,
	defineExpose,
} from 'vue'

const imgInfo = ref({
	width: 0,
	height: 0,

	url: '',
	data: [],
	ratio: 1,
	is_kuan: false,
});
const canvasInfo = ref({
	tagwidth_source: 750,
	tagheight_source: 1000,
	tagwidth: 0,
	tagheight: 0,
	width: 0,
	height: 0,
});
const drp = ref(0);


const addImage = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const tempFilePaths = res.tempFilePaths;
			imgInfo.value.url = tempFilePaths[0];
			uni.getImageInfo({
				src: tempFilePaths[0],
				success: (res) => {
					imgInfo.value.url = res.path;
					imgInfo.value.width = res.width;
					imgInfo.value.height = res.height;
					canvasInfo.value.tagwidth = canvasInfo.value.tagwidth_source;
					canvasInfo.value.tagheight = canvasInfo.value.tagheight_source;
					// setTimeout(() => {
					// 	setCanvas(() => {
					// 		console.log("回掉打印:");
					// 	})
					// }, 100)
					// setTimeout(() => {
					// 	setCanvas(() => {
					// 		drawImage();
					// 	});
					// }, 100);
					drp.value = uni.getSystemInfoSync().pixelRatio;
					console.log("imginfo:", imgInfo.value)
				},
			});
		},
	});
};

defineExpose({
	imgInfo,
});
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
</style>