<template>
  <div class="content">
    <TheHeader />
    <TheBreadcrumbs v-show="showBreadcrumbs" />
    <main>
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import TheHeader from '../components/common/TheHeader/index.vue'
  import TheBreadcrumbs from '../components/common/TheBreadcrumbs/TheBreadcrumbs.vue'
  import TheFooter from '../components/common/TheFooter/TheFooter.vue'

  export default {
    name: 'DefaultLayout',
    components: {
      TheHeader,
      TheBreadcrumbs,
      TheFooter,
    },
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
