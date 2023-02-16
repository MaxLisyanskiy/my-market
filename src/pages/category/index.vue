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
      <div class="header-product__logo header-category__logo" :class="{ hide: searchBlockMob }">
        <nuxt-link to="/">
          <LogoSvg class="header-logo" />
        </nuxt-link>
      </div>
      <div class="header-block header-mobile__back" :class="{ active: searchBlockMob }">
        <HeaderBackSvg class="header-category__back-img" @click="handleShowSearchBlockMob(false)" />
      </div>
      <SearchIconLoopSvg
        class="header-category__loupe"
        :class="{ hide: searchBlockMob }"
        @click="handleShowSearchBlockMob(true)"
      />
      <div
        class="header-block header-block__search header-main__search header-category__search"
        :class="{ active: searchBlockMob }"
        @click="handleShowSearchBlockMob(true)"
      >
        <button class="header-search__img" @click="handleSearch">
          <SearchIconSvg />
        </button>
        <form type="search" class="header-search" @submit.prevent="handleSearch">
          <input
            type="text"
            placeholder="Я ищу..."
            class="header-search__input header-input__mobile"
            :value="searchInput"
            inputmode="search"
            @input="handleUpdateSearchInput"
          />
        </form>
      </div>
      <div class="main-modal" :class="{ active: searchBlockMob }"></div>

      <div class="header-product__share" :class="{ hide: searchBlockMob }" @click="handleShareMob">
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
            <NuxtLink :to="`/category/${goodsCategory.id}`"> Все подкатегории </NuxtLink>
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
          @click="handleChooseCompanyCategory(companyCategory.id, companyCategory.name)"
        >
          <span>{{ companyCategory.name }}</span>
        </li>
      </ul>
    </div>

    <div v-show="showCompaniesList" class="all-categories-companies__mainWrapp">
      <div class="all-categories-companies__banner">
        <img v-if="companyId === 5" src="@/static/allCategoriesBanner/glass-packaging.jpg" alt="glass-packaging" />
        <img v-else-if="companyId === 7" src="@/static/allCategoriesBanner/lids-corks-caps.jpg" alt="lids-corks-caps" />
      </div>
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
  import { mapState, mapMutations } from 'vuex'
  import AppCategoriesAccordion from '@/components/UI/AppCategoriesAccordion'

  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'
  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'
  import HeaderShareSvg from '@/assets/img/icons/svg/header-share.svg?inline'
  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'
  import SearchIconSvg from '@/assets/img/icons/svg/search-icon.svg?inline'
  import SearchIconLoopSvg from '@/assets/img/icons/svg/search-icon-loop.svg?inline'

  export default {
    name: 'CategoryMainPage',
    components: {
      AppCategoriesAccordion,
      HeaderBackSvg,
      LogoSvg,
      HeaderShareSvg,
      AllCategoriesGoodsSvg,
      AllCategoriesCompaniesSvg,
      SearchIconSvg,
      SearchIconLoopSvg,
    },
    layout: 'default',

    async asyncData({ app, route }) {
      // Get all categoris
      let categories = []

      await app.$categoryService
        .getCategories(false)
        .then(data => (categories = data.categories))
        .catch(() => {})

      const { query } = route

      let activeTab = 'goods'
      let showCompaniesList = false
      let companyId = null
      let companiesList = null
      let categoryName = null

      if (query.active) {
        activeTab = query.active
      }

      if (query.companyId) {
        companyId = Number(query.companyId)
        showCompaniesList = true

        const { companies } = await app.$companyService.getCompanisByCategoryId(query.companyId)
        const { category } = await app.$categoryService.getProductsCategoryById(query.companyId)
        companiesList = companies
        categoryName = category.name
      }

      return { categories, activeTab, showCompaniesList, companyId, companiesList, categoryName }
    },

    data() {
      return {
        goodsCategories: [],
        companyCategories: [],
        companiesList: [],
        searchBlockMob: false,
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
      let titleName = ''
      const image = `${process.env.ORIGIN_URL}/main-banner.png`
      const banner =
        this.companyId === 5
          ? `${process.env.ORIGIN_URL}/allCategoriesBanner/glass-packaging.jpg`
          : `${process.env.ORIGIN_URL}/allCategoriesBanner/lids-corks-caps.jpg`

      if (this.companyId) {
        titleName = `Список компаний в категории ${this.categoryName} | VALE.SU`
      } else {
        titleName =
          this.activeTab === 'goods' ? 'Все категори товаров | VALE.SU' : 'Виды деятельности компаний | VALE.SU'
      }
      return {
        title: titleName,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: titleName,
          },
          {
            hid: 'description',
            name: 'description',
            content: titleName,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: titleName,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: titleName,
          },
          {
            hid: 'og:image',
            property: 'og:image',
            itemprop: 'image',
            content: this.companyId ? banner : image,
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: '256',
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: '256',
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: titleName,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: titleName,
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            itemprop: 'image',
            content: this.companyId ? banner : image,
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
      ...mapState('search', ['searchInput']),
      allCategories() {
        return false
      },
    },

    watch: {
      $route() {
        if (this.$route.query.reload) {
          this.activeTab = 'goods'
          this.showCompaniesList = false
          this.companyId = null
          this.companiesList = null
          this.categoryName = null
          this.$router.push('/category/?active=goods')
        }
      },
    },

    created() {
      this.isTheDeskOrMob()
    },

    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_INPUT', 'UPDATE_SEARCH_QUERY']),
      handleChooseTab(name) {
        this.activeTab = name
        this.$router.push({
          path: this.$route.path,
          query: { active: name },
        })
      },
      /**
       * Update search input in the store and in the input
       *
       * @param {Event & { target: HTMLInputElement }} e
       */
      handleUpdateSearchInput(e) {
        this.UPDATE_SEARCH_INPUT(e.target.value)
      },
      // Submit to search page if valid query
      handleSearch() {
        if (this.searchInput.trim() !== '') {
          this.handleShowSearchBlockMob(false)

          this.UPDATE_SEARCH_QUERY(this.searchInput)
          this.$router.push({
            path: '/search/',
            query: { q: this.searchInput },
          })
        }
      },
      handleShowSearchBlockMob(value) {
        if (value === true) {
          document.querySelector('body').classList.add('lock')
        } else {
          document.querySelector('body').classList.remove('lock')
        }
        this.searchBlockMob = value
      },

      async handleChooseCompanyCategory(id, name) {
        this.companyId = id
        this.categoryName = name
        const { companies } = await this.$companyService.getCompanisByCategoryId(id)
        if (companies) {
          this.companiesList = companies
          this.showCompaniesList = true
          this.$router.push({
            path: this.$route.path,
            query: { active: 'companies', companyId: id },
          })
        }
      },

      handleBackToCompaniesCategories() {
        this.companyId = null
        this.categoryName = null
        this.showCompaniesList = false
        this.companiesList = []
        this.$router.push({
          path: this.$route.path,
          query: { active: 'companies' },
        })
      },

      isTheDeskOrMob() {
        if (process.browser) {
          if (window.innerWidth > 670) {
            this.$router.push('/')
          }
        }
      },

      handleShareMob() {
        let titleName = ''

        if (this.companyId) {
          titleName = `Список компаний в категории ${this.categoryName} | VALE.SU`
        } else {
          titleName =
            this.activeTab === 'goods' ? 'Все категори товаров | VALE.SU' : 'Виды деятельности компаний | VALE.SU'
        }
        if (navigator.share) {
          navigator.share({
            title: titleName,
            text: '',
            url: window.location.href,
          })
        }
      },
    },
  }
</script>
