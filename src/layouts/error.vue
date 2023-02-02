<template>
  <div>
    <template v-if="error.statusCode === 404">
      <TheHeader />
      <main>
        <Error404 />
      </main>
    </template>
    <main v-else>
      <Error500 />
    </main>
  </div>
</template>

<script>
  import TheHeader from '../components/common/TheHeader/index.vue'

  import Error404 from '../components/error/Error404.vue'
  import Error500 from '../components/error/Error500.vue'

  export default {
    name: 'ErrorLayout',
    components: {
      TheHeader,
      Error404,
      Error500,
    },
    layout: 'customLayout',
    props: {
      error: {
        type: Object,
        default: () => {},
      },
    },
    head() {
      const errorMessage = `${this.error.statusCode === 404 ? 'Страница не найдена' : 'Ошибка сервера'} | VALE.SU`

      return {
        title: errorMessage,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: errorMessage,
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .section-error404 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }
</style>
