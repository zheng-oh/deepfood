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
        scale: 1,
        ratio: 1,
        is_kuan: false
      },
      canvasInfo: {
        tagwidth: 750,
        tagheight: 750,
        width: 0,
        height: 0
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
        x_ratio: 1,
        y_ratio: 1,
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
              console.log("imgInfo", this.imgInfo);
              this.setCanvas();
              console.log("系统真实dpr:", common_vendor.index.getSystemInfoSync().pixelRatio);
              console.log("系统真实宽度：", common_vendor.index.getSystemInfoSync().screenWidth);
              this.drawImage();
            }
          });
        }
      });
    },
    setCanvas() {
      this.imgInfo.ratio = this.imgInfo.width / this.imgInfo.height;
      const canvasRatio = this.canvasInfo.tagwidth / this.canvasInfo.tagheight;
      if (this.imgInfo.ratio > canvasRatio) {
        console.log("照片宽对齐屏幕");
        this.canvasInfo.width = common_vendor.index.getSystemInfoSync().screenWidth;
        this.canvasInfo.height = Math.round(this.canvasInfo.width / this.imgInfo.ratio);
        this.canvasInfo.tagheight = Math.round(this.canvasInfo.tagwidth / this.imgInfo.ratio);
        this.imgInfo.is_kuan = true;
      } else {
        console.log("照片高对齐屏幕");
        this.canvasInfo.height = this.canvasInfo.tagheight;
        this.canvasInfo.width = Math.round(this.canvasInfo.height * this.imgInfo.ratio);
        this.canvasInfo.tagwidth = Math.round(this.canvasInfo.tagheight * this.imgInfo.ratio);
        console.log("canvasInfo", this.canvasInfo);
      }
    },
    getImageRGB() {
      console.log("touchInfo:", this.touchInfo);
      const x = Math.round(this.touchInfo.x * this.touchInfo.x_ratio);
      const y = Math.round(this.touchInfo.y * this.touchInfo.y_ratio);
      console.log("x,y:", x, y);
      console.log("canvasInfo:", this.canvasInfo);
      const pixelIndex = (y * this.imgInfo.data.width + x) * 4;
      console.log("pixelIndex:", pixelIndex);
      const red = this.imgInfo.data.data[pixelIndex];
      const green = this.imgInfo.data.data[pixelIndex + 1];
      const blue = this.imgInfo.data.data[pixelIndex + 2];
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
        console.log("ress:", res);
        console.log("<canvas> size:", res[0].width, res[0].height);
        if (canvas) {
          this.ctx = canvas.getContext("2d");
          canvas.width = this.canvasInfo.width;
          canvas.height = this.canvasInfo.height;
          console.log("canvas w;h:", canvas.width, canvas.height);
          const img = canvas.createImage();
          img.src = this.imgInfo.url;
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvasInfo.width, this.canvasInfo.height);
            const imageData = this.ctx.getImageData(
              0,
              0,
              this.canvasInfo.tagwidth,
              this.canvasInfo.tagheight
            );
            this.imgInfo.data = imageData;
            console.log("imageData:", imageData);
            if (!this.imgInfo.is_kuan) {
              this.touchInfo.y_ratio = this.canvasInfo.tagheight / res[0].height;
              this.touchInfo.x_ratio = this.canvasInfo.tagwidth / (this.imgInfo.data.height / this.touchInfo.y_ratio);
            }
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
      console.log("touch start", this.touchInfo.x, this.touchInfo.y);
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
    a: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    b: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    c: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    d: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args)),
    e: $data.canvasInfo.tagwidth + "rpx",
    f: $data.canvasInfo.tagheight + "rpx"
  } : {}, {
    g: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    h: common_vendor.o(($event) => $options.setCursorColor("red")),
    i: $data.cursorInfo.color === "red" ? "3px solid black" : "1px solid black",
    j: $data.cursorInfo.color === "red" ? "white" : "grey",
    k: common_vendor.o(($event) => $options.setCursorColor("black")),
    l: $data.cursorInfo.color === "black" ? "3px solid black" : "1px solid black",
    m: $data.cursorInfo.color === "black" ? "white" : "grey",
    n: common_vendor.o(($event) => $options.setCursorColor("white")),
    o: $data.cursorInfo.color === "white" ? "3px solid black" : "1px solid black"
  } : {}, {
    p: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    q: $data.squareSize + "px",
    r: $data.squareSize + "px",
    s: $data.hexColor,
    t: common_vendor.t($data.rgb)
  } : {}, {
    v: common_vendor.o((...args) => $options.addImage && $options.addImage(...args)),
    w: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    x: common_vendor.o((...args) => $options.deleteImage && $options.deleteImage(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/zxing/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
