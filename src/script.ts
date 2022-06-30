// import { resolveTemplateCompilerOptions } from "./template";
import type { ResolvedOptions } from "./todo-index";

// ssr and non ssr builds would output different script content
const clientCache = new WeakMap();
const ssrCache = new WeakMap();

export function getResolvedScript() {}

export function setResolvedScript() {}

export function isUseInlineTemplate() {}

export function resolveScript() {}
