<template>
  <header class="header sticky" :class="{ hidden: isCompanyPages }">
    <div class="header-row">
      <div class="header-block header-block__back">
        <HeaderBackSvg class="header-back__img" />
      </div>
      <div class="header-block header-block__logo">
        <nuxt-link to="/">
          <LogoSvg class="header-logo" />
        </nuxt-link>
      </div>
      <div class="header-block header-block__search">
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
          <button type="submit" class="header-search__btn">Поиск</button>
        </form>
        <div class="header-modal">
          <div class="header-row">
            <div class="header-modal__fixed"></div>
            <div class="search-block">
              <!-- <div class="search-block__top">
                <div class="search-unit">
                  <span class="search-unit__text">Поиск по:</span>
                </div>
                <div class="search-unit">
                  <button class="search-unit__btn active">Товарам</button>
                  <button class="search-unit__btn">Продавцам</button>
                </div>
              </div> -->
              <!-- <div class="search-block__bottom">
                <ul class="search-block__list">
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link active">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                  <li class="search-block__link">Банки</li>
                </ul>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="header-block header-block__btn">
        <div class="header-btn header-sign">
          <nuxt-link to="/login/">
            <img src="@/assets/img/icons/signIn.svg" alt="signIn-icons" />
            <span class="header-sign__text">Войти</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'
  import SearchIconSvg from '@/assets/img/icons/svg/search-icon.svg?inline'
  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'

  export default {
    name: 'TheHeader',
    components: { LogoSvg, SearchIconSvg, HeaderBackSvg },
    computed: {
      ...mapState('search', ['searchInput']),

      isCompanyPages() {
        if (this.$route.name === 'company-id-products' || this.$route.name === 'company-id-about') {
          return true
        }

        return false
      },
    },
    mounted: () => {
      const searchInput = document.querySelector('.header-search__input')
      const searchBlock = document.querySelector('.search-block')
      const header = document.querySelector('.header')
      const headerModal = document.querySelector('.header-modal')
      const headerBack = document.querySelector('.header-block__back')
      const headerLogo = document.querySelector('.header-block__logo')
      const body = document.querySelector('body')

      if (window.screen.availWidth > 670) {
        searchInput.addEventListener('click', function (event) {
          searchBlock.classList.add('active')
          headerModal.classList.add('active')
        })
        document.onclick = function (e) {
          if (e.target.className !== 'header-search__input') {
            searchBlock.classList.remove('active')
            headerModal.classList.remove('active')
          }
        }
      }

      if (window.screen.availWidth < 670) {
        searchInput.addEventListener('click', function (event) {
          header.classList.add('header-modal__sticky')
          headerModal.classList.add('active')
          headerBack.classList.add('active')
          headerLogo.style.display = 'none'
          body.classList.add('lock')
        })
        headerBack.addEventListener('click', function (event) {
          header.classList.remove('header-modal__sticky')
          headerModal.classList.remove('active')
          headerBack.classList.remove('active')
          headerLogo.style.display = 'block'
          body.classList.remove('lock')
        })
      }
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_INPUT', 'UPDATE_SEARCH_QUERY']),
      /**
       * Update search input in the store and in the input
       *
       * @param {Event & { target: HTMLInputElement }} e
       */
      handleUpdateSearchInput(e) {
        this.UPDATE_SEARCH_INPUT(e.target.value)
      },
      /**
       * Submit to search page if valid query
       */
      handleSearch() {
        const searchBlock = document.querySelector('.search-block')
        const headerModal = document.querySelector('.header-modal')
        const headerBack = document.querySelector('.header-block__back')
        const headerLogo = document.querySelector('.header-block__logo')
        const body = document.querySelector('body')

        if (this.searchInput.trim() !== '') {
          searchBlock.classList.remove('active')
          headerModal.classList.remove('active')
          headerBack.classList.remove('active')
          headerLogo.style.display = 'block'
          body.classList.remove('lock')
          this.UPDATE_SEARCH_QUERY(this.searchInput)
          this.$router.push({
            path: '/search/',
            query: { q: this.searchInput },
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .hidden {
    @media (max-width: 670px) {
      display: none;
    }
  }
</style>
