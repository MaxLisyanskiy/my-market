<template>
  <section class="applyied">
    <CatalogFilter />
    <div v-if="products.length > 0" class="categories">
      <CatalogProducts :products="products" />
    </div>
    <CatalogProductsNotFound v-else />
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'
  import CatalogProductsNotFound from '~/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'

  export default {
    name: 'SearchPage',
    components: { CatalogFilter, CatalogProducts, CatalogProductsNotFound },
    layout: 'catalog',

    async asyncData({ store, query, app }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Check query in the routing and set query in store
      const { q } = await query
      await store.dispatch('search/SET_SEARCH_QUERY', q)

      // Get products by query
      const { products } = await app.$productService.getProducts(query.p ?? 1, 30, q)
      store.commit('search/UPDATE_SEARCH_PRODUCTS_COUNT', products.length)
      return { products }
    },
    data() {
      return {
        products: [],
      }
    },
    head() {
      return {
        title: `${this.searchQuery ?? 'Товары не найдены'} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.searchQuery ?? 'Товары не найдены'}`,
          },
        ],
      }
    },
    computed: {
      ...mapState('search', ['searchQuery']),
    },
    watch: {
      searchQuery(newCount, oldCount) {
        if (oldCount !== newCount) {
          this.handleLoadProducts()
        }
      },
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_PRODUCTS_COUNT']),
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),

      /**
       * Get products by query when change search input
       */
      async handleLoadProducts() {
        const { products } = await this.$productService.getProducts(1, 30, this.searchQuery)
        this.UPDATE_SEARCH_PRODUCTS_COUNT(products.length)
        this.products = products
      },
    },
  }
</script>
