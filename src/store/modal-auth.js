// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    showModalAuth: false,
    windowToShow: 'login',
  }
}

export const mutations = {
  SET_SHOW_MODAL_AUTH(state, payload) {
    state.showModalAuth = payload
  },
  SET_WINDOW_TO_SHOW(state, payload) {
    state.windowToShow = payload
  },
}
