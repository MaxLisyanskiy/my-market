// every index.js file inside store directory is transformed in namespace module by Nuxt

export const state = () => ({
  categories: [],
  sidebarCategories: [{ name: 'Категория' }],
})

export const getters = {
  GET_CATEGORY_BY_ID: state => id => {
    const category = state.categories.filter(c => Number(c.id) === Number(id))
    return category[0]
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_SIDEBAR_CATEGORIES(state, categories) {
    state.sidebarCategories = categories
  },
}

export const actions = {
  GET_CATEGORIES(store) {
    if (store.state.categories.length === 0) {
      this.$categoryService
        .getCategories(false)
        .then(data => store.commit('SET_CATEGORIES', data.categories))
        .catch(() => store.commit('SET_CATEGORIES', []))
    }
  },
}
