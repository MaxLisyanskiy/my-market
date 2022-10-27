<template>
  <ProductEditor />
</template>

<script>
  import { mapMutations } from 'vuex'

  import ProductEditor from '@/components/product/ProductEditor.vue'

  export default {
    name: 'ProductIdEditPage',
    components: { ProductEditor },
    layout: 'default',
    middleware: 'auth',

    async asyncData({ app, store, params }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')
    },
    fetch() {
      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: 'Добавить товар',
            path: `/product/add/`,
          },
        ],
      })
    },
    head() {
      return {
        title: `Добавить товар | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Добавить товар | VALE.SU`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>
