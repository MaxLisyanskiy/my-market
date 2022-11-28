<template>
  <div class="not-found">
    <SearchNotFoundSvg />
    <div class="not-found__wrapper">
      <p class="not-found__title">По запросу “{{ searchQuery }}” ничего не найдено</p>
      <p class="not-found__subtitle">Попробуйте написать название товара по-другому или сократить запрос.</p>
    </div>
  </div>
</template>

<script>
  import SearchNotFoundSvg from '@/assets/img/icons/svg/search-not-found.svg?inline'

  export default {
    name: 'CatalogProductsNotFound',
    components: { SearchNotFoundSvg },
    props: {
      searchQuery: {
        type: String,
        default: () => '',
      },
    },
  }
</script>

<style lang="scss" scoped>
  .not-found {
    margin-top: 37px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .not-found__wrapper {
    margin-top: 28px;
    text-align: center;
  }
  .not-found__title {
    font-weight: 500;
    font-size: 16px;
    color: #262626;
  }
  .not-found__subtitle {
    font-weight: 400;
    font-size: 14px;
    color: #808080;
    line-height: 16px;
    margin-top: 10px;
  }
</style>
