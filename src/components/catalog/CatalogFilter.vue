<template>
  <div class="applyied-block">
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
    computed: {
      ...mapState('catalog', ['viewMode']),
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
    },
  }
</script>

<style lang="scss" scoped></style>
