// every index.js file inside store directory is transformed in namespace module by Nuxt

export const state = () => ({
    viewMode: "gallery",
})
  
export const mutations = {
    SET_VIEW_MODE(state, viewMode) {
        state.viewMode = viewMode
    },
}

export const actions = {
    CHANGE_VIEW_MODE(store, payload) {
        if (store.state.viewMode !== payload) {
            store.commit('SET_VIEW_MODE', payload)
        }
    },
}
  