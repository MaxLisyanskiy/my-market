<template>
  <article>
    <CompanyDomainTop :company="company" :active-tab="'Products'" @updateCompany="handleUpdateCompany" />
    <CompanyDomainProducts :products="products" :company="company" :categories="categories" @delete="deleteProduct" />
    <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading>
  </article>
</template>

<script>
  import { mapState } from 'vuex'

  import CompanyDomainTop from '@/components/companyDomain/CompanyDomainTop.vue'
  import CompanyDomainProducts from '@/components/companyDomain/CompanyDomainProducts.vue'

  export default {
    name: 'ComapnyIdProductsPage',
    components: { CompanyDomainTop, CompanyDomainProducts },
    layout: 'subDomain',

    async asyncData({ app, store, req, query, error }) {
      const hostname = req ? req.headers.host : window.location.host.split(':')[0]

      const { company } = await app.$companyDomainService.getCompanyByDomain(hostname)

      if (company) {
        const { products, pagen, categories } = await app.$companyDomainService.getCompanyDomainProducts(
          hostname,
          1,
          20,
          query?.q,
          query?.category
        )

        // Check query in the routing and set query in store
        await store.dispatch('company/SET_COMPANY_SEARCH_QUERY', query.q ?? '')

        return { company, products, pagen, categories }
      } else {
        error({ statusCode: 404 })
      }
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
        title: `${this.company.name} - Товары`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `${this.company.name} - Товары`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `${this.company.name} - Товары`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Glass-Union',
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
            content: `${this.company.name} - Товары`,
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
          .getCompanyProducts(1, this.pagen.page + 1, this.countProducts)
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
