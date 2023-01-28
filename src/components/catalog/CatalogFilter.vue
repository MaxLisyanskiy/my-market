<template>
  <div class="applyied-block">
    <div class="applyied-result">
      <div class="applyied-wrapper">
        <button class="applyied-btn" :class="{ active: whatIsPage === 'goodsCategory' }">
          <AllCategoriesGoodsSvg />
          <span class="applyied-btn__text">Товары</span>
        </button>
        <button class="applyied-btn" :class="{ active: whatIsPage === 'companiesCategory' }">
          <AllCategoriesCompaniesSvg />
          <span class="applyied-btn__text">Компании</span>
        </button>
      </div>
      <span v-if="showApplyiedResult" class="applyied-text">
        По запросу "{{ searchQuery }}" {{ getDeclensionWordFound }}
        <span class="applyied-text__orange">{{ searchProductsCount }}</span>
        {{ getDeclensionWordProduct }}</span
      >
    </div>
    <div v-if="false" class="categories-applyied">
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
        <SortingListSvg
          class="sorting-icon sorting-list"
          :class="{ active: viewMode === 'list' }"
          @click="handleChangeViewMode('list')"
        />
        <SortingGallerySvg
          class="sorting-icon sorting-gallery"
          :class="{ active: viewMode === 'gallery' }"
          @click="handleChangeViewMode('gallery')"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import SortingListSvg from '@/assets/img/icons/svg/sorting-list.svg?inline'
  import SortingGallerySvg from '@/assets/img/icons/svg/sorting-gallery.svg?inline'
  import AllCategoriesGoodsSvg from '@/assets/img/icons/svg/categories/all-categories-goods.svg?inline'
  import AllCategoriesCompaniesSvg from '@/assets/img/icons/svg/categories/all-categories-companies.svg?inline'

  export default {
    name: 'CatalogFilter',
    components: { SortingListSvg, SortingGallerySvg, AllCategoriesGoodsSvg, AllCategoriesCompaniesSvg },
    props: {
      whatIsPage: {
        type: String,
        default: 'goodsCategory',
      },
    },
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
