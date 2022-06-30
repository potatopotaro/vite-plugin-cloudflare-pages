import { defineComponent } from "vue";
import "./foo.css";

// named exports w/ variable declaration: ok
export const Foo = defineComponent({
  name: "foo",
  setup() {
    return () => <div class="tsx">from JSX</div>;
  },
});
