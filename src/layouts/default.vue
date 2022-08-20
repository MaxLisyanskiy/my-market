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
  import TheHeader from '../components/layouts/TheHeader.vue'
  import TheFooter from '~/components/layouts/TheFooter.vue'

  export default {
    name: 'DefaultLayout',
    components: {
      TheHeader,
      TheFooter,
    },
  }
</script>
