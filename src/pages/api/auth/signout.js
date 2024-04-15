import {APIRoute} from "astro";

/** @type {APIRoute} */
export const GET = ({redirect, cookies}) => {
  cookies.delete("session", {
    path: "/",
  });
  return redirect("/signin");
};
