<template>
  <div>
    <section class="home-wrapper">
      <AppSwiper :swiper-config="swiperConfig" :images="images" />
    </section>
  </div>
</template>

<script>
  import AppSwiper from '~/components/UI/AppSwiper.vue'

  export default {
    name: 'HomeWrapper',
    components: { AppSwiper },
    layout: 'default',

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

<style src="./homeWrapper.scss" lang="scss"></style>