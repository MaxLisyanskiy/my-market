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
  }
</script>
