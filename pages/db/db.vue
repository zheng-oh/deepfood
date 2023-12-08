<template>
	<view>
		<view v-for="(color, index) in store.dbColors" :key="index">
			<view class="colorList">
				<view
					:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})`, width: '50px', height: '50px' }">
				</view>
				<text class="large-text">{{ color.red }}, {{ color.green }}, {{ color.blue }}</text>
				<button class="delBut" type="warn" @tap="delColor(index)">Del</button>
			</view>
			<view class="divider"></view>
		</view>

		<view class="charts-box">
			<qiun-data-charts type="area" :opts="opts" :chartData="chartData" tooltipFormat="tooltipDemo1" />
		</view>
	</view>
</template>
  

<script setup>
import { useImgStore } from '@/stores/img'
import qiunDataCharts from '@/components/qiunCharts/qiun-data-charts/qiun-data-charts.vue';
import { onReady, onShow } from '@dcloudio/uni-app';
import { ref, computed, watchEffect } from 'vue';
const store = useImgStore();



// const chartData = ref({})
//您可以通过修改 config-ucharts.js 文件中下标为 ['scatter'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
const opts = ref({
	color: ["#FF0000", "#00FF00", "#0000FF", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
	padding: [15, 15, 0, 15],
	enableScroll: false,
	legend: {},
	xAxis: {
		disableGrid: true,
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
});


const plotRed = computed(() => {
	return store.dbColors.map((item, index) => {
		return item.red;

		// return [index + 1, item.red];
	});
});

const plotGreen = computed(() => {
	return store.dbColors.map((item, index) => {
		return item.green;
	});
});

const plotBlue = computed(() => {
	return store.dbColors.map((item, index) => {
		return item.blue;
	});
});

const plotCetagory = computed(() => {

	let resultArray = []
	for (let i = 1; i <= store.dbColors.length; i++) {
		resultArray.push("color" + i.toString());
	}

	return resultArray
});


const chartData = computed(() => {
	return {
		categories: plotCetagory.value,
		series: [
			{
				name: "Red",
				data: plotRed.value,
			},
			{
				name: "Green",
				data: plotGreen.value,

			},
			{
				name: "Blue",
				data: plotBlue.value,
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

// watchEffect(() => {
// 	resultArray.value = []

// 	for (let i = 1; i <= plotRed.value.length; i++) {
// 		resultArray.value.push("color" + i.toString());
// 	}
// 	// getServerData();
// });

onShow(() => {
	setTimeout(() => {
		opts.value.xAxis.disableGrid = !opts.value.xAxis.disableGrid;

	}, 100);

	// plotRed.value的长度 生成一个数组


})	
</script>
<style>
.colorList {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-top: 5rpx;
	margin-bottom: 5rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}

.divider {
	width: 100%;
	height: 5rpx;
	background-color: #828282;
	opacity: 0.2;

}

.delBut {
	margin-right: 20px;
	font-size: 25rpx;
	vertical-align: middle
}

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
