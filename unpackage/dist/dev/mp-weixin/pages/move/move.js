"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      x: 0,
      y: 0,
      old: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    tap: function(e) {
      this.x = this.old.x;
      this.y = this.old.y;
      this.$nextTick(function() {
        this.x = 30;
        this.y = 30;
      });
    },
    onChange: function(e) {
      this.old.x = e.detail.x;
      this.old.y = e.detail.y;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.x,
    b: $data.y,
    c: common_vendor.o((...args) => $options.onChange && $options.onChange(...args)),
    d: common_vendor.o((...args) => $options.tap && $options.tap(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xingzheng/Desktop/pickercolor/pages/move/move.vue"]]);
wx.createPage(MiniProgramPage);
