/**
 *
 * @type {ReadableStream}.import("node:stream/web")
 * @param {ReadableStream} stream
 * @return {Promise<string>}
 */
export async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}
