"use strict";
const common_vendor = require("../common/vendor.js");
const useImgStore = common_vendor.defineStore("img", {
  state: () => {
    const imgInfo = common_vendor.ref({
      width: 0,
      height: 0,
      url: "",
      data: [],
      ratio: 1
    });
    const canvasInfo = common_vendor.ref({
      tagwidth: 750,
      tagheight: 900,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    const touchInfo = common_vendor.ref({
      x: 0,
      y: 0,
      x_ratio: 1,
      y_ratio: 1
    });
    const cursorInfo = common_vendor.ref({
      x: 100,
      y: 100,
      radius: 40,
      lineWidth: 4,
      color: "#ffffff"
    });
    const pickerColor = common_vendor.ref({
      x: 0,
      y: 0,
      red: 0,
      green: 0,
      blue: 0,
      rgb: `RGB(0, 0, 0)  Hex(#000000)`,
      hexColor: "",
      max: 9
    });
    const dbColors = common_vendor.ref([]);
    const instance = common_vendor.ref(null);
    const ctxImg = common_vendor.ref(null);
    const ctxMag = common_vendor.ref(null);
    const ctxCursor = common_vendor.ref(null);
    const magnifier = {
      width: 100,
      height: 100,
      zoom: 1.5,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      color: "rgba(117, 173, 235, 0.7)",
      lineWidth: 4
    };
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
  getters: {},
  actions: {
    // 在设置画布信息时初始化边界
    setCanvas(canvasStyle, ratio) {
      if (this.imgInfo.ratio > ratio.value) {
        console.log("宽");
        this.canvasInfo.tagwidth = Math.round(parseFloat(canvasStyle.value.width.replace("px", "")));
        this.canvasInfo.tagheight = Math.round(this.canvasInfo.tagwidth / this.imgInfo.ratio);
        this.canvasInfo.x = 0;
        this.canvasInfo.y = (this.canvasInfo.height - this.canvasInfo.tagheight) / 2;
        this.touchInfo.y_ratio = this.canvasInfo.tagheight / this.imgInfo.height;
        this.touchInfo.x_ratio = this.touchInfo.y_ratio;
      } else {
        console.log("高");
        this.canvasInfo.tagheight = Math.round(parseFloat(canvasStyle.value.height.replace("px", "")));
        this.canvasInfo.tagwidth = Math.round(this.canvasInfo.tagheight * this.imgInfo.ratio);
        this.canvasInfo.x = (this.canvasInfo.width - this.canvasInfo.tagwidth) / 2;
        this.canvasInfo.y = 0;
        this.touchInfo.y_ratio = this.canvasInfo.tagheight / this.imgInfo.height;
        this.touchInfo.x_ratio = this.touchInfo.y_ratio;
      }
      this.initCursorMag();
    },
    deleteImage() {
      this.imgInfo.url = "";
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
        this.pickerColor.x = this.canvasInfo.tagwidth - 1;
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
      this.ctxMag = common_vendor.index.createCanvasContext("magnifier", this.instance);
      this.ctxCursor = common_vendor.index.createCanvasContext("myCursor", this.instance);
      this.ctxMag.clearRect(0, 0, this.magnifier.width, this.magnifier.height);
      this.ctxCursor.clearRect(0, 0, this.cursorInfo.radius * 2, this.cursorInfo.radius * 2);
      this.ctxMag.draw();
      this.ctxCursor.draw();
      this.pickerColor.hexColor = "";
      this.pickerColor.rgb = `RGB(0, 0, 0)  Hex(#000000)`;
    },
    runMove(event) {
      const touch = event.touches[0];
      event.preventDefault();
      this.touchInfo.x = Math.max(Math.min(touch.x, this.canvasInfo.tagwidth + this.canvasInfo.x), 0);
      this.touchInfo.y = Math.max(Math.min(touch.y, this.canvasInfo.tagheight + this.canvasInfo.y), 0);
      this.setCursor();
      this.drawMag();
      this.drawCursor();
      this.getImageRGB();
    },
    handleTouchStart(event) {
      this.runMove(event);
    },
    handleTouchMove(event) {
      this.runMove(event);
    },
    handleTouchEnd(event) {
      event.preventDefault();
    },
    drawCursor() {
      const centerX = this.cursorInfo.radius;
      const centerY = this.cursorInfo.radius;
      this.ctxCursor.setLineWidth(this.cursorInfo.lineWidth);
      this.ctxCursor.setStrokeStyle("black");
      this.ctxCursor.beginPath();
      this.ctxCursor.moveTo(centerX - this.cursorInfo.radius / 2, centerY);
      this.ctxCursor.lineTo(centerX + this.cursorInfo.radius / 2, centerY);
      this.ctxCursor.moveTo(centerX, centerY - this.cursorInfo.radius / 2);
      this.ctxCursor.lineTo(centerX, centerY + this.cursorInfo.radius / 2);
      this.ctxCursor.stroke();
      this.ctxCursor.setLineWidth(this.cursorInfo.lineWidth - 1);
      this.ctxCursor.setStrokeStyle(this.cursorInfo.color);
      this.ctxCursor.beginPath();
      this.ctxCursor.moveTo(centerX - this.cursorInfo.radius / 2 + 0.5, centerY);
      this.ctxCursor.lineTo(centerX + this.cursorInfo.radius / 2 - 0.5, centerY);
      this.ctxCursor.moveTo(centerX, centerY - this.cursorInfo.radius / 2 + 0.5);
      this.ctxCursor.lineTo(centerX, centerY + this.cursorInfo.radius / 2 - 0.5);
      this.ctxCursor.stroke();
      this.ctxCursor.draw();
    },
    drawMag() {
      if (!this.imgInfo.url) {
        console.error("没有图片URL");
        return;
      }
      this.ctxMag.clearRect(0, 0, 100, 100);
      const sourceX = Math.max(0, (this.touchInfo.x - this.canvasInfo.x) / this.touchInfo.x_ratio - this.magnifier.width / 2 / this.magnifier.zoom);
      const sourceY = Math.max(0, (this.touchInfo.y - this.canvasInfo.y) / this.touchInfo.y_ratio - this.magnifier.height / 2 / this.magnifier.zoom);
      const sourceWidth = this.magnifier.width / this.magnifier.zoom;
      const sourceHeight = this.magnifier.height / this.magnifier.zoom;
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
      this.ctxMag.strokeStyle = this.magnifier.color;
      this.ctxMag.lineWidth = this.magnifier.lineWidth;
      this.ctxMag.beginPath();
      this.ctxMag.moveTo(0, this.magnifier.width / 2);
      this.ctxMag.lineTo(this.magnifier.width, this.magnifier.width / 2);
      this.ctxMag.stroke();
      this.ctxMag.beginPath();
      this.ctxMag.moveTo(this.magnifier.height / 2, 0);
      this.ctxMag.lineTo(this.magnifier.height / 2, this.magnifier.height);
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
