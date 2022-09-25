<template>
  <Product :product="product" :company="company" :swiper-config="swiperConfig" :watched-products="filteredProducts" />
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

      // Get product by ID
      const { product, company } = await app.$productService.getProductById(params.id)

      // Get category by ID
      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(product.category_id)

      // Get all products
      const { products } = await app.$productService.getProducts(1, 100, null)

      return { product, company, category, products }
    },
    data() {
      return {
        product: {},
        company: {},
        products: [],
        filteredProducts: [],
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
    mounted() {
      // Get and set id in local-storage's item 'watchedProducts'
      if (localStorage.getItem('watchedProducts')) {
        const products = new Set(JSON.parse(localStorage.getItem('watchedProducts')))
        this.filteredWatchedProducts(products)
        if (!products.has(this.product.id)) {
          products.add(this.product.id)
          localStorage.setItem('watchedProducts', JSON.stringify([...products]))
        }
      } else {
        localStorage.setItem('watchedProducts', JSON.stringify([this.product.id]))
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),

      /**
       * Filtering products by ids in local-storage
       * @param {array} idsArray array with ids in local-storage
       */
      filteredWatchedProducts(idsArray) {
        const watchedProductsArray = []
        this.products.map(product => {
          if (idsArray.has(product.id)) {
            return watchedProductsArray.push(product)
          }
          return false
        })
        this.filteredProducts = watchedProductsArray
      },
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
