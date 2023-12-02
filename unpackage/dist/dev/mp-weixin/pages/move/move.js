"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      receivedPickerColors: []
    };
  },
  onLoad() {
    common_vendor.index.$on("pickerColorsEvent", (pickerColors) => {
      this.receivedPickerColors = pickerColors;
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.imgInfo.url
  }, _ctx.imgInfo.url ? {
    b: _ctx.squareSize + "px",
    c: _ctx.squareSize + "px",
    d: _ctx.hexColor,
    e: common_vendor.t(_ctx.rgb),
    f: common_vendor.o((...args) => _ctx.addToDB && _ctx.addToDB(...args)),
    g: common_vendor.f($data.receivedPickerColors, (color, index, i0) => {
      return {
        a: index,
        b: `rgb(${color.red},${color.green},${color.blue})`
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/zxing/Desktop/pickercolor/pages/move/move.vue"]]);
wx.createPage(MiniProgramPage);
