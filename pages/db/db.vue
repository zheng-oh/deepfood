<template>
	<view>
		<text class="large-text"> Colors </text>
		<view v-for="(color, index) in receivedPickerColors" :key="index" style="display: flex; flex-direction: row">
			<view
				:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})`, width: '50px', height: '50px' }">
			</view>
			<text class="large-text">{{ color.red }}, {{ color.green }}, {{ color.blue }}</text>
		</view>
	</view>
</template>
  

<script>
export default {
	data() {
		return {
			receivedPickerColors: [],
		};
	},
	mounted() {
		// 监听事件并在收到数据时更新详情页的数据
		uni.$on('pickerColorsEvent', (pickerColors) => {
			this.receivedPickerColors = pickerColors;
			console.log('Received pickerColors:', pickerColors);

		});
	},
};
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
