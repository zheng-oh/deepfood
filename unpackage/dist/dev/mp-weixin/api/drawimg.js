"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const drawImg = (canvaswidth, canvasheight) => {
  console.log("canvaswidth, canvasheight:", canvaswidth.value, canvasheight.value);
  const drp = common_vendor.index.getSystemInfoSync().pixelRatio;
  const store = stores_img.useImgStore();
  const query = common_vendor.index.createSelectorQuery();
  query.select("#myCanvas").fields({
    node: true,
    size: true
  }).exec((res) => {
    console.log("res:", res);
    const canvas = res[0].node;
    if (canvas) {
      store.ctx = canvas.getContext("2d");
      canvas.width = canvaswidth.value * drp;
      canvas.height = canvasheight.value * drp;
      const img = canvas.createImage();
      img.src = store.imgInfo.url;
      img.onload = () => {
        console.log();
        store.ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imageData = store.ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        store.imgInfo.data = imageData;
        if (!store.imgInfo.is_kuan) {
          store.touchInfo.y_ratio = canvas.height / res[0].height;
          store.touchInfo.x_ratio = store.touchInfo.y_ratio;
        } else {
          store.touchInfo.x_ratio = canvas.width / res[0].width;
          store.touchInfo.y_ratio = canvas.height / res[0].height;
        }
        store.pickerColor.hexColor = "";
      };
    } else {
      console.error("Canvas element not found.");
    }
  });
};
exports.drawImg = drawImg;
