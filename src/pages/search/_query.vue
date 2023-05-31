<template>
  <section class="applyied">
    <CatalogFilterSearch v-if="false"/>
    <CatalogMobText :what-is-page="'search'" :products="products" :companies="companies" />
    <div v-if="products.length > 0" class="categories">
      <CatalogProducts :products="products" />
    </div>
    <div v-else-if="companies.length > 0" class="categories">
      <CompaniesCategory :companies="companies" />
    </div>
    <CatalogProductsNotFound v-else :search-query="$route.query.q" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import CatalogFilterSearch from '~/components/catalog/CatalogFilterSearch.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'
  import CompaniesCategory from '~/components/companiesCategory/CompaniesCategory.vue'
  import CatalogProductsNotFound from '~/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'

  export default {
    name: 'SearchPage',
    components: { CatalogFilterSearch, CatalogMobText, CatalogProducts, CompaniesCategory, CatalogProductsNotFound },
    layout: 'catalog',

    async asyncData({ store, query, app }) {
      // Check query in the routing and set query in store
      const { q } = await query
      const { active } = await query

      await store.dispatch('search/SET_SEARCH_QUERY', q)

      store.commit('global/SET_TYPE_OF_SECTOR', active)

      let products = []
      let companies = []
      let pagen = []

      if (active === 'goods') {
        const res = await app.$productService.getProducts(query.p ?? 1, 20, q)
        products = res.products
        pagen = res.pagen
        store.commit('search/UPDATE_SEARCH_PRODUCTS_COUNT', res.products.length)
      } else {
        const res = await app.$companyService.getCompanisByName(q)
        companies = res.companies
        pagen = res.pagen
        store.commit('search/UPDATE_SEARCH_PRODUCTS_COUNT', res.companies.length)
      }

      return { products, companies, pagen, active }
    },
    data() {
      return {
        products: [],
        pagen: [],
        countProducts: 20,
      }
    },

    fetch() {
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: `"${this.searchQuery}""`,
            path: `${this.$route.fullPath}`,
          },
        ],
      })

      this.SET_SIDEBAR_CATEGORIES([
        {
          name: 'Категории',
          path: `${this.$route.fullPath}`,
        },
        [],
      ])

      // this.SET_TYPE_OF_SECTOR(this.$route.params.active)
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
      '$route.query.q'() {
        this.$router.app.refresh()
      },
      '$route.query.active'() {
        this.$router.app.refresh()
      },
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_PRODUCTS_COUNT']),
      ...mapMutations('global', ['SET_TYPE_OF_SECTOR']),
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
      ...mapMutations('categories', ['SET_SIDEBAR_CATEGORIES']),

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
