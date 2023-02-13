<template>
  <article class="content-row">
    <HomeWrapper />
    <HomeProductsSlider v-for="category in categories" :key="category.id" :category="category" />
    <!-- <HomeProducts /> -->
  </article>
</template>

<script>
  import HomeCategories from '~/components/home/HomeCategories.vue'
  import HomeProductsSlider from '~/components/home/HomeProductsSlider.vue'
  import HomeWrapper from '~/components/home/HomeWrapper.vue'
  import HomeProducts from '~/components/home/HomeProducts.vue'

  export default {
    name: 'HomePage',
    components: { HomeWrapper, HomeProductsSlider },
    layout: 'default',

    async asyncData({ app }) {
      // Get the categories with products for the HomeProductsSlider
      const { categories } = await app.$categoryService.getCategoriesWithProducts()

      // Add color for categories
      const colorArray = ['#F2F2D2', '#F2D2EF', '#F2D2D2', '#D2F2EA', '#D2D9F2', '#DAF2D2', '#F2DED2', '#A6D8D4']
      categories.map((item, index) => (item.color = colorArray[index]))

      return { categories }
    },
    data() {
      return {
        categories: [],
      }
    },
  }
</script>
