<template>
  <section class="watched">
    <span class="watched-title">Вы смотрели ранее</span>
    <div class="watched-row">
      <div v-for="index in 6" :key="index" class="product">
        <img src="@/assets/img/img-not_found.jpg" alt="" class="product__img" />
        <span class="product-title">Банка стеклянная 82мм 500мл</span>
        <span class="product-pcs">от ₽24/шт.</span>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ProductWatched',
    props: {
      product: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>

<style lang="scss" scoped></style>
