"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const drawImg = () => {
  const store = stores_img.useImgStore();
  console.log("canvaswidth, canvasheight:", store.canvasInfo.width, store.canvasInfo.height);
  const query = common_vendor.index.createSelectorQuery();
  query.select("#myCanvas").fields({
    node: true,
    size: true
  }).exec((res) => {
    console.log("res:", res);
    const canvas = res[0].node;
    if (canvas) {
      store.ctxImg = canvas.getContext("2d");
      canvas.width = store.canvasInfo.width * store.drp;
      canvas.height = store.canvasInfo.height * store.drp;
      const img = canvas.createImage();
      img.src = store.imgInfo.url;
      img.onload = () => {
        console.log();
        store.ctxImg.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imageData = store.ctxImg.getImageData(
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
        const query2 = common_vendor.index.createSelectorQuery();
        query2.select("#myCursor").fields({
          node: true,
          size: true
        }).exec((res2) => {
          console.log("res:", res2);
          const canvas2 = res2[0].node;
          if (canvas2) {
            store.ctxCursor = canvas2.getContext("2d");
            canvas2.width = store.canvasInfo.width * store.drp;
            canvas2.height = store.canvasInfo.height * store.drp;
            console.log("获取ctx cursor");
          }
        });
      };
    } else {
      console.error("Canvas element not found.");
    }
  });
};
exports.drawImg = drawImg;
