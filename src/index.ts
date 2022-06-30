// import fs from "node:fs";
import { Miniflare } from "miniflare";
import type { Plugin, ViteDevServer } from "vite";
// import { createFilter } from "vite";
// /* eslint-enable import/no-duplicates */
// // import { resolveCompiler } from "./compiler";
// import { parseVueRequest } from "./utils/query";
// // import { getDescriptor, getSrcDescriptor } from "./utils/descriptorCache";
// import { getResolvedScript } from "./script";
// // import { transformMain } from "./main";
// // import { handleHotUpdate } from "./handleHotUpdate";
// // import { transformTemplateAsModule } from "./template";
// // import { transformStyle } from "./style";
// import { EXPORT_HELPER_ID, helperCode } from "./helper";

// export { parseVueRequest } from "./utils/query";
// export type { VueQuery } from "./utils/query";

interface Options {
  /* TODO? */
}

// interface ResolvedOptions extends Options {
//   /* TODO? */
// }

const NAME = "vite-plugin-cloudflare-pages";
const BASE = "./"; // relative base to make dist portable

type CloudflarePagesPlugin = (rawOptions: Options) => Plugin;

// "engines": {
//   "node": ">=18.0.0"
// },

const cloudflarePagesPlugin: CloudflarePagesPlugin = (
  rawOptions: Options = {}
) => {
  console.log(">>> INITIAL LOCATION", {
    importMetaUrl: import.meta.url,
  });
  return {
    name: NAME,
    configureServer: (viteDevServer: ViteDevServer) => {
      console.log("START: configureServer");
      console.log("configureServer LOCATION", {
        importMetaUrl: import.meta.url,
      });
      return () => {
        console.log("STARTED POST VITE MIDDLEWARE");
        console.log("POST MIDDLEWARE LOCATION", {
          importMetaUrl: import.meta.url,
          dirname: __dirname,
        });
        viteDevServer.middlewares.use(async (req, res, next) => {
          console.log("LOADING");
          const { default: script } = await viteDevServer.ssrLoadModule(
            "/src/_worker.ts"
          );
          console.log("LOADED", script);
          console.log("INIT MINIFLARE");
          // TODO: Figure out how to enable NODE_OPTIONS=--experimental-vm-modules from here
          const mf = new Miniflare({
            modules: true,
            // port: 3000,
            script,
            // scriptPath: "./src/_worker.ts",
            globalAsyncIO: true,
            globalTimers: true,
            globalRandom: true,
            wranglerConfigPath: true,
            // globals: {
            //   ping: () => console.log("pong"),
            // },
            bindings: {
              ASSETS: {
                fetch: async (input, init) => {
                  try {
                    console.log("import.meta.url", import.meta.url);
                    console.log({ input, init });
                    // TODO: Figure out how to avoid this stupid TS problem
                    const url = new URL(input?.url ?? input);
                    console.log(url);
                    const { default: data } = await import(
                      url.pathname + "?raw"
                    );
                    return new Response(data);
                  } catch (err) {
                    console.error(err);
                    return new Response(JSON.stringify(err), { status: 500 });
                  }
                },
              },
            },
            // kvNamespaces: ["TEST_NAMESPACE"],
          });
          console.log("INITIALIZED MINIFLARE");
          console.log("RUNTIME LOCATION", {
            importMetaUrl: import.meta.url,
          });
          console.log("NETWORK REQUEST FOR", req.url);
          // const { default: workerScript } = await viteDevServer.ssrLoadModule(
          //   "./src/_worker.ts"
          // );

          const url = new URL(req.url, "http://localhost:5173");
          console.log("URL", url);

          // const request = new Request(url);
          // console.log("REQUEST OBJECT", url.href);

          // const response = await mf.dispatchFetch(url.href, request);

          // console.log("RESPONSE OBJECT", response);

          // const data = await response.text();

          // res.writeHead(response.status, response.headers);
          // // res.write();
          // res.end(data);
          next();
        });
        console.log("FINISHED POST VITE MIDDLEWARE");
        console.log("END: configureServer");
      };
    },
  };
};

export default cloudflarePagesPlugin;
