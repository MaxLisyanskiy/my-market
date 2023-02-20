<template>
  <aside class="catalogSidebar">
    <p class="catalogSidebar__title">{{ sidebarCategories[0].name }}</p>
    <div class="catalogSidebar__menu">
      <nuxt-link
        v-for="category in sidebarCategories[1]"
        :key="category.id"
        :to="`/${sidebarCategories[0].path}/${category.id}`"
      >
        {{ category.name }}
      </nuxt-link>
    </div>
    <!-- <CatalogSidebarMenu /> -->
    <!-- <CatalogSidebarFilter /> -->
  </aside>
</template>

<script>
  import { mapState } from 'vuex'
  // import CatalogSidebarMenu from './CatalogSidebarMenu.vue'
  // import CatalogSidebarFilter from './CatalogSidebarFilter.vue'
  export default {
    name: 'CatalogSidebar',
    computed: {
      ...mapState('categories', ['sidebarCategories']),
    },
  }
</script>
