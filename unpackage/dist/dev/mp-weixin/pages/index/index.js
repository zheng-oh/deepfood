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
    tap: function(e) {
      this.x = this.old.x;
      this.y = this.old.y;
      this.$nextTick(function() {
        this.x = 30;
        this.y = 30;
      });
    },
    onChange: function(e) {
      this.old.x = e.detail.x;
      this.old.y = e.detail.y;
    },
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
              console.log("screen width:", common_vendor.index.getSystemInfoSync().screenWidth);
              console.log("canvasInfo", this.canvasInfo);
              this.drawImage(true, this.cursorInfo.x, this.cursorInfo.y, this.cursorInfo.radius);
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
      console.log(red, green, blue);
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
    drawImage(plotcursor = false, x, y, radius) {
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
            this.imgInfo.scale = Math.min(canvas.width / this.imgInfo.width, canvas.height / this.imgInfo.height);
            this.ctx.drawImage(img, 0, 0, Math.round(this.imgInfo.width * this.imgInfo.scale), Math.round(this.imgInfo.height * this.imgInfo.scale));
            const imageData = this.ctx.getImageData(0, 0, this.canvasInfo.width, this.canvasInfo.height);
            this.imgInfo.data = imageData.data;
            if (plotcursor) {
              this.drawCursor(x, y, radius);
              console.log("plotcursor");
            }
          };
          console.log("imgInfo:", this.imgInfo);
          console.log("end draw");
        } else {
          console.error("Canvas element not found.");
        }
      });
    },
    drawCursor(x, y, radius) {
      this.cursorInfo.x = x;
      this.cursorInfo.y = y;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      console.log("cursor x,y:", x, y);
      this.ctx.strokeStyle = this.cursorInfo.color;
      this.ctx.stroke();
      console.log("cursorInfo:", this.cursorInfo);
    },
    setCursorColor(color) {
      this.cursorInfo.color = color;
      this.drawImage(true, this.cursorInfo.x, this.cursorInfo.y, this.cursorInfo.radius);
    },
    handleTouchStart(event) {
      console.log("event", event);
      const touch = event.touches[0];
      this.touchInfo.x = Math.round(touch.x);
      this.touchInfo.y = Math.round(touch.y);
      console.log("start x,y:", this.touchInfo.x, this.touchInfo.y);
      this.touchInfo.isDragging = true;
    },
    handleTouchMove(event) {
      if (!this.touchInfo.isDragging)
        return;
      const touch = event.touches[0];
      const deltaX = touch.x - this.touchInfo.x;
      const deltaY = touch.y - this.touchInfo.y;
      console.log("deltaX:", deltaX);
      console.log("deltaY:", deltaY);
      this.cursorInfo.x += deltaX;
      this.cursorInfo.y += deltaY;
      this.touchInfo.x = touch.x;
      this.touchInfo.y = touch.y;
      console.log("move x,y:", this.cursorInfo.x, this.cursorInfo.y);
      this.getImageRGB();
    },
    handleTouchEnd() {
      this.touchInfo.isDragging = false;
      this.drawCursor(this.touchInfo.x, this.touchInfo.y, this.cursorInfo.radius);
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
    e: $data.canvasInfo.width + "px",
    f: $data.canvasInfo.height + "px"
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xingzheng/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
