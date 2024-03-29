export default ($axios, error) => {
  return {
    /**
     * Get company by id
     *
     * @param {number} id company id
     * @param {boolean} include add include
     * @returns {object} Object with field company
     */
    getCompanyById: async (id, include = null) => {
      return await $axios
        .get(`v1/companies/${id}${include ? '?include=requisites' : ''}`)
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
    getCompanyProducts: async (id, page = 1, count = 20, query = null, categoryId = null) => {
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
        .get(`/companies/${id}/products`, config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Update companies information
     *
     * @param {object} id company id
     * @param {object} body companies information
     * @returns {object} Object with field products, count, pages
     */
    updateCompany: async (id, body) => {
      return await $axios
        .post(`v1/companies/${id}`, body)
        .then(res => {
          if (res.data.status !== 'success') {
            return [false, 'Произошла ошибка, попробуйте позже']
          }
          return [true]
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get companies by category id
     *
     * @param {number} id category id
     * @param {number} page page number of companies list (use for infinity-pagination)
     * @param {number} count number of products to display
     * @returns {object} Object with companies
     */
    getCompanisByCategoryId: async (id, page = 1, count = 10) => {
      const config = {
        params: {
          category_id: id,
          include: 'products',
          page: Number(page),
          count,
        },
      }
      return await $axios
        .get(`/companies`, config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get companies by search
     *
     * @param {number} name search
     * @returns {object} Object with companies
     */
    getCompanisByName: async name => {
      return await $axios
        .get(`/companies?name=${name}&include=products`)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
  }
}
