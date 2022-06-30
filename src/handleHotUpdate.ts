import _debug from "debug";
import type { HmrContext, ModuleNode } from "vite";
// import {
//   createDescriptor,
//   getDescriptor,
//   setPrevDescriptor,
// } from "./utils/descriptorCache";
import { getResolvedScript, setResolvedScript } from "./script";
import type { ResolvedOptions } from ".";

const debug = _debug("vite:hmr");

const directRequestRE = /(\?|&)direct\b/;

/**
 * Vite-specific HMR handling
 */
export async function handleHotUpdate(
  { file, modules, read, server }: HmrContext,
  options: ResolvedOptions
): Promise<ModuleNode[] | void> {}

export function isEqualBlock() {}

export function isOnlyTemplateChanged() {}
