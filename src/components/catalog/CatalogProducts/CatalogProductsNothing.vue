<template>
  <div v-if="searchQuery.length < 1" class="not-found">
    <SearchNotFoundSvg />
    <div class="not-found__wrapper">
      <p class="not-found__title">Похоже, здесь ничего нет</p>
      <p class="not-found__subtitle">Данный продавец ещё не разместил ни одного товара</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SearchNotFoundSvg from '@/assets/img/icons/svg/search-not-found.svg?inline'

  export default {
    name: 'CatalogProductsNothing',
    components: { SearchNotFoundSvg },
    props: {
      searchQuery: {
        type: String,
        default: () => '',
      },
    },
    computed: {
      ...mapState('global', ['typeOfSector']),
    },
  }
</script>

<style src="./CatalogNotFound.scss" lang="scss"></style>