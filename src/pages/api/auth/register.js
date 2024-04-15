import {APIRoute} from "astro";

import {formData, get} from "../../../lib/formdata.js";
import {User, database} from "../Database.js";

/** @type {APIRoute} */
export const POST = async ({request, redirect}) => {
  /* Get form data */
  // BUG: Doesn't work when deployed, so using my custom form data parser below.
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  // const form = await formData(request);
  // const email = get(form, "email")?.toString();
  // const password = get(form, "password")?.toString();
  // const name = get(form, "name")?.toString();

  console.log(email, password, name);

  if (!email || !password || !name) {
    return new Response(
      JSON.stringify({
        error: "Missing data",
      }),
      {status: 400},
    );
  }

  /* Create user */
  try {
    // await auth.createUser({
    //   email,
    //   password,
    //   displayName: name,
    // });
    const user = new User(email, password, name);
    database.addUser(user);
  }
  catch (error) {
    console.log("register: Error creating user:", error);
    return new Response(
      JSON.stringify({
        error: "Could not create user",
      }),
      {status: 400},
    );
  }
  return redirect("/signin");
};
