// An infinite scroll plugin for Vue.js
// https://peachscript.github.io/vue-infinite-loading/

import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  system: {
    throttleLimit: 300,
  },
  slots: {
    noMore: '',
    noResults: '',
    error: 'Проблема при загрузке товаров',
  },
})

Vue.component('InfiniteLoading', InfiniteLoading)
