export default ($axios, error) => {
  return {
    /**
     * Get products of a category with some configs
     *
     * @param {number} id Router params id.
     * @param {number} page page number of products list (use for pagination)
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
  }
}
