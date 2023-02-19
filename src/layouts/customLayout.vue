<template>
  <div class="content">
    <main>
      <Nuxt />
    </main>
    <TheFooter v-if="showMFooterOnAuthPages" />
  </div>
</template>

<script>
  import TheFooter from '../components/common/TheFooter/TheFooter.vue'

  export default {
    name: 'CustomLayout',
    components: { TheFooter },
    computed: {
      showMFooterOnAuthPages() {
        if (this.$route.name === 'login' || this.$route.name === 'forget' || this.$route.name === 'signup') {
          return true
        }
        return false
      },
    },
  }
</script>
