import { locales } from 'nextra/locales'

export const middleware = request => {
  const { nextUrl } = request

  if (nextUrl.pathname.startsWith('/read')) {
    return
  }

  return locales(request)
}