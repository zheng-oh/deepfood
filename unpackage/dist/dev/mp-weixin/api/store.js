"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.reactive({
  imgInfo: {
    width: 0,
    height: 0,
    url: "",
    data: [],
    ratio: 1,
    is_kuan: false
  },
  pickerColors: [],
  pickerColor: {
    red: 0,
    green: 0,
    blue: 0
  },
  count: 0,
  increment() {
    this.count++;
  }
  // increment() {
  // 	this.count++
  // }
});
exports.store = store;
