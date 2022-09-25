<template>
  <h1>Edit</h1>
  <!-- <ProductEditor2 /> -->
</template>

<script>
  import ProductEditor2 from '@/components/product/ProductEditor2.vue'

  export default {
    name: 'ProductIdEditPage',
    // components: { ProductEditor2 },
    layout: 'default',
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
