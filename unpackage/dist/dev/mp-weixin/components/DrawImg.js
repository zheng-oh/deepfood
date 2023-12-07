"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "DrawImg",
  setup(__props, { expose }) {
    const canvasInfo = common_vendor.ref({
      tagwidth_source: 750,
      tagheight_source: 750,
      tagwidth: 750,
      tagheight: 750,
      width: 0,
      height: 0
    });
    const touchInfo = common_vendor.ref({
      x: 0,
      y: 0,
      x_ratio: 1,
      y_ratio: 1,
      isDragging: false
    });
    const ctx = common_vendor.ref(null);
    const drp = common_vendor.index.getSystemInfoSync().pixelRatio;
    const store = stores_img.useImgStore();
    const canvaswidth = common_vendor.computed(() => {
      if (store.imgInfo.is_kuan) {
        console.log("screenwidth:", common_vendor.index.getSystemInfoSync().screenWidth);
        return Math.round(
          canvasInfo.value.tagwidth
        );
      } else {
        return Math.round(
          canvasInfo.value.tagheight * store.imgInfo.ratio
        );
      }
    });
    const canvasheight = common_vendor.computed(() => {
      if (store.imgInfo.is_kuan) {
        return Math.round(
          canvasInfo.value.tagwidth / store.imgInfo.ratio
        );
      } else {
        return canvasInfo.value.tagheight;
      }
    });
    store.imgInfo.is_kuan = common_vendor.computed(() => {
      return store.imgInfo.ratio > canvasInfo.value.tagwidth / canvasInfo.value.tagheight;
    });
    const drawImage = () => {
      console.log("执行了drawImageddddddd");
      const query = common_vendor.index.createSelectorQuery();
      query.select("#myCanvas").fields({
        node: true,
        size: true
      }).exec((res) => {
        console.log("res:", res);
        const canvas = res[0].node;
        if (canvas) {
          console.log("<canvas> size:", res[0].width, res[0].height);
          ctx.value = canvas.getContext("2d");
          console.log(canvaswidth.value, canvasheight.value);
          console.log(drp);
          canvas.width = canvaswidth.value * drp;
          canvas.height = canvasheight.value * drp;
          console.log("canvas w;h:", canvas.width, canvas.height);
          const img = canvas.createImage();
          img.src = store.imgInfo.url;
          img.onload = () => {
            console.log();
            ctx.value.drawImage(
              img,
              0,
              0,
              canvas.width,
              canvas.height
            );
            const imageData = ctx.value.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            store.imgInfo.data = imageData;
            console.log("imageData:", imageData);
            console.log("kkk:", canvas.height, Math.max(res[0].height, res[0].width));
            console.log("store.imgInfo.data:", store.imgInfo.data);
            if (!store.imgInfo.is_kuan) {
              touchInfo.value.y_ratio = canvasInfo.value.height / Math.max(res[0].height, res[0].width);
              touchInfo.value.x_ratio = touchInfo.value.y_ratio;
            } else {
              touchInfo.value.y_ratio = 1;
              touchInfo.value.x_ratio = 1;
            }
          };
        } else {
          console.error("Canvas element not found.");
        }
      });
    };
    expose({
      drawImage
    });
    return () => {
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/components/DrawImg.vue"]]);
wx.createComponent(Component);
