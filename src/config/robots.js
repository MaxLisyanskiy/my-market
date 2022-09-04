// robot.txt settings
// https://www.npmjs.com/package/@nuxtjs/robots

const robots = [
  {
    userAgent: '*',
    disallow: '*',
  },
  {
    userAgent: '*',
    allow: '/$',
  },
  {
    userAgent: '*',
    allow: '/category/',
  },
  {
    userAgent: '*',
    allow: '/product/',
  },
  {
    userAgent: '*',
    allow: '/profile/',
  },
  {
    sitemap: `${process.env.ORIGIN_URL}/sitemap.xml`,
  },
]

export default robots
