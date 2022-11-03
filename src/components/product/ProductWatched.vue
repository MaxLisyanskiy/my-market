<template>
  <section class="watched">
    <span class="watched-title">Вы смотрели ранее</span>
    <vue-custom-scrollbar class="watched-row" tagname="div">
      <nuxt-link
        v-for="product in watchedProducts"
        :key="`${product.name + product.id}`"
        :to="`/product/${product.id}`"
        class="product"
      >
        <div class="watched__img">
          <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
        </div>
        <span class="watched__title">{{ product.name }}</span>
        <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
      </nuxt-link>
    </vue-custom-scrollbar>
  </section>
</template>

<script>
  export default {
    name: 'ProductWatched',
    props: {
      watchedProducts: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style lang="scss" scoped></style>
