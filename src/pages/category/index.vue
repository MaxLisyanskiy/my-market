<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts />
    </div>
  </section>
</template>

<script>
  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  export default {
    name: 'CategoryPage',
    components: { CatalogFilter, CatalogProducts },
    layout: 'catalog',
  }
</script>
