// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    searchInput: '',
    searchQuery: '',
  }
}

export const mutations = {
  UPDATE_SEARCH_INPUT(state, payload) {
    state.searchInput = payload
  },
  UPDATE_SEARCH_QUERY(state, payload) {
    state.searchQuery = payload
  },
}

export const actions = {
  SET_SEARCH_QUERY(store, payload) {
    store.commit('UPDATE_SEARCH_INPUT', payload)
    store.commit('UPDATE_SEARCH_QUERY', payload)
  },
}
