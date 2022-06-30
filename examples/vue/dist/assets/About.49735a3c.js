import { B as Button } from "./button.5a8f6f91.js";
import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, t as toDisplayString, b as createVNode, w as withCtx, F as Fragment, d as createTextVNode } from "./index.22c34660.js";
var About_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => "\nh1[data-v-2a3effee] {\n  color: red;\n}\n")();
const _sfc_main = {
  async setup() {
    var _a;
    const url = (_a = document.querySelector(".import-meta-url")) == null ? void 0 : _a.textContent;
    return {
      msg: "About",
      url
    };
  },
  components: {
    Button
  }
};
const _hoisted_1 = { class: "import-meta-url" };
const _hoisted_2 = /* @__PURE__ */ createTextVNode("CommonButton");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", null, toDisplayString($setup.msg), 1),
    createBaseVNode("p", _hoisted_1, toDisplayString($setup.url), 1),
    createVNode(_component_Button, null, {
      default: withCtx(() => [
        _hoisted_2
      ]),
      _: 1
    })
  ], 64);
}
var About = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a3effee"]]);
export { About as default };
