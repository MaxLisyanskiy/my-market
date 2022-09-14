export default ($axios, error) => {
  return {
    /**
     * Get company by id
     *
     * @param {number} id company id
     * @returns {object} Object with field company
     */
    getCompanyById: async id => {
      return await $axios
        .get(`/companies/${id}`)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get all companies products with some configs
     *
     * @param {number} id company id
     * @param {number} page page number of products list (use for pagination)
     * @param {number} count number of products to display
     * @param {string} query query in the routing
     * @returns {object} Object with field products, count, pages
     */
    getCompanyProducts: async (id, page = 1, count = 20, query = null) => {
      const config = {
        params: {
          page: Number(page),
          count,
        },
      }
      if (query) {
        config.params.name = query
      }
      
      return await $axios
        .get(`/companies/${id}/products`, config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
  }
}
