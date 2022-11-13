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
            hid: 'title',
            name: 'title',
            title: `Добавить товар | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку.`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            title: `Добавить товар | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку.`,
          },
          {
            hid: 'og:image',
            itemprop: 'image',
            property: 'og:image',
            content: ``,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            title: `Добавить товар | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку.`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: ``,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>
