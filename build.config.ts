import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  // externals: ["vite"],
  // externals: ['vite', 'vue/compiler-sfc', '@vue/compiler-sfc'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
