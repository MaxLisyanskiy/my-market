<template>
  <div class="content">
    <TheHeader />
    <main>
      <TheBreadcrumbs />
      <article class="wrapper">
        <CatalogSidebar />
        <Nuxt />
      </article>
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import TheHeader from '../components/common/TheHeader.vue'
  import TheFooter from '~/components/common/TheFooter.vue'
  import TheBreadcrumbs from '~/components/common/TheBreadcrumbs.vue'
  import CatalogSidebar from '~/components/catalog/CatalogSidebar/index.vue'

  export default {
    name: 'CatalogLayout',
    components: {
      TheHeader,
      TheFooter,
      TheBreadcrumbs,
      CatalogSidebar,
    },
    data() {
      return {
        showBreadcrumbs: true,
      }
    },
    watch: {
      /**
       * Observing the query in the routing. If empty, then clear the input
       */
      $route() {
        const query = this.$router.history.current.query
        if (query && !Object.prototype.hasOwnProperty.call(query, 'q')) {
          this.SET_SEARCH_QUERY('')
          this.showBreadcrumbs = true
        } else {
          this.showBreadcrumbs = false
        }
      },
    },
    methods: {
      ...mapActions('search', ['SET_SEARCH_QUERY']),
    },
  }
</script>
