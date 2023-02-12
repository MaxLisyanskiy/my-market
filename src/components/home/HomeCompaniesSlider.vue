<template>
  <section class="products scroll">
    <div class="scroll-shadow scroll-shadow__right"></div>
    <div :style="{ background: category.color }" class="products-left products-left__scroll">
      <span class="products-left__title">{{ category.name }}</span>
      <nuxt-link :to="`/factories/${category.id}`">
        <button class="products-btn">
          <span class="products-btn__text">Смотреть<span class="desktop">все</span></span>
          <HomeProductsSliderArrowSvg class="products-btn__img" />
        </button>
      </nuxt-link>
    </div>

    <vue-custom-scrollbar class="products-right mobile" tagname="div">
      <nuxt-link
        v-for="company in companies"
        :key="company.id"
        :to="`/company/${company.id}/products`"
        class="products-mob h-c-slider"
      >
        <div class="products-mob__row">
          <div class="products-mob__content">
            <div class="products-mob__img h-c-slider">
              <img v-lazy="company?.logo?.url" :alt="company.name" />
            </div>
            <span class="products-mob__title h-c-slider">{{ company.name }}</span>
          </div>
        </div>
      </nuxt-link>
    </vue-custom-scrollbar>

    <vue-custom-scrollbar class="products-right desktop" tagname="div">
      <nuxt-link
        v-for="company in companies"
        :key="company.id"
        :to="`/company/${company.id}/products`"
        class="products-max h-c-slider"
      >
        <div class="products-max__row">
          <div class="products-max__img h-c-slider">
            <img v-lazy="company?.logo?.url" :alt="company.name" />
          </div>
          <span class="products-max__title h-c-slider">{{ company.name }}</span>
        </div>
      </nuxt-link>
    </vue-custom-scrollbar>
  </section>
</template>

<script>
  import HomeProductsSliderArrowSvg from '@/assets/img/icons/svg/home-products-slider-arrow.svg?inline'

  export default {
    name: 'HomeCompaniesSlider',
    components: { HomeProductsSliderArrowSvg },
    props: {
      category: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        companies: null,
      }
    },
    async fetch() {
      const { companies, pagen } = await this.$companyService.getCompanisByCategoryId(this.category.id)
      this.companies = companies
    },
  }
</script>
