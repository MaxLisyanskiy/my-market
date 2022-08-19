<template>
  <div :class="productsClass === 'gallery' ? 'gallery' : 'list'">
    <CatalogProductsGallery v-if="productsClass === 'gallery'" />
    <CatalogProductsList v-else />
  </div>
</template>

<script>
  import CatalogProductsList from './CatalogProductsList.vue'
  import CatalogProductsGallery from './CatalogProductsGallery.vue'
  export default {
    name: 'CatalogProducts',
    components: { CatalogProductsList, CatalogProductsGallery },
    props: {
      products: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        productsClass: 'list',
      }
    },
    created() {
      console.log(this.products)
    },
  }
</script>

<style lang="scss" scoped></style>
