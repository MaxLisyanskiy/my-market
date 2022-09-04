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
  }
}
