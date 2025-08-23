import { superValidate, fail, message } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types.js";
import { zod } from "sveltekit-superforms/adapters";
import { signupFormSchema } from "./signupFormSchema.js";
import { auth } from "$lib/auth.js";

export const load: PageServerLoad = async () => {
  const signupForm = await superValidate(zod(signupFormSchema));

  return {
    signupForm
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(signupFormSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const data = await auth.api.signUpEmail({
        body: {
          name: form.data.name,
          email: form.data.email,
          password: form.data.password
        },
        headers: request.headers
      });
    } catch (err) {
      console.log(err);
      return message(form, "Registration failed", {
        status: 400
      });
    }

    return { form };
  }
};
