import { e as defineComponent, b as createVNode } from "./index.22c34660.js";
var button = /* @__PURE__ */ (() => ".btn {\n  background-color: #65b587;\n  border-radius: 8px;\n  border-style: none;\n  box-sizing: border-box;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 14px;\n  font-weight: 500;\n  height: 40px;\n  line-height: 20px;\n  list-style: none;\n  outline: none;\n  padding: 10px 16px;\n}\n")();
var Button = defineComponent({
  setup() {
    return () => {
      return createVNode("div", {
        class: "btn"
      }, "dynamicBtn");
    };
  }
});
export { Button as B };
