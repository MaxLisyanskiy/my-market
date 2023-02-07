<template>
  <div class="companiesCategory-item__right">
    <div v-for="product in products" :key="product.id" class="companiesCategory-item__item">
      <nuxt-link :to="`/product/${product.id}`" target="_blank" class="companiesCategory-item__product">
        <div class="companiesCategory-item__switcher">
          <div class="companiesCategory-item__switcher_imgs">
            <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
          </div>
        </div>
        <p>{{ product.name }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CompaniesCategoryProducts',
    components: {},
    props: {
      products: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>
