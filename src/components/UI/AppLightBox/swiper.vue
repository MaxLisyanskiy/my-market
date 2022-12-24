<template>
  <div id="vibSlider" class="vib-slider">
    <div class="swiper-wrapper vib-slider-wrapper">
      <div
        v-for="(img, index) of media"
        :key="index"
        class="swiper-slide vib-slider-slide"
        :class="{ active: index === select }"
      >
        <img :src="img.url" :alt="`SwipperImg${index}`" class="slider__img vib-slider-img" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper } from 'swiper'

  export default {
    props: {
      media: {
        type: Array,
        required: true,
      },
      select: {
        type: Number,
        default: 0,
      },
      clickHandler: {
        type: Function,
        default: () => {},
      },
    },

    mounted() {
      const swiper2 = new Swiper('.vib-slider', {
        slidesPerView: '1',
        loop: false,
        direction: 'horizontal',
        autoplay: false,
        spaceBetween: 0,
        initialSlide: this.select,
        on: {
          slideChange: swiper => {
            this.clickHandler(swiper.realIndex)
          },
        },
      })
    },
  }
</script>
