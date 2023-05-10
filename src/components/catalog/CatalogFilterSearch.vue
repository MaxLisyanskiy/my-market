<template>
  <div class="applyied-block">
    <div class="applyied-result">
      <div class="applyied-wrapper">
        <button class="applyied-btn" :class="{ active: typeOfSector === 'goods' }" @click="handleChangePage('goods')">
          <AllCategoriesGoodsSvg />
          <span class="applyied-btn__text">Товары</span>
        </button>
        <button
          class="applyied-btn"
          :class="{ active: typeOfSector === 'companies' }"
          @click="handleChangePage('companies')"
        >
          <AllCategoriesCompaniesSvg />
          <span class="applyied-btn__text">Поставщики</span>
        </button>
      </div>
      <span class="applyied-text">
        По запросу "{{ searchQuery }}" {{ getDeclensionWordFound }}
        <span class="applyied-text__orange">{{ searchProductsCount }}</span>
        {{ getDeclensionWordProduct }}</span
      >
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'

  export default {
    name: 'CatalogFilterSearch',
    components: { AllCategoriesGoodsSvg, AllCategoriesCompaniesSvg },
    props: {
      whatIsPage: {
        type: String,
        default: 'goodsCategory',
      },
    },

    computed: {
      ...mapState('search', ['searchQuery', 'searchProductsCount']),
      ...mapState('global', ['typeOfSector']),

      /**
       * Declension word "found" in applyied-text
       *
       * @returns {string} declension word "found"
       */
      getDeclensionWordFound() {
        const expressions = [this.typeOfSector === 'goods' ? 'найден' : 'найдена', 'найдено']
        let result = ''
        let count = this.searchProductsCount % 100

        if (count >= 5 && count <= 20) {
          result = expressions['1']
        } else {
          count = count % 10
          if (count === 1) {
            result = expressions['0']
          } else if (count >= 2 && count <= 4) {
            result = expressions['1']
          } else {
            result = expressions['1']
          }
        }
        return result
      },

      /**
       * Declension word "product" in applyied-text
       *
       * @returns {string} declension word "product
       */
      getDeclensionWordProduct() {
        const expressionsGoods = ['товар', 'товара', 'товаров']
        const expressionsCompanies = ['компания', 'компании', 'компаний']
        let result = ''
        let count = this.searchProductsCount % 100

        const type = this.typeOfSector === 'goods' ? expressionsGoods : expressionsCompanies

        if (count >= 5 && count <= 20) {
          result = type['2']
        } else {
          count = count % 10
          if (count === 1) {
            result = type['0']
          } else if (count >= 2 && count <= 4) {
            result = type['1']
          } else {
            result = type['2']
          }
        }
        return result
      },
    },

    methods: {
      handleChangePage(type) {
        this.$router.push(`/search/?q=${this.$route.query.q}&active=${type}`)
      },
    },
  }
</script>
