<template>
  <section class="error404">
    <div class="error404__wrapper">
      <Error404Svg class="error404__img" />
      <h1 class="error404__title">СТРАНИЦА НЕ НАЙДЕНА</h1>
      <a href="#" class="error404__btn" @click="goToHome">Вернуться на главную</a>
    </div>
  </section>
</template>

<script>
  import Error404Svg from '@/assets/img/icons/svg/error/error-404.svg?inline'

  export default {
    name: 'Error404',
    components: { Error404Svg },
    methods: {
      goToHome(e) {
        e.preventDefault()
        this.$router.push('/')
      },
    },
  }
</script>
