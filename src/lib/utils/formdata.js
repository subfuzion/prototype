import {parse} from "node:querystring";

import {streamToString} from "./stream.js";

/**
 * Parses the form data from a request and returns a map.
 * There's a bug using Astro.request.formData(). It works for local development,
 * but not deployed. It seems that locally the submitted form is urlencoded,
 * but deployed it's JSON. Checking the Content-Type header doesn't do any good,
 * however; it says application/x-www-form-urlencoded, but the encoding is json
 * nevertheless. So this brute forces parsing as JSON, with a fallback if that
 * fails, then tries parsing as urlencoded.
 *
 * @param {Request} req
 * @returns {Promise<ParsedUrlQuery|{}>}
 */
export async function formData(req) {
    const text = await streamToString(req.body);

    // Apparently always set to application/x-www-form-urlencoded
    // console.log("Content-Type:", req.headers.get("Content-Type"));

    let data;
    try {
        data = JSON.parse(text);

    // console.log("JSON parse worked");
    }
    catch {
        try {
            data = parse(text);

            // console.log("urlencoded parse worked");
        }
        catch (err) {
            console.error(`Error parsing form data: ${err.message}`, err);
            return {};
        }
    }
    return data;
}

/**
 *
 * @param {any} form
 * @param {string} key
 * @return {*|string}
 */
export function get(form, key) {
    const val = form[key];
    return val
        ? Array.isArray(val) ? val[0].toString() : val.toString()
        : val;
}
