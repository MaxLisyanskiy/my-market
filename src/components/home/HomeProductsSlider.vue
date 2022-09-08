<template>
  <section class="products scroll">
    <div class="scroll-shadow scroll-shadow__right"></div>
    <div class="products-left products-left__scroll">
      <span class="products-left__title">{{ category.name }}</span>
      <button class="products-btn">
        <nuxt-link :to="`/category/${category.id}`">
          <span class="products-btn__text">Смотреть<span class="desktop">всё</span></span>
          <HomeProductsSliderArrowSvg class="products-btn__img" />
        </nuxt-link>
      </button>
    </div>

    <div class="products-right mobile">
      <nuxt-link
        v-for="product in category.products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="products-mob"
      >
        <div class="products-mob__row">
          <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="products-mob__img" />
          <span class="products-mob__title">{{ product.name }}</span>
          <span class="products-mob__price">от ₽{{ product.min_price.price }}/шт.</span>
          <span class="products-mob__description products-mob__desktop">
            Мин. заказ:
            <span class="products-mob__pcs">1000 шт.</span>
          </span>
          <span class="products-mob__description products-mob__mobile">
            Заказ
            <span class="products-mob__pcs">от 1000 шт.</span>
          </span>
        </div>
      </nuxt-link>
    </div>

    <div class="products-right desktop">
      <nuxt-link
        v-for="product in category.products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="products-max"
      >
        <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="products-max__img" />
        <span class="products-max__title">{{ product.name }}</span>
        <span class="products-max__price">от ₽{{ product.min_price.price }}/шт.</span>
        <span class="products-max__description products-max__desktop">
          Мин. заказ:
          <span class="products-max__pcs">1000 шт.</span>
        </span>
        <span class="products-max__description products-max__mobile">
          Заказ
          <span class="products-max__pcs">от 1000 шт.</span>
        </span>
      </nuxt-link>
    </div>
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
  }
</script>
