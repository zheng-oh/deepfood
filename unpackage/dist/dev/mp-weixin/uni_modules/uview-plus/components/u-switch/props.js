"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.loading
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.disabled
    },
    // 开关尺寸，单位px
    size: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.size
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.activeColor
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.inactiveColor
    },
    // 通过v-model双向绑定的值
    modelValue: {
      type: [Boolean, String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.value
    },
    // switch打开时的值
    activeValue: {
      type: [String, Number, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.activeValue
    },
    // switch关闭时的值
    inactiveValue: {
      type: [String, Number, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.inactiveValue
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.asyncChange
    },
    // 圆点与外边框的距离
    space: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.switch.space
    }
  }
};
exports.props = props;
