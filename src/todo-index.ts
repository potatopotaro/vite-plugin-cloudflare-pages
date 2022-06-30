import fs from "node:fs";
import type { Plugin, ViteDevServer } from "vite";
// import { createFilter } from "vite";
/* eslint-enable import/no-duplicates */
// import { resolveCompiler } from "./compiler";
import { parseVueRequest } from "./utils/query";
// import { getDescriptor, getSrcDescriptor } from "./utils/descriptorCache";
import { getResolvedScript } from "./script";
// import { transformMain } from "./main";
// import { handleHotUpdate } from "./handleHotUpdate";
// import { transformTemplateAsModule } from "./template";
// import { transformStyle } from "./style";
import { EXPORT_HELPER_ID, helperCode } from "./helper";

export { parseVueRequest } from "./utils/query";
export type { VueQuery } from "./utils/query";

export interface Options {
  /* TODO? */
}

export interface ResolvedOptions extends Options {
  /* TODO? */
}

export default function cloudflarePagesPlugin(
  rawOptions: Options = {}
): Plugin {
  // const {

  // } = rawOptions;

  // const filter = createFilter(include, exclude);

  let options: ResolvedOptions = {
    /* TODO? */
  };

  return {
    name: "vite-plugin-cloudflare-pages",

    // TODO?
    // handleHotUpdate(ctx) {
    //   if (!filter(ctx.file)) {
    //     return;
    //   }
    //   return handleHotUpdate(ctx, options);
    // },

    config(config) {
      return {
        // TODO?
        // define: {
        //   __VUE_OPTIONS_API__: config.define?.__VUE_OPTIONS_API__ ?? true,
        //   __VUE_PROD_DEVTOOLS__: config.define?.__VUE_PROD_DEVTOOLS__ ?? false,
        // },
        //
        // TODO?
        // ssr: {
        //   external: ["vue", "@vue/server-renderer"],
        // },
      };
    },

    // TODO?
    // configResolved(config) {
    //   options = {
    //     ...options,
    //     // ...
    //   };
    // },

    // TODO?
    // configureServer(server) {
    //   // options.devServer = server;
    // },

    // TODO?
    // async resolveId(id) {
    //   // component export helper
    //   if (id === EXPORT_HELPER_ID) {
    //     return id;
    //   }
    //   // serve sub-part requests (*?vue) as virtual modules
    //   if (parseVueRequest(id).query.vue) {
    //     return id;
    //   }
    // },

    // TODO?
    // load(id, opt) {
    //   const ssr = opt?.ssr === true;
    //   if (id === EXPORT_HELPER_ID) {
    //     return helperCode;
    //   }

    //   const { filename, query } = parseVueRequest(id);
    //   // select corresponding block for sub-part virtual modules
    //   if (query.vue) {
    //     if (query.src) {
    //       return fs.readFileSync(filename, "utf-8");
    //     }
    //     const descriptor = getDescriptor(filename, options)!;
    //     let block: SFCBlock | null | undefined;
    //     if (query.type === "script") {
    //       // handle <scrip> + <script setup> merge via compileScript()
    //       block = getResolvedScript(descriptor, ssr);
    //     } else if (query.type === "template") {
    //       block = descriptor.template!;
    //     } else if (query.type === "style") {
    //       block = descriptor.styles[query.index!];
    //     } else if (query.index != null) {
    //       block = descriptor.customBlocks[query.index];
    //     }
    //     if (block) {
    //       return {
    //         code: block.content,
    //         map: block.map as any,
    //       };
    //     }
    //   }
    // },

    // TODO?
    // transform(code, id, opt) {
    //   const ssr = opt?.ssr === true;
    //   const { filename, query } = parseVueRequest(id);
    //   if (query.raw) {
    //     return;
    //   }
    //   if (!filter(filename) && !query.vue) {
    //     if (
    //       !query.vue &&
    //       refTransformFilter(filename) &&
    //       options.compiler.shouldTransformRef(code)
    //     ) {
    //       return options.compiler.transformRef(code, {
    //         filename,
    //         sourceMap: true,
    //       });
    //     }
    //     return;
    //   }

    //   if (!query.vue) {
    //     // main request
    //     return transformMain(
    //       code,
    //       filename,
    //       options,
    //       this,
    //       ssr,
    //       customElementFilter(filename)
    //     );
    //   } else {
    //     // sub block request
    //     const descriptor = query.src
    //       ? getSrcDescriptor(filename, query)!
    //       : getDescriptor(filename, options)!;

    //     if (query.type === "template") {
    //       return transformTemplateAsModule(
    //         code,
    //         descriptor,
    //         options,
    //         this,
    //         ssr
    //       );
    //     } else if (query.type === "style") {
    //       return transformStyle(
    //         code,
    //         descriptor,
    //         Number(query.index),
    //         options,
    //         this,
    //         filename
    //       );
    //     }
    //   }
    // },
  };
}
