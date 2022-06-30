// import { render } from "virtual:server-entry";
import { render } from "./ssr";

// expect an ASSETS fetcher binding pointing to the asset-server stage
export interface Env {
  [name: string]: { fetch: typeof fetch };
  ASSETS: { fetch: typeof fetch };
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const fetchHandler: ExportedHandlerFetchHandler<Env> = async function (
  req,
  env,
  ctx
) {
  // TODO: Figure out a better way to integrate env.ASSETS
  if (import.meta.env.DEV) {
    if (!env.ASSETS) {
      env.ASSETS = {
        fetch: async (input, init) => {
          try {
            console.log("import.meta.url", import.meta.url);
            console.log({ input, init });
            // TODO: Figure out how to avoid this stupid TS problem
            const url = new URL(input?.url ?? input);
            console.log(url);
            const { default: data } = await import(url.pathname + "?raw");
            return new Response(data);
          } catch (err) {
            console.error(err);
            return new Response(JSON.stringify(err), { status: 500 });
          }
        },
      };
    }
  }
  const manifest = {};

  console.log("worker received request for", req.url);

  console.log(env.KEY1);
  ctx.waitUntil(Promise.resolve(1));
  ctx.waitUntil(Promise.resolve("2"));

  // return new Response("test");

  ctx.waitUntil(
    new Promise((resolve, reject) => {
      setTimeout(resolve, 10000);
    })
  );

  const currCount = await env.KEY_VALUE_STORE.get("count");
  console.log("currCount", currCount);
  if (!currCount) await env.KEY_VALUE_STORE.put("count", "1");
  else
    await env.KEY_VALUE_STORE.put(
      "count",
      (parseInt(currCount) + 1).toString()
    );
  const newCount = await env.KEY_VALUE_STORE.get("count");
  console.log("newCount", newCount);

  if (req.url === "/" || req.url === "index.html") {
    console.log("Serving index.html");
    const template = await env.ASSETS.fetch(req);
    // const { default: template } = await import("./index.html?raw");
    console.log(template);
    const [appHtml, preloadLinks] = await render(req.originalUrl, manifest);
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml);
    console.log("Serving index.html");
    console.log({ template, html, appHtml });
    return html;
  }

  // const [appHtml, preloadLinks] = await render(req.originalUrl, manifest);

  // const html = template
  //   .replace(`<!--preload-links-->`, preloadLinks)
  //   .replace(`<!--app-html-->`, appHtml);

  // console.log({ template, html, appHtml });

  console.log("Fetching asset...");
  return await env.ASSETS.fetch(req);
  // return new Response(html);
};

// function createWorker() {
// if (import.meta.env.DEV) {
//   // fetch = function (req, env, ctx) {
//   //   return fetch(req, env, ctx);
//   // };
//   // worker.fetch.bind(worker);
//   // worker.fetch = new Proxy(worker.fetch, {
//   //   apply: (target, thisArg, argumentsList) => {
//   //     console.log("called: " + argumentsList.join(", "));
//   //     const req: Request = argumentsList[0];
//   //     const env: Env = argumentsList[1];
//   //     const ctx: ExecutionContext = argumentsList[2];
//   //     return target.apply(thisArg, [
//   //       req,
//   //       {
//   //         ...env,
//   //         ASSETS: {
//   //           fetch: async function (input, init) {
//   //             try {
//   //               // TODO: Figure out how to avoid this stupid TS problem
//   //               const url = input?.url ?? input;
//   //               const { default: data } = await import(url + "?raw");
//   //               return new Response(data);
//   //             } catch (err) {
//   //               console.error(err);
//   //               return new Response(JSON.stringify(err), { status: 500 });
//   //             }
//   //           },
//   //         },
//   //       },
//   //       ctx,
//   //     ]);
//   //   },
//   // });
// }
// }

export default {
  fetch: fetchHandler,
};
