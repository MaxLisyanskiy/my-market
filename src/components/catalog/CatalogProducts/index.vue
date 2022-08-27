<template>
  <div>
    <client-only v-if="loading">
      <CatalogProductsSkeleton />
    </client-only>
    <CatalogProductsItems v-else :products="products" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import CatalogProductsSkeleton from './CatalogProductsSkeleton.vue'
  import CatalogProductsItems from './CatalogProductsItems.vue'

  export default {
    name: 'CatalogProducts',
    components: {
      CatalogProductsSkeleton,
      CatalogProductsItems,
    },
    props: {
      products: {
        type: Array,
        default: () => [],
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState('catalog', ['viewMode']),
    },
  }
</script>
