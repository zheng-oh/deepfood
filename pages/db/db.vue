<template>
	<view>
		<view v-for="(color, index) in store.dbColors" :key="index">
			<view class="colorList">
				<view
					:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})`, width: '50px', height: '50px' }">
				</view>
				<text class="large-text">{{ color.red }}, {{ color.green }}, {{ color.blue }}</text>
				<view class="colorDel">
					<u--text type="info" :text="`Sample ${index + 1}`"></u--text>
					<button class="delBut" type="warn" @tap="delColor(index)">Del</button>
				</view>

			</view>
			<u-line length="100%" dashed> </u-line>

		</view>

		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" :reshow="reshow" />
		</view>
		<view class="colorList">
			<u-switch v-model="opts.xAxis.rotateLabel" @change="enablerotateL" />
			<u--text type="info" text="Sample_Label_Roate"></u--text>
		</view>

	</view>
</template>


<script setup>
	import {
		useImgStore
	} from '@/stores/img'
	import qiunDataCharts from '@/components/qiunCharts/qiun-data-charts/qiun-data-charts.vue';
	import {
		onReady,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import {
		ref,
		computed,
		watchEffect
	} from 'vue';
	const store = useImgStore();



	// const chartData = ref({})
	//您可以通过修改 config-ucharts.js 文件中下标为 ['scatter'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
	const opts = ref({
		color: ["#FF0000", "#00FF00", "#0000FF", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [15, 10, 0, 15],
		enableScroll: false,
		legend: {},
		xAxis: {
			disableGrid: true,
			scrollShow: true,
			itemCount: 4,
			rotateLabel: false,

		},
		yAxis: {
			gridType: "dash",
			dashLength: 2
		},
		update: true,
		extra: {
			line: {
				type: "straight",
				width: 2,
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
			resultArray.push("Sample " + i.toString());
		}

		return resultArray
	});


	const enablerotateL = (e) => {
		opts.value.xAxis.rotateLabel = e;
	};

	const reshow = ref(false);

	const chartData = computed(() => {
		const res = {
			categories: plotCetagory.value,
			series: [{
					name: "Red intensity",
					data: plotRed.value,
				},
				{
					name: "Green intensity",
					data: plotGreen.value,

				},
				{
					name: "Blue intensity",
					data: plotBlue.value,
				}
			]
		};
		return JSON.parse(JSON.stringify(res));
	});

	const delColor = (index) => {
		store.dbColors.splice(index, 1);
	};

	onReady(() => {
		console.log("dbvue_onready");
		// getServerData();
	});

	onHide(() => {
		reshow.value = false;
		console.log("dbvue_onhide");
		// getServerData();
	});

	onShow(() => {
		reshow.value = true;
		console.log("dbvue_onshow");
		// getServerData();
	});
</script>
<style>
	.colorList {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		justify-content: space-between;
	}

	.divider {
		width: 100%;
		height: 2px;
		background-color: #828282;
		opacity: 0.2;

	}

	.colorDel {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		/* justify-content: center; */
		margin-left: 100rpx;
		/* margin-right: 20rpx; */

	}

	.delBut {
		margin-right: 20px;
		margin-left: 10px;

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