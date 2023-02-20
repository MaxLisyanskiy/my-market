<template>
  <client-only>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul class="breadcrumb-list">
        <li v-for="(link, index) in breadcrumbsLinks" :key="index" class="breadcrumb-link">
          <nuxt-link :to="link.path">{{ link.name }} </nuxt-link>
        </li>
      </ul>
    </nav>
  </client-only>
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

<style src="./breadcrumb.scss" lang="scss"></style>
