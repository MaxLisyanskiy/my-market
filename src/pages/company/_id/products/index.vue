<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Products'" @updateCompany="handleUpdateCompany" />
    <CompanyProducts :products="products" :company="company" :categories="categories" @delete="deleteProduct" />
    <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading>
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
      const { company } = await app.$companyService.getCompanyById(params.id)

      const { products, pagen, categories } = await app.$companyService.getCompanyProducts(
        params.id,
        1,
        20,
        query?.q,
        query?.category
      )

      // Check query in the routing and set query in store
      await store.dispatch('company/SET_COMPANY_SEARCH_QUERY', query.q ?? '')

      return { company, products, pagen, categories }
    },

    data() {
      return {
        company: {},
        products: [],
        categories: [],
        pagen: [],
        countProducts: 20,
      }
    },
    head() {
      return {
        title: `${this.company.name} - Товары | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `${this.company.name} - Товары | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `${this.company.name} - Товары | VALE.SU`,
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
            content: `${
              this.company.logo?.url ? this.company.logo.url : `${process.env.ORIGIN_URL}/assets/img/icons/svg/logo.svg`
            }`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `${this.company.name} - Товары | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `${this.company.description}`,
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: `${
              this.company.logo?.url ? this.company.logo.url : `${process.env.ORIGIN_URL}/assets/img/icons/svg/logo.svg`
            }`,
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
      ...mapState('company', ['companySearchQuery']),

      showInfiniteLoading() {
        if (this.products.length >= 20 && this.pagen.total > this.products.length) {
          return true
        }
        return false
      },
    },
    watch: {
      '$route.query'() {
        this.$router.app.refresh()
      },
    },
    methods: {
      async deleteProduct(id) {
        const result = await this.$productService.deleteProduct(id)

        if (result[0]) {
          this.handleLoadCompanyProducts()
          this.$notify({
            title: '',
            message: 'Продукт был успешно удален!',
            type: 'success',
          })
        } else {
          this.$notify({
            title: '',
            message: 'Что-то пошло не так при удаление продукта',
            type: 'error',
          })
        }
      },

      async handleLoadCompanyProducts() {
        const { products, categories } = await this.$companyService.getCompanyProducts(
          this.$route.params.id,
          1,
          20,
          this.$route.query?.q,
          this.$route.query?.category
        )
        this.products = products
        this.categories = categories
      },

      async handleUpdateCompany() {
        const { company } = await this.$companyService.getCompanyById(this.$route.params.id)
        this.company = company
      },

      infiniteHandler($state) {
        this.$companyService
          .getCompanyProducts(this.$route.params.id, this.pagen.page + 1, this.countProducts)
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

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
