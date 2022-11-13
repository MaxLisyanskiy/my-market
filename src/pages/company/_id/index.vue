<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Main'" @updateCompany="handleUpdateCompany" />
    <CompanyMain :company="company" />
  </article>
</template>

<script>
  import { mapActions } from 'vuex'

  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanyMain from '@/components/company/CompanyMain.vue'

  export default {
    name: 'ComapnyIdProductsPage',
    components: { CompanyTop, CompanyMain },
    layout: 'default',

    async asyncData({ app, store, params }) {
      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      return { company }
    },
    data() {
      return {
        company: {},
      }
    },
    async fetch() {
      // Clearing the company search query in the store
      await this.SET_COMPANY_SEARCH_QUERY('')
    },
    head() {
      return {
        title: `${this.company.name} | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `${this.company.name} | Товары`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `${this.company.name} | Товары`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: `${this.company.logo?.url}`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `${this.company.description}`,
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: `${this.company.logo?.url}`,
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
      ...mapActions('company', ['SET_COMPANY_SEARCH_QUERY']),

      async handleUpdateCompany() {
        const { company } = await this.$companyService.getCompanyById(this.$route.params.id)
        this.company = company
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
