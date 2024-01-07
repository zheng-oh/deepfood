"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uSwitch_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/config.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
const _sfc_main = {
  name: "u-switch",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uSwitch_props.props],
  watch: {
    modelValue: {
      immediate: true,
      handler(n) {
        if (n !== this.inactiveValue && n !== this.activeValue) {
          common_vendor.index.$u.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
        }
      }
    }
  },
  data() {
    return {
      bgColor: "#ffffff"
    };
  },
  computed: {
    isActive() {
      return this.modelValue === this.activeValue;
    },
    switchStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(this.size * 2 + 2);
      style.height = common_vendor.index.$u.addUnit(Number(this.size) + 2);
      if (this.customInactiveColor) {
        style.borderColor = "rgba(0, 0, 0, 0)";
      }
      style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
      return style;
    },
    nodeStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(this.size - this.space);
      style.height = common_vendor.index.$u.addUnit(this.size - this.space);
      const translateX = this.isActive ? common_vendor.index.$u.addUnit(this.space) : common_vendor.index.$u.addUnit(this.size);
      style.transform = `translateX(-${translateX})`;
      return style;
    },
    bgStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(Number(this.size) * 2 - this.size / 2);
      style.height = common_vendor.index.$u.addUnit(this.size);
      style.backgroundColor = this.inactiveColor;
      style.transform = `scale(${this.isActive ? 0 : 1})`;
      return style;
    },
    customInactiveColor() {
      return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
    }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    clickHandler() {
      if (!this.disabled && !this.loading) {
        const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
        if (!this.asyncChange) {
          this.$emit("update:modelValue", oldValue);
        }
        this.$nextTick(() => {
          this.$emit("change", oldValue);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  _easycom_u_loading_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.bgStyle),
    b: common_vendor.p({
      show: _ctx.loading,
      mode: "circle",
      timingFunction: "linear",
      color: _ctx.modelValue ? _ctx.activeColor : "#AAABAD",
      size: _ctx.size * 0.6
    }),
    c: common_vendor.n(_ctx.modelValue && "u-switch__node--on"),
    d: common_vendor.s($options.nodeStyle),
    e: common_vendor.n(_ctx.disabled && "u-switch--disabled"),
    f: common_vendor.s($options.switchStyle),
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ab257b3"], ["__file", "C:/Users/zxing/Desktop/pickercolor/uni_modules/uview-plus/components/u-switch/u-switch.vue"]]);
wx.createComponent(Component);
