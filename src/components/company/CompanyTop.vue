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
        <div class="banner-search">
          <input placeholder="Искать в этом магазине..." type="text" class="banner-search__input" />
          <button class="banner-search__btn">Поиск</button>
        </div>
        <input type="text" class="banner-input" />
      </div>
    </div>

    <div class="banner-tabs">
      <div class="banner-tabs__list">
        <nuxt-link :to="`/company/${company.id}`" class="banner-tabs__link" :class="{ active: activeTab === 'Main' }">
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
  }
</script>

<style lang="scss" scoped></style>
