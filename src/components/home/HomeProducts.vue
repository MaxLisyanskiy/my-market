<template>
  <section class="products">
    <div class="products-left products-left__bottles">
      <span class="products-left__title">Бутылки</span>
      <span class="products-left__btn">Смотреть всё</span>
    </div>

    <div class="products-right">
      <div v-for="index in 10" :key="index" class="products-block">
        <div class="products-block__path">
          <span class="products-block__text">Графин 1.75 л. Январский с крышкой</span>
        </div>
        <img src="@/assets/img/Графин 1,75л _Январский_ с крышкой 1.png" alt="" class="products-block__img" />
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'HomeProductsSlider',
  }
</script>
