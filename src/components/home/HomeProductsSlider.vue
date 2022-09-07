<template>
  <section class="products scroll">
    <div class="scroll-shadow scroll-shadow__right"></div>
    <div class="products-left products-left__scroll">
      <span class="products-left__title">Банки</span>
      <button class="products-btn">
        <a>
          <span class="products-btn__text">Смотреть<span class="desktop">всё</span></span>
          <!-- <img src="@/assets/img/icons/right.svg" alt="" class="products-btn__img" /> -->
        </a>
      </button>
    </div>

    <div class="products-right mobile">
      <div v-for="index in 10" :key="index" class="products-mob">
        <div class="products-mob__row">
          <img v-lazy="" alt="" class="products-mob__img" />
          <span class="products-mob__title">Баллон 10 литров</span>
          <span class="products-mob__price">от ₽24/шт.</span>
          <span class="products-mob__description products-mob__desktop">
            Мин. заказ:
            <span class="products-mob__pcs">1000 шт.</span>
          </span>
          <span class="products-mob__description products-mob__mobile">
            Заказ
            <span class="products-mob__pcs">от 1000 шт.</span>
          </span>
        </div>
      </div>
    </div>

    <div class="products-right desktop">
      <div v-for="index in 10" :key="index" class="products-max">
        <img v-lazy="" alt="" class="products-max__img" />
        <span class="products-max__title">Баллон 10 литров</span>
        <span class="products-max__price">от ₽24/шт.</span>
        <span class="products-max__description products-max__desktop">
          Мин. заказ:
          <span class="products-max__pcs">1000 шт.</span>
        </span>
        <span class="products-max__description products-max__mobile">
          Заказ
          <span class="products-max__pcs">от 1000 шт.</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'HomeProductsSlider',
  }
</script>
