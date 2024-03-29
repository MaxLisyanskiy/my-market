<template>
  <article>
    <CompanyDomainTop
      :company="company"
      :active-tab="'About'"
      @scrolled="scrolled"
      @updateCompany="handleUpdateCompany"
    />
    <CompanyDomainAbout :company="company" :swiper-config="swiperConfig" :scrolled="scrolledData" />
  </article>
</template>

<script>
  import { mapActions } from 'vuex'

  import CompanyDomainTop from '@/components/companyDomain/CompanyDomainTop.vue'
  import CompanyDomainAbout from '@/components/companyDomain/CompanyDomainAbout.vue'

  export default {
    name: 'ComapnyIdAboutPage',
    components: { CompanyDomainTop, CompanyDomainAbout },
    layout: 'subDomain',

    async asyncData({ app, req, error }) {
      const hostname = req ? req.headers.host : window.location.host.split(':')[0]

      const { company } = await app.$companyDomainService.getCompanyByDomain(hostname)

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
        swiperConfig: {
          mainClass: 'company-swiper',
          wrapperClass: 'company-slider',
          slidesPerView: 2,
          spaceBetween: 10,
          direction: 'horizontal',
          pagination: {
            isPagination: true,
            el: '.company-swiper__pagination',
            paginationClass: 'company-swiper__pagination',
            type: 'fraction',
          },
          btnPrevClass: 'swiper-button-prev',
          btnNextClass: 'swiper-button-next',
          addColorForActiveSlide: false,
          breakpoints: {
            0: {
              slidesPerView: 1,
              loop: true,
              spaceBetween: 0,
            },
            670: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          },
        },
      }
    },
    async fetch() {
      // Clearing the company search query in the store
      await this.SET_COMPANY_SEARCH_QUERY('')
    },
    head() {
      return {
        title: `${this.company.name} - О компании`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `${this.company.name} - О компании`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.description}`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `${this.company.name} - О компании`,
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
            content: `${this.company.name} - О компании`,
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
