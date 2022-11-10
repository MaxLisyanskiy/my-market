export default ($axios, error) => {
  return {
    /**
     * Post email to reset profile password
     *
     * @param {string} email company id
     * @returns {object} Object with field company
     */
    postPasswordForgot: async email => {
      return await $axios.post('/password/forgot', email).then(({ data }) => {
        return data
      })
    },

    /**
     * Post code to reset profile password
     *
     * @param {string} code company id
     * @returns {object} Object with field status and token
     */
    postPasswordEnterCode: async code => {
      return await $axios.post('/password/enter_code', code).then(({ data }) => {
        return data
      })
    },

    /**
     * Post token and new passwords to reset profile password
     *
     * @param {object} newPasswordConfig Payload object with token and new passwords
     * @returns {object} Object with field products, count, pages
     */
    postPasswordNewPassword: async newPasswordConfig => {
      return await $axios.post('/password/reset', newPasswordConfig).then(({ data }) => {
        return data
      })
    },

    /**
     * Signup
     *
     * @param {object} body company id
     * @returns {object} Object with field status and token
     */
    signup: async body => {
      return await $axios.post('/signup', body).then(({ data }) => {
        return data
      })
    },
  }
}
