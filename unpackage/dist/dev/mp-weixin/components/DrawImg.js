"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "DrawImg",
  setup(__props, { expose }) {
    const canvasInfo = common_vendor.ref({
      tagwidth_source: 750,
      tagheight_source: 750,
      tagwidth: 750,
      tagheight: 750,
      width: 0,
      height: 0
    });
    const store = stores_img.useImgStore();
    store.imgInfo.url;
    const setCanvas = () => {
      console.log("进入setCanvas");
      if (store.imgInfo.url === "") {
        return;
      }
      console.log("执行了setCanvas:", store.imgInfo.url);
      const canvasRatio = canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
      if (store.imgInfo.ratio > canvasRatio) {
        canvasInfo.value.width = common_vendor.index.getSystemInfoSync().screenWidth;
        canvasInfo.value.height = Math.round(
          canvasInfo.value.width / store.imgInfo.ratio
        );
        store.imgInfo.is_kuan = true;
      } else {
        canvasInfo.value.height = canvasInfo.value.tagheight;
        canvasInfo.value.width = Math.round(
          canvasInfo.value.height * store.imgInfo.ratio
        );
        store.imgInfo.is_kuan = false;
      }
      console.log("canvas 设置完成,canvasInfo:", canvasInfo.value);
      const query = common_vendor.index.createSelectorQuery();
      query.select("#myCanvas").fields({
        node: true,
        size: true
      }).exec(
        (res) => {
          console.log("res:", res);
        }
      );
    };
    const drawImage = () => {
      console.log("执行了drawImageddddddd");
      const query = common_vendor.index.createSelectorQuery();
      query.select("#myCanvas").fields({
        node: true,
        size: true
      }).exec((res) => {
        console.log("res:", res);
        const canvas = res[0].node;
        if (canvas) {
          ctx.value = canvas.getContext("2d");
          canvas.width = canvasInfo.value.width * drp.value;
          canvas.height = canvasInfo.value.height * drp.value;
          const img = canvas.createImage();
          img.src = imgInfo.value.url;
          img.onload = () => {
            ctx.value.drawImage(
              img,
              0,
              0,
              canvas.width,
              canvas.height
            );
            const imageData = ctx.value.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            imgInfo.value.data = imageData;
            if (!imgInfo.value.is_kuan) {
              touchInfo.value.y_ratio = canvasInfo.value.height / Math.max(res[0].height, res[0].width);
              touchInfo.value.x_ratio = touchInfo.value.y_ratio;
            } else {
              touchInfo.value.y_ratio = 1;
              touchInfo.value.x_ratio = 1;
            }
          };
        } else {
          console.error("Canvas element not found.");
        }
      });
    };
    expose({
      canvasInfo,
      setCanvas,
      drawImage
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).imgInfo.url ? {
        b: common_vendor.o((...args) => _ctx.handleTouchStart && _ctx.handleTouchStart(...args)),
        c: common_vendor.o((...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
        d: common_vendor.o((...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args)),
        e: canvasInfo.value.tagwidth + "rpx",
        f: canvasInfo.value.tagheight + "rpx"
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/components/DrawImg.vue"]]);
wx.createComponent(Component);
