// sitemap.xml settings
// https://sitemap.nuxtjs.org

const axios = require('axios')

const get = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/sitemap`)
  if (data.status !== 'success') return []

  const { categories, companies, products } = data.data
  const map = []

  map.push(...categories.map(id => `/category/${id}`))
  map.push(...companies.map(id => `/profile/${id}`))
  map.push(...products.map(id => `/product/${id}`))

  return map
}

const sitemap = {
  hostname: process.env.ORIGIN_URL,
  gzip: false,
  exclude: ['/login', '/signup', '/forget', '/forget/*', '/profile', '/profile/settings', '/product/add'],
  routes: async () => await get(),
}

export default sitemap
