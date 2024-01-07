"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
if (!Array) {
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  (_easycom_u__text2 + _easycom_u_line2 + _easycom_u_switch2)();
}
const _easycom_u__text = () => "../../uni_modules/uview-plus/components/u--text/u--text.js";
const _easycom_u_line = () => "../../uni_modules/uview-plus/components/u-line/u-line.js";
const _easycom_u_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
if (!Math) {
  (_easycom_u__text + _easycom_u_line + qiunDataCharts + _easycom_u_switch)();
}
const qiunDataCharts = () => "../../components/qiunCharts/qiun-data-charts/qiun-data-charts.js";
const _sfc_main = {
  __name: "db",
  setup(__props) {
    const store = stores_img.useImgStore();
    const opts = common_vendor.ref({
      color: ["#FF0000", "#00FF00", "#0000FF", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 10, 0, 15],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true,
        scrollShow: true,
        itemCount: 4,
        rotateLabel: false
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2
      },
      update: true,
      extra: {
        line: {
          type: "straight",
          width: 2,
          activeType: "hollow"
        }
      }
    });
    const plotRed = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return item.red;
      });
    });
    const plotGreen = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return item.green;
      });
    });
    const plotBlue = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return item.blue;
      });
    });
    const plotCetagory = common_vendor.computed(() => {
      let resultArray = [];
      for (let i = 1; i <= store.dbColors.length; i++) {
        resultArray.push("Sample " + i.toString());
      }
      return resultArray;
    });
    const enablerotateL = (e) => {
      opts.value.xAxis.rotateLabel = e;
    };
    const reshow = common_vendor.ref(false);
    const chartData = common_vendor.computed(() => {
      const res = {
        categories: plotCetagory.value,
        series: [
          {
            name: "Red intensity",
            data: plotRed.value
          },
          {
            name: "Green intensity",
            data: plotGreen.value
          },
          {
            name: "Blue intensity",
            data: plotBlue.value
          }
        ]
      };
      return JSON.parse(JSON.stringify(res));
    });
    const delColor = (index) => {
      store.dbColors.splice(index, 1);
    };
    common_vendor.onReady(() => {
      console.log("dbvue_onready");
    });
    common_vendor.onHide(() => {
      reshow.value = false;
      console.log("dbvue_onhide");
    });
    common_vendor.onShow(() => {
      reshow.value = true;
      console.log("dbvue_onshow");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(store).dbColors, (color, index, i0) => {
          return {
            a: `rgb(${color.red},${color.green},${color.blue})`,
            b: common_vendor.t(color.red),
            c: common_vendor.t(color.green),
            d: common_vendor.t(color.blue),
            e: "0e4540db-0-" + i0,
            f: common_vendor.p({
              type: "info",
              text: `Sample ${index + 1}`
            }),
            g: common_vendor.o(($event) => delColor(index), index),
            h: "0e4540db-1-" + i0,
            i: index
          };
        }),
        b: common_vendor.p({
          length: "100%",
          dashed: true
        }),
        c: common_vendor.p({
          type: "line",
          opts: opts.value,
          chartData: common_vendor.unref(chartData),
          reshow: reshow.value
        }),
        d: common_vendor.o(enablerotateL),
        e: common_vendor.o(($event) => opts.value.xAxis.rotateLabel = $event),
        f: common_vendor.p({
          modelValue: opts.value.xAxis.rotateLabel
        }),
        g: common_vendor.p({
          type: "info",
          text: "Sample_Label_Roate"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/pages/db/db.vue"]]);
wx.createPage(MiniProgramPage);
