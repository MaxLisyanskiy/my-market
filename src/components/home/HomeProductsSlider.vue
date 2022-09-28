<template>
  <section class="products scroll">
    <div class="scroll-shadow scroll-shadow__right"></div>
    <div :style="{ background: category.color }" class="products-left products-left__scroll">
      <span class="products-left__title">{{ category.name }}</span>
      <button class="products-btn">
        <nuxt-link :to="`/category/${category.id}`">
          <span class="products-btn__text">Смотреть<span class="desktop">всё</span></span>
          <HomeProductsSliderArrowSvg class="products-btn__img" />
        </nuxt-link>
      </button>
    </div>

    <vue-custom-scrollbar class="products-right mobile" @ps-scroll-y="scrollHanle">
      <nuxt-link
        v-for="product in category.products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="products-mob"
      >
        <div class="products-mob__row">
          <div class="products-mob__img">
            <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
          </div>
          <span class="products-mob__title">{{ product.name }}</span>
          <span class="products-mob__price">от ₽{{ product.min_price.price }}/шт.</span>
          <span class="products-mob__description products-mob__desktop">
            Мин. заказ:
            <span class="products-mob__pcs">{{ product.min_price.amount }} шт.</span>
          </span>
          <span class="products-mob__description products-mob__mobile">
            Заказ
            <span class="products-mob__pcs">от {{ product.min_price.amount }} шт.</span>
          </span>
        </div>
      </nuxt-link>
    </vue-custom-scrollbar>

    <vue-custom-scrollbar class="products-right desktop" @ps-scroll-x="scrollHanle">
      <nuxt-link
        v-for="product in category.products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="products-max"
      >
        <div class="products-max__img">
          <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
        </div>
        <span class="products-max__title">{{ product.name }}</span>
        <span class="products-max__price">от ₽{{ product.min_price.price }}/шт.</span>
        <span class="products-max__description products-max__desktop">
          Мин. заказ:
          <span class="products-max__pcs">{{ product.min_price.amount }} шт.</span>
        </span>
        <span class="products-max__description products-max__mobile">
          Заказ
          <span class="products-max__pcs">от {{ product.min_price.amount }} шт.</span>
        </span>
      </nuxt-link>
    </vue-custom-scrollbar>
  </section>
</template>

<script>
  import HomeProductsSliderArrowSvg from '@/assets/img/icons/svg/home-products-slider-arrow.svg?inline'

  export default {
    name: 'HomeProductsSlider',
    components: { HomeProductsSliderArrowSvg },
    props: {
      category: {
        type: Object,
        default: () => {},
      },
    },
    // data() {
    //   return {
    //     settings: {
    //       suppressScrollY: false,
    //       suppressScrollX: false,
    //       wheelPropagation: true,
    //     },
    //   }
    // },
    // methods: {
    //   scrollHanle(evt) {
    //     console.log(evt)
    //   },
    // },
  }
</script>
