import {
    defineStore
} from 'pinia';
import {
    ref,
} from 'vue';

export const useImgStore = defineStore('img', {
    state: () => {
        const imgInfo = ref({
            width: 0,
            height: 0,
            url: '',
            data: [],
            ratio: 1,
        });

        const canvasInfo = ref({
            tagwidth: 750,
            tagheight: 900,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        })


        const touchInfo = ref({
            x: 0,
            y: 0,
            x_ratio: 1,
            y_ratio: 1,
        });

        const cursorInfo = ref({
            x: 100,
            y: 100,
            radius: 40,
            lineWidth: 4,
            color: '#ffffff',
        });


        const pickerColor = ref({
            x: 0,
            y: 0,
            red: 0,
            green: 0,
            blue: 0,
            rgb: `RGB(0, 0, 0)  Hex(#000000)`,
            hexColor: "",
            max: 9,
        });

        const dbColors = ref([]);
        const instance = ref(null);
        const ctxImg = ref(null);
        const ctxMag = ref(null);
        const ctxCursor = ref(null);

        const magnifier = {
            width: 100,
            height: 100,
            zoom: 1.5,
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
            color: 'rgba(117, 173, 235, 0.7)',
            lineWidth: 4,
        }

        return {
            canvasInfo,
            imgInfo,
            touchInfo,
            cursorInfo,
            instance,
            ctxImg,
            ctxMag,
            ctxCursor,
            pickerColor,
            dbColors,
            magnifier
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    getters: {

    },

    actions: {
        // 在设置画布信息时初始化边界
        setCanvas(canvasStyle, ratio) {
            if (this.imgInfo.ratio > ratio.value) {
                console.log("宽");
                // Use full width when image is wider than container ratio
                this.canvasInfo.tagwidth = Math.round(parseFloat(canvasStyle.value.width.replace("px", '')));
                this.canvasInfo.tagheight = Math.round(this.canvasInfo.tagwidth / this.imgInfo.ratio);
                this.canvasInfo.x = 0;
                this.canvasInfo.y = (this.canvasInfo.height - this.canvasInfo.tagheight) / 2;
                this.touchInfo.y_ratio = this.canvasInfo.tagheight / this.imgInfo.height;
                this.touchInfo.x_ratio = this.touchInfo.y_ratio

            } else {
                console.log("高");
                // Use full height when image is taller than container ratio 
                this.canvasInfo.tagheight = Math.round(parseFloat(canvasStyle.value.height.replace("px", ''))); // Remove px and parse as float
                this.canvasInfo.tagwidth = Math.round(this.canvasInfo.tagheight * this.imgInfo.ratio);
                this.canvasInfo.x = (this.canvasInfo.width - this.canvasInfo.tagwidth) / 2;
                this.canvasInfo.y = 0;
                this.touchInfo.y_ratio = this.canvasInfo.tagheight / this.imgInfo.height;
                this.touchInfo.x_ratio = this.touchInfo.y_ratio

            }

            this.initCursorMag();

        },

        deleteImage() {
            this.imgInfo.url = '';
        },

        setCursor() {
            if (this.touchInfo.x < this.canvasInfo.x) {
                this.cursorInfo.x = this.canvasInfo.x;
                this.pickerColor.x = 0;
            } else if (this.touchInfo.x < this.canvasInfo.tagwidth + this.canvasInfo.x) {
                this.cursorInfo.x = this.touchInfo.x;
                this.pickerColor.x = Math.floor(this.touchInfo.x - this.canvasInfo.x);
            } else {
                this.cursorInfo.x = this.canvasInfo.tagwidth + this.canvasInfo.x - 1;
                this.pickerColor.x = this.canvasInfo.tagwidth-1;
            }
            if (this.touchInfo.y < this.canvasInfo.y) {
                this.cursorInfo.y = this.canvasInfo.y;
                this.pickerColor.y = 0;
            } else if (this.touchInfo.y < this.canvasInfo.tagheight + this.canvasInfo.y) {
                this.cursorInfo.y = this.touchInfo.y;
                this.pickerColor.y = Math.floor(this.touchInfo.y - this.canvasInfo.y);
            } else {
                this.cursorInfo.y = this.canvasInfo.tagheight + this.canvasInfo.y - 1;
                this.pickerColor.y = this.canvasInfo.tagheight - 1;
            }
        },

        initCursorMag() {
            console.log("执行initCurMag");
            this.cursorInfo.x = this.canvasInfo.x;
            this.cursorInfo.y = this.canvasInfo.y;
            this.ctxMag = uni.createCanvasContext('magnifier', this.instance);
            this.ctxCursor = uni.createCanvasContext('myCursor', this.instance);
            this.ctxMag.clearRect(0, 0, this.magnifier.width, this.magnifier.height);
            this.ctxCursor.clearRect(0, 0, this.cursorInfo.radius * 2, this.cursorInfo.radius * 2);
            // 需要调用draw()方法才能真正清空画布
            this.ctxMag.draw();
            this.ctxCursor.draw();
            this.pickerColor.hexColor = "";
            this.pickerColor.rgb = `RGB(0, 0, 0)  Hex(#000000)`;
        },

        runMove(event) {
            const touch = event.touches[0];
            event.preventDefault(); // 阻止页面滚动

            // 使用预计算的边界值 最大不超过canvasInfo的边界    
            this.touchInfo.x = Math.max(Math.min(touch.x, this.canvasInfo.tagwidth + this.canvasInfo.x), 0);
            this.touchInfo.y = Math.max(Math.min(touch.y, this.canvasInfo.tagheight + this.canvasInfo.y), 0);
            this.setCursor();
            this.drawMag();
            this.drawCursor();
            this.getImageRGB();
        },
        

        handleTouchStart(event) {
            // this.pickerColor.hexColor = "";
            this.runMove(event);
        },
        handleTouchMove(event) {
            this.runMove(event);

        },
        handleTouchEnd(event) {
            event.preventDefault(); // 阻止页面滚动

            // console.log("handleTouchEnd");
            // this.imgInfo.re_plot = !this.imgInfo.re_plot

            // this.drawCursor();
        },

        drawCursor() {
            // 画光标 十字
            // 设置圆心在画布的正中心
            const centerX = this.cursorInfo.radius;
            const centerY = this.cursorInfo.radius;

            // 绘制外层黑边
            this.ctxCursor.setLineWidth(this.cursorInfo.lineWidth); // 较粗的线条
            this.ctxCursor.setStrokeStyle('black'); // 黑色边框
            this.ctxCursor.beginPath();
            // 黑色横线
            this.ctxCursor.moveTo(centerX - this.cursorInfo.radius / 2, centerY);
            this.ctxCursor.lineTo(centerX + this.cursorInfo.radius / 2, centerY);
            // 黑色竖线
            this.ctxCursor.moveTo(centerX, centerY - this.cursorInfo.radius / 2);
            this.ctxCursor.lineTo(centerX, centerY + this.cursorInfo.radius / 2);
            this.ctxCursor.stroke();

            // 绘制内部十字
            this.ctxCursor.setLineWidth(this.cursorInfo.lineWidth - 1); // 较细的线条
            this.ctxCursor.setStrokeStyle(this.cursorInfo.color); // 内部十字的颜色
            this.ctxCursor.beginPath();
            // 内部横线
            this.ctxCursor.moveTo(centerX - this.cursorInfo.radius / 2 + 0.5, centerY);
            this.ctxCursor.lineTo(centerX + this.cursorInfo.radius / 2 - 0.5, centerY);
            // 内部竖线
            this.ctxCursor.moveTo(centerX, centerY - this.cursorInfo.radius / 2 + 0.5);
            this.ctxCursor.lineTo(centerX, centerY + this.cursorInfo.radius / 2 - 0.5);
            this.ctxCursor.stroke();

            this.ctxCursor.draw();
        },

        drawMag() {

            // 检查图片是否存在
            if (!this.imgInfo.url) {
                console.error("没有图片URL");
                return;
            }

            // 清除之前的内容
            this.ctxMag.clearRect(0, 0, 100, 100);

            // 计算源图像区域
            const sourceX = Math.max(0, (this.touchInfo.x - this.canvasInfo.x) / this.touchInfo.x_ratio - this.magnifier.width / 2 / this.magnifier.zoom);
            // const sourceX = Math.max(0, this.touchInfo.x - this.magnifier.lside/this.magnifier.zoom);
            const sourceY = Math.max(0, (this.touchInfo.y - this.canvasInfo.y) / this.touchInfo.y_ratio - this.magnifier.height / 2 / this.magnifier.zoom);
            // const sourceY = Math.max(0, this.touchInfo.y - this.magnifier.lside/this.magnifier.zoom);
            const sourceWidth = this.magnifier.width / this.magnifier.zoom;
            const sourceHeight = this.magnifier.height / this.magnifier.zoom;
            // console.log("********************");
            // console.log("touchInfo:", this.touchInfo.x, this.touchInfo.y);
            // console.log("source:", sourceX, sourceY);
            // 绘制图像
            this.ctxMag.drawImage(
                this.imgInfo.url,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                100,
                100
            );

            // 绘制边框
            this.ctxMag.strokeStyle = this.magnifier.color;
            this.ctxMag.lineWidth = this.magnifier.lineWidth;
            // magCtx.beginPath();
            // magCtx.arc(50, 50, 49, 0, Math.PI * 2, false);
            // magCtx.stroke();

            // 横线：从左到右
            this.ctxMag.beginPath();
            this.ctxMag.moveTo(0, this.magnifier.width / 2); // 起点（画布左中）
            this.ctxMag.lineTo(this.magnifier.width, this.magnifier.width / 2); // 终点（画布右中）
            this.ctxMag.stroke();

            // 竖线：从上到下
            this.ctxMag.beginPath();
            this.ctxMag.moveTo(this.magnifier.height / 2, 0); // 起点（画布顶中）
            this.ctxMag.lineTo(this.magnifier.height / 2, this.magnifier.height); // 终点（画布底中）
            this.ctxMag.stroke();


            this.ctxMag.restore();
            this.ctxMag.draw();
        },

        getImageRGB() {
            const pixelIndex = (this.pickerColor.y * this.canvasInfo.tagwidth + this.pickerColor.x) * 4;
            this.pickerColor.red = this.imgInfo.data[pixelIndex];
            this.pickerColor.green = this.imgInfo.data[pixelIndex + 1];
            this.pickerColor.blue = this.imgInfo.data[pixelIndex + 2];
            this.pickerColor.hexColor = this.rgbToHex();
            this.pickerColor.rgb =
                `RGB(${this.pickerColor.red}, ${this.pickerColor.green}, ${this.pickerColor.blue})  Hex(${this.pickerColor.hexColor})`;
        },

        rgbToHex() {
            const toHex = (value) => {
                const hex = value.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            };

            const hexRed = toHex(this.pickerColor.red);
            const hexGreen = toHex(this.pickerColor.green);
            const hexBlue = toHex(this.pickerColor.blue);

            return `#${hexRed}${hexGreen}${hexBlue}`;
        },

    },
});