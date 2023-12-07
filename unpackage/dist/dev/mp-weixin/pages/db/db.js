"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
const _sfc_main = {
  __name: "db",
  setup(__props) {
    const store = stores_img.useImgStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(store).count),
        b: common_vendor.o(($event) => common_vendor.unref(store).increment()),
        c: common_vendor.t(common_vendor.unref(store).imgInfo.url)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/pages/db/db.vue"]]);
wx.createPage(MiniProgramPage);
