import type { MarkdownPostMetadataAndSlug } from "../types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  // get posts from api with sveltekit special fetch
  const response = await fetch("/api/posts");

  // get posts from response
  const posts: MarkdownPostMetadataAndSlug[] = await response.json();

  return {
    posts
  };
};
