<template>
  <!-- TODO -->
  <h1 class="product-id-page__title">В разработке...</h1>
</template>

<script>
  export default {
    name: 'ProfilePage',
    layout: 'default',
    middleware: 'auth',

    head() {
      return {
        title: 'Профиль компании | VALE.SU',
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
