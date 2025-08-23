import { superValidate, fail, message } from "sveltekit-superforms";
import type { PageServerLoad } from "../../[auth]/login/$types.js";
import { zod } from "sveltekit-superforms/adapters";
import { loginFormSchema } from "./loginFormSchema.js";
import { auth } from "$lib/auth.js";

export const load: PageServerLoad = async () => {
  const loginForm = await superValidate(zod(loginFormSchema));

  return {
    loginForm
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(loginFormSchema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    try {
      const data = await auth.api.signInEmail({
        body: {
          ...form.data,
          rememberMe: true
        },
        // This endpoint requires session cookies.
        headers: request.headers
      });
    } catch (err) {
      return message(form, "Invalid credentials", {
        status: 400
      });
    }

    return { form };
  }
};
