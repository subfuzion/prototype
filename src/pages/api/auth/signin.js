import {APIRoute} from "astro";

// import {getAuth} from "firebase-admin/auth";
//
// import {app} from "../../../firebase/server";

/** @type {APIRoute} */
export const GET = async ({request, cookies, redirect}) => {
  // const auth = getAuth(app);

  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      JSON.stringify({
        error: "No token found",
      }),
      {status: 401},
    );
  }

  // const decodedToken = await auth.verifyIdToken(idToken).catch(() => null);
  //
  // if (!decodedToken) {
  //   return new Response(
  //       JSON.stringify({
  //         error: "Invalid token",
  //       }),
  //       {status: 401}
  //   );
  // }

  const fiveDays = 60 * 60 * 24 * 5 * 1000;

  let sessionCookie = "";

  try {
    // sessionCookie = await auth.createSessionCookie(idToken, {
    //   expiresIn: fiveDays,
    // });
    // cookies.set("session", sessionCookie, {
    //   path: "/",
    // });

    return redirect("/");
  }
  catch (e) {
    console.error("signin:", e.message, e);
    return new Response(
      JSON.stringify({
        error: e.message,
      }),
      {status: 401},
    );
  }
};
