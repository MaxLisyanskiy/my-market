<template>
  <section class="product-left">
    <img v-lazy="mainImg" :alt="product.name" class="product-left__img" />
    <AppSwiper
      v-if="product.images.length > 1"
      :swiper-config="swiperConfig"
      :images="product.images"
      :click-handler="handleSetMainImg"
    />
  </section>
</template>

<script>
  import AppSwiper from '../UI/AppSwiper.vue'

  export default {
    name: 'ProductImages',
    components: { AppSwiper },
    props: {
      product: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        indexImg: 0,
      }
    },
    computed: {
      mainImg() {
        return this.product?.images?.[this.indexImg]?.url
      },
    },
    methods: {
      /**
       * Get image index in Swiper and set new main image
       * @param {number} index image index in swiper
       */
      handleSetMainImg(index) {
        this.indexImg = index
      },
    },
  }
</script>
