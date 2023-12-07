import {
    defineStore
} from 'pinia';
import {
    ref
} from 'vue';

export const useImgStore = defineStore('img', {
    state: () => {
        const imgInfo = ref({
            width: 0,
            height: 0,
            url: '',
            data: [],
            ratio: 1,
            is_kuan: false,
            re_plot: false
        });

        const canvasInfo = ref({
            tagwidth: 750,
            tagheight: 900,
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
            radius: 60,
            lineWidth: 20,
            color: "red",
            cover: true
        });


        const pickerColor = ref({
            red: 0,
            green: 0,
            blue: 0,
            rgb: `RGB(0, 0, 0)  Hex(#000000)`,
            hexColor: "",
        });

        const drp = uni.getSystemInfoSync().pixelRatio;
        const ctxImg = ref(null);
        const ctxCursor = ref(null);

        return {
            drp,
            canvasInfo,
            imgInfo,
            touchInfo,
            cursorInfo,
            ctxImg,
            ctxCursor,
            pickerColor
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    getters: {

    },

    actions: {
        deleteImage() {
            this.imgInfo.url = '';
        },
        handleTouchStart(event) {
            console.log("handleTouchStart");
            this.pickerColor.hexColor = "";
            const touch = event.touches[0];
            this.touchInfo.x = touch.x;
            this.touchInfo.y = touch.y;
            this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
            this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
            // this.drawCursor(this.touchInfo.x, this.touchInfo.y, this.cursorInfo.radius);
            // console.log("touchInfo start x,y:", this.touchInfo.x, this.touchInfo.y);
            // console.log("cursorInfo start x,y:", this.cursorInfo.x, this.cursorInfo.y);
            this.getImageRGB();
            // console.log("pickerColor:", this.pickerColor);
        },
        handleTouchMove(event) {


            const touch = event.touches[0];
            this.touchInfo.x = touch.x;
            this.touchInfo.y = touch.y;
            this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
            this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
            if (this.cursorInfo.x < 0) {
                this.cursorInfo.x = 0
            } else if (this.cursorInfo.x > this.imgInfo.data.width) {
                this.cursorInfo.x = this.imgInfo.data.width - 1
            };
            if (this.cursorInfo.y < 0) {
                this.cursorInfo.y = 0
            } else if (this.cursorInfo.y > this.imgInfo.data.height) {
                this.cursorInfo.y = this.imgInfo.data.height - 1
            };
            this.getImageRGB();
        },
        handleTouchEnd(event) {
            // console.log("handleTouchEnd");
            this.imgInfo.re_plot = !this.imgInfo.re_plot

            this.drawCursor();
        },

        drawCursor() {
            // Clear the canvas before drawing the new cursor
            // this.ctx.clearRect(0, 0, this.imgInfo.width, this.imgInfo.height);
            // console.log("drawCursor");
            // console.log("cursorInfo:", this.cursorInfo);


            this.ctxCursor.beginPath();
            this.ctxCursor.lineWidth = this.cursorInfo.lineWidth; // 可以根据需要调整线的宽度
            this.ctxCursor.moveTo(
                this.cursorInfo.x,
                this.cursorInfo.y - this.cursorInfo.radius
            );
            this.ctxCursor.lineTo(
                this.cursorInfo.x,
                this.cursorInfo.y + this.cursorInfo.radius
            );

            // 绘制水平线
            this.ctxCursor.moveTo(
                this.cursorInfo.x - this.cursorInfo.radius,
                this.cursorInfo.y
            );
            this.ctxCursor.lineTo(
                this.cursorInfo.x + this.cursorInfo.radius,
                this.cursorInfo.y
            );

            this.ctxCursor.strokeStyle = this.cursorInfo.color;
            this.ctxCursor.stroke();
        },

        getImageRGB() {
            // console.log(this.cursorInfo);
            const x = Math.round(this.cursorInfo.x);
            const y = Math.round(this.cursorInfo.y);
            // console.log("x,y:", x, y);
            const pixelIndex = (y * this.imgInfo.data.width + x) * 4;
            this.pickerColor.red = this.imgInfo.data.data[pixelIndex];
            this.pickerColor.green = this.imgInfo.data.data[pixelIndex + 1];
            this.pickerColor.blue = this.imgInfo.data.data[pixelIndex + 2];
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