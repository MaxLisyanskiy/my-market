export default ($axios, error) => {
  return {
    /**
     * Get company by domain
     *
     * @param {string} domain company domain
     * @param {boolean} include add include
     * @returns {object} Object with field company
     */
    getCompanyByDomain: async (domain, include = null) => {
      return await $axios
        .get(`companies/${domain}${include ? '?include=requisites' : ''}`)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get all domain-company products with some configs
     *
     * @param {string} domain company domain
     * @param {number} page page number of products list (use for pagination)
     * @param {number} count number of products to display
     * @param {string} query query in the routing
     * @returns {object} Object with field products, count, pages
     */
    getCompanyDomainProducts: async (domain, page = 1, count = 20, query = null, categoryId = null) => {
      const config = {
        params: {
          page: Number(page),
          count,
        },
      }
      if (query) {
        config.params.name = query
      }
      if (categoryId) {
        config.params.category_id = categoryId
      }

      return await $axios
        .get(`/companies/${domain}/products`, config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
  }
}
