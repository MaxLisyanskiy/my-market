<template>
  <Product :product="product" :company="company" :swiper-config="swiperConfig" />
</template>

<script>
  import { mapMutations } from 'vuex'

  import Product from '@/components/product/index.vue'

  export default {
    name: 'ProductIdPage',
    components: { Product },
    layout: 'default',
    async asyncData({ app, store, params }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      const { product, company } = await app.$productService.getProductById(params.id)

      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(product.category_id)

      return { product, company, category }
    },
    data() {
      return {
        product: {},
        company: {},
        swiperConfig: {
          mainClass: 'product-swiper',
          wrapperClass: 'product-slider',
          slidesPerView: 5,
          loop: false,
          direction: 'horizontal',
          autoplay: false,
          pagination: {
            isPagination: true,
            el: '.product-swiper__pagination',
            paginationClass: 'product-swiper__pagination',
            type: 'fraction',
          },
          btnPrevClass: 'product-swiper__button-prev',
          btnNextClass: 'product-swiper__button-next',
          addColorForActiveSlide: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
              loop: true,
              spaceBetween: 0,
            },
            870: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 5,
            },
          },
        },
      }
    },
    fetch() {
      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: `${this.category.name}`,
            path: `/category/${this.category.id}`,
          },
          {
            name: `${this.product.name}`,
            path: `/product/${this.product.id}`,
          },
        ],
      })
    },
    head() {
      return {
        title: `${this.product.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.name} - оптом от завода. По низким ценам с доставкой`,
          },
        ],
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
