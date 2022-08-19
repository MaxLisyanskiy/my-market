<template>
  <ul class="categories-sidebar__menu">
    <li
      v-for="(category, index) in categories"
      :key="category"
      class="categories-sidebar__link"
    >
      <NuxtLink :to="`/category/${index}`">{{ category }}</NuxtLink>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'CatalogSidebarMenu',
    data() {
      return {
        categories: [
          'Банки',
          'Бутылки',
          'Бутыли, балоны, графины',
          'Крышки, пробки, колпаки',
          'Оборудование, станки',
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  a.nuxt-link-active {
    background: #ff5833;
    height: 24px;
    width: 224px;
    border-radius: 5px;
    color: #ffffff;
    align-items: center;
    display: flex;
    margin-left: -10px;
    box-sizing: border-box;
    padding: 4px 0 4px 10px;
    margin-bottom: 4px;
    &:hover {
      color: #ffffff;
    }
  }
  /* exact link will show the primary color for only the exact matching link */
  a.nuxt-link-exact-active {
  }
</style>
