export default ($axios, error) => {
  return {
    /**
     * Get all products with some configs
     *
     * @param {number} page page number of products list (use for pagination)
     * @param {number} count number of products to display
     * @param {string} query query in the routing
     * @returns {object} Object with field products, count, pages
     */
    getProducts: async (page = 1, count = 20, query = null) => {
      const config = {
        params: {
          page: Number(page),
          count,
          name: query,
        },
      }

      return await $axios
        .get('/products/', config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get product by id
     *
     * @param {number} id product id
     * @returns {object} Object with field products, count, pages
     */
    getProductById: async id => {
      return await $axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
  }
}
