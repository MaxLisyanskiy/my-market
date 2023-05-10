<template>
  <div class="applyied-block">
    <div class="applyied-result">
      <div class="applyied-wrapper">
        <button
          class="applyied-btn"
          :class="{ active: whatIsPage === 'goodsCategory' }"
          @click="handleChangePage('good')"
        >
          <AllCategoriesGoodsSvg />
          <span class="applyied-btn__text">Товары</span>
        </button>
        <button
          class="applyied-btn"
          :class="{ active: whatIsPage === 'companiesCategory' }"
          @click="handleChangePage('company')"
        >
          <AllCategoriesCompaniesSvg />
          <span class="applyied-btn__text">Поставщики</span>
        </button>
      </div>
    </div>
    <div v-if="false" class="categories-applyied">
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

    computed: {
      ...mapState('catalog', ['viewMode']),
      ...mapState('search', ['searchQuery', 'searchProductsCount']),
    },

    methods: {
      // ...mapActions('catalog', ['CHANGE_VIEW_MODE']),

      // /**
      //  * Toggle products view type
      //  *
      //  * @param {string} viewType View type.
      //  */
      // handleChangeViewMode(viewType) {
      //   if (this.viewMode !== viewType) {
      //     this.CHANGE_VIEW_MODE(viewType)
      //   }
      // },

      handleChangePage(type) {
        if (type === 'good') {
          this.$router.push(`/category/${this.$route.params.id}`)
        } else {
          this.$router.push(`/companies/${this.$route.params.id}`)
        }
      },
    },
  }
</script>
