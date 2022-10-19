<template>
  <div class="swiper" :class="swiperConfig.mainClass">
    <div class="swiper-wrapper" :class="swiperConfig.wrapperClass">
      <div
        v-for="(img, index) of images"
        :key="index"
        class="swiper-slide"
        :class="{ active: swiperConfig.addColorForActiveSlide && index === activeSlideIndex }"
        @click="handleImgSelected(index)"
      >
        <img
          v-if="img.assets"
          :src="require(`~/assets/img/${img.url}`)"
          :alt="`SwipperImg${index}`"
          class="slider__img"
        />
        <img v-else :src="img.url" :alt="`SwipperImg${index}`" class="slider__img" />
      </div>
    </div>
    <div
      v-if="swiperConfig.pagination.isPagination"
      id="swiperPagination"
      :class="swiperConfig.pagination.paginationClass ?? 'swiper-pagination'"
    ></div>
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
        // slideActiveClass: this.swiperConfig.addColorForActiveSlide ? 'swiper-slide-active' : '',
        navigation: {
          prevEl: '#btnPrev',
          nextEl: '#btnNext',
        },
        pagination: this.swiperConfig.pagination,
        breakpoints: this.swiperConfig.breakpoints,
      })
    },
    methods: {
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
  .swiper-pagination,
  .swiper-button-prev,
  .swiper-button-next {
    z-index: 2 !important;
  }
  .swiper-slide.active {
    border: 1px solid #f00b1d;
    @media (max-width: 870px) {
      border: none;
    }
  }
  .slider__img {
    width: 100%;
    height: inherit;
    object-fit: cover;
  }
</style>
