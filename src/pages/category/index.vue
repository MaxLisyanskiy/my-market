<template>
  <section class="all-categories">
    <div class="header-product sticky all-categories-header" :class="{ shadowHiden: !showCompaniesList }">
      <div
        v-show="showCompaniesList"
        class="header-block header-product__back"
        @click="handleBackToCompaniesCategories()"
      >
        <HeaderBackSvg class="header-back__img" />
      </div>
      <div class="header-product__logo">
        <nuxt-link to="/">
          <LogoSvg class="header-logo" />
        </nuxt-link>
      </div>
      <div class="header-product__share" @click="handleShareMob">
        <HeaderShareSvg class="header-product__share-icon" />
      </div>
    </div>

    <ul v-show="!showCompaniesList" class="all-categories-nav">
      <li class="all-categories-nav__item" :class="{ active: activeTab === 'goods' }" @click="handleChooseTab('goods')">
        <AllCategoriesGoodsSvg />
        <span>Товары</span>
      </li>
      <li
        class="all-categories-nav__item"
        :class="{ active: activeTab === 'companies' }"
        @click="handleChooseTab('companies')"
      >
        <AllCategoriesCompaniesSvg />
        <span>Компании</span>
      </li>
    </ul>

    <div v-show="activeTab === 'goods' && !showCompaniesList">
      <AppCategoriesAccordion
        v-for="goodsCategory in goodsCategories"
        :key="`${goodsCategory.id}`"
        class="all-categories-accordion"
      >
        <template #title>
          <span>{{ goodsCategory.name }}</span>
        </template>
        <template #content>
          <div class="categories-accordion__level3">
            <NuxtLink v-for="child in goodsCategory.children" :key="`${child.id}`" :to="`/category/${child.id}`">
              {{ child.name }}
            </NuxtLink>
          </div>
        </template>
      </AppCategoriesAccordion>
    </div>

    <div v-show="activeTab === 'companies' && !showCompaniesList">
      <ul class="all-categories-list">
        <li
          v-for="companyCategory in companyCategories"
          :key="`${companyCategory.id}`"
          class="all-categories-list__item"
          @click="handleChooseCompanyCategory(companyCategory.id)"
        >
          <span>{{ companyCategory.name }}</span>
        </li>
      </ul>
    </div>

    <div v-show="showCompaniesList">
      <ul class="all-categories-companies">
        <li v-for="company in companiesList" :key="`${company.id}`" class="all-categories-companies__item">
          <nuxt-link :to="`/company/${company.id}/products`">
            <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" />
            <img v-else src="@/assets/img/icons/company-not-found-img.svg" alt="company-not-found-img" />
            <span>{{ company.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import AppCategoriesAccordion from '@/components/UI/AppCategoriesAccordion'

  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'
  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'
  import HeaderShareSvg from '@/assets/img/icons/svg/header-share.svg?inline'
  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'

  export default {
    name: 'CategoryMainPage',
    components: {
      AppCategoriesAccordion,
      HeaderBackSvg,
      LogoSvg,
      HeaderShareSvg,
      AllCategoriesGoodsSvg,
      AllCategoriesCompaniesSvg,
    },
    layout: 'default',
    async asyncData({ app }) {
      // Get all categoris
      let categories = []

      await app.$categoryService
        .getCategories(false)
        .then(data => (categories = data.categories))
        .catch(() => {})

      return { categories }
    },

    data() {
      return {
        activeTab: 'goods',
        showCompaniesList: false,
        goodsCategories: [],
        companyCategories: [],
        companiesList: [],
      }
    },

    fetch() {
      const newCompanyCategories = []
      this.categories.map(item => {
        this.goodsCategories = item.children
        return item.children.map(child => {
          return newCompanyCategories.push({
            id: child.id,
            name: child.name,
          })
        })
      })

      this.companyCategories = newCompanyCategories
    },

    head() {
      return {
        title: `Все Категории | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Все категории | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Все категории | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: ``,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: ``,
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
      allCategories() {
        return false
      },
    },

    created() {
      this.isTheDeskOrMob()
    },

    methods: {
      handleChooseTab(name) {
        this.activeTab = name
      },

      async handleChooseCompanyCategory(id) {
        const { companies } = await this.$companyService.getCompanisByCategoryId(id)
        if (companies) {
          this.companiesList = companies
          this.showCompaniesList = true
        }
      },

      handleBackToCompaniesCategories() {
        this.showCompaniesList = false
        this.companiesList = []
      },

      isTheDeskOrMob() {
        if (process.browser) {
          if (window.innerWidth > 670) {
            this.$router.push('/')
          }
        }
      },

      handleShareMob() {
        if (navigator.share) {
          navigator.share({
            title: `Все категори | VALE.SU`,
            text: '',
            url: window.location.href,
          })
        }
      },
    },
  }
</script>
