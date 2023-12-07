"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
if (!Array) {
  const _component_transition = common_vendor.resolveComponent("transition");
  _component_transition();
}
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
    const showPlusOne = common_vendor.ref(false);
    const addToDB = () => {
      if (store.pickerColors.length > 0) {
        const lastColor = store.pickerColors[store.pickerColors.length - 1];
        console.log("lastColor", lastColor.hexColor, store.pickerColor.hexColor);
        if (lastColor.hexColor === store.pickerColor.hexColor) {
          console.log("same color");
          return;
        }
      }
      console.log("different color");
      store.pickerColors.push(store.pickerColor);
      showPlusOne.value = true;
      setTimeout(() => {
        showPlusOne.value = false;
      }, 1e3);
    };
    const sliderx = common_vendor.computed(() => {
      return Math.round(store.cursorInfo.x / store.imgInfo.data.width * store.imgInfo.width);
    });
    const slidery = common_vendor.computed(() => {
      return Math.round(store.cursorInfo.y / store.imgInfo.data.height * store.imgInfo.height);
    });
    const sliderChangex = (e) => {
      store.cursorInfo.x = e.detail.value / store.imgInfo.width * store.imgInfo.data.width;
      store.imgInfo.re_plot = !store.imgInfo.re_plot;
      store.drawCursor();
      store.getImageRGB();
    };
    const sliderChangey = (e) => {
      store.cursorInfo.y = e.detail.value / store.imgInfo.height * store.imgInfo.data.height;
      store.imgInfo.re_plot = !store.imgInfo.re_plot;
      store.drawCursor();
      store.getImageRGB();
    };
    const switch1Change = (e) => {
      store.cursorInfo.cover = e.detail.value;
      store.drawCursor();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(squareSize),
        b: common_vendor.unref(squareSize),
        c: common_vendor.unref(store).pickerColor.hexColor,
        d: common_vendor.t(common_vendor.unref(store).pickerColor.rgb),
        e: common_vendor.o(addToDB),
        f: showPlusOne.value
      }, showPlusOne.value ? {} : {}, {
        g: common_vendor.p({
          name: "fade"
        }),
        h: `6rpx solid ` + common_vendor.unref(store).pickerColor.hexColor,
        i: common_vendor.unref(sliderx),
        j: common_vendor.o(sliderChangex),
        k: common_vendor.unref(store).imgInfo.width,
        l: common_vendor.unref(slidery),
        m: common_vendor.o(sliderChangey),
        n: common_vendor.unref(store).imgInfo.height,
        o: common_vendor.f(cursorColors, (color, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => setCursorColor(color.color), index),
            c: color.color,
            d: common_vendor.unref(store).cursorInfo.color === color.color ? "3px solid black" : "1px solid black",
            e: color.color
          };
        }),
        p: common_vendor.unref(store).cursorInfo.cover,
        q: common_vendor.o(switch1Change)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/components/PickerColor.vue"]]);
wx.createComponent(Component);
