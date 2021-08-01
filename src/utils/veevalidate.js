import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (Field) => `{Field}`,
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password2: "确认密码",
    isCheck: "协议",
  },
});
