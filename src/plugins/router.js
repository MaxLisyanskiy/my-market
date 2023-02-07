export default ({ app: { router, store } }) => {
  // Get all categories
  router.beforeEach((to, from, next) => {
    if (store.state.categories.categories.length === 0) {
      store.dispatch('categories/GET_CATEGORIES').then(() => next())
    }
    next()
  })

  // Check router-path and changed breadcrumbs
  const routerArray = [
    'category-id',
    'companies-category-id',
    'search-query',
    'product-id',
    'product-id-edit',
    'product-add',
  ]
  router.afterEach((to, from) => {
    if (from.name && store.state.global.firstPageVisit) {
      store.commit('global/SET_FIRST_PAGE_VISIT', false)
    }
    if (to.name && routerArray.includes(to.name)) {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', true)
    } else {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', false)
    }
  })
}
