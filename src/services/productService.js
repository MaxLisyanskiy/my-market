export default ($axios, error) => {
  return {
    /**
     * Get all products with some configs
     *
     * @param {number} page page number of products list (use for pagination)
     * @param {number} count number of products to display
     * @param {string} query query in the routing
     * @returns {array} Array with field products, count, pages
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
        .get('/products', config)
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
          return error({ statusCode: 404 })
        })
    },

    /**
     * Update product
     *
     * @param {number} id product id
     * @param {object} body payload
     * @returns {object} Object with field products, count, pages
     */
    updateProduct: async (id, body) => {
      return await $axios
        .post(`/products/${id}`, body)
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
     * Add product
     *
     * @param {object} body payload
     * @returns {object} Object with field products, count, pages
     */
    addProduct: async body => {
      return await $axios
        .post(`/products`, body)
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
     * Delete product
     *
     * @param {number} id payload
     * @returns {object} Object with field products, count, pages
     */
    deleteProduct: async id => {
      return await $axios
        .delete(`/products/${id}`)
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
  }
}
