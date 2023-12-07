"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
const api_drawimg = require("../../api/drawimg.js");
if (!Math) {
  (AddImg + PickerColor)();
}
const AddImg = () => "../../components/AddImg.js";
const PickerColor = () => "../../components/PickerColor.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = stores_img.useImgStore();
    console.log("父组件storesss:", store);
    const canvasInfo = common_vendor.ref({
      tagwidth: 750,
      tagheight: 1e3
    });
    common_vendor.ref({
      x: 0,
      y: 0,
      x_ratio: 1,
      y_ratio: 1,
      isDragging: false
    });
    common_vendor.onReady(() => {
      console.log("onready");
      const query = common_vendor.wx$1.createSelectorQuery();
      query.select("#myCanvas").fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = common_vendor.wx$1.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        ctx.fillRect(0, 0, 100, 100);
      });
      api_drawimg.drawImg(canvaswidth, canvasheight);
    });
    const canvaswidth = common_vendor.computed(() => {
      if (store.imgInfo.is_kuan) {
        console.log("screenwidth:", common_vendor.index.getSystemInfoSync().screenWidth);
        return Math.round(
          canvasInfo.value.tagwidth
        );
      } else {
        return Math.round(
          canvasInfo.value.tagheight * store.imgInfo.ratio
        );
      }
    });
    const canvasheight = common_vendor.computed(() => {
      if (store.imgInfo.is_kuan) {
        return Math.round(
          canvasInfo.value.tagwidth / store.imgInfo.ratio
        );
      } else {
        return canvasInfo.value.tagheight;
      }
    });
    store.imgInfo.is_kuan = common_vendor.computed(() => {
      return store.imgInfo.ratio > canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
    });
    common_vendor.watch(() => store.imgInfo.url, (newurl) => {
      console.log("newurl:", newurl);
      setTimeout(() => {
        api_drawimg.drawImg(canvaswidth, canvasheight);
      }, 100);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => common_vendor.unref(store).handleTouchStart && common_vendor.unref(store).handleTouchStart(...args)),
        b: common_vendor.o((...args) => common_vendor.unref(store).handleTouchMove && common_vendor.unref(store).handleTouchMove(...args)),
        c: common_vendor.o((...args) => common_vendor.unref(store).handleTouchEnd && common_vendor.unref(store).handleTouchEnd(...args)),
        d: common_vendor.unref(canvaswidth) + "rpx",
        e: common_vendor.unref(canvasheight) + "rpx",
        f: common_vendor.p({
          squaresize: "20"
        }),
        g: common_vendor.t(common_vendor.unref(store).count),
        h: common_vendor.o(($event) => common_vendor.unref(store).increment()),
        i: common_vendor.t(common_vendor.unref(store).imgInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
