<template>
	<view>
		<!-- <view v-for="(color, index) in receivedPickerColors" :key="index"
			style="display: flex; flex-direction: row; margin: 5rpx;">
			<view
				:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})`, width: '50px', height: '50px' }">
			</view>
			<text class="large-text">{{ color.red }}, {{ color.green }}, {{ color.blue }}</text>
		</view>
		<button v-if="receivedPickerColors.length" type="warn" @tap="cleardb"
			:style="{ marginTop: '20rpx', marginLeft: '60rpx', marginRight: '60rpx' }">Clean</button> -->
		<view>
			<button @click="store.increment()">
				From A: {{ store.count }}
			</button>
		</view>
	</view>
</template>
  

<script setup>
import { store } from '@/api/store';
</script>
<style>
.large-text {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 40rpx;
}
</style>
<!-- export default {
	data() {
		return {
			receivedPickerColors: [],
		};
	},
	methods: {
		cleardb() {
			this.receivedPickerColors = [];
		},
	},
	mounted() {
		// 监听事件并在收到数据时更新详情页的数据
		uni.$on('pickerColorsEvent', (pickerColors) => {
			this.receivedPickerColors = pickerColors;
			console.log('Received pickerColors:', pickerColors);

		});
	},
}; -->