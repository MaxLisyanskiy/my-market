<template>
  <article class="home content-row">
    <section class="wrapper">
      <HomeCategories />
      <HomeSwiper />
    </section>
    <HomeProductsSlider />
    <HomeProducts />
  </article>
</template>

<script>
  import HomeCategories from '~/components/home/HomeCategories.vue'
  import HomeSwiper from '~/components/home/HomeSwiper.vue'
  import HomeProductsSlider from '~/components/home/HomeProductsSlider.vue'
  import HomeProducts from '~/components/home/HomeProducts.vue'
  export default {
    name: 'HomePage',
    components: {
      HomeCategories,
      HomeSwiper,
      HomeProductsSlider,
      HomeProducts,
    },
    layout: 'default',
  }
</script>
