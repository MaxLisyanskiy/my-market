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

    async asyncData({ store, query, app, error }) {
      /**
       * Get all categoris
       */
      await store.dispatch('categories/GET_CATEGORIES')

      /**
       * Check query in the routing and set query in store
       */
      const { q } = await query
      await store.dispatch('search/SET_SEARCH_QUERY', q)

      /**
       * Get products by query
       */
      return await app.$axios
        .$get(`/products?page=1&count=20&name=${q}`)
        .then(({ data }) => {
          store.commit(
            'search/UPDATE_SEARCH_PRODUCTS_COUNT',
            data.products.length
          )
          return { products: data.products }
        })
        .catch(() => {
          error({ statusCode: 500 })
        })
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
          this.onLoadCategoryProducts()
        }
      },
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_PRODUCTS_COUNT']),

      /**
       * Get products by query when change search input
       *
       * @async
       */
      async onLoadCategoryProducts() {
        await this.$axios
          .$get(`/products?page=1&count=20&name=${this.searchQuery}`)
          .then(({ data }) => {
            this.UPDATE_SEARCH_PRODUCTS_COUNT(data.products.length)
            this.products = data.products
          })
          .catch(() => {
            this.$nuxt.error({ statusCode: 500 })
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .temporary-title {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    font-size: 30px;
  }
</style>
