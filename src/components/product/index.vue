<template>
  <div>
    <article class="wrapper-product">
      <div class="card">
        <div class="product">
          <ProductImages :product="product" :company="company" :swiper-config="swiperConfig" />
          <ProductCenter :product="product" />
          <ProductRight v-if="company.name" :company="company" />
        </div>
      </div>
    </article>

    <ProductMobile :company="company" />

    <article class="product-description">
      <ProductTabs :product="product" />
      <ProductSimilar v-if="company.name" :company="company" />
      <ProductWatched v-if="watchedProducts.length > 0" :watched-products="watchedProducts" />
    </article>
  </div>
</template>

<script>
  import ProductImages from './ProductImages.vue'
  import ProductCenter from './ProductCenter.vue'
  import ProductRight from './ProductRight.vue'
  import ProductMobile from './ProductMobile.vue'
  import ProductTabs from './ProductTabs.vue'
  import ProductSimilar from './ProductSimilar.vue'
  import ProductWatched from './ProductWatched.vue'

  export default {
    name: 'Product',
    components: {
      ProductImages,
      ProductCenter,
      ProductRight,
      ProductMobile,
      ProductTabs,
      ProductSimilar,
      ProductWatched,
    },
    props: {
      product: {
        type: Object,
        default: () => {},
      },
      company: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
      watchedProducts: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style lang="scss" scoped></style>
