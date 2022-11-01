<template>
  <div :scroll="handleScroll">
    <!-- Banner Desktop -->
    <section class="banner">
      <div class="banner-bg">
        <img src="@/assets/img/company-bg_one.png" alt="banner-bg" class="banner-bg__img" />
      </div>

      <div class="banner-info">
        <div class="banner-info__left">
          <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="banner-info__logo" />
          <img
            v-else
            src="@/assets/img/icons/company-not-found-img.svg"
            alt="company-not-found-img"
            class="banner-info__logo"
          />
          <div class="banner-info__text">
            <h1 class="banner-info__title">{{ company.name }}</h1>
            <span class="banner-info__description">
              <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <span>{{ company.email }}</span>
              </a>
            </span>
          </div>
        </div>
        <div class="banner-info__right">
          <form type="search" class="banner-search" @submit.prevent="handleSearchCompanyProducts">
            <input
              type="text"
              placeholder="Искать в этом магазине..."
              class="banner-search__input"
              :value="companySearchInput"
              inputmode="search"
              @input="handleUpdateCompanySearchInput"
            />
            <button type="submit" class="banner-search__btn">Поиск</button>
          </form>
        </div>
      </div>

      <div id="bannerTabs" class="banner-tabs">
        <div class="banner-tabs-list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
          </nuxt-link>
        </div>
        <div class="banner-tabs-connection">
          <template v-if="!isCompanyOwner">
            <a :href="`tel:${company.phone}`" class="banner-tabs-connection__tel">
              <img src="@/assets/img/icons/company-tel.svg" alt="company-tel" />
              <span>Позвонить</span>
            </a>
            <a :href="`mailto:${company.email}`" class="banner-tabs-connection__mail">
              <img src="@/assets/img/icons/company-mail.svg" alt="company-mail" />
              <span> Написать в чат</span>
            </a>
          </template>
          <nuxt-link
            v-else
            :to="`/company/${company.id}/settings/`"
            class="banner-tabs-connection__tel"
            :class="{ active: activeTab === 'Settings' }"
          >
            <img src="@/assets/img/icons/company-settings.svg" alt="company-settings" />
            <span>Настройки</span>
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Mob -->
    <section v-show="!isComapnySettings" class="banner-mob">
      <div class="banner-mob-top">
        <nuxt-link v-if="firstPageVisit" to="/" class="header-mob-logo">
          <LogoWhiteSvg />
        </nuxt-link>
        <button v-else class="banner-mob-top__back" @click="$router.go(-1)">
          <CompanyHeaderBackSvg />
        </button>
        <form type="search" class="banner-mob-top__form" @submit.prevent="handleSearchCompanyProducts">
          <button type="submit" class="banner-mob-top__search-btn">
            <CompanyHeaderSearchSvg />
          </button>
          <input
            type="text"
            placeholder="Искать в этом магазине..."
            class="banner-mob-top__input"
            :value="companySearchInput"
            inputmode="search"
            @input="handleUpdateCompanySearchInput"
          />
        </form>
      </div>
      <div class="banner-mob-info">
        <div class="banner-mob-info__wrapp">
          <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="banner-mob-info__img" />
          <img
            v-else
            src="@/assets/img/icons/company-not-found-img.svg"
            alt="company-not-found-img"
            class="banner-mob-info__img"
          />
          <div class="banner-mob-info__text">
            <span class="banner-info__title">{{ company.name }}</span>
            <div class="banner-info__description">
              <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                <img src="@/assets/img/icons/company-tel-mob.svg" alt="company-tel" />
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <img src="@/assets/img/icons/company-mail-mob.svg" alt="company-mail" />
                <span>{{ company.email }}</span>
              </a>
            </div>
            <div class="banner-mob-info__btns">
              <a :href="`tel:${company.phone}`" class="banner-mob-info__call">Позвонить</a>
              <a :href="`mailto:${company.email}`" class="banner-mob-info__chat">Написать в чат</a>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-tabs">
        <div class="banner-tabs-list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Fixed -->
    <section class="banner-fixed" :class="{ active: !scrolledToTabs }">
      <div class="banner-tabs">
        <div class="banner-tabs__wrapp">
          <div class="banner-tabs-company">
            <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" />
            <img v-else src="@/assets/img/icons/company-not-found-img.svg" alt="company-not-found-img" />
            <h3>{{ company.name }}</h3>
          </div>
          <div class="banner-tabs-list">
            <nuxt-link
              v-show="false"
              :to="`/company/${company.id}`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'Main' }"
            >
              Главная
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/products`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'Products' }"
            >
              Товары
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/about/`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'About' }"
            >
              О компании
            </nuxt-link>
          </div>
        </div>
        <div class="banner-tabs-connection">
          <template v-if="!isCompanyOwner">
            <a :href="`tel:${company.phone}`" class="banner-tabs-connection__tel">
              <img src="@/assets/img/icons/company-tel.svg" alt="company-tel" />
              <span>Позвонить</span>
            </a>
            <a :href="`mailto:${company.email}`" class="banner-tabs-connection__mail">
              <img src="@/assets/img/icons/company-mail.svg" alt="company-mail" />
              <span> Написать в чат</span>
            </a>
          </template>
          <nuxt-link
            v-else
            :to="`/company/${company.id}/settings/`"
            class="banner-tabs-connection__tel"
            :class="{ active: activeTab === 'Settings' }"
          >
            <img src="@/assets/img/icons/company-settings.svg" alt="company-settings" />
            <span>Настройки</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import CompanyHeaderBackSvg from '@/assets/img/icons/svg/company-header-back.svg?inline'
  import CompanyHeaderSearchSvg from '@/assets/img/icons/svg/company-header-search.svg?inline'
  import LogoWhiteSvg from '@/assets/img/icons/svg/logo-white.svg?inline'

  export default {
    name: 'CompanyTop',
    components: { CompanyHeaderBackSvg, CompanyHeaderSearchSvg, LogoWhiteSvg },
    props: {
      company: {
        type: Object,
        default: () => {},
      },
      activeTab: {
        type: String,
        default: 'Main',
      },
    },
    data() {
      return {
        scrolledToTabs: true,
      }
    },
    computed: {
      ...mapState('company', ['companySearchInput', 'companySearchQuery']),
      ...mapState('global', ['firstPageVisit']),

      isCompanyOwner() {
        if (this.$auth.user && this.$auth.user.company_id === Number(this.$route.params.id)) {
          return true
        }
        return false
      },

      isComapnySettings() {
        if (this.$route.name === 'company-id-settings') {
          return true
        }
        return false
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      ...mapMutations('company', ['UPDATE_COMPANY_SEARCH_INPUT', 'UPDATE_COMPANY_SEARCH_QUERY']),

      /**
       * Update search input in the store and in the input
       *
       * @param {Event & { target: HTMLInputElement }} e
       */
      handleUpdateCompanySearchInput(e) {
        this.UPDATE_COMPANY_SEARCH_INPUT(e.target.value)
      },

      /**
       * Submit to search company products if valid query
       */
      handleSearchCompanyProducts() {
        if (this.companySearchInput.trim() !== '') {
          this.UPDATE_COMPANY_SEARCH_QUERY(this.companySearchInput)
          this.$router.push({
            path: this.$route.path,
            query: { q: this.companySearchInput },
          })
        } else if (this.companySearchInput !== this.companySearchQuery) {
          this.UPDATE_COMPANY_SEARCH_QUERY(this.companySearchInput)
          this.$router.push({
            path: `/company/${this.company.id}/products`,
          })
        }
      },

      handleScroll() {
        const obj = document.querySelector('#bannerTabs')
        const { top } = obj.getBoundingClientRect()
        const height = document.documentElement.clientHeight
        this.scrolledToTabs = top < height && top > 0

        this.$emit('scrolled', this.scrolledToTabs)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header-mob-logo {
    & svg {
      margin-top: 8px;
      width: 60.31px;
      height: 18.67px;
    }
  }
</style>
