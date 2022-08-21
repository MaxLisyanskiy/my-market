<template>
  <aside class="categories-sidebar">
    <span class="categories-sidebar__title">Категории</span>
    <CatalogSidebarMenu />
    <!-- <CatalogSidebarFilter /> -->
  </aside>
</template>

<script>
  import CatalogSidebarMenu from './CatalogSidebarMenu.vue'
  // import CatalogSidebarFilter from './CatalogSidebarFilter.vue'
  export default {
    name: 'CatalogSidebar',
    components: { CatalogSidebarMenu },
  }
</script>

<style lang="scss" scoped></style>
