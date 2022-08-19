<template>
  <section class="home content-row">
    <div class="wrapper">
      <HomeCategories />
      <HomeSwiper />
    </div>
    <HomeProductsSlider />
    <HomeProducts />
  </section>
</template>

<script>
  import HomeCategories from '~/components/home/HomeCategories.vue'
  import HomeSwiper from '~/components/home/HomeSwiper.vue'
  import HomeProductsSlider from '~/components/home/HomeProductsSlider.vue'
  import HomeProducts from '~/components/home/HomeProducts.vue'
  export default {
    name: 'HomePage',
    components: { HomeCategories, HomeSwiper, HomeProductsSlider, HomeProducts },
  }
</script>
