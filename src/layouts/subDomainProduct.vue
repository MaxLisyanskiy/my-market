<template>
  <div class="content">
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'DefaultLayout',
    async fetch() {
      await this.SET_SEARCH_QUERY('')
    },

    head() {
      const canonical = `${process.env.ORIGIN_URL}${this.$route.path.toLowerCase().replace(/\/$/, '')}`
      return {
        link: [{ rel: 'canonical', href: canonical }],
      }
    },
    computed: {
      ...mapState('breadcrumbs', ['showBreadcrumbs']),
    },
    watch: {
      // Observing the query in the routing. If empty, then clear the input
      $route() {
        const query = this.$router.history.current.query
        if (query && !Object.prototype.hasOwnProperty.call(query, 'q')) {
          this.SET_SEARCH_QUERY('')
        }
      },
    },
    methods: {
      ...mapActions('search', ['SET_SEARCH_QUERY']),
    },
  }
</script>
