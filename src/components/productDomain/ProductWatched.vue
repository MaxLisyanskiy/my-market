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
        <div class="watched-title">
          <span class="watched-title__text">{{ product.name }}</span>
        </div>
        <div class="watched-pcs">
          <span class="watched-pcs__text">от ₽{{ product.min_price.price }}/шт.</span>
        </div>
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
