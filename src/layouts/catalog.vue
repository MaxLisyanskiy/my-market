<template>
  <div class="content">
    <TheHeader />
    <TheBreadcrumbs v-show="showBreadcrumbs" />
    <main :class="{ mainWrapper: !showBreadcrumbs }">
      <article class="wrapper">
        <CatalogSidebar />
        <Nuxt />
      </article>
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import TheHeader from '../components/common/TheHeader.vue'
  import TheBreadcrumbs from '../components/common/TheBreadcrumbs.vue'
  import TheFooter from '../components/common/TheFooter.vue'

  import CatalogSidebar from '../components/catalog/CatalogSidebar/index.vue'

  export default {
    name: 'CatalogLayout',
    components: {
      TheHeader,
      TheBreadcrumbs,
      TheFooter,
      CatalogSidebar,
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
