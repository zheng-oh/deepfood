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
			<qiun-data-charts type="area" :opts="opts" :chartData="chartData" tooltipFormat="tooltipDemo1"
				tooltipCustom="[object Object]" />
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
	color: ["#FF0000", "#00FF00", "#0000FF", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
	padding: [15, 15, 0, 15],
	enableScroll: false,
	legend: {},
	xAxis: {
		disableGrid: true,
		interval: 1,
	},
	yAxis: {
		gridType: "dash",
		dashLength: 2,
		min: 0,
		max: 255,
		interval: 5,
	},
	extra: {
		area: {
			type: "straight",
			opacity: 0.2,
			addLine: true,
			width: 2,
			gradient: false,
			activeType: "hollow"
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

const categories = ref([])

const chartData = computed(() => {
	// plotRed.value的长度 生成一个数组

	for (let i = 1; i <= plotRed.value.length; i++) {
		resultArray.push(i.toString());
	}
	return {
		categories: [str(i) for i in range(1, length + 1)]
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
