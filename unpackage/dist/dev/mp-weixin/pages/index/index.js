"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const goToLanyaba = () => {
      common_vendor.wx$1.navigateToMiniProgram({
        appId: "wxfa7ecaa71b2b805c",
        // 需要替换为目标小程序的 appId
        path: "pages/index/index",
        // 打开的页面路径，如果为空则打开首页
        success(res) {
          console.log("跳转成功");
        },
        fail(err) {
          console.log("跳转失败", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(goToPickerColor),
        c: common_assets._imports_1,
        d: common_vendor.o(goToLanyaba)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
