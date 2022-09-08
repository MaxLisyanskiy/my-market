<template>
  <div class="swiper" :class="swiperConfig.mainClass">
    <div class="swiper-wrapper" :class="swiperConfig.wrapperClass">
      <div v-for="index of 10" :key="index" class="swiper-slide">
        <img src="@/assets/img/product.png" alt="product" class="product-slider__img" />
      </div>
    </div>
    <div v-if="swiperConfig.isPagination" id="swiperPagination" class="swiper-pagination"></div>
    <div id="btnPrev" :class="swiperConfig.btnPrevClass"></div>
    <div id="btnNext" :class="swiperConfig.btnNextClass"></div>
  </div>
</template>

<script>
  // import Swiper JS
  import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
  import 'swiper/swiper-bundle.min.css'

  export default {
    props: {
      swiperConfig: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      // configure Swiper to use modules. The modules were tested with SwiperJS v6.8.4 with NuxtJS v2.15.7
      // previously it was before export default. Moved here for performance issues. Move back in case of problems.
      Swiper.use([Navigation, Pagination, Autoplay])

      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],

        // Optional parameters @see https://swiperjs.com/swiper-api#parameters
        slidesPerView: this.swiperConfig.slidesPerView,
        loop: this.swiperConfig.loop,
        direction: this.swiperConfig.direction,
        autoplay: this.swiperConfig.autoplay,

        navigation: {
          prevEl: '#btnPrev',
          nextEl: '#btnNext',
        },
        pagination: {
          el: '#swiperPagination',
          clickable: 'true',
        },
        // *********** TODO *************//
        // on: {
        //   resize() {
        //     swiper.changeDirection(this.getDirection)
        //   },
        // },
      })
    },
    methods: {
      getDirection() {
        if (process.browser) {
          const direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal'
          return direction
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .swiper {
    overflow: hidden !important;
    position: relative;
  }
  // .product-slider__img {
  //   &:hover {
  //     border: 1px solid linear-gradient(#f00b1d 0%, #ff5833 100%);
  //   }
  // }
</style>
