<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts :products="products" />
    </div>
    <AppPagination
      v-if="pagen.total > countProducts"
      :initial-page="pagen.page"
      :page-count="Math.ceil(pagen.total / countProducts)"
      :click-handler="handleClickPagination"
    />
  </section>
</template>

<script>
  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  import AppPagination from '~/components/UI/AppPagination.vue'

  export default {
    name: 'CategoryPage',
    components: { CatalogFilter, CatalogProducts, AppPagination },
    layout: 'catalog',

    async asyncData({ store, app, query }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get all products
      const { products, pagen } = await app.$productService.getProducts(query.p ?? 1, 20, null)
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
        title: `Все категории | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Все категории`,
          },
        ],
      }
    },
    methods: {
      /**
       * Get category products with configs after change page in pagination
       * @param {number} pageNum page number in pagination
       * @returns {object} Object with field products, pages
       */
      async handleClickPagination(pageNum) {
        const { products, pagen } = await this.$productService.getProducts(pageNum, this.countProducts, null)

        this.products = products
        this.pagen = pagen

        this.$router.push(`${this.$route.path}?p=${pageNum}`)
      },
    },
  }
</script>
