"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "AddImg",
  setup(__props) {
    const store = stores_img.useImgStore();
    common_vendor.ref(0);
    const addImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          store.imgInfo.url = tempFilePaths[0];
          common_vendor.index.getImageInfo({
            src: tempFilePaths[0],
            success: (res2) => {
              store.imgInfo.url = res2.path;
              store.imgInfo.width = res2.width;
              store.imgInfo.height = res2.height;
              store.imgInfo.ratio = store.imgInfo.width / store.imgInfo.height;
              console.log("imgInfo", store.imgInfo);
              setCanvas();
            }
          });
        }
      });
    };
    const setCanvas = () => {
      if (store.imgInfo.is_kuan) {
        store.canvasInfo.width = Math.round(
          store.canvasInfo.tagwidth
        );
        store.canvasInfo.height = Math.round(
          store.canvasInfo.tagwidth / store.imgInfo.ratio
        );
        console.log("canvasInfo:", store.canvasInfo.tagwidth, store.canvasInfo.width);
      } else {
        store.canvasInfo.height = store.canvasInfo.tagheight;
        store.canvasInfo.width = Math.round(
          store.canvasInfo.tagheight * store.imgInfo.ratio
        );
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(!common_vendor.unref(store).imgInfo.url ? "Add Image" : "Alter Image"),
        b: common_vendor.o(addImage),
        c: common_vendor.unref(store).imgInfo.url
      }, common_vendor.unref(store).imgInfo.url ? {
        d: common_vendor.o((...args) => common_vendor.unref(store).deleteImage && common_vendor.unref(store).deleteImage(...args))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/components/AddImg.vue"]]);
wx.createComponent(Component);
