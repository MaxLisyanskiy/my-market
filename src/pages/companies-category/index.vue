<template>
  <h1>Страница "Виды деятельности"</h1>
</template>

<script>
  export default {
    name: 'CompaniesCategoryMainPage',
    layout: 'default',

    head() {
      return {
        title: 'Страница "Виды деятельности"',
      }
    },

    created() {
      this.redirectToMainPage()
    },

    methods: {
      redirectToMainPage() {
        if (process.browser) {
          this.$router.push('/')
        }
      },
    },
  }
</script>
