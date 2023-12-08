"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_img = require("../../stores/img.js");
if (!Math) {
  qiunDataCharts();
}
const qiunDataCharts = () => "../../components/qiunCharts/qiun-data-charts/qiun-data-charts.js";
const _sfc_main = {
  __name: "db",
  setup(__props) {
    const store = stores_img.useImgStore();
    const opts = {
      color: ["#FF0000", "#00FF00", "#0000FF", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 15, 0, 15],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true,
        interval: 1
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2,
        min: 0,
        max: 255,
        interval: 5
      },
      extra: {
        area: {
          type: "straight",
          opacity: 0.2,
          addLine: true,
          width: 2,
          gradient: false,
          activeType: "hollow"
        }
      }
    };
    const plotRed = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return [index + 1, item.red];
      });
    });
    const plotGreen = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return [index + 1, item.green];
      });
    });
    const plotBlue = common_vendor.computed(() => {
      return store.dbColors.map((item, index) => {
        return [index + 1, item.blue];
      });
    });
    const chartData = common_vendor.computed(() => {
      return {
        categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
        series: [
          {
            name: "Red",
            data: plotRed.value
          },
          {
            name: "Green",
            data: plotGreen.value
          },
          {
            name: "Blue",
            data: plotBlue.value
          }
        ]
      };
    });
    const delColor = (index) => {
      store.dbColors.splice(index, 1);
    };
    common_vendor.onReady(() => {
      console.log("dbvue_onready");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(store).dbColors, (color, index, i0) => {
          return {
            a: `rgb(${color.red},${color.green},${color.blue})`,
            b: common_vendor.t(color.red),
            c: common_vendor.t(color.green),
            d: common_vendor.t(color.blue),
            e: common_vendor.o(($event) => delColor(index), index),
            f: index
          };
        }),
        b: common_vendor.p({
          type: "area",
          opts,
          chartData: common_vendor.unref(chartData),
          tooltipFormat: "tooltipDemo1",
          tooltipCustom: "[object Object]"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/zxing/Desktop/pickercolor/pages/db/db.vue"]]);
wx.createPage(MiniProgramPage);
