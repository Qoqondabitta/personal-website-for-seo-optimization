/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://abdulakhadturgunaliev.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
