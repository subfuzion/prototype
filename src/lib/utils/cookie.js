/**
 * @param {string }cookie
 * @return {*}
 */
export function parseCookies(cookie) {
    const cookies = {};
    cookie && cookie.
        split(";").
        map(str => str.trim().replace("=", "\u0000").
            split("\u0000")).
        forEach(x => cookies[x[0]] = x[1]);
    return cookies;
}
