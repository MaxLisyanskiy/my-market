// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    showBreadcrumbs: false,
    breadcrumbsLinks: [
      { name: 'Главная', path: '/' },
      { name: '...', path: '/' },
    ],
  }
}

export const mutations = {
  SET_BREADCRUMBS(state, { breadcrumbsLinks }) {
    state.breadcrumbsLinks = breadcrumbsLinks
  },
  SET_SHOW_BREADCRUMBS(state, payload) {
    state.showBreadcrumbs = payload
  },
}
