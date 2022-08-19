<template>
  <ul class="categories-sidebar__menu">
    <li
      v-for="category in categories"
      :key="`${category + category.id}`"
      class="categories-sidebar__link"
    >
      <NuxtLink :to="`/category/${category.id}`">
        {{ category.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'CatalogSidebarMenu',

    async fetch() {
      await this.GET_CATEGORIES()
    },
    computed: {
      ...mapState('categories', ['categories']),
    },
    methods: {
      ...mapActions('categories', ['GET_CATEGORIES']),
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
