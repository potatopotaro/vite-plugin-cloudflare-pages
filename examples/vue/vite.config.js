import Inspect from "vite-plugin-inspect";
import path from "path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import cloudflarePages from "vite-plugin-cloudflare-pages";

const virtualFile = "@virtual-file";
const virtualId = "\0" + virtualFile;
const nestedVirtualFile = "@nested-virtual-file";
const nestedVirtualId = "\0" + nestedVirtualFile;

// const base = "/test/";
const base = "./";

const PACKAGE_NAME = "vite-plugin-cloudflare-pages";

export default defineConfig({
  server: {
    watch: {
      ignored: [`!**/node_modules/${PACKAGE_NAME}/**`],
      followSymlinks: true,
    },
  },
  base,
  build: {
    minify: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [NodeModulesPolyfillPlugin()],
      platform: "browser",
    },
    exclude: ["example-external-component"],
  },
  ssr: {
    target: "webworker",
    noExternal: [
      // this package has uncompiled .vue files
      "example-external-component",
    ],
  },
  worker: {
    format: "es",
  },
  plugins: [
    Inspect(), // only applies in dev mode
    vuePlugin(),
    vueJsx(),
    {
      name: "virtual",
      resolveId(id) {
        if (id === "@foo") {
          return id;
        }
      },
      load(id) {
        if (id === "@foo") {
          return `export default { msg: 'hi' }`;
        }
      },
    },
    {
      name: "virtual-module",
      resolveId(id) {
        if (id === virtualFile) {
          return virtualId;
        } else if (id === nestedVirtualFile) {
          return nestedVirtualId;
        }
      },
      load(id) {
        if (id === virtualId) {
          return `export { msg } from "@nested-virtual-file";`;
        } else if (id === nestedVirtualId) {
          return `export const msg = "[success] from conventional virtual file"`;
        }
      },
    },

    // Example of a plugin that injects a helper from a virtual module that can
    // be used in renderBuiltUrl
    (function () {
      const queryRE = /\?.*$/s;
      const hashRE = /#.*$/s;
      const cleanUrl = (url) => url.replace(hashRE, "").replace(queryRE, "");
      let config;

      const virtualId = "\0virtual:ssr-vue-built-url";
      return {
        name: "built-url",
        enforce: "post",
        configResolved(_config) {
          config = _config;
        },
        resolveId(id) {
          if (id === virtualId) {
            return id;
          }
        },
        load(id) {
          if (id === virtualId) {
            return {
              code: `export const __ssr_vue_processAssetPath = (url) => '${base}' + url`,
              moduleSideEffects: "no-treeshake",
            };
          }
        },
        transform(code, id) {
          if (
            config.build.ssr &&
            cleanUrl(id).endsWith(".js") &&
            !code.includes("__ssr_vue_processAssetPath")
          ) {
            return {
              code:
                `import { __ssr_vue_processAssetPath } from '${virtualId}';` +
                code,
              sourcemap: null, // no sourcemap support to speed up CI
            };
          }
        },
      };
    })(),
    cloudflarePages(),
    // evaluatedPlugin,
  ],
  experimental: {
    renderBuiltUrl(filename, { hostType, type, ssr }) {
      if (ssr && type === "asset" && hostType === "js") {
        return {
          runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`,
        };
      }
    },
  },
});
