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

    async asyncData({ store }) {
      /**
       * Get all categoris
       */
      await store.dispatch('categories/GET_CATEGORIES')
    },
    head() {
      return {
        title: `Категории | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Категории`,
          },
        ],
      }
    },
  }
</script>
