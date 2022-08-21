<template>
<div class="gallery">
    <div v-for="product in products" :key="`${product.name+product.id}`" class="product">
      <img src="@/assets/img/Баллон 10лит 1.png" :alt="product.name" class="product__img" />
      <span class="product-title">{{product.name}}</span>
      <span class="product-pcs">от ₽{{product.min_price.price}}/шт.</span>
      <span class="product-order"
        >Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span
      >
  </div>
</div>

</template>

<script>
  export default {
    name: 'CatalogProductsList',
    props: {
      products: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>
