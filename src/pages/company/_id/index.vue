<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Main'" />
    <CompanyMain :company="company" />
  </article>
</template>

<script>
  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanyMain from '@/components/company/CompanyMain.vue'

  export default {
    name: 'ComapnyIdProductsPage',
    components: { CompanyTop, CompanyMain },
    layout: 'default',

    async asyncData({ app, store, params, query, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      // const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      // const category = await get(product.category_id)

      return { company }
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
