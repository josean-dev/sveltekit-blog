import type { LayoutLoad } from "./$types";

// get url path whenever visiting a new page
export const load: LayoutLoad = ({ url }) => {
  return {
    pathname: url.pathname
  };
};
