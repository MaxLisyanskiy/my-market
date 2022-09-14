// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
    return {
      companySearchInput: '',
      companySearchQuery: '',
    }
}
  
export const mutations = {
    UPDATE_COMPANY_SEARCH_INPUT(state, payload) {
      state.companySearchInput = payload
    },
    UPDATE_COMPANY_SEARCH_QUERY(state, payload) {
      state.companySearchQuery = payload
    }
}
  
export const actions = {
    SET_COMPANY_SEARCH_QUERY(store, payload) {
      store.commit('UPDATE_COMPANY_SEARCH_INPUT', payload)
      store.commit('UPDATE_COMPANY_SEARCH_QUERY', payload)
    },
}
  