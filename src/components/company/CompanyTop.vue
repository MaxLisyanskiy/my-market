<template>
  <div :scroll="handleScroll">
    <!-- Banner Desktop -->
    <section class="banner">
      <div class="banner-info">
        <div class="banner-info-left">
          <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="banner-info__logo" />
          <img
            v-else
            src="@/assets/img/icons/company-not-found-img.svg"
            alt="company-not-found-img"
            class="banner-info__logo"
          />
          <div class="banner-info__text">
            <h1 class="banner-info__title">{{ company.name }}</h1>
            <div class="banner-info__description">
              <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <span>{{ company.email }}</span>
              </a>
            </div>
            <div v-if="!isCompanyOwner" class="banner-info__btns">
              <a :href="`tel:${company.phone}`" class="banner-info__btns_call"> Позвонить </a>
              <a :href="`mailto:${company.email}`" class="banner-info__btns_write"> Написать </a>
            </div>
            <div v-else class="banner-info__btns">
              <button class="banner-info__btns_edit">Редактировать профиль</button>
            </div>
          </div>
        </div>
        <div class="banner-info-right">
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

          <div v-if="isCompanyOwner" class="banner-info-right__btns">
            <nuxt-link to="/product/add/" class="banner-info-right__add">
              <CompanyAddProductPlusSvg />
              <span>Добавить товар</span>
            </nuxt-link>
            <nuxt-link :to="`/company/${company.id}/settings/`" class="banner-info-right__settings">
              <CompanySettingsSvg />
              <span>Настройки</span>
            </nuxt-link>
          </div>
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
            Главная <CompanyArrowDownSvg v-if="activeTab === 'Main'" />
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары <CompanyArrowDownSvg v-if="activeTab === 'Products'" />
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании <CompanyArrowDownSvg v-if="activeTab === 'About'" />
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Mob -->
    <section v-show="!isComapnySettings" class="banner-mob">
      <div class="banner-mob-top" :class="{ owner: isCompanyOwner, search: showSearchInput }">
        <template v-if="!isCompanyOwner">
          <nuxt-link v-if="firstPageVisit" to="/" class="header-mob-logo">
            <LogoSvg />
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
        </template>
        <template v-else>
          <div class="banner-mob-top__left">
            <button v-if="!firstPageVisit && !showSearchInput" class="banner-mob-top__back" @click="$router.go(-1)">
              <CompanyHeaderBackSvg />
            </button>
            <button v-else-if="showSearchInput" class="banner-mob-top__back" @click="() => (showSearchInput = false)">
              <CompanyHeaderBackSvg />
            </button>
          </div>
          <nuxt-link v-show="!showSearchInput" to="/" class="header-mob-logo banner-mob-top__logo">
            <LogoSvg />
          </nuxt-link>
          <form
            type="search"
            class="banner-mob-top__form owner"
            :class="{ active: showSearchInput }"
            @submit.prevent="handleSearchCompanyProducts"
          >
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
          <div v-show="!showSearchInput" class="banner-mob-top__right">
            <div class="banner-mob-top__right_btns">
              <button class="banner-mob-top__right_search" @click="() => (showSearchInput = true)">
                <img src="@/assets/img/icons/svg/company/company-owner-search.svg" alt="company-owner-search" />
              </button>
              <nuxt-link to="/product/add/" class="banner-mob-top__right_plus">
                <img src="@/assets/img/icons/svg/company/company-owner-plus.svg" alt="company-owner-plus" />
              </nuxt-link>
              <nuxt-link :to="`/company/${company.id}/settings/`">
                <CompanyOwnerSettingsSvg />
              </nuxt-link>
            </div>
          </div>
        </template>
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
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <span>{{ company.email }}</span>
              </a>
            </div>
          </div>
        </div>
        <div v-if="!isCompanyOwner" class="banner-mob-info__btns">
          <a :href="`tel:${company.phone}`" class="banner-mob-info__call">Позвонить</a>
          <a :href="`mailto:${company.email}`" class="banner-mob-info__chat">Написать в чат</a>
        </div>
        <div v-else class="banner-mob-info__btns">
          <button class="banner-mob-info__edit">Редактировать профиль</button>
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
              Главная <CompanyArrowDownSvg v-if="activeTab === 'Main'" />
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/products`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'Products' }"
            >
              Товары <CompanyArrowDownSvg v-if="activeTab === 'Products'" />
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/about/`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'About' }"
            >
              О компании <CompanyArrowDownSvg v-if="activeTab === 'About'" />
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
          <nuxt-link v-else :to="`/company/${company.id}/settings/`" class="banner-tabs-connection__settings">
            <CompanySettingsSvg />
            <span>Настройки</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'
  import CompanyArrowDownSvg from '@/assets/img/icons/company-arrow-down.svg?inline'

  import CompanyHeaderBackSvg from '@/assets/img/icons/svg/company/company-header-back.svg?inline'
  import CompanyHeaderSearchSvg from '@/assets/img/icons/svg/company/company-header-search.svg?inline'
  import CompanyAddProductPlusSvg from '@/assets/img/icons/svg/company/company-add-product-plus.svg?inline'
  import CompanySettingsSvg from '@/assets/img/icons/svg/company/company-settings.svg?inline'

  import CompanyOwnerSettingsSvg from '@/assets/img/icons/svg/company/company-owner-settings.svg?inline'

  export default {
    name: 'CompanyTop',
    components: {
      LogoSvg,
      CompanyHeaderBackSvg,
      CompanyHeaderSearchSvg,
      CompanyArrowDownSvg,
      CompanyAddProductPlusSvg,
      CompanySettingsSvg,
      CompanyOwnerSettingsSvg,
    },
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
        showSearchInput: false,
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
