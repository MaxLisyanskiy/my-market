<template>
  <div>
    <div v-if="searchQuery.length > 0" class="not-found">
      <SearchNotFoundSvg />
      <div class="not-found__wrapper">
        <p class="not-found__title">По запросу “{{ searchQuery }}” ничего не найдено</p>
        <p class="not-found__subtitle">
          Попробуйте написать название {{ typeOfSector === 'goods' ? 'товара' : 'компании' }} по-другому или сократить
          запрос.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
    computed: {
      ...mapState('global', ['typeOfSector']),
    },
  }
</script>

<style src="./CatalogNotFound.scss" lang="scss"></style>