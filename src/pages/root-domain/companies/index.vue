<template>
  <article class="content-row">
    <HomeWrapper />
    <HomeCompaniesSlider v-for="category in categories" :key="category.id" :category="category" />
  </article>
</template>

<script>
  // import AppSwiper from '~/components/UI/AppSwiper.vue'
  import HomeWrapper from '~/components/home/HomeWrapper.vue'
  import HomeCompaniesSlider from '~/components/home/HomeCompaniesSlider.vue'

  export default {
    name: 'HomePage',
    components: { HomeCompaniesSlider },
    layout: 'default',

    async asyncData({ app, store }) {
      store.commit('global/SET_TYPE_OF_SECTOR', 'companies')

      let categories = null
      const res = await app.$categoryService.getCategories(true)
      categories = res.categories[0].children

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
