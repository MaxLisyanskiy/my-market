<template>
  <ul class="categories-sidebar__menu">
    <li v-for="category in categories" :key="`${category + category.id}`" class="categories-sidebar__link">
      <nuxt-link :to="`/category/${category.id}`">
        {{ category.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CatalogSidebarMenu',

    computed: {
      ...mapState('categories', ['categories']),
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
    margin-bottom: -2px;
    &:hover {
      color: #ffffff;
    }
  }
  /* exact link will show the primary color for only the exact matching link */
  a.nuxt-link-exact-active {
  }
</style>