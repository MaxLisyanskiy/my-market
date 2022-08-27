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
  import TheHeader from '../components/common/TheHeader.vue'
  import TheFooter from '~/components/common/TheFooter.vue'

  export default {
    name: 'DefaultLayout',
    components: {
      TheHeader,
      TheFooter,
    },
  }
</script>
