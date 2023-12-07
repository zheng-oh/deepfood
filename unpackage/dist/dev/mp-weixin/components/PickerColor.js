"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "PickerColor",
  props: ["square-size"],
  setup(__props) {
    const squareSize = __props;
    const store = stores_img.useImgStore();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(store).pickerColor.hexColor && common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).pickerColor.hexColor && common_vendor.unref(store).imgInfo.url ? {
        b: squareSize + "px",
        c: squareSize + "px",
        d: common_vendor.unref(store).pickerColor.hexColor,
        e: common_vendor.t(common_vendor.unref(store).pickerColor.rgb),
        f: common_vendor.t(squareSize),
        g: common_vendor.o((...args) => _ctx.addToDB && _ctx.addToDB(...args))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/components/PickerColor.vue"]]);
wx.createComponent(Component);
