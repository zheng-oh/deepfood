"use strict";
const common_vendor = require("../common/vendor.js");
const stores_img = require("../stores/img.js");
const _sfc_main = {
  __name: "AddImg",
  setup(__props) {
    const store = stores_img.useImgStore();
    const imgInfo = store.imgInfo;
    const drp = common_vendor.ref(0);
    const addImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          imgInfo.url = tempFilePaths[0];
          common_vendor.index.getImageInfo({
            src: tempFilePaths[0],
            success: (res2) => {
              imgInfo.url = res2.path;
              imgInfo.width = res2.width;
              imgInfo.height = res2.height;
              imgInfo.ratio = imgInfo.width / imgInfo.height;
              drp.value = common_vendor.index.getSystemInfoSync().pixelRatio;
              console.log("子组件imgInfo:", imgInfo);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(!common_vendor.unref(imgInfo).url ? "Add Image" : "Alter Image"),
        b: common_vendor.o(addImage),
        c: common_vendor.unref(imgInfo).url
      }, common_vendor.unref(imgInfo).url ? {
        d: common_vendor.o((...args) => _ctx.deleteImage && _ctx.deleteImage(...args))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xingzheng/Desktop/pickercolor/components/AddImg.vue"]]);
wx.createComponent(Component);
