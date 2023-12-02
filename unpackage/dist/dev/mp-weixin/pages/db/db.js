"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      receivedPickerColors: []
    };
  },
  mounted() {
    common_vendor.index.$on("pickerColorsEvent", (pickerColors) => {
      this.receivedPickerColors = pickerColors;
      console.log("Received pickerColors:", pickerColors);
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.receivedPickerColors, (color, index, i0) => {
      return {
        a: `rgb(${color.red},${color.green},${color.blue})`,
        b: common_vendor.t(color.red),
        c: common_vendor.t(color.green),
        d: common_vendor.t(color.blue),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/zxing/Desktop/pickercolor/pages/db/db.vue"]]);
wx.createPage(MiniProgramPage);
