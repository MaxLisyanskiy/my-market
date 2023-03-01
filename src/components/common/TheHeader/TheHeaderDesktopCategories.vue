<template>
  <div class="header-block header-desktop-categories">
    <div class="header-desktop-categories__btn" @click="active = !active">
      <HeaderDesktopCategoriesSvg />
      <span>Категории</span>
    </div>
    <div class="header-desktop-categories__menu" :class="{ active: active }">
      <div class="header-desktop-categories__menu_left">
        <p
          v-for="category in categoriesLevelTwo"
          :key="category.id"
          :class="{ active: activeCategory === category.id }"
          @mouseenter="activeCategory = category.id"
        >
          {{ category.name }}
          <HeaderDesktopCategoriesArrowSvg />
        </p>
      </div>
      <div class="header-desktop-categories__menu_right">
        <nuxt-link
          v-for="category in categoriesLevelThree"
          v-show="activeCategory === category.parent_id"
          :key="category.id"
          :to="`/category/${category.id}`"
        >
          {{ category.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="header-desktop-categories__background" :class="{ active: active }" @click="active = false"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import HeaderDesktopCategoriesSvg from '@/assets/img/icons/svg/header/header-desktop-categories.svg?inline'
  import HeaderDesktopCategoriesArrowSvg from '@/assets/img/icons/svg/header/header-desktop-categories-arrow.svg?inline'

  export default {
    name: 'TheHeaderDesktopCategories',
    components: { HeaderDesktopCategoriesSvg, HeaderDesktopCategoriesArrowSvg },

    data() {
      return {
        active: false,
        activeCategory: null,
        categoriesLevelTwo: [],
        categoriesLevelThree: [],
      }
    },
    async fetch() {
      const newCategoriesLevelTwo = []
      const newCategoriesLevelThree = []
      let newCategories = []

      if (this.categories.length === 0) {
        const { categories } = await this.$categoryService.getCategories(false)
        newCategories = categories
      } else {
        newCategories = this.categories
      }

      newCategories.map(item => {
        this.activeCategory = item.children[0].id
        newCategoriesLevelTwo.push(...item.children)
        return item.children.map(itemLevelTwo => {
          return newCategoriesLevelThree.push(...itemLevelTwo.children)
        })
      })

      this.categoriesLevelTwo = newCategoriesLevelTwo
      this.categoriesLevelThree = newCategoriesLevelThree
    },
    // watch: {
    //   active() {
    //     if (this.active) {
    //       document.querySelector('body').classList.add('lock')
    //     } else {
    //       document.querySelector('body').classList.remove('lock')
    //     }
    //   },
    // },
    computed: {
      ...mapState('categories', ['categories']),
    },
  }
</script>
