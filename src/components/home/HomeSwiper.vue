<template>
  <swiper class="home wrapper-slider swiper" :options="swiperOption">
    <swiper-slide v-for="index in 4" :key="index" class="swiper-slide">
      <span class="slider-text">Slide {{ index }}</span>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperSlide,
    },

    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          loop: true,
          direction: 'horizontal',
          autoplay: {
            delay: 52222222000,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: 'true',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      }
    },
  }
</script>
