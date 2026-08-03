/** Marketing/indexable routes that receive a page screenshot OG image (1200×1200). */

export const STATIC_OG_ROUTES = [
  '/',
  '/about-us',
  '/blog',
  '/case-studies',
  '/case-studies/power-platform',
  '/case-studies/sharepoint',
  '/case-studies/web',
  '/case-studies/mobile',
  '/case-studies/data-analytics',
  '/contact',
  '/careers',
  '/services',
  '/services/mvp',
  '/services/ai-powered-test-automation',
  '/services/legacy-application-modernization',
  '/services/offshore-ai-development',
  '/services/offshore-data-analytics',
  '/services/generative-ai',
  '/services/offshore-microsoft-fabric',
  '/services/offshore-mobile-app-development',
  '/services/offshore-power-platform-development',
  '/services/offshore-sharepoint-development',
  '/services/offshore-spfx-development',
  '/services/offshore-web-app-development',
  '/privacy-policy',
  '/terms',
  '/book-meeting',
  '/engineering-solutions',
  '/avoora',
]

export function routeToOgFilename(route) {
  if (!route || route === '/') return 'home'
  return route.replace(/^\//, '').replace(/\//g, '--')
}

export function ogFilePath(route) {
  return `/og/pages/${routeToOgFilename(route)}.png`
}
