<template>
  <!-- <Product :product="product" :company="company" :swiper-config="swiperConfig" :watched-products="filteredProducts" /> -->
  <h1>Добавление товара</h1>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'ProductIdPage',
    components: {},
    layout: 'default',
    data() {
      return {}
    },
    fetch() {
      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: 'Добавление товара',
            path: `/product/add/`,
          },
        ],
      })
    },
    head() {
      return {
        title: `Добавление товара | VALE.SU`,
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
