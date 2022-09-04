export default ({ app: { router, store } }) => {
  const routerArray = ['category-id', 'product-id']

  router.afterEach((to, from) => {
    if (to.name && routerArray.includes(to.name)) {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', true)
    } else {
      store.commit('breadcrumbs/SET_SHOW_BREADCRUMBS', false)
    }
  })
}
