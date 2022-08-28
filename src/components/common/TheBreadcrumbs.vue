<template>
  <nav v-if="show" class="breadcrumb" aria-label="breadcrumbs">
    <ul class="breadcrumb-list">
      <li
        v-for="(link, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-link"
      >
        <NuxtLink :to="link.path">{{ link.name }} </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'TheBreadcrumbs',
    data() {
      return {
        show: true,
      }
    },
    async fetch() {
      await this.handleShowBreadcrumbs()
    },
    computed: {
      ...mapState('breadcrumbs', ['breadcrumbs']),
    },
    watch: {
      $route() {
        this.handleShowBreadcrumbs()
      },
    },
    methods: {
      /**
       * Observing the query in the routing. If empty show breadcrumbs, otherwise do not show
       *
       * @returns {boolean} boolean-values for data.show
       */
      handleShowBreadcrumbs() {
        const query = this.$router.history.current.query

        if (query && !Object.prototype.hasOwnProperty.call(query, 'q')) {
          this.show = true
        } else {
          this.show = false
        }
      },
    },
  }
</script>
