<template>
	<view class="pickerview">
		<button type="primary" @tap="addImage">
			{{ !imgInfo.url ? "Add Image" : "Alter Image" }}
		</button>
		<button v-if="imgInfo.url" type="warn" @tap="store.deleteImage">Delete</button>
	</view>
</template>

<script setup>
import {
	ref,
} from 'vue'

import { useImgStore } from '@/stores/img'

const store = useImgStore()
const imgInfo = store.imgInfo

const drp = ref(0);

const addImage = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const tempFilePaths = res.tempFilePaths;
			imgInfo.url = tempFilePaths[0];
			uni.getImageInfo({
				src: tempFilePaths[0],
				success: (res) => {
					imgInfo.url = res.path;
					imgInfo.width = res.width;
					imgInfo.height = res.height;
					imgInfo.ratio = imgInfo.width / imgInfo.height;
					drp.value = uni.getSystemInfoSync().pixelRatio;
					console.log('imgInfo', imgInfo);
					console.log('drp', drp.value);
				},
			});
		},
	});
};

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