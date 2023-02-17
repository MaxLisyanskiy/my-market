<template>
  <div :class="$style.main">
    <SearchNotFoundSvg />
    <div :class="$style.wrapper">
      <p :class="$style.title">Похоже, здесь ничего нет</p>
      <p :class="$style.subtitle">Выберите другую категорию</p>
    </div>
  </div>
</template>

<script>
  import SearchNotFoundSvg from '@/assets/img/icons/svg/search-not-found.svg?inline'

  export default {
    name: 'CompaniesCategoryNotFound',
    components: { SearchNotFoundSvg },
  }
</script>

<style module lang="scss">
  .main {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-top: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #404040;
  }
  .subtitle {
    margin-top: 5px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #808080;
  }
</style>
