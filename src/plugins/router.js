export default ({ app: { router, store } }) => {

  // Get all categories
  router.beforeEach((to, from, next) => {
    if (store.state.categories.categories.length === 0) {
      store.dispatch('categories/GET_CATEGORIES').then(() => next())
    } 
    next()
  })

  // Check router-path and changed breadcrumbs
  const routerArray = ['category-id', 'product-id']
  router.afterEach((to, from) => {
    if (to.name && routerArray.includes(to.name)) {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', true)
    } else {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', false)
    }
  })
}
