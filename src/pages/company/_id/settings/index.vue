<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'Settings'" @scrolled="scrolled" @updateCompany="handleUpdateCompany" />
    <CompanySettings :company="company" :scrolled="scrolledData" @updateProfile="updateProfile" />
  </article>
</template>

<script>
  import { mapActions } from 'vuex'

  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanySettings from '@/components/company/CompanySettings.vue'

  export default {
    name: 'ComapnyIdAboutPage',
    components: { CompanyTop, CompanySettings },
    layout: 'default',
    middleware: 'auth',

    async asyncData({ app, params }) {
      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      return { company }
    },
    data() {
      return {
        company: {},
        scrolledData: true,
      }
    },
    async fetch() {
      // Clearing the company search query in the store
      await this.SET_COMPANY_SEARCH_QUERY('')
    },
    head() {
      return {
        title: `${this.company.name} - Настройки | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.name}  - низкие цены, гарантия качества`,
          },
        ],
      }
    },
    methods: {
      ...mapActions('company', ['SET_COMPANY_SEARCH_QUERY']),

      /**
       * Set scrolledData for CompanyAbout
       * @param {boolean} bool scroll value
       */
      scrolled(bool) {
        this.scrolledData = bool
      },

      async handleUpdateCompany() {
        const { company } = await this.$companyService.getCompanyById(this.$route.params.id)
        this.company = company
      },

      async updateProfile(body) {
        const result = await this.$axios.patch('/profile', body)

        if (result[0]) {
          this.$notify({
            title: '',
            message: 'Данные профиля были успешно изменены!',
            type: 'success',
          })
          this.$router.push(`/company/${this.$route.params.id}/products/`)
        } else {
          this.$notify({
            title: '',
            message: 'Что-то пошло не так при изменение данных профиля',
            type: 'error',
          })
        }
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
