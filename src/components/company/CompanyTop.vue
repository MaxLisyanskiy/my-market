<template>
  <div>
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
            <span class="banner-info__title">{{ company.name }}</span>
            <span class="banner-info__description">
              <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                <img src="@/assets/img/icons/company-tel.svg" alt="company-tel" />
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <img src="@/assets/img/icons/company-mail.svg" alt="company-mail" />
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
      <div class="banner-tabs">
        <div class="banner-tabs__list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Mob -->
    <section class="banner-mob">
      <div class="banner-mob-top">
        <button class="banner-mob-top__back" @click="$router.go(-1)">
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
                <img src="@/assets/img/icons/company-tel.svg" alt="company-tel" />
                <span>{{ company.phone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <img src="@/assets/img/icons/company-mail.svg" alt="company-mail" />
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
      <div class="banner-mob-end"></div>
      <div class="banner-tabs">
        <div class="banner-tabs__list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
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

  export default {
    name: 'CompanyTop',
    components: { CompanyHeaderBackSvg, CompanyHeaderSearchSvg },
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
    computed: {
      ...mapState('company', ['companySearchInput', 'companySearchQuery']),
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
            path: `/company/${this.company.id}/products`,
            query: { q: this.companySearchInput },
          })
        } else if (this.companySearchInput !== this.companySearchQuery) {
          this.UPDATE_COMPANY_SEARCH_QUERY(this.companySearchInput)
          this.$router.push({
            path: `/company/${this.company.id}/products`,
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
