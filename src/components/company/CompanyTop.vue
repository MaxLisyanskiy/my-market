<template>
  <section class="banner">
    <div class="banner-bg">
      <img src="@/assets/img/company-bg_one.png" alt="banner-bg" class="banner-bg__img" />
    </div>

    <div class="banner-info">
      <div class="banner-info__left">
        <img v-lazy="company?.logo" alt="company-logo" class="banner-info__logo" />
        <div class="banner-info__text">
          <span class="banner-info__title">{{ company.name }}</span>
          <span class="banner-info__description">{{ company.description }}</span>
        </div>
      </div>
      <div class="banner-info__right">
        <form type="search" class="banner-search" @submit.prevent="handleSearchCompanyProducts">
          <input
            type="text"
            placeholder="Искать в этом магазине..."
            class="banner-search__input"
            :value="companySearchInput"
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
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'CompanyTop',
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
      ...mapState('company', ['companySearchInput']),
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
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
