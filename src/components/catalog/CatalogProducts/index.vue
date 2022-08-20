<template>
  <div>
    <CatalogProductsGallery v-if="productsClass === 'gallery'" :products="products"/>
    <CatalogProductsList v-else :products="products"/>
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

  }
</script>
