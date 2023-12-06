"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
if (!Math) {
  (common_vendor.unref(DrawImg) + common_vendor.unref(AddImg))();
}
const AddImg = () => "../../components/AddImg.js";
const DrawImg = () => "../../components/DrawImg.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = stores_img.useImgStore();
    console.log("父组件store:", store);
    const drawimg = common_vendor.ref(null);
    const callChildMethod = () => {
      drawimg.value.setCanvas();
      drawimg.value.drawImage();
      console.log("drawing finish:", store.imgInfo.url, store.imgInfo.is_kuan, store.imgInfo.ratio);
    };
    common_vendor.onMounted(() => {
      console.log("onload");
    });
    common_vendor.onUpdated(() => {
      console.log("onupdate");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(drawimg, "4f0f9b4c-0", {
          "k": "drawimg"
        }),
        b: common_vendor.t(common_vendor.unref(store).count),
        c: common_vendor.o(($event) => common_vendor.unref(store).increment()),
        d: common_vendor.t(common_vendor.unref(store).imgInfo.url),
        e: common_vendor.o(callChildMethod)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
