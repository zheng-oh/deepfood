<template>
	<view>
		<view v-for="(color, index) in store.dbColors" :key="index"
			style="display: flex; flex-direction: row; margin: 5rpx;">
			<view
				:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})`, width: '50px', height: '50px' }">
			</view>
			<text class="large-text">{{ color.red }}, {{ color.green }}, {{ color.blue }}</text>
			<button type="warn" @tap="delColor(index)" :style="{ marginRight: '60rpx' }">Del</button>
		</view>

		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" tooltipFormat="tooltipDemo1"
				tooltipCustom="[object Object]" />
		</view>
		<view>
			Img Url: {{ chartData }}
		</view>
	</view>
</template>
  

<script setup>
import { useImgStore } from '@/stores/img'
import qiunDataCharts from '@/components/qiunCharts/qiun-data-charts/qiun-data-charts.vue';
import { onReady } from '@dcloudio/uni-app';
import { computed } from 'vue';
const store = useImgStore();



// const chartData = ref({})
//您可以通过修改 config-ucharts.js 文件中下标为 ['scatter'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
const opts = {
	color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
	padding: [15, 10, 0, 15],
	enableScroll: false,
	legend: {},
	xAxis: {
		disableGrid: true
	},
	yAxis: {
		gridType: "dash",
		dashLength: 2
	},
	extra: {
		line: {
			type: "straight",
			width: 2,
			activeType: "hollow"

		},
		tooltip: {
			showArrow: false,
			borderWidth: 1,
			borderRadius: 8,
			borderColor: "#FF0000",
			bgColor: "#FFFFFF",
			bgOpacity: 0.9,
			fontColor: "#000000",
			splitLine: false
		}
	}
}


const plotRed = computed(() => {
	return store.dbColors.map((item, index) => {
		return [index + 1, item.red];
	});
});

const plotGreen = computed(() => {
	return store.dbColors.map((item, index) => {

		return [index + 1, item.green];
	});
});

const plotBlue = computed(() => {
	return store.dbColors.map((item, index) => {
		return [index + 1, item.blue];
	});
});

const chartData = computed(() => {
	return {
		series: [
			{
				name: "Red",
				data: plotRed.value
			},
			{
				name: "Green",
				data: plotGreen.value
			},
			{
				name: "Blue",
				data: plotBlue.value
			}
		]
	};
});

const delColor = (index) => {
	store.dbColors.splice(index, 1);
};

onReady(() => {
	console.log("dbvue_onready");
	// getServerData();

});
</script>
<style>
.large-text {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 40rpx;
}

.charts-box {
	width: 100%;
	height: 300px;
}
</style>
