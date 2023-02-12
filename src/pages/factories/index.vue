<template>
  <article class="content-row">
    <section class="home-wrapper">
      <AppSwiper :swiper-config="swiperConfig" :images="images" />
    </section>
    <HomeCompaniesSlider v-for="category in categories" :key="category.id" :category="category" />
  </article>
</template>

<script>
  import AppSwiper from '~/components/UI/AppSwiper.vue'

  import HomeCompaniesSlider from '~/components/home/HomeCompaniesSlider.vue'

  export default {
    name: 'HomePage',
    components: { HomeCompaniesSlider, AppSwiper },
    layout: 'default',

    async asyncData({ app }) {
      // Get the categories with products for the HomeProductsSlider
      // const { categories } = await app.$categoryService.getCategoriesWithProducts()

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
        images: [
          {
            id: 1,
            assets: true,
            url: 'slider/main-banner.png',
          },
          {
            id: 2,
            assets: true,
            url: 'slider/main-banner.png',
          },
          {
            id: 3,
            assets: true,
            url: 'slider/main-banner.png',
          },
        ],
        swiperConfig: {
          mainClass: 'wrapper-slider',
          wrapperClass: '',
          slidesPerView: 1,
          loop: true,
          direction: 'horizontal',
          pagination: {
            isPagination: true,
            el: '#swiperPagination',
            clickable: 'true',
          },
          btnPrevClass: 'swiper-button-prev',
          btnNextClass: 'swiper-button-next',
          addColorForActiveSlide: false,
        },
      }
    },
  }
</script>
