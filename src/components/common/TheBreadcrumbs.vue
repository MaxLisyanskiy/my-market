<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul class="breadcrumb-list">
      <li v-for="(link, index) in breadcrumbsLinks" :key="index" class="breadcrumb-link">
        <NuxtLink :to="link.path">{{ link.name }} </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'TheBreadcrumbs',
    computed: {
      ...mapState('breadcrumbs', ['breadcrumbsLinks']),
    },
  }
</script>
