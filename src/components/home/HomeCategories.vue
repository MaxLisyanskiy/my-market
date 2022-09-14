<template>
  <aside class="wrapper-sidebar sidebar">
    <span class="sidebar-title">Категории</span>
    <ul class="sidebar-list">
      <li v-for="category in categories" :key="`${category + category.id}`" class="sidebar-link">
        <NuxtLink :to="`/category/${category.id}`">
          {{ category.name }}
        </NuxtLink>
        <SidebarArrow class="sidebar-link__svg" />
      </li>
    </ul>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'

  import SidebarArrow from '@/assets/img/icons/svg/sidebar-arrow.svg?inline'

  export default {
    name: 'HomeCategories',
    components: { SidebarArrow },
    computed: {
      ...mapState('categories', ['categories']),
    },
  }
</script>
