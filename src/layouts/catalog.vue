<template>
  <main class="content">
    <TheHeader />
    <TheBreadcrumbs />
    <div class="wrapper">
      <CatalogSidebar />
      <Nuxt />
    </div>
    <TheFooter />
  </main>
</template>

<script>
  import TheHeader from '../components/layouts/TheHeader.vue'
  import TheFooter from '~/components/layouts/TheFooter.vue'
  import TheBreadcrumbs from '~/components/layouts/TheBreadcrumbs.vue'
  import CatalogSidebar from '~/components/catalog/CatalogSidebar/index.vue'

  export default {
    components: {
      TheHeader,
      TheFooter,
      TheBreadcrumbs,
      CatalogSidebar,
    },
  }
</script>
