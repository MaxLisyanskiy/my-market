<template>
  <section class="error500">
    <div class="error500__wrapper">
      <Error500Svg class="error500__img" />
      <h1 class="error500__title">ОШИБКА СЕРВЕРА</h1>
      <div class="error500__text">
        <p>На сервере произошла непредвиденная ошибка.</p>
        <p>Пожалуйста, подождите, она в скором времени будет исправлена.</p>
        <p class="error500__text_last">
          Попробуйте <a href="#" class="error500__link" @click="goToHome">вернуться на главную страницу.</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import Error500Svg from '@/assets/img/icons/svg/error/error-500.svg?inline'

  export default {
    name: 'Error500',
    components: { Error500Svg },
    methods: {
      goToHome(e) {
        e.preventDefault()
        const fullPath = this.$router.history.current.fullPath

        if (fullPath !== '/') {
          return this.$router.push('/')
        }
        this.$router.go('/')
      },
    },
  }
</script>

<style src="./error500.scss" lang="scss"></style>
