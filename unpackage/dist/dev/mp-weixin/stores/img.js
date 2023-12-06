"use strict";
const common_vendor = require("../common/vendor.js");
const useImgStore = common_vendor.defineStore("img", {
  state: () => {
    const imgInfo = common_vendor.ref({
      width: 0,
      height: 0,
      url: "",
      data: [],
      ratio: 1,
      is_kuan: false
    });
    return { count: 0, imgInfo };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    }
  }
});
exports.useImgStore = useImgStore;
