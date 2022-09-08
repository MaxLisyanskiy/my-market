<template>
  <article class="content-row">
    <section class="wrapper">
      <HomeCategories />
      <HomeSwiper />
    </section>
    <HomeProductsSlider v-for="category in categories" :key="category.id" :category="category" />
    <!-- <HomeProducts /> -->
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
      // HomeProducts,
    },
    layout: 'default',

    async asyncData({ app }) {
      // Get the categories with products for the HomeProductsSlider
      const { categories } = await app.$categoryService.getCategoriesWithProducts()
      return { categories }
    },
    data() {
      return {
        categories: [],
      }
    },
  }
</script>
