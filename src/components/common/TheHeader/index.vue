<template>
  <header :class="{ hidden: isCompanyPages }">
    <div class="header header-desktop sticky" :class="{ active: searchBlockDesk }">
      <div class="header-main">
        <div class="header-block header-main__logo">
          <LogoSvg class="header-main__logo-img" @click="handleGoToMainPage()" />
        </div>

        <TheHeaderDesktopCategories :categories="categories" />

        <div v-show="isMainPageOrCategories !== ''" class="header-block header-desktop-page-switcher">
          <a
            class="header-desktop-page-switcher__goods"
            :class="{ active: typeOfSector === 'goods' }"
            @click="handleToggleSwitcher(isMainPageOrCategories, 'goods')"
          >
            <AllCategoriesGoodsSvg />
            <span>Товары</span>
          </a>
          <a
            class="header-desktop-page-switcher__companies"
            :class="{ active: typeOfSector === 'companies' }"
            @click="handleToggleSwitcher(isMainPageOrCategories, 'companies')"
          >
            <AllCategoriesCompaniesSvg />
            <span>Поставщики</span>
          </a>
        </div>

        <div class="header-block header-block__search header-main__search" :class="{ active: searchBlockDesk }">
          <form type="search" class="header-search" @submit.prevent="handleSearch">
            <input
              type="text"
              placeholder="Я ищу..."
              class="header-search__input"
              :value="searchInput"
              inputmode="search"
              @input="handleUpdateSearchInput"
            />
            <button type="submit" class="header-search__btn">
              <SearchIconSvg />
              <span>Поиск</span>
            </button>
          </form>
          <div class="header-block__examples" :class="{ active: searchBlockDesk }"></div>
        </div>
        <div class="header-block header-block__btn">
          <div class="header-btn header-sign">
            <div v-if="!$auth.loggedIn" @click="handleShowModalAuth">
              <img src="@/assets/img/icons/signIn.svg" alt="signIn-icons" />
              <span class="header-sign__text">Войти</span>
            </div>
            <nuxt-link v-else :to="`/company/${$auth.user.company_id}/products/`">
              <img src="@/assets/img/icons/signIn.svg" alt="signIn-icons" />
              <span class="header-sign__text">Профиль</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showMobileHeader === 'product'" class="header-product sticky">
      <div :class="{ active: headerProductBlock }" class="header-product__block">
        <div
          class="header-block header-product__back"
          :class="{ hide: searchProductInput, hide: $route.name === 'category', dontShow: firstPageVisit }"
          @click="$router.go(-1)"
        >
          <HeaderBackSvg class="header-back__img" />
        </div>
        <div
          class="header-block header-product__back-two"
          :class="{ active: searchProductInput, hide: $route.name === 'category' }"
          @click="handleShowSearchInput(false)"
        >
          <HeaderBackSvg class="header-back__img" />
        </div>
        <div class="header-block header-block__search header-product__search" :class="{ active: searchProductInput }">
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
        <div class="header-product__logo" :class="{ hide: searchProductInput }">
          <nuxt-link to="/">
            <LogoSvg class="header-logo" />
          </nuxt-link>
        </div>
        <div
          class="header-product__loupe"
          :class="{ hide: searchProductInput, hide: showMobileHeader !== 'category' }"
          @click="handleShowSearchInput(true)"
        >
          <SearchIconLoopSvg class="header-product__loupe-img" />
        </div>
        <div class="header-product__share" :class="{ active: shareMobLink }" @click="handleShareMob">
          <HeaderShareSvg class="header-product__share-icon" />
        </div>
      </div>

      <div :class="{ active: shareMob }" class="header-share__block">
        <div class="header-product__copy" @click="handleCopyURL">
          <CopyShareSvg class="header-product__copy-icon" />
          <span class="header-product__copy-text">Коп. ссылку</span>
        </div>
        <a
          :href="`https://t.me/share/url?url=${locationHref}&text=${product?.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`"
          target="_blank"
        >
          <div class="header-product__social">
            <TelegramSvg class="header-product__social-icon" />
          </div>
        </a>
        <a
          :href="`https://api.whatsapp.com/send?text=${product?.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`"
          target="_blank"
        >
          <div class="header-product__social">
            <WhatsappSvg class="header-product__social-icon" />
          </div>
        </a>
        <div class="header-product__close">
          <CloseShareSvg class="header-product__close-icon" @click="shareHideMob" />
        </div>
      </div>
    </div>

    <div v-else-if="showMobileHeader === 'category'" class="header header-categories sticky">
      <div class="header-categories__top">
        <nuxt-link v-if="firstPageVisit" to="/" class="header-mob-logo">
          <LogoSvg />
        </nuxt-link>
        <div v-else class="header-block header-categories__back" @click="$router.go(-1)">
          <HeaderBackSvg class="header-back__img" />
        </div>

        <div class="header-block header-block__search header-categories__row header-categories__search">
          <button class="header-search__img" @click="handleSearch">
            <SearchIconSvg />
          </button>
          <form type="search" class="header-search" @submit.prevent="handleSearch">
            <input
              type="text"
              placeholder="Я ищу..."
              class="header-search__input"
              :value="searchInput"
              inputmode="search"
              @input="handleUpdateSearchInput"
            />
          </form>
        </div>

        <div class="header-categories__btn">
          <HeaderFilterSvg />
        </div>
      </div>

      <!-- <div class="header-categories__bottom">
          <div class="search-unit opacity0">
            <button class="search-unit__btn active">Товарам</button>
            <button class="search-unit__btn">Продавцам</button>
          </div>
          <div class="header-categories__btn">
            <HeaderFilterSvg />
          </div>
        </div> -->
    </div>

    <div v-else class="header header-mobile sticky">
      <div class="header-block header-mobile__back" :class="{ active: searchBlockMob }">
        <HeaderBackSvg class="header-main__back-img" @click="handleShowSearchBlockMob(false)" />
      </div>

      <a v-show="!searchBlockMob" class="header-mobile__logo">
        <LogoSvg class="header-main__logo-img" @click="handleGoToMainPage()" />
      </a>

      <div v-show="!searchBlockMob" class="header-mobile-page-switcher">
        <a
          class="header-mobile-page-switcher__goods"
          :class="{ active: isMainPageOrCategories === 'index' || isMainPageOrCategories === 'category-id' }"
          @click="handleToggleSwitcher(isMainPageOrCategories, 'goods')"
        >
          <span>Товары</span>
        </a>

        <a
          class="header-mobile-page-switcher__companies"
          :class="{ active: isMainPageOrCategories === 'companies' || isMainPageOrCategories === 'companies-id' }"
          @click="handleToggleSwitcher(isMainPageOrCategories, 'companies')"
        >
          <span>Поставщики</span>
        </a>
      </div>

      <SearchIconLoopSvg v-show="!searchBlockMob" @click="handleShowSearchBlockMob(true)" />

      <div v-show="searchBlockMob" class="header-block header-block__search header-main__search">
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
    </div>

    <client-only>
      <div id="backgroundPlate" ref="backgroundPlate" class="backgroundPlate"></div>
    </client-only>

    <AppModalAuth />
  </header>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'
  import HeaderShareSvg from '@/assets/img/icons/svg/header-share.svg?inline'
  import CopyShareSvg from '@/assets/img/icons/svg/copy-share.svg?inline'
  import TelegramSvg from '@/assets/img/icons/svg/telegram.svg?inline'
  import WhatsappSvg from '@/assets/img/icons/svg/whatsapp.svg?inline'
  import CloseShareSvg from '@/assets/img/icons/svg/close-share.svg?inline'
  import SearchIconSvg from '@/assets/img/icons/svg/search-icon.svg?inline'
  import SearchIconLoopSvg from '@/assets/img/icons/svg/search-icon-loop.svg?inline'
  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'
  import HeaderFilterSvg from '@/assets/img/icons/svg/header-filter.svg?inline'
  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'

  import TheHeaderDesktopCategories from '@/components/common/TheHeader/TheHeaderDesktopCategories'
  import AppModalAuth from '@/components/UI/AppModalAuth/index'

  export default {
    name: 'TheHeader',
    components: {
      LogoSvg,
      HeaderShareSvg,
      CopyShareSvg,
      TelegramSvg,
      WhatsappSvg,
      CloseShareSvg,
      SearchIconLoopSvg,
      SearchIconSvg,
      HeaderBackSvg,
      HeaderFilterSvg,
      AllCategoriesGoodsSvg,
      AllCategoriesCompaniesSvg,
      TheHeaderDesktopCategories,
      AppModalAuth,
    },
    data() {
      return {
        searchBlockDesk: false,
        searchBlockMob: false,
        headerProductBlock: true,
        shareMob: false,
        shareMobLink: true,
        headerProductMob: true,
        searchProductInput: false,
        isAddNewSpecVisible: true,

        locationHref: '',
        product: '',
      }
    },
    computed: {
      ...mapState('search', ['searchInput']),
      ...mapState('global', ['firstPageVisit']),
      ...mapState('global', ['typeOfSector']),
      ...mapState('categories', ['categories']),

      isCompanyPages() {
        if (
          this.$route.name === 'company-id-products' ||
          this.$route.name === 'company-id-about' ||
          this.$route.name === 'company-id-settings'
        ) {
          return true
        }
        return false
      },

      isMainPageOrCategories() {
        switch (this.$route.name) {
          case 'index':
            return 'index'
          case 'category-id':
            return 'category-id'
          case 'companies':
            return 'companies'
          case 'companies-id':
            return 'companies-id'
          case 'search-query':
            return 'search-query'
          default:
            return ''
        }
      },

      showMobileHeader() {
        if (this.$route.name === 'product-id' || this.$route.name === 'category') {
          return 'product'
        } else if (
          this.$route.name === 'category-id' ||
          this.$route.name === 'search-query' ||
          this.$route.name === 'companies-id'
        ) {
          return 'category'
        }
        return true
      },
    },
    mounted() {
      this.locationHref = window.location.href

      if (this.$route.name === 'product-id') {
        this.handleGetProductById(this.$route.params.id)
      }

      document.addEventListener('click', this.onClick)
    },
    destroyed() {
      document.removeEventListener('click', this.onClick)
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_INPUT', 'UPDATE_SEARCH_QUERY']),
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH']),

      shareShowMob() {
        this.shareMob = true
        this.shareMobLink = false
        this.headerProductBlock = false
      },
      shareHideMob() {
        this.shareMob = false
        this.shareMobLink = true
        this.headerProductBlock = true
      },

      handleShowSearchBlockDesktop(value) {
        if (value === true) {
          document.querySelector('body').classList.add('lock')
          this.$refs.backgroundPlate.classList.add('active')
        } else {
        //   document.querySelector('body').classList.remove('lock')
          this.$refs.backgroundPlate.classList.remove('active')
        }
        this.searchBlockDesk = value
      },

      handleShowSearchBlockMob(value) {
        if (value === true) {
          document.querySelector('body').classList.add('lock')
        } else {
          document.querySelector('body').classList.remove('lock')
        }
        this.searchBlockMob = value
      },

      handleShowSearchInput(value) {
        this.searchProductInput = value
      },

      onClick(event) {
        const headerMainSearch = document.querySelector('.header-main__search')
        const withinBoundaries = event.composedPath().includes(headerMainSearch)
        if (!withinBoundaries) {
          this.handleShowSearchBlockDesktop(false)
        }
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
          this.handleShowSearchBlockDesktop(false)
          this.handleShowSearchBlockMob(false)

          const newQuery = { q: this.searchInput, active: this.typeOfSector }

          this.UPDATE_SEARCH_QUERY(this.searchInput)
          this.$router.push({
            path: '/search/',
            query: newQuery,
          })
        }
      },

      // Open modal auth
      handleShowModalAuth() {
        document.querySelector('body').classList.add('lock')
        this.SET_SHOW_MODAL_AUTH(true)
      },

      async handleGetProductById(id) {
        const { product, company } = await this.$nuxt.$productService.getProductById(id)

        this.product = product
      },

      handleCopyURL() {
        navigator.clipboard.writeText(window.location.href)

        this.$notify({
          title: '',
          message: 'Ссылка на товар успешно скопирована',
          type: 'success',
        })

        this.shareHideMob()
      },

      handleShareMob() {
        if (navigator.share) {
          navigator.share({
            title: `${this.product?.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`,
            text: '',
            url: window.location.href,
          })
          // .then(function () {
          //   console.log('Shareing successfull')
          // })
          // .catch(function () {
          //   console.log('Sharing failed')
          // })
        } else {
          this.shareShowMob()
        }
      },

      handleGoToMainPage() {
        this.$router.push(this.typeOfSector === 'goods' ? '/' : '/companies')
      },

      handleToggleSwitcher(a, b) {
        if (a === 'index' || a === 'companies') {
          const url = b === 'companies' ? '/companies' : '/'
          this.$router.push(url)
        } else if (a === 'search-query') {
          this.$router.push(`/search/?q=${this.$route.query.q}&active=${b}`)
        } else {
          const url = b === 'companies' ? `/companies/${this.$route.params.id}` : `/category/${this.$route.params.id}`
          this.$router.push(url)
        }
      },
    },
  }
</script>

<style src="./header.scss" lang="scss"></style>
