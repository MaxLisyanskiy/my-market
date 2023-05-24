export default ($axios, error) => {
  return {
    /**
     * Get all categories
     *
     * @param {boolean} empty boolean value
     * @returns {object} Object with field products, pages
     */
    getCategories: async empty => {
      return await $axios
        .get(`/categories?empty=${empty}`)
        .then(({ data }) => {
          return data.data
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
    /**
     * Get products of a category with some configs
     *
     * @param {number} id Router params id.
     * @param {number} page page number of categories list (use for infinity-pagination)
     * @param {number} count number of products to display
     * @returns {object} Object with field products, pages
     */
    getProductsCategory: async (id, page = 1, count = 20) => {
      const config = {
        params: {
          page: Number(page),
          count,
        },
      }
      return await $axios
        .get(`/categories/${id}/products`, config)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },

    /**
     * Get categories by id
     *
     * @returns {object} Object with field products, pages
     */
    getProductsCategoryById: async id => {
      return await $axios
        .get(`/categories/${id}`)
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 404 })
        })
    },

    /**
     * Get products of a category with some configs
     *
     * @returns {array} Array with category objects
     */
    getCategoriesWithProducts: async () => {
      return await $axios
        .get('/categories/products')
        .then(({ data }) => {
          return { ...data.data }
        })
        .catch(() => {
          return error({ statusCode: 500 })
        })
    },
  }
}
