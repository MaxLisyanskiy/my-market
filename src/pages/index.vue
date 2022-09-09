<template>
  <article class="content-row">
    <section class="home-wrapper">
      <HomeCategories />
      <AppSwiper :swiper-config="swiperConfig" />
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
    components: {
      HomeCategories,
      HomeProductsSlider,
      AppSwiper,
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
        swiperConfig: {
          mainClass: 'wrapper-slider',
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
        },
      }
    },
  }
</script>
