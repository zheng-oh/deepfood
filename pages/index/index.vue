<template>
	<view>
		<view>
			<!-- <image v-if="imgInfo.url" class="image-item" :src="imgInfo.url" mode="aspectFit" @tap="goToDetail" /> -->
			<!-- <canvas type="2d" id="myCanvas" canvas-id="myCanvas" @tap="getImageRGB" style="{ width: '400rpx', height: '600rpx' }"></canvas> -->
			<canvas type="2d" id="myCanvas" canvas-id="myCanvas" @tap="getImageRGB"></canvas>

			<!-- <image :src="imgInfo.url" mode="aspectFit" @tap="getImageRGB"></image> -->
		</view>
		<view v-if="imgInfo.url" style="display: flex; flex-direction: row;">
			<text>Cursor Select</text>

			<button @tap="setCursorColor('red')"
				:style="{ color: 'red', 'border': cursorInfo.color === 'red' ? '3px solid black' : '1px solid black', 'background-color': cursorInfo.color === 'red' ? 'white' : 'grey' }">十</button>
			<button @tap="setCursorColor('black')"
				:style="{ color: 'black', 'border': cursorInfo.color === 'black' ? '3px solid black' : '1px solid black', 'background-color': cursorInfo.color === 'black' ? 'white' : 'grey' }">十</button>
			<button @tap="setCursorColor('white')"
				:style="{ color: 'white', 'border': cursorInfo.color === 'white' ? '3px solid black' : '1px solid black', 'background-color': 'grey' }">十</button>
		</view>
		<view v-if="imgInfo.url">
			<view :style="{ width: squareSize + 'px', height: squareSize + 'px', backgroundColor: hexColor }"></view>
			<text>{{ rgb }}</text>
		</view>
		<view style="display: flex; flex-direction: row;">
			<button @tap="addImage">Add Image</button>
			<button v-if="imgInfo.url" @tap="deleteImage">Delete</button>
		</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
		<view>1</view>
	</view>
</template>


<script>
export default {
	data() {
		return {
			pickerColor: [],
			imgInfo: {
				width: 0,
				height: 0,
				url: "",
				data: [],
			},
			canvasInfo: {
				width: 0,
				height: 0,
			},
			cursorInfo: {
				x: 0,
				y: 0,
				radius: 0,
				color: "red",
			},
			ctx: null,
			drp: 0,
			rgb: "",
			hexColor: "",
			squareSize: 50, // 正方形的大小
		};
	},
	methods: {
		deleteImage() {
			this.imgInfo.url = "";
		},

		addImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["album", "camera"],
				success: (res) => {
					const tempFilePaths = res.tempFilePaths;
					this.imgInfo.url = tempFilePaths[0];
					uni.getImageInfo({
						src: tempFilePaths[0],
						success: (res) => {
							this.imgInfo.url = res.path;
							this.imgInfo.width = res.width;
							this.imgInfo.height = res.height;
							this.drawImage()
						},
					});
				},
			});
		},
		getImageRGB(event) {
			//点击的x，y 取整
			const x = Math.round(event.detail.x);
			const y = Math.round(event.detail.y);
			const radius = 10;
			this.cursorInfo.x = x;
			this.cursorInfo.y = y;
			this.cursorInfo.radius = radius;
			console.log("点击x,y:", x, y);
			console.log(this.imgInfo);
			// this.rgb = "x:" + x + "   y:" + y;
			const pixelIndex = (y * this.canvasInfo.width + x) * 4;
			const red = this.imgInfo.data[pixelIndex];
			const green = this.imgInfo.data[pixelIndex + 1];
			const blue = this.imgInfo.data[pixelIndex + 2];
			console.log(red, green, blue);
			this.hexColor = this.rgbToHex(red, green, blue);
			this.rgb = `RGB: ${red}, ${green}, ${blue}  Hex: ${this.hexColor}`;
			this.drawCursor(x, y, radius);
		},

		rgbToHex(red, green, blue) {
			const toHex = (value) => {
				const hex = value.toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			};

			const hexRed = toHex(red);
			const hexGreen = toHex(green);
			const hexBlue = toHex(blue);

			return `#${hexRed}${hexGreen}${hexBlue}`;
		},

		drawImage(plotcursor = false, x, y, radius) {
			console.log("start draw");


			const screenWidth = uni.getSystemInfoSync().windowWidth;
			this.dpr = uni.getSystemInfoSync().pixelRatio;

			console.log("dpr:", this.dpr);
			this.canvasInfo.width = this.imgInfo.width;
			this.canvasInfo.height = this.imgInfo.height
			console.log("canvas_wh:", this.canvasInfo.width, this.canvasInfo.height);


			//选择id为myCanvas的canvas节点
			const query = uni.createSelectorQuery();
			query
				.select("#myCanvas")
				.fields({ node: true, size: true })
				.exec((res) => {
					const canvas = res[0].node; // Add null check here
					if (canvas) {
						this.ctx = canvas.getContext("2d");
						canvas.width = this.canvasInfo.width
						canvas.height = this.canvasInfo.height
						console.log("canvas:", canvas);

						const img = canvas.createImage();
						img.src = this.imgInfo.url;

						img.onload = () => {
							this.ctx.drawImage(img, 0, 0, this.canvasInfo.width, this.canvasInfo.height);

							const imageData = this.ctx.getImageData(0, 0, this.canvasInfo.width, this.canvasInfo.height);
							this.imgInfo.data = imageData.data;

							if (plotcursor) {
								this.drawCursor(x, y, radius);
							}
						};

						console.log("end draw");
					} else {
						console.error("Canvas element not found.");
					}
				});

		},

		drawCursor(x, y, radius) {
			this.ctx.beginPath();
			this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
			console.log("cursor x,y:", x, y);
			this.ctx.strokeStyle = this.cursorInfo.color;
			this.ctx.stroke();
			console.log(this.canvasInfo);
		},
	},
}
</script>
<style></style>
