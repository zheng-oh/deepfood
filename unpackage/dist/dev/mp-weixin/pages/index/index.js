"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
const api_drawimg = require("../../api/drawimg.js");
if (!Math) {
  (PickerColor + AddImg)();
}
const AddImg = () => "../../components/AddImg.js";
const PickerColor = () => "../../components/PickerColor.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = stores_img.useImgStore();
    const canvasInfo = common_vendor.ref({
      tagwidth: 750,
      tagheight: 1e3
    });
    common_vendor.onReady(() => {
      console.log("onready");
    });
    const canvaswidth = common_vendor.computed(() => {
      if (store.imgInfo.is_kuan) {
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
      }, 10);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o((...args) => common_vendor.unref(store).handleTouchStart && common_vendor.unref(store).handleTouchStart(...args)),
        b: common_vendor.o((...args) => common_vendor.unref(store).handleTouchMove && common_vendor.unref(store).handleTouchMove(...args)),
        c: common_vendor.o((...args) => common_vendor.unref(store).handleTouchEnd && common_vendor.unref(store).handleTouchEnd(...args)),
        d: common_vendor.unref(canvaswidth) + "rpx",
        e: common_vendor.unref(canvasheight) + "rpx",
        f: common_vendor.unref(store).pickerColor.hexColor && common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).pickerColor.hexColor && common_vendor.unref(store).imgInfo.url ? {
        g: common_vendor.p({
          squaresize: "40"
        })
      } : {}, {
        h: common_vendor.unref(store).pickerColor.hexColor
      }, common_vendor.unref(store).pickerColor.hexColor ? {
        i: common_vendor.t(Math.round(common_vendor.unref(store).touchInfo.x)),
        j: common_vendor.t(Math.round(common_vendor.unref(store).touchInfo.y))
      } : {}, {
        k: common_vendor.unref(store).pickerColor.hexColor
      }, common_vendor.unref(store).pickerColor.hexColor ? {
        l: common_vendor.t(Math.round(common_vendor.unref(store).cursorInfo.x)),
        m: common_vendor.t(Math.round(common_vendor.unref(store).cursorInfo.y))
      } : {}, {
        n: common_vendor.t(Math.round(common_vendor.unref(store).cursorInfo.x / common_vendor.unref(store).imgInfo.data.width * common_vendor.unref(store).imgInfo.width))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
