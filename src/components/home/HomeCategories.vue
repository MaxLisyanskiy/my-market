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
  import { mapState, mapActions } from 'vuex'

  import SidebarArrow from '@/assets/img/icons/svg/sidebar-arrow.svg?inline'

  export default {
    name: 'HomeCategories',
    components: { SidebarArrow },
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
