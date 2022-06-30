import { _ as _export_sfc, g as defineAsyncComponent, h as reactive, o as openBlock, c as createElementBlock, a as createBaseVNode, t as toDisplayString, b as createVNode, u as unref, w as withCtx, F as Fragment, p as pushScopeId, i as popScopeId, d as createTextVNode, j as __vitePreload } from "./index.22c34660.js";
import { B as Button } from "./button.5a8f6f91.js";
var _imports_0 = "/test/assets/logo.03d6d6da.png";
var foo = { msg: "hi" };
const msg = "[success] from conventional virtual file";
var Home_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => "\nh1[data-v-d6902fa2],\na[data-v-d6902fa2] {\n  color: green;\n}\n")();
function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case "../components/ImportType.vue":
      return __vitePreload(() => import("./ImportType.25185b4a.js"), true ? ["assets/ImportType.25185b4a.js","assets/index.22c34660.js","assets/index.232017ad.css"] : void 0);
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const _withScopeId = (n) => (pushScopeId("data-v-d6902fa2"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h1", null, "Home", -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "logo"
  })
], -1));
const _hoisted_3 = { class: "virtual" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "inter" }, "this will be styled with a font-face", -1));
const _hoisted_5 = { class: "import-meta-url" };
const _hoisted_6 = { class: "protocol" };
const _hoisted_7 = { class: "nested-virtual" };
const _hoisted_8 = /* @__PURE__ */ createTextVNode("CommonButton");
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createTextVNode(" encrypted message: "),
  /* @__PURE__ */ createBaseVNode("p", { class: "encrypted-msg" })
], -1));
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    var _a;
    const ImportType = load("ImportType");
    const Foo = defineAsyncComponent(() => __vitePreload(() => import("./Foo.d3791c8b.js"), true ? ["assets/Foo.d3791c8b.js","assets/Foo.260178d0.css","assets/index.22c34660.js","assets/index.232017ad.css"] : void 0).then((mod) => mod.Foo));
    function load(file) {
      return defineAsyncComponent(() => __variableDynamicImportRuntime1__(`../components/${file}.vue`));
    }
    const url = (_a = document.querySelector(".import-meta-url")) == null ? void 0 : _a.textContent;
    const protocol = url ? new URL(url).protocol : void 0;
    const state = reactive({
      count: 0,
      protocol,
      url
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        _hoisted_2,
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => state.count++)
        }, "count is: " + toDisplayString(state.count), 1),
        createVNode(unref(Foo)),
        createBaseVNode("p", _hoisted_3, "msg from virtual module: " + toDisplayString(unref(foo).msg), 1),
        _hoisted_4,
        createBaseVNode("p", _hoisted_5, toDisplayString(state.url), 1),
        createBaseVNode("p", _hoisted_6, toDisplayString(state.protocol), 1),
        createBaseVNode("p", _hoisted_7, "msg from nested virtual module: " + toDisplayString(unref(msg)), 1),
        createVNode(unref(Button), null, {
          default: withCtx(() => [
            _hoisted_8
          ]),
          _: 1
        }),
        _hoisted_9,
        createVNode(unref(ImportType))
      ], 64);
    };
  }
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6902fa2"]]);
export { Home as default };
