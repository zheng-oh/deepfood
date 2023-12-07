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
      hexColor: "#000000"
    });
    const ctx = common_vendor.ref(null);
    return { count: 0, imgInfo, touchInfo, cursorInfo, ctx, pickerColor };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  getters: {
    drp() {
      return common_vendor.index.getSystemInfoSync().pixelRatio;
    },
    getImageRGB() {
      console.log("touchInfo:", this.touchInfo);
      const x = Math.round(this.cursorInfo.x);
      const y = Math.round(this.cursorInfo.y);
      const pixelIndex = (y * this.imgInfo.data.width + x) * 4;
      console.log("pixelIndex:", pixelIndex);
      const red = this.imgInfo.data.data[pixelIndex];
      const green = this.imgInfo.data.data[pixelIndex + 1];
      const blue = this.imgInfo.data.data[pixelIndex + 2];
      let hexColor = this.rgbToHex(red, green, blue);
      return {
        red,
        green,
        blue,
        rgb: `RGB(${red}, ${green}, ${blue})  Hex(${hexColor})`,
        hexColor
      };
    }
  },
  actions: {
    deleteImage() {
      this.imgInfo.url = "";
    },
    handleTouchStart(event) {
      console.log("handleTouchStart");
      const touch = event.touches[0];
      this.touchInfo.x = Math.round(touch.x);
      this.touchInfo.y = Math.round(touch.y);
      console.log("touchInfo:", this.touchInfo);
      this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
      this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
      console.log("touchInfo start", this.touchInfo.x, this.touchInfo.y);
      console.log("cursorInfo start", this.cursorInfo.x, this.cursorInfo.y);
      this.touchInfo.isDragging = true;
      this.pickerColor = this.getImageRGB;
      console.log("pickerColor:", this.pickerColor);
    },
    handleTouchMove(event) {
      console.log("handleTouchMove");
      if (!this.touchInfo.isDragging)
        return;
      const touch = event.touches[0];
      touch.x - this.touchInfo.x;
      touch.y - this.touchInfo.y;
      this.touchInfo.x = touch.x;
      this.touchInfo.y = touch.y;
      this.cursorInfo.x = this.touchInfo.x * this.touchInfo.x_ratio;
      this.cursorInfo.y = this.touchInfo.y * this.touchInfo.y_ratio;
    },
    handleTouchEnd(event) {
      console.log("handleTouchEnd");
      this.drawCursor();
      console.log("end x,y:", this.cursorInfo.x, this.cursorInfo.y);
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
    rgbToHex(red, green, blue) {
      const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      const hexRed = toHex(red);
      const hexGreen = toHex(green);
      const hexBlue = toHex(blue);
      return `#${hexRed}${hexGreen}${hexBlue}`;
    }
  }
});
exports.useImgStore = useImgStore;
