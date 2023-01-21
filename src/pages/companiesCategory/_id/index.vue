<template>
  <section class="applyied">
    <CatalogFilter />
    <CatalogMobText :what-is-page="'category'" :products="products" :category="category" />
    <div class="categories">
      <CompaniesCategoryProducts :companies="companies" />
      <!-- <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading> -->
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CompaniesCategoryProducts from '~/components/companiesCategory/CompaniesCategoryProducts.vue'

  export default {
    name: 'CompaniesCategoryIdPage',
    components: { CatalogFilter, CatalogMobText, CompaniesCategoryProducts },
    layout: 'catalog',

    async asyncData({ app, store, params, query, error }) {
      const { category } = await app.$categoryService.getProductsCategoryById(params.id)

      if (category) {
        const { companies, pagen } = await app.$companyService.getCompanisByCategoryId(params.id)

        return { category, companies, pagen }
      } else {
        error({ statusCode: 404 })
      }
    },

    data() {
      return {
        category: {},
        companies: [],
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
            path: `/companiesCategory/${this.category.id}`,
          },
        ],
      })
    },

    head() {
      return {
        title: `Вид деятельности | ${this.category.name}`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Вид деятельности | ${this.category.name}`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Вид деятельности | ${this.category.name}`,
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
            content: `Вид деятельности | ${this.category.name}`,
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
