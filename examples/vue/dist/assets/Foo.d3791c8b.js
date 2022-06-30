import { e as defineComponent, b as createVNode, d as createTextVNode } from "./index.22c34660.js";
var foo = /* @__PURE__ */ (() => ".tsx {\n  color: blue;\n}\n")();
const Foo = defineComponent({
  name: "foo",
  setup() {
    return () => createVNode("div", {
      "class": "tsx"
    }, [createTextVNode("from JSX")]);
  }
});
export { Foo };
