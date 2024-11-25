<template>
	<view class="pickerview">
		<button type="primary" @tap="addImage">
			{{ !img.imgInfo.url ? "Add Image" : "Alter Image" }}
		</button>


		<button v-if="img.imgInfo.url" type="warn" @tap="img.deleteImage">Delete</button>
	</view>
</template>

<script setup>
import {
	ref,
} from 'vue'

import {
	useImgStore
} from '@/stores/img'

const img = useImgStore()

const drp = ref(0);

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
					console.log('imgInfo', img.imgInfo);
					// setCanvas();
				},
			});
		},
	});
};


const setCanvas = () => {
	if (img.imgInfo.is_kuan) {
		img.canvasInfo.width = Math.round(
			img.canvasInfo.tagwidth
		);
		img.canvasInfo.height = Math.round(
			img.canvasInfo.tagwidth / img.imgInfo.ratio
		);
		console.log('canvasInfo:', img.canvasInfo.tagwidth, img.canvasInfo.width);

	} else {
		img.canvasInfo.height = img.canvasInfo.tagheight
		img.canvasInfo.width = Math.round(
			img.canvasInfo.tagheight * img.imgInfo.ratio
		);
	}
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
</style>