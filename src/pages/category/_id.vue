<template>
  <section class="applyied">
    <CatalogFilter v-if="false" />
    <CatalogMobText :what-is-page="'category'" :products="products" :category="category" />
    <div class="categories">
      <CatalogProducts :products="products" />
      <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading>
    </div>
    <!-- <AppPagination
      v-if="pagen.total > countProducts"
      :initial-page="pagen.page"
      :page-count="Math.ceil(pagen.total / countProducts)"
      :click-handler="handleClickPagination"
    /> -->
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  // import AppPagination from '~/components/UI/AppPagination.vue'

  export default {
    name: 'CategoryIdPage',
    components: { CatalogFilter, CatalogMobText, CatalogProducts },
    layout: 'catalog',

    async asyncData({ app, store, params, query, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get category in store by ID and overwrite in data.
      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      // const category = await get (params.id)
      const { category } = await app.$categoryService.getProductsCategoryById(params.id)

      // If the category is valid, get the products of the category. If not, go to the error page 404
      if (category) {
        const { products, pagen } = await app.$categoryService.getProductsCategory(params.id, query.p ?? 1, 20)
        return { category, products, pagen }
      } else {
        error({ statusCode: 404 })
      }
    },
    data() {
      return {
        category: {},
        products: [],
        pagen: [],
        countProducts: 20,
        image: '',
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
        title: `Категория | ${this.category.name}`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: ``,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: ``,
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
      showInfiniteLoading() {
        if (this.products.length >= 20 && this.pagen.total > this.products.length) {
          return true
        }
        return false
      },
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),

      /**
       * Get category products with configs after change page in pagination
       * @param {number} pageNum page number in pagination
       * @returns {object} Object with field products, pages
       */
      async handleClickPagination(pageNum) {
        const { products, pagen } = await this.$categoryService.getProductsCategory(
          this.$route.params.id,
          pageNum,
          this.countProducts
        )

        this.products = products
        this.pagen = pagen

        this.$router.push(`${this.$route.path}?p=${pageNum}`)
      },

      infiniteHandler($state) {
        this.$categoryService
          .getProductsCategory(this.$route.params.id, this.pagen.page + 1, this.countProducts)
          .then(({ products, pagen }) => {
            if (products.length) {
              this.products.push(...products)
              this.pagen = pagen
              if (pagen.total > this.products.length) {
                $state.complete()
              } else {
                $state.loaded()
              }
            } else {
              $state.complete()
            }
          })
      },
    },
  }
</script>
