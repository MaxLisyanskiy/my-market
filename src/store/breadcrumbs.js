// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    showBreadcrumbs: false,
    breadcrumbsLinks: [
      { name: 'Главная', path: '/' },
      { name: '', path: '' },
    ],
  }
}

export const mutations = {
  SET_BREADCRUMBS(state, { showBreadcrumbs, breadcrumbsLinks }) {
    state.showBreadcrumbs = showBreadcrumbs
    state.breadcrumbsLinks = breadcrumbsLinks
  },
}
