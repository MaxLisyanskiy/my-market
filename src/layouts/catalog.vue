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
  import TheHeader from '../components/layouts/TheHeader.vue'
  import TheFooter from '~/components/layouts/TheFooter.vue'
  import TheBreadcrumbs from '~/components/layouts/TheBreadcrumbs.vue'
  import CatalogSidebar from '~/components/catalog/CatalogSidebar/index.vue'

  export default {
    name: 'CatalogLayout',
    components: {
      TheHeader,
      TheFooter,
      TheBreadcrumbs,
      CatalogSidebar,
    },
  }
</script>
