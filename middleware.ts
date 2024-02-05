import { locales } from "nextra/locales";

function startsWithAnyOf(str, prefixes) {
  return prefixes.some((prefix) => str.startsWith(prefix));
}

export const middleware = (request) => {
  const { nextUrl } = request;

  if (startsWithAnyOf(nextUrl.pathname, ["/read", "/dl"])) {
    return;
  }

  return locales(request);
};
