<template>
  <div class="content">
    <TheHeader />
    <main>
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import TheHeader from '../components/common/TheHeader.vue'
  import TheFooter from '~/components/common/TheFooter.vue'

  export default {
    name: 'DefaultLayout',
    components: {
      TheHeader,
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
