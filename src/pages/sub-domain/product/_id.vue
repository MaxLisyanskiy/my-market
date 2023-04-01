<template>
  <div>
    <div class="header-product sticky">
      <div class="header-product__block active">
        <nuxt-link class="header-block header-product__back" to="/">
          <HeaderBackSvg class="header-back__img" />
        </nuxt-link>
        <div class="header-product__share" @click="handleShareMob">
          <HeaderShareSvg class="header-product__share-icon" />
        </div>
      </div>
    </div>
    <ProductDomain
      :product="product"
      :company="company"
      :swiper-config="swiperConfig"
      :watched-products="filteredProducts"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import ProductDomain from '@/components/productDomain/index.vue'

  import HeaderShareSvg from '@/assets/img/icons/svg/header-share.svg?inline'
  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'

  export default {
    name: 'ProductIdPage',
    components: {
      ProductDomain,
      HeaderShareSvg,
      HeaderBackSvg,
    },
    layout: 'subDomainProduct',

    async asyncData({ app, store, params, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get product by ID
      const { product, company } = await app.$productService.getProductById(params.id)
      let category = ''

      // Get category by ID
      if (product) {
        const res = await app.$categoryService.getProductsCategoryById(product.category_id)
        category = res.category
        const { products } = await app.$productService.getProducts(1, 100, null)
        return { product, company, category, products }
      } else {
        error({ statusCode: 404 })
      }

      // Get all products
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
          spaceBetween: 9,
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
            0: {
              slidesPerView: 1,
              loop: true,
              spaceBetween: 0,
            },
            670: {
              loop: false,
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
            hid: 'title',
            name: 'title',
            content: `${this.product.name} | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.description}`,
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: `${this.product.name} | VALE.SU`,
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: `${this.product.description}`,
          },
          {
            hid: 'og:image',
            property: 'og:image',
            itemprop: 'image',
            content: `${this.product.images[0]?.url}`,
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: '256',
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: '256',
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            title: `${this.product.name} | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `${this.product.description}`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            itemprop: 'image',
            content: `${this.product.images[0]?.url}`,
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

      handleShareMob() {
        if (navigator.share) {
          navigator.share({
            title: `${this.product?.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`,
            text: '',
            url: window.location.href,
          })
        }
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
