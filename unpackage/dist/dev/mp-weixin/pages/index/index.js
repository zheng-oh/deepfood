"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    stores_img.useImgStore();
    common_vendor.onReady(() => {
      console.log("onready");
    });
    const goToPickerColor = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tools/pickercolor"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goToPickerColor)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
