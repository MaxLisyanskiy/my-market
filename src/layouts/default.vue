<template>
  <main class="content">
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </main>
</template>

<script>
  import TheHeader from '../components/layouts/TheHeader.vue'
  import TheFooter from '~/components/layouts/TheFooter.vue'

  export default {
    components: {
      TheHeader,
      TheFooter,
    },
    // head() {
    //   return {
    //     // Установка rel="canonical" на всех страницах шаблона.
    //     link: [
    //       {
    //         rel: 'canonical',
    //         href: `${process.env.baseUrl}${this.$route.path}`,
    //       },
    //     ],
    //     // Пример установки общих мета-тегов на страницах.
    //     meta: [
    //       {
    //         hid: 'og:url',
    //         property: 'og:url',
    //         content: `${process.env.baseUrl}${this.$route.path}`,
    //       },
    //     ],
    //   }
    // },
  }
</script>
