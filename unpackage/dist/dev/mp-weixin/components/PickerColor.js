"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "PickerColor",
  props: ["squaresize"],
  setup(__props) {
    const props = __props;
    const store = stores_img.useImgStore();
    const squareSize = common_vendor.computed(() => {
      console.log("squareSize", props.squaresize);
      return `${props.squaresize}px`;
    });
    const cursorColors = [
      {
        color: "red",
        border: "3px solid black",
        backgroundColor: "white"
      },
      {
        color: "black",
        border: "3px solid black",
        backgroundColor: "white"
      },
      {
        color: "white",
        border: "3px solid black",
        backgroundColor: "grey"
      },
      {
        color: "blue",
        border: "3px solid black",
        backgroundColor: "white"
      }
    ];
    const setCursorColor = (color) => {
      store.cursorInfo.color = color;
    };
    const sliderx = common_vendor.computed(() => {
      return Math.round(store.cursorInfo.x / store.imgInfo.data.width * store.imgInfo.width);
    });
    const slidery = common_vendor.computed(() => {
      return Math.round(store.cursorInfo.y / store.imgInfo.data.height * store.imgInfo.height);
    });
    const sliderChange = (e) => {
      console.log("sliderChange", e);
      store.cursorInfo.x = e.detail.value / store.imgInfo.width * store.imgInfo.data.width;
      store.cursorInfo.y = e.detail.value / store.imgInfo.height * store.imgInfo.data.height;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(squareSize),
        b: common_vendor.unref(squareSize),
        c: common_vendor.unref(store).pickerColor.hexColor,
        d: common_vendor.t(common_vendor.unref(store).pickerColor.rgb),
        e: common_vendor.o((...args) => _ctx.addToDB && _ctx.addToDB(...args)),
        f: `6rpx solid ` + common_vendor.unref(store).pickerColor.hexColor,
        g: common_vendor.unref(sliderx),
        h: common_vendor.o(sliderChange),
        i: common_vendor.unref(store).imgInfo.width,
        j: common_vendor.unref(slidery),
        k: common_vendor.o(sliderChange),
        l: common_vendor.unref(store).imgInfo.height,
        m: common_vendor.f(cursorColors, (color, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => setCursorColor(color.color), index),
            c: color.color,
            d: common_vendor.unref(store).cursorInfo.color === color.color ? "3px solid black" : "1px solid black",
            e: color.color
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/components/PickerColor.vue"]]);
wx.createComponent(Component);
