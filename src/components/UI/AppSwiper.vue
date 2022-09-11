<template>
  <div class="swiper" :class="swiperConfig.mainClass">
    <div class="swiper-wrapper" :class="swiperConfig.wrapperClass">
      <div
        v-for="(img, index) of images"
        :key="index"
        class="swiper-slide"
        :class="{ active: index === activeSlideIndex }"
        @click="handleImgSelected(index)"
      >
        <img v-lazy="img.url" :alt="`SwipperImg${index}`" class="product-slider__img" />
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

  export default {
    props: {
      swiperConfig: {
        type: Object,
        default: () => {},
      },
      images: {
        type: Array,
        default: () => [],
      },
      clickHandler: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        activeSlideIndex: 0,
      }
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
      // getDirection() {
      //   if (process.browser) {
      //     const direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal'
      //     return direction
      //   }
      // },
      handleImgSelected(index) {
        if (this.activeSlideIndex === index) return false

        this.activeSlideIndex = index
        this.clickHandler(index)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .swiper {
    overflow: hidden !important;
    position: relative;
  }
  .swiper-slide.active {
    border: 1px solid #f00b1d;
  }
</style>
