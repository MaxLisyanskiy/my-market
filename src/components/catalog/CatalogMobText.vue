<template>
  <div class="categories-subtitle">
    <template v-if="whatIsPage === 'category'">
      <span>{{ products.length }}</span> {{ getDeclensionWordProduct }} в категории <span>{{ category.name }}</span>
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
      category: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      ...mapState('search', ['searchQuery', 'searchProductsCount']),

      /**
       * Declension word "product" in applyied-text
       *
       * @returns {string} declension word "product
       */
      getDeclensionWordProduct() {
        const expressions = ['товар', 'товара', 'товаров']
        let result = ''
        let count = this.whatIsPage === 'category' ? this.searchProductsCount % 100 : this.products.length % 100

        if (count >= 5 && count <= 20) {
          result = expressions['2']
        } else {
          count = count % 10
          if (count === 1) {
            result = expressions['0']
          } else if (count >= 2 && count <= 4) {
            result = expressions['1']
          } else {
            result = expressions['2']
          }
        }
        return result
      },
    },
  }
</script>
