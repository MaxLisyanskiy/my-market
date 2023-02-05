<template>
  <section class="applyied">
    <CatalogFilter />
    <CatalogMobText :what-is-page="'search'" :products="products" />
    <div v-if="products.length > 0" class="categories">
      <CatalogProducts :products="products" />
    </div>
    <CatalogProductsNotFound v-if="products.length <= 0" :search-query="$route.query.q" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'
  import CatalogProductsNotFound from '~/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'

  export default {
    name: 'SearchPage',
    components: { CatalogFilter, CatalogMobText, CatalogProducts, CatalogProductsNotFound },
    layout: 'catalog',

    async asyncData({ store, query, app }) {
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
            hid: 'title',
            name: 'title',
            title: `${this.searchQuery ?? 'Товары не найдены'} | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.searchQuery ?? 'Товары не найдены'}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            title: `${this.searchQuery ?? 'Товары не найдены'} | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `${this.searchQuery ?? 'Товары не найдены'}`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            title: `${this.searchQuery ?? 'Товары не найдены'} | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `${this.searchQuery ?? 'Товары не найдены'}`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
        ],
      }
    },
    computed: {
      ...mapState('search', ['searchQuery']),
    },
    watch: {
      // searchQuery(newCount, oldCount) {
      //   if (oldCount !== newCount) {
      //     this.handleLoadProducts()
      //   }
      // },
      '$route.query.q'() {
        this.$router.app.refresh()
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
