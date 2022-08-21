<template>
  <div>
    <CatalogProductsGallery v-if="viewMode === 'gallery'" :products="products"/>
    <CatalogProductsList v-else :products="products"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

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
    computed: {
      ...mapState('catalog', ['viewMode']),
    },

  }
</script>
