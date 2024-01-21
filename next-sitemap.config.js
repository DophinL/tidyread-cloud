/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tidyread.info',
  generateRobotsTxt: true,
  changefreq: 'daily',
  additionalPaths: async (config) => [{
      loc: '/',
      priority: 1,
      changefreq: 'daily',
      lastmod: new Date().toISOString()
  }]
}