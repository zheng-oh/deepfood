"use strict";
const common_vendor = require("../common/vendor.js");
const share = {
  // 分享到好友
  onShareAppMessage() {
    return {
      title: "抓取图像RGB",
      // 分享标题
      path: "pages/index/index?spreaderid=" + common_vendor.index.getStorageSync("spid"),
      // 默认为当前页面路径
      imageUrl: ""
      // 默认为当前页面的截图
    };
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: "抓取图像RGB",
      // 分享标题
      path: "pages/index/index?spreaderid=" + common_vendor.index.getStorageSync("spid"),
      // 默认为当前页面路径
      imageUrl: ""
      // 默认为当前页面的截图
    };
  }
};
exports.share = share;
