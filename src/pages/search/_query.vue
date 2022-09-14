<template>
  <section class="applyied">
    <CatalogFilter />
    <div v-if="products.length > 0" class="categories">
      <CatalogProducts :products="products" />
    </div>
    <AppPagination
      v-if="pagen.total > countProducts && products.length > 0"
      :initial-page="pagen.page"
      :page-count="Math.ceil(pagen.total / countProducts)"
      :click-handler="handleClickPagination"
    />
    <CatalogProductsNotFound v-if="products.length <= 0" :search-query="$route.query.q" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'
  import CatalogProductsNotFound from '~/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'

  import AppPagination from '~/components/UI/AppPagination.vue'

  export default {
    name: 'SearchPage',
    components: { CatalogFilter, CatalogProducts, CatalogProductsNotFound, AppPagination },
    layout: 'catalog',

    async asyncData({ store, query, app }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Check query in the routing and set query in store
      const { q } = await query
      await store.dispatch('search/SET_SEARCH_QUERY', q)

      // Get products by query
      const { products, pagen } = await app.$productService.getProducts(query.p ?? 1, 20, q)
      store.commit('search/UPDATE_SEARCH_PRODUCTS_COUNT', products.length)
      return { products, pagen }
    },
    data() {
      return {
        products: [],
        pagen: [],
        countProducts: 20,
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
       * @returns {object} Object with field products, pages
       */
      async handleLoadProducts() {
        const { products, pagen } = await this.$productService.getProducts(
          this.pagen.page,
          this.countProducts,
          this.searchQuery
        )
        this.UPDATE_SEARCH_PRODUCTS_COUNT(products.length)
        this.products = products
        this.pagen = pagen
      },

      /**
       * Get category products with configs after change page in pagination
       * @param {number} pageNum page number in pagination
       * @returns {object} Object with field products, pages
       */
      async handleClickPagination(pageNum) {
        const { products, pagen } = await this.$productService.getProducts(pageNum, this.countProducts, null)

        this.products = products
        this.pagen = pagen
        this.$router.push(`${this.$route.path}?q=${this.$route.query.q}&p=${pageNum}`)
      },
    },
  }
</script>
