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
        data: []
      },
      canvasInfo: {
        width: 0,
        height: 0
      },
      cursorInfo: {
        x: 0,
        y: 0,
        radius: 0,
        color: "red"
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
              this.drawImage();
            }
          });
        }
      });
    },
    getImageRGB(event) {
      const x = Math.round(event.detail.x);
      const y = Math.round(event.detail.y);
      const radius = 10;
      this.cursorInfo.x = x;
      this.cursorInfo.y = y;
      this.cursorInfo.radius = radius;
      console.log("点击x,y:", x, y);
      console.log(this.imgInfo);
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
      common_vendor.index.getSystemInfoSync().windowWidth;
      this.dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
      console.log("dpr:", this.dpr);
      this.canvasInfo.width = this.imgInfo.width;
      this.canvasInfo.height = this.imgInfo.height;
      console.log("canvas_wh:", this.canvasInfo.width, this.canvasInfo.height);
      const query = common_vendor.index.createSelectorQuery();
      query.select("#myCanvas").fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        if (canvas) {
          this.ctx = canvas.getContext("2d");
          canvas.width = this.canvasInfo.width;
          canvas.height = this.canvasInfo.height;
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.getImageRGB && $options.getImageRGB(...args)),
    b: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    c: common_vendor.o(($event) => _ctx.setCursorColor("red")),
    d: $data.cursorInfo.color === "red" ? "3px solid black" : "1px solid black",
    e: $data.cursorInfo.color === "red" ? "white" : "grey",
    f: common_vendor.o(($event) => _ctx.setCursorColor("black")),
    g: $data.cursorInfo.color === "black" ? "3px solid black" : "1px solid black",
    h: $data.cursorInfo.color === "black" ? "white" : "grey",
    i: common_vendor.o(($event) => _ctx.setCursorColor("white")),
    j: $data.cursorInfo.color === "white" ? "3px solid black" : "1px solid black"
  } : {}, {
    k: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    l: $data.squareSize + "px",
    m: $data.squareSize + "px",
    n: $data.hexColor,
    o: common_vendor.t($data.rgb)
  } : {}, {
    p: common_vendor.o((...args) => $options.addImage && $options.addImage(...args)),
    q: $data.imgInfo.url
  }, $data.imgInfo.url ? {
    r: common_vendor.o((...args) => $options.deleteImage && $options.deleteImage(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xingzheng/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
