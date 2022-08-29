<template>
  <div class="applyied-block">
    <div v-if="showApplyiedResult" class="applyied-result">
      <span class="hidden">
        <button class="applyied-btn active">
          <span class="applyied-btn__text">Товары</span>
        </button>
        <button class="applyied-btn">
          <span class="applyied-btn__text">Продавцы</span>
        </button>
      </span>
      <span class="applyied-text"
        >По запросу "{{ searchQuery }}" {{ getDeclensionWordFound }}
        <span class="applyied-text__orange">{{ searchProductsCount }}</span>
        {{ getDeclensionWordProduct }}</span
      >
    </div>
    <div class="categories-applyied">
      <!-- <button class="categories-applyied__btn">Опция #1</button>
      <button class="categories-applyied__btn active">Опция #2</button>
      <button class="categories-applyied__btn">Опция #3</button>

      <button class="categories-applyied__clear">Очистить всё</button> -->

      <!-- <div class="categories-select">
        <select>
          <option class="categories-select__option" value="Naples">Сначала дешёвые</option>
          <option class="categories-select__option" value="London">2</option>
          <option class="categories-select__option" value="Berlin">3</option>
          <option class="categories-select__option" value="New York">4</option>
          <option class="categories-select__option" value="Frattamaggiore">5</option>
        </select>
      </div> -->

      <div class="sorting">
        <svg
          class="sorting-icon sorting-list"
          :class="{ active: viewMode === 'list' }"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="handleChangeViewMode('list')"
        >
          <rect x="13" y="23" width="13" height="2" fill="#FF5833" />
          <rect x="13" y="19" width="13" height="2" fill="#FF5833" />
          <rect x="13" y="15" width="13" height="2" fill="#FF5833" />
          <rect y="14" width="12" height="12" rx="3" fill="#FF5833" />
          <rect x="13" y="9" width="13" height="2" fill="#FF5833" />
          <rect x="13" y="5" width="13" height="2" fill="#FF5833" />
          <rect x="13" y="1" width="13" height="2" fill="#FF5833" />
          <rect width="12" height="12" rx="3" fill="#FF5833" />
        </svg>

        <svg
          class="sorting-icon sorting-gallery"
          :class="{ active: viewMode === 'gallery' }"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="handleChangeViewMode('gallery')"
        >
          <rect x="14" y="14" width="12" height="12" rx="3" fill="#E5E0E0" />
          <rect y="14" width="12" height="12" rx="3" fill="#E5E0E0" />
          <rect x="14" width="12" height="12" rx="3" fill="#E5E0E0" />
          <rect width="12" height="12" rx="3" fill="#E5E0E0" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CatalogFilter',
    data() {
      return {
        showApplyiedResult: false,
      }
    },
    async fetch() {
      await this.handleShowApplyiedResult()
    },
    computed: {
      ...mapState('catalog', ['viewMode']),
      ...mapState('search', ['searchQuery', 'searchProductsCount']),

      /**
       * Declension word "found" in applyied-text
       *
       * @returns {string} declension word "found"
       */
      getDeclensionWordFound() {
        const expressions = ['найден', 'найдено']
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
        const expressions = ['товар', 'товара', 'товаров']
        let result = ''
        let count = this.searchProductsCount % 100

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
    watch: {
      $route() {
        this.handleShowApplyiedResult()
      },
    },
    methods: {
      ...mapActions('catalog', ['CHANGE_VIEW_MODE']),

      /**
       * Toggle products view type
       *
       * @param {string} viewType View type.
       */
      handleChangeViewMode(viewType) {
        if (this.viewMode !== viewType) {
          this.CHANGE_VIEW_MODE(viewType)
        }
      },

      /**
       * Observing the routing. If empty show breadcrumbs, otherwise do not show
       *
       * @returns {boolean} boolean-values for data.show
       */
      handleShowApplyiedResult() {
        const query = this.$router.history.current.query

        if (query && Object.prototype.hasOwnProperty.call(query, 'q')) {
          this.showApplyiedResult = true
        } else {
          this.showApplyiedResult = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .hidden {
    opacity: 0;
  }
</style>
