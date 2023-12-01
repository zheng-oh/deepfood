<template>
	<view>
		<view>
			<!-- <image v-if="imgInfo.url" class="image-item" :src="imgInfo.url" mode="aspectFit" @tap="goToDetail" /> -->
			<canvas v-if="imgInfo.url" type="2d" id="myCanvas" canvas-id="myCanvas" @touchstart="handleTouchStart"
				@touchmove="handleTouchMove" @touchend="handleTouchEnd"
				:style="{ width: canvasInfo.tagwidth + 'rpx', height: canvasInfo.tagheight + 'rpx' }"></canvas>

		</view>
		<view v-if="imgInfo.url" style="display: flex; flex-direction: row">
			<text class="large-text">Cursor Select</text>
			<button @tap="setCursorColor('red')" :style="{
				color: 'red',
				border:
					cursorInfo.color === 'red' ? '3px solid black' : '1px solid black',
				'background-color': cursorInfo.color === 'red' ? 'white' : 'grey',
			}">
				十
			</button>
			<button @tap="setCursorColor('black')" :style="{
				color: 'black',
				border:
					cursorInfo.color === 'black'
						? '3px solid black'
						: '1px solid black',
				'background-color': cursorInfo.color === 'black' ? 'white' : 'grey',
			}">
				十
			</button>
			<button @tap="setCursorColor('white')" :style="{
				color: 'white',
				border:
					cursorInfo.color === 'white'
						? '3px solid black'
						: '1px solid black',
				'background-color': 'grey',
			}">
				十
			</button>
		</view>
		<view v-if="imgInfo.url" class="pickerview" style="display: flex; flex-direction: row">
			<view :style="{
				width: squareSize + 'px',
				height: squareSize + 'px',
				backgroundColor: hexColor,
			}"></view>
			<text class="large-text"> {{ rgb }}</text>
		</view>
		<view style="display: flex; flex-direction: row">

			<button type="primary" @tap="addImage">Add Image</button>
			<button v-if="imgInfo.url" type="warn" @tap="deleteImage">Delete</button>
		</view>
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
				scale: 1,
				ratio: 1,
			},
			canvasInfo: {
				tagwidth: 750,
				tagheight: 750,
				width: 0,
				height: 0,
			},
			cursorInfo: {
				x: 100,
				y: 100,
				radius: 10,
				color: "red",
			},
			touchInfo: {
				x: 0,
				y: 0,
				isDragging: false,
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
							// console.log("img res", res);
							this.imgInfo.url = res.path;
							this.imgInfo.width = res.width;
							this.imgInfo.height = res.height;
							this.setCanvas()
							this.canvasInfo.tagheight = Math.round(this.canvasInfo.tagwidth / this.imgInfo.ratio);
							//屏幕缩放比例
							console.log("系统真实dpr:", uni.getSystemInfoSync().pixelRatio);
							console.log("系统真实宽度：", uni.getSystemInfoSync().screenWidth)
							// this.dpr =
							// 	this.imgInfo.width / uni.getSystemInfoSync().screenWidth;
							// console.log("dpr:", this.dpr);
							//打印屏幕真实宽度
							// console.log("screen width:", uni.getSystemInfoSync().screenWidth);
							console.log("canvasInfo", this.canvasInfo);
							this.drawImage(
							);
						},
					});
				},
			});
		},
		setCanvas() {
			this.imgInfo.ratio = this.imgInfo.width / this.imgInfo.height;
			const canvasRatio = this.canvasInfo.tagwidth / this.canvasInfo.tagheight;
			if (this.imgInfo.ratio > canvasRatio) {
				console.log("照片宽对齐屏幕");
				this.canvasInfo.width = uni.getSystemInfoSync().screenWidth;
				this.canvasInfo.height = Math.round(this.canvasInfo.width / this.imgInfo.ratio);
				// this.canvasInfo.height = this.canvasInfo.width / imgRatio;
			} else {
				console.log("照片高对齐屏幕");
				this.canvasInfo.height = this.canvasInfo.tagheight;
				this.canvasInfo.width = Math.round(this.canvasInfo.height * this.imgInfo.ratio);
			}

		},

		getImageRGB() {
			//点击的x，y 取整
			const x = Math.round(this.cursorInfo.x);
			const y = Math.round(this.cursorInfo.y);
			const radius = this.cursorInfo.radius;
			const pixelIndex = (y * this.canvasInfo.width + x) * 4;
			const red = this.imgInfo.data[pixelIndex];
			const green = this.imgInfo.data[pixelIndex + 1];
			const blue = this.imgInfo.data[pixelIndex + 2];
			// console.log(red, green, blue);
			this.hexColor = this.rgbToHex(red, green, blue);
			this.rgb = `RGB: ${red}, ${green}, ${blue}  Hex: ${this.hexColor}`;
			// this.drawCursor(true, x, y, radius);
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

		drawImage() {
			console.log("start draw");
			//选择id为myCanvas的canvas节点
			const query = uni.createSelectorQuery();
			query
				.select("#myCanvas")
				.fields({ node: true, size: true })
				.exec((res) => {
					const canvas = res[0].node; // Add null check here
					console.log("res:", res);
					console.log("<canvas> size:", res[0].width, res[0].height);
					if (canvas) {
						this.ctx = canvas.getContext("2d");
						console.log("canvas:", canvas);
						canvas.width = this.canvasInfo.width;
						canvas.height = this.canvasInfo.height;
						const img = canvas.createImage();
						img.src = this.imgInfo.url;

						img.onload = () => {
							this.ctx.drawImage(img, 0, 0, this.canvasInfo.width, this.canvasInfo.height);

							const imageData = this.ctx.getImageData(
								0,
								0,
								this.canvasInfo.width,
								this.canvasInfo.height
							);
							this.imgInfo.data = imageData.data;
							console.log("imageData:", imageData);
						};
					} else {
						console.error("Canvas element not found.");
					}
				});
		},

		drawCursor() {
			// Clear the canvas before drawing the new cursor
			this.ctx.beginPath();
			this.ctx.lineWidth = 2; // 可以根据需要调整线的宽度

			this.ctx.moveTo(this.cursorInfo.x, this.cursorInfo.y - this.cursorInfo.radius);
			this.ctx.lineTo(this.cursorInfo.x, this.cursorInfo.y + this.cursorInfo.radius);

			// 绘制水平线
			this.ctx.moveTo(this.cursorInfo.x - this.cursorInfo.radius, this.cursorInfo.y);
			this.ctx.lineTo(this.cursorInfo.x + this.cursorInfo.radius, this.cursorInfo.y);

			this.ctx.strokeStyle = this.cursorInfo.color;
			this.ctx.stroke();
		},

		setCursorColor(color) {
			this.cursorInfo.color = color;
			this.drawImage(
				true,
				this.cursorInfo.x,
				this.cursorInfo.y,
				this.cursorInfo.radius
			);
		},

		handleTouchStart(event) {
			// Handle touch start event
			const touch = event.touches[0];
			this.touchInfo.x = Math.round(touch.x);
			this.touchInfo.y = Math.round(touch.y);
			this.cursorInfo.x = this.touchInfo.x;
			this.cursorInfo.y = this.touchInfo.y;
			// this.drawCursor(this.touchInfo.x, this.touchInfo.y, this.cursorInfo.radius);
			// console.log("start x,y:", this.touchInfo.x, this.touchInfo.y);
			this.touchInfo.isDragging = true;
			this.getImageRGB();
		},

		handleTouchMove(event) {
			// Handle touch move event
			if (!this.touchInfo.isDragging) return;

			const touch = event.touches[0];
			const deltaX = touch.x - this.touchInfo.x;
			const deltaY = touch.y - this.touchInfo.y;

			this.cursorInfo.x += deltaX;
			this.cursorInfo.y += deltaY;

			// Update start position for the next move event
			this.touchInfo.x = touch.x;
			this.touchInfo.y = touch.y;
			// console.log("move x,y:", this.cursorInfo.x, this.cursorInfo.y);
			this.getImageRGB();
		},

		handleTouchEnd() {
			// Handle touch end event
			this.drawCursor()
			this.touchInfo.isDragging = false;
			// this.drawCursor(this.touchInfo.x, this.touchInfo.y, this.cursorInfo.radius);
		},
	},
};
</script>
<style>
.pickerview {
	/* 居中 */
	display: flex;
	/* justify-content: center;
	text-align: center; */

	/* 其他样式，根据需要设置 */
}

.large-text {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 40rpx;
}
</style>
