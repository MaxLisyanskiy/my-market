// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: '', path: '' },
    ],
  }
}

export const mutations = {
  SET_BREADCRUMBS(state, payload) {
    state.breadcrumbs = payload
  },
}
