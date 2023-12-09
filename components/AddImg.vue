<template>
	<view class="pickerview">
		<button type="primary" @tap="addImage">
			{{ !store.imgInfo.url ? "Add Image" : "Alter Image" }}
		</button>


		<button v-if="store.imgInfo.url" type="warn" @tap="store.deleteImage">Delete</button>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue'

	import {
		useImgStore
	} from '@/stores/img'

	const store = useImgStore()

	const drp = ref(0);

	const addImage = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				const tempFilePaths = res.tempFilePaths;
				store.imgInfo.url = tempFilePaths[0];
				uni.getImageInfo({
					src: tempFilePaths[0],
					success: (res) => {
						store.imgInfo.url = res.path;
						store.imgInfo.width = res.width;
						store.imgInfo.height = res.height;
						store.imgInfo.ratio = store.imgInfo.width / store.imgInfo.height;
						console.log('imgInfo', store.imgInfo);
						setCanvas();
					},
				});
			},
		});
	};


	const setCanvas = () => {
		if (store.imgInfo.is_kuan) {
			store.canvasInfo.width = Math.round(
				store.canvasInfo.tagwidth
			);
			store.canvasInfo.height = Math.round(
				store.canvasInfo.tagwidth / store.imgInfo.ratio
			);
			console.log('canvasInfo:', store.canvasInfo.tagwidth, store.canvasInfo.width);

		} else {
			store.canvasInfo.height = store.canvasInfo.tagheight
			store.canvasInfo.width = Math.round(
				store.canvasInfo.tagheight * store.imgInfo.ratio
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