<template>
	<view class="chartData">
		<view class="colorList">
			<view class="saveBtn">
				<button class="m-btn" size="mini" @tap="addToDB">Save color</button>
			</view>
			<view class="colorListBox">
				<view v-for="(color, index) in img.dbColors" :key="index" @click="delColor(color)"
					:style="{ backgroundColor: `rgb(${color.red},${color.green},${color.blue})` }">
				</view>
			</view>
		</view>

		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" :reshow="reshow" />
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
const img = useImgStore();


const addToDB = (e) => {
	// 判断当前颜色是否和最后一个颜色相同
	if (img.dbColors.length >= img.pickerColor.max) {
		uni.showToast({
			title: 'Reached Max number of colors',
			icon: 'none',
			type: 'warning'
		});
		return
	}
	console.log(img.screenHeight, e.target.offsetTop);
	if (img.dbColors.length > 0) {
		console.log(img.dbColors.length);
		const lastColor = img.dbColors[img.dbColors.length - 1]

		// console.log('lastColor', lastColor.hexColor, img.pickerColor.hexColor);
		if (lastColor.hexColor === img.pickerColor.hexColor) {
			uni.showToast({
				title: 'The color is already saved',
				icon: 'none',
				type: 'warning'
			});
			return
		}
	}
	const pickerColor = { ...img.pickerColor };
	img.dbColors.push(pickerColor)
	opts.value.xAxis.rotateLabel = img.dbColors.length > 5 ? true : false;

}
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
	return img.dbColors.map((item, index) => {
		return item.red;

		// return [index + 1, item.red];
	});
});

const plotGreen = computed(() => {
	return img.dbColors.map((item, index) => {
		return item.green;
	});
});

const plotBlue = computed(() => {
	return img.dbColors.map((item, index) => {
		return item.blue;
	});
});

const plotCetagory = computed(() => {

	let resultArray = []
	for (let i = 1; i <= img.dbColors.length; i++) {
		resultArray.push("Sample " + i.toString());
	}

	return resultArray
});


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
	img.dbColors.splice(index, 1);
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
<style lang="scss" scoped>
@import '@/static/deepfood.scss';

@mixin flexr($justify: stretch, $align: stretch) {
	display: flex;
	flex-direction: row;
	justify-content: $justify;
	align-items: $align;
}

@mixin flexc($justify: stretch, $align: stretch) {
	display: flex;
	flex-direction: column;
	justify-content: $justify; // 垂直
	align-items: $align; // 水平
}

.chartData {
	@include flexc();
}

.colorList {
	@include flexr(space-between, center);
	width: 100%;
	height: 40px;
	// background-color: red;

}


.saveBtn {
	@include flexc(center, center);
	width: 60px;
	height: 100%;
	margin-right: 10px;
	button {
		color: #fff;
		background-color: $td-gray2;
		// 按钮居中
		display: flex;
		justify-content: center;
		align-items: center;
		//字体间距
		letter-spacing: 1px;
		//行间距
		line-height: 1;
		width: 100%;
		height: 80%;
		font-size: 11px;
	}
}

.colorListBox {
	@include flexr(space-around, center);
	width: 80%;
	height: 100%;

	view {
		margin-right: 5px;
		width: 25px;
		height: 25px;
		border-radius: 5px;
		border: 1px solid #656565;
	}
}

.divider {
	width: 100%;
	height: 2px;
	background-color: #828282;
	opacity: 0.2;

}


.charts-box {
	width: 100%;
	height: 300px;
}
</style>