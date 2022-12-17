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

    async asyncData({ app, params, error }) {
      const { company } = await app.$companyService.getCompanyById(params.id)

      if (company) {
        return { company }
      } else {
        error({ statusCode: 404 })
      }
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
            hid: 'title',
            name: 'title',
            content: `${this.company.name}  - Настройки | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            title: `${this.company.name} - Настройки | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
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
            content: 'Мир поставщиков VALE.SU',
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
