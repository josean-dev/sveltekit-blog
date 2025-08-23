import { auth } from "$lib/auth";
import type { PageServerLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ request }) => {
  // Get current user session
  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (!session) {
    // Redirect to login if not authenticated
    throw redirect(302, "/login");
  }

  return {
    user: session.user
  };
};
