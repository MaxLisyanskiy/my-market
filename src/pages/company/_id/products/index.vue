<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Products'" />
    <CompanyProducts :products="products" />
  </article>
</template>

<script>
  import { mapState } from 'vuex'

  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanyProducts from '@/components/company/CompanyProducts.vue'

  export default {
    name: 'ComapnyIdProductsPage',
    components: { CompanyTop, CompanyProducts },
    layout: 'default',

    async asyncData({ app, store, params, query }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      const { company } = await app.$companyService.getCompanyById(params.id)

      const { products } = await app.$companyService.getCompanyProducts(params.id, 1, 20, query.q ?? null)

      // Check query in the routing and set query in store
      await store.dispatch('company/SET_COMPANY_SEARCH_QUERY', query.q ?? '')

      return { company, products }
    },

    data() {
      return {
        company: {},
        products: [],
        pagen: [],
        countProducts: 20,
      }
    },
    head() {
      return {
        title: `${this.company.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.name}  - низкие цены, гарантия качества`,
          },
        ],
      }
    },
    computed: {
      ...mapState('company', ['companySearchQuery']),
    },
    watch: {
      companySearchQuery(newCount, oldCount) {
        if (oldCount !== newCount) {
          this.handleLoadCompanyProducts()
        }
      },
    },
    methods: {
      /**
       * Get company products by query when change search input
       * @returns {object} Object with field products, pages
       */
      async handleLoadCompanyProducts() {
        const { products } = await this.$companyService.getCompanyProducts(
          this.$route.params.id,
          1,
          this.countProducts,
          this.companySearchQuery
        )

        this.products = products
        // this.pagen = pagen
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
