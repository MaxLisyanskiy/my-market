<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Products'" />
    <CompanyProducts :products="products" />
  </article>
</template>

<script>
  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanyProducts from '@/components/company/CompanyProducts.vue'

  export default {
    name: 'ComapnyIdProductsPage',
    components: { CompanyTop, CompanyProducts },
    layout: 'default',

    async asyncData({ app, store, params, query, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      const { products } = await app.$companyService.getCompanyProducts(params.id, 1, 20, null)

      return { company, products }
    },
    data() {
      return {
        company: {},
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
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
