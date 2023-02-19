<template>
  <div>
    <section class="home-wrapper home-wrapper__desktop">
      <AppSwiper :swiper-config="swiperConfig" :images="imagesDesktop" />
    </section>
    <section class="home-wrapper home-wrapper__mobile">
      <AppSwiper class="mobile" :swiper-config="swiperConfig" :images="imagesMobile" />
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
        imagesDesktop: [
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
        imagesMobile: [
          {
            id: 1,
            assets: true,
            url: 'slider/main-banner-mob.png',
          },
          {
            id: 2,
            assets: true,
            url: 'slider/main-banner-mob.png',
          },
          {
            id: 3,
            assets: true,
            url: 'slider/main-banner-mob.png',
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
