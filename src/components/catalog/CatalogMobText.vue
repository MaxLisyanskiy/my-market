<template>
  <div class="categories-subtitle">
    <template v-if="whatIsPage === 'category'">
      <span>{{ typeOfSector === 'goods' ? products.length : companies.length }}</span> {{ getDeclensionWordProduct }} в
      категории <span>{{ category.name }}</span>
    </template>
    <template v-else>
      <span>{{ searchProductsCount }}</span> {{ getDeclensionWordProduct }} по запросу <span>{{ searchQuery }}</span>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CatalogMobText',
    props: {
      whatIsPage: {
        type: String,
        default: 'category',
      },
      products: {
        type: Array,
        default: () => [],
      },
      companies: {
        type: Array,
        default: () => [],
      },
      category: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      ...mapState('search', ['searchQuery', 'searchProductsCount']),
      ...mapState('global', ['typeOfSector']),

      /**
       * Declension word "product" in applyied-text
       *
       * @returns {string} declension word "product
       */
      getDeclensionWordProduct() {
        const expressionsGoods = ['товар', 'товара', 'товаров']
        const expressionsCompanies = ['компания', 'компании', 'компаний']
        const type = this.typeOfSector === 'goods' ? expressionsGoods : expressionsCompanies

        let result = ''
        let count = this.typeOfSector === 'goods' ? this.products.length % 100 : this.companies.length % 100

        // if (this.whatIsPage === 'category') {
        //   count = this.products.length % 100
        // } else {
        //   count = this.typeOfSector === 'goods' ? this.products.length % 100 : this.companies.length % 100
        // }

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
  }
</script>
