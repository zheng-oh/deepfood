"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pickerColor: [],
      imgInfo: {
        width: 0,
        height: 0,
        url: "",
        data: [],
        scale: 1
      },
      canvasInfo: {
        width: 430,
        height: 430
      },
      cursorInfo: {
        x: 100,
        y: 100,
        radius: 10,
        color: "red"
      },
      touchInfo: {
        x: 0,
        y: 0,
        isDragging: false
      },
      ctx: null,
      drp: 0,
      rgb: "",
      hexColor: "",
      squareSize: 50
      // 正方形的大小
    };
  },
  methods: {
    deleteImage() {
      this.imgInfo.url = "";
    },
    addImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          this.imgInfo.url = tempFilePaths[0];
          common_vendor.index.getImageInfo({
            src: tempFilePaths[0],
            success: (res2) => {
              this.imgInfo.url = res2.path;
              this.imgInfo.width = res2.width;
              this.imgInfo.height = res2.height;
              this.dpr = this.imgInfo.width / common_vendor.index.getSystemInfoSync().screenWidth;
              this.canvasInfo.width = this.imgInfo.width / this.dpr;
              this.canvasInfo.height = this.imgInfo.height / this.dpr;
              this.drawImage();
            }
          });
        }
      });
    },
    getImageRGB() {
      const x = Math.round(this.cursorInfo.x);
      const y = Math.round(this.cursorInfo.y);
      this.cursorInfo.radius;
      const pixelIndex = (y * this.canvasInfo.width + x) * 4;
      const red = this.imgInfo.data[pixelIndex];
      const green = this.imgInfo.data[pixelIndex + 1];
      const blue = this.imgInfo.data[pixelIndex + 2];
      this.hexColor = this.rgbToHex(red, green, blue);
      this.rgb = `RGB: ${red}, ${green}, ${blue}  Hex: ${this.hexColor}`;
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
      const query = common_vendor.index.createSelectorQuery();
      query.select("#myCanvas").fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
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
            this.imgInfo.scale = Math.min(
              canvas.width / this.imgInfo.width,
              canvas.height / this.imgInfo.height
            );
            this.ctx.drawImage(
              img,
              0,
              0,
              Math.round(this.imgInfo.width * this.imgInfo.scale),
              Math.round(this.imgInfo.height * this.imgInfo.scale)
            );
            const imageData = this.ctx.getImageData(
              0,
              0,
              this.canvasInfo.width,
              this.canvasInfo.height
            );
            this.imgInfo.data = imageData.data;
          };
        } else {
          console.error("Canvas element not found.");
        }
      });
    },
    drawCursor() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.cursorInfo.x, this.cursorInfo.y - this.cursorInfo.radius);
      this.ctx.lineTo(this.cursorInfo.x, this.cursorInfo.y + this.cursorInfo.radius);
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
      const touch = event.touches[0];
      this.touchInfo.x = Math.round(touch.x);
      this.touchInfo.y = Math.round(touch.y);
      this.cursorInfo.x = this.touchInfo.x;
      this.cursorInfo.y = this.touchInfo.y;
      this.touchInfo.isDragging = true;
      this.getImageRGB();
    },
    handleTouchMove(event) {
      if (!this.touchInfo.isDragging)
        return;
      const touch = event.touches[0];
      const deltaX = touch.x - this.touchInfo.x;
      const deltaY = touch.y - this.touchInfo.y;
      this.cursorInfo.x += deltaX;
      this.cursorInfo.y += deltaY;
      this.touchInfo.x = touch.x;
      this.touchInfo.y = touch.y;
      this.getImageRGB();
    },
    handleTouchEnd() {
      this.drawCursor();
      this.touchInfo.isDragging = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    b: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    c: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args)),
    d: $data.canvasInfo.height + "px",
    e: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    f: common_vendor.o(($event) => $options.setCursorColor("red")),
    g: $data.cursorInfo.color === "red" ? "3px solid black" : "1px solid black",
    h: $data.cursorInfo.color === "red" ? "white" : "grey",
    i: common_vendor.o(($event) => $options.setCursorColor("black")),
    j: $data.cursorInfo.color === "black" ? "3px solid black" : "1px solid black",
    k: $data.cursorInfo.color === "black" ? "white" : "grey",
    l: common_vendor.o(($event) => $options.setCursorColor("white")),
    m: $data.cursorInfo.color === "white" ? "3px solid black" : "1px solid black"
  } : {}, {
    n: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    o: $data.squareSize + "px",
    p: $data.squareSize + "px",
    q: $data.hexColor,
    r: common_vendor.t($data.rgb)
  } : {}, {
    s: common_vendor.o((...args) => $options.addImage && $options.addImage(...args)),
    t: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    v: common_vendor.o((...args) => $options.deleteImage && $options.deleteImage(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/zxing/Desktop/pickercolor/pages/move/move.vue"]]);
wx.createPage(MiniProgramPage);
