// robot.txt settings
// https://www.npmjs.com/package/@nuxtjs/robots

const robots = [
  { UserAgent: '*' },
  { Disallow: '*' },
  { Allow: '/$' },
  { Allow: '/company/*' },
  { Disallow: '/company/*/settings/' },
  { Allow: '/product/*' },
  { Disallow: '/product/add' },
  { Disallow: '/product/*/edit' },
  { Allow: '/category/*' },
  {
    sitemap: `${process.env.ORIGIN_URL}/sitemap.xml`,
  },
]

export default robots
