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
    common_vendor.onReady(() => {
      console.log("onready");
      store.canvasInfo.width = store.canvasInfo.tagwidth;
      store.canvasInfo.height = store.canvasInfo.tagheight;
    });
    store.imgInfo.is_kuan = common_vendor.computed(() => {
      return store.imgInfo.ratio > store.canvasInfo.tagwidth / store.canvasInfo.tagheight;
    });
    common_vendor.watch(() => store.imgInfo.url, (newurl) => {
      console.log("newurl:", newurl);
      setTimeout(() => {
        api_drawimg.drawImg();
      }, 10);
    });
    common_vendor.watch([() => store.imgInfo.re_plot], (newcover) => {
      if (!store.cursorInfo.cover) {
        store.ctxCursor.clearRect(0, 0, store.canvasInfo.width * store.drp, store.canvasInfo.height * store.drp);
      }
      store.drawCursor();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(store).imgInfo.url,
        b: common_vendor.o((...args) => common_vendor.unref(store).handleTouchStart && common_vendor.unref(store).handleTouchStart(...args)),
        c: common_vendor.o((...args) => common_vendor.unref(store).handleTouchMove && common_vendor.unref(store).handleTouchMove(...args)),
        d: common_vendor.o((...args) => common_vendor.unref(store).handleTouchEnd && common_vendor.unref(store).handleTouchEnd(...args)),
        e: common_vendor.unref(store).canvasInfo.width + "rpx",
        f: common_vendor.unref(store).canvasInfo.height + "rpx",
        g: common_vendor.unref(store).imgInfo.url,
        h: common_vendor.unref(store).canvasInfo.width + "rpx",
        i: common_vendor.unref(store).canvasInfo.height + "rpx",
        j: common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).imgInfo.url ? {
        k: common_vendor.p({
          squaresize: "40"
        })
      } : {}, {
        l: common_vendor.t(common_vendor.unref(store).dbColors)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
