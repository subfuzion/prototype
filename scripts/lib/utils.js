import {argv} from "node:process";

/**
 * Get the name of the current process.
 * @return {string}
 */
export function processName() {
  return argv[1].split('/').pop();
}
