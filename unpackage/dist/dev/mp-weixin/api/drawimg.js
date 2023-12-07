"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const drawImg = (canvaswidth, canvasheight) => {
  console.log("执行了drawImageddddddd");
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
      console.log("<canvas> size:", res[0].width, res[0].height);
      store.ctx = canvas.getContext("2d");
      console.log(canvaswidth.value, canvasheight.value);
      console.log(drp);
      canvas.width = canvaswidth.value * drp;
      canvas.height = canvasheight.value * drp;
      console.log("canvas w;h:", canvas.width, canvas.height);
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
        console.log("imageData:", imageData);
        console.log("kkk:", canvas.height, Math.max(res[0].height, res[0].width));
        console.log("store.imgInfo.data:", store.imgInfo.data);
        if (!store.imgInfo.is_kuan) {
          store.touchInfo.y_ratio = canvas.height / res[0].height;
          store.touchInfo.x_ratio = store.touchInfo.y_ratio;
        } else {
          store.touchInfo.x_ratio = canvas.width / res[0].width;
          store.touchInfo.y_ratio = canvas.height / res[0].height;
        }
      };
    } else {
      console.error("Canvas element not found.");
    }
  });
};
exports.drawImg = drawImg;
