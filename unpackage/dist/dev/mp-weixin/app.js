"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api_wxshare = require("./api/wxshare.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/tools/pickercolor.js";
  "./pages/models/models.js";
}
const _sfc_main = {
  onLaunch: function() {
    let today = /* @__PURE__ */ new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    console.log("App Launch:", dateTime);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  app.mixin(api_wxshare.share);
  return {
    app,
    Pinia: common_vendor.Pinia,
    share: api_wxshare.share
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
