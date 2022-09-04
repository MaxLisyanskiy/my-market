<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts :products="products" />
      <AppPagination v-if="showPagination" :initial-page="pagen.page" :page-count="100" />
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  import AppPagination from '~/components/UI/AppPagination.vue'

  export default {
    name: 'CategoryIdPage',
    components: { CatalogFilter, CatalogProducts, AppPagination },
    layout: 'catalog',

    async asyncData({ app, store, params, query, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get category in store by ID and overwrite in data.
      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(params.id)

      // If the category is valid, get the products of the category. If not, go to the error page 404
      if (category) {
        const { products, count, pagen } = await app.$categoryService.getProductsCategory(params.id, query.p ?? 1, 3)
        return { category, products, count, pagen }
      } else {
        error({ statusCode: 404 })
      }
    },
    data() {
      return {
        category: {},
        products: [],
        count: 0,
        pagen: [],
        showPagination: false,
      }
    },
    fetch() {
      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: `${this.category.name}`,
            path: `/category/${this.category.id}`,
          },
        ],
      })
    },
    head() {
      return {
        title: `${this.category?.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.category?.name} по ценам от заводов России. Низкие цены доставка в регионы. Гарантия качества.`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
      /**
       * Get category by ID and overwrite in data. Change loading.
       *
       * @async
       * @param {number} id Router params id.
       */
      async onLoadCategoryProducts(id) {
        await this.$axios
          .$get(`/categories/${id}/products?page=1&count=20`)
          .then(({ data }) => {
            this.products = data.products
          })
          .then(() => {
            this.loading = false
          })
      },
      // clickCallback(pageNum) {
      //   console.log(pageNum)
      // },
    },
  }
</script>
