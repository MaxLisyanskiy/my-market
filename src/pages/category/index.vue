<template>
  <section class="all-categories">
    <ul class="all-categories-nav">
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

    <div v-show="activeTab === 'goods'">
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

    <div v-show="activeTab === 'companies'">
      <ul class="all-categories-list">
        <li
          v-for="companyCategory in companyCategories"
          :key="`${companyCategory.id}`"
          class="all-categories-list__item"
        >
          <span>{{ companyCategory.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import AppCategoriesAccordion from '@/components/UI/AppCategoriesAccordion'

  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'

  export default {
    name: 'CategoryMainPage',
    components: { AppCategoriesAccordion, AllCategoriesGoodsSvg, AllCategoriesCompaniesSvg },
    layout: 'default',

    data() {
      return {
        activeTab: 'goods',
        goodsCategories: [],
        companyCategories: [],
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
      console.log(this.goodsCategories)
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
      ...mapState('categories', ['categories']),
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

      isTheDeskOrMob() {
        if (process.browser) {
          if (window.innerWidth > 670) {
            this.$router.push('/')
          }
        }
      },
    },
  }
</script>
