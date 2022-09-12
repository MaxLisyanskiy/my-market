<template>
  <article class="content-row">
    <section class="home-wrapper">
      <HomeCategories />
      <AppSwiper :swiper-config="swiperConfig" :images="images" />
    </section>
    <HomeProductsSlider v-for="category in categories" :key="category.id" :category="category" />
    <!-- <HomeProducts /> -->
  </article>
</template>

<script>
  import AppSwiper from '~/components/UI/AppSwiper.vue'

  import HomeCategories from '~/components/home/HomeCategories.vue'
  import HomeProductsSlider from '~/components/home/HomeProductsSlider.vue'
  import HomeProducts from '~/components/home/HomeProducts.vue'

  export default {
    name: 'HomePage',
    components: { HomeCategories, HomeProductsSlider, AppSwiper },
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
        images: [
          {
            id: 1,
            url: 'https://test-api.factories-market.com/images/2vdQmNuIwInTq7lNsEPyG8ra999QFUGoycGAs3Gu.webp',
          },
          {
            id: 2,
            url: 'https://test-api.factories-market.com/images/2vdQmNuIwInTq7lNsEPyG8ra999QFUGoycGAs3Gu.webp',
          },
          {
            id: 3,
            url: 'https://test-api.factories-market.com/images/2vdQmNuIwInTq7lNsEPyG8ra999QFUGoycGAs3Gu.webp',
          },
          {
            id: 4,
            url: 'https://test-api.factories-market.com/images/2vdQmNuIwInTq7lNsEPyG8ra999QFUGoycGAs3Gu.webp',
          },
          {
            id: 5,
            url: 'https://test-api.factories-market.com/images/2vdQmNuIwInTq7lNsEPyG8ra999QFUGoycGAs3Gu.webp',
          },
        ],
        swiperConfig: {
          mainClass: 'wrapper-slider company-slider',
          wrapperClass: '',
          slidesPerView: 1,
          loop: true,
          direction: 'horizontal',
          autoplay: {
            delay: 5000,
          },
          isPagination: true,
          btnPrevClass: 'swiper-button-prev',
          btnNextClass: 'swiper-button-next',
          addColorForActiveSlide: false,
        },
      }
    },
  }
</script>
