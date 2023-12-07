"use strict";
const common_vendor = require("../common/vendor.js");
const useImgStore = common_vendor.defineStore("img", {
  state: () => {
    const imgInfo = common_vendor.ref({
      width: 0,
      height: 0,
      url: "",
      data: [],
      ratio: 1,
      is_kuan: false
    });
    const touchInfo = common_vendor.ref({
      x: 0,
      y: 0,
      x_ratio: 1,
      y_ratio: 1,
      isDragging: false
    });
    const cursorInfo = common_vendor.ref({
      x: 100,
      y: 100,
      radius: 60,
      lineWidth: 20,
      color: "red"
    });
    const pickerColor = common_vendor.ref({
      red: 0,
      green: 0,
      blue: 0,
      rgb: `RGB(0, 0, 0)  Hex(#000000)`,
      hexColor: ""
    });
    const ctx = common_vendor.ref(null);
    return { imgInfo, touchInfo, cursorInfo, ctx, pickerColor };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  getters: {
    drp() {
      return common_vendor.index.getSystemInfoSync().pixelRatio;
    }
  },
  actions: {
    deleteImage() {
      this.imgInfo.url = "";
    },
    handleTouchStart(event) {
      this.pickerColor.hexColor = "";
      const touch = event.touches[0];
      this.touchInfo.x = touch.x;
      this.touchInfo.y = touch.y;
      this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
      this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
      this.touchInfo.isDragging = true;
      this.getImageRGB();
    },
    handleTouchMove(event) {
      const touch = event.touches[0];
      this.touchInfo.x = touch.x;
      this.touchInfo.y = touch.y;
      this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
      this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
      this.getImageRGB();
    },
    handleTouchEnd(event) {
      this.drawCursor();
      this.touchInfo.isDragging = false;
    },
    drawCursor() {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.cursorInfo.lineWidth;
      this.ctx.moveTo(
        this.cursorInfo.x,
        this.cursorInfo.y - this.cursorInfo.radius
      );
      this.ctx.lineTo(
        this.cursorInfo.x,
        this.cursorInfo.y + this.cursorInfo.radius
      );
      this.ctx.moveTo(
        this.cursorInfo.x - this.cursorInfo.radius,
        this.cursorInfo.y
      );
      this.ctx.lineTo(
        this.cursorInfo.x + this.cursorInfo.radius,
        this.cursorInfo.y
      );
      this.ctx.strokeStyle = this.cursorInfo.color;
      this.ctx.stroke();
    },
    getImageRGB() {
      const x = Math.round(this.cursorInfo.x);
      const y = Math.round(this.cursorInfo.y);
      const pixelIndex = (y * this.imgInfo.data.width + x) * 4;
      this.pickerColor.red = this.imgInfo.data.data[pixelIndex];
      this.pickerColor.green = this.imgInfo.data.data[pixelIndex + 1];
      this.pickerColor.blue = this.imgInfo.data.data[pixelIndex + 2];
      this.pickerColor.hexColor = this.rgbToHex();
      this.pickerColor.rgb = `RGB(${this.pickerColor.red}, ${this.pickerColor.green}, ${this.pickerColor.blue})  Hex(${this.pickerColor.hexColor})`;
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
    }
  }
});
exports.useImgStore = useImgStore;
