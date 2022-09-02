<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts :products="products" />
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  export default {
    name: 'CategoryPage',
    components: { CatalogFilter, CatalogProducts },
    layout: 'catalog',

    async asyncData({ store, app, query }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get all products
      const { products } = await app.$productService.getProducts(query.p ?? 1, 30)
      return { products }
    },
    fetch() {
      // Hiding breadcrumbs
      this.SET_BREADCRUMBS({
        showBreadcrumbs: false,
      })
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
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>
