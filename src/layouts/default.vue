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

    methods: {
      ...mapActions('search', ['SET_SEARCH_QUERY']),
    },
  }
</script>
