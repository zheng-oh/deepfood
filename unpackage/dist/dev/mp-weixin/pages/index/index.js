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
        a: common_vendor.o((...args) => common_vendor.unref(store).handleTouchStart && common_vendor.unref(store).handleTouchStart(...args)),
        b: common_vendor.o((...args) => common_vendor.unref(store).handleTouchMove && common_vendor.unref(store).handleTouchMove(...args)),
        c: common_vendor.o((...args) => common_vendor.unref(store).handleTouchEnd && common_vendor.unref(store).handleTouchEnd(...args)),
        d: common_vendor.unref(store).canvasInfo.width + "rpx",
        e: common_vendor.unref(store).canvasInfo.height + "rpx",
        f: common_vendor.unref(store).imgInfo.url,
        g: common_vendor.unref(store).canvasInfo.width + "rpx",
        h: common_vendor.unref(store).canvasInfo.height + "rpx",
        i: common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).imgInfo.url ? {
        j: common_vendor.p({
          squaresize: "40"
        })
      } : {}, {
        k: common_vendor.t(common_vendor.unref(store).pickerColors.length)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
