<template>
  <main>
    <h1>{{ errorText }}</h1>
    <nuxt-link to="/">Перейти на главную страницу.</nuxt-link>
  </main>
</template>

<script>
  export default {
    name: 'ErrorLayout',
    props: {
      error: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      texts: {
        404: {
          title: '404. Page not found',
          subtitle: 'Something went wrong, no such address exists',
        },
        default: {
          title: 'Unknown error',
          subtitle:
            'Something went wrong, but we`ll try to figure out what`s wrong',
        },
      },
    }),
    computed: {
      errorText() {
        const { statusCode } = this.error
        return this.texts[statusCode] || this.texts.default
      },
    },
  }
</script>
