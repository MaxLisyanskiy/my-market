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
        title: `Профиль компании | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Профиль компании | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Мы гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Профиль компании | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Мы гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `Профиль компании | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Мы гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
        ],
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
