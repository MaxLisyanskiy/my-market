<template>
  <article class="companyWrapper">
    <CompanyTop :company="company" :active-tab="'About'" @scrolled="scrolled" />
    <CompanyAbout :company="company" :swiper-config="swiperConfig" :scrolled="scrolledData" />
  </article>
</template>

<script>
  import { mapActions } from 'vuex'

  import CompanyTop from '@/components/company/CompanyTop.vue'
  import CompanyAbout from '@/components/company/CompanyAbout.vue'

  export default {
    name: 'ComapnyIdAboutPage',
    components: { CompanyTop, CompanyAbout },
    layout: 'default',

    async asyncData({ app, params }) {
      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      return { company }
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
            320: {
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
    methods: {
      ...mapActions('company', ['SET_COMPANY_SEARCH_QUERY']),

      /**
       * Set scrolledData for CompanyAbout
       * @param {boolean} bool scroll value
       */
      scrolled(bool) {
        this.scrolledData = bool
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
