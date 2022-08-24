<template>
  <div :class="viewMode === 'gallery' ? 'gallery' : 'list'">
    <template v-if="viewMode === 'gallery'">
      <div v-for="index in 20" :key="index" class="product">
        <VueSkeletonLoader
          class="product__img"
          :width="'100%'"
          :height="200"
          animation="fade"
        />
        <VueSkeletonLoader
          class="skeleton-title"
          :width="'100%'"
          animation="fade"
        />
        <VueSkeletonLoader
          class="skeleton-pcs"
          :width="'100%'"
          animation="fade"
        />
      </div>
    </template>
    <template v-else>
      <div v-for="index in 20" :key="index" class="product">
        <div class="product-left">
          <VueSkeletonLoader
            class="product-left__img"
            :width="'100%'"
            animation="fade"
          />
        </div>
        <div class="product-center">
          <VueSkeletonLoader
            class="product-center__title"
            :width="'100%'"
            animation="fade"
          />
          <VueSkeletonLoader
            class="product-center__text"
            :width="'100%'"
            animation="fade"
          />
          <VueSkeletonLoader
            class="product-center__text"
            :width="'100%'"
            animation="fade"
          />
          <VueSkeletonLoader
            class="product-center__description"
            :width="'100%'"
            animation="fade"
          />
        </div>
        <div class="product-right">
          <VueSkeletonLoader
            class="product-right__title"
            :width="'100%'"
            animation="fade"
          />

          <button class="product-call">
            <VueSkeletonLoader
              class="product-call__text"
              :width="'100%'"
              animation="fade"
            />
          </button>
          <button class="product-chat">
            <VueSkeletonLoader
              class="product-chat__text"
              :width="'100%'"
              animation="fade"
            />
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CatalogProductsSkeleton',
    computed: {
      ...mapState('catalog', ['viewMode']),
    },
  }
</script>

<style lang="scss" scoped>
  .skeleton-title {
    margin-top: 12px;
    width: 100%;
    height: 20px;
    border-radius: 8px !important;
  }
  .skeleton-pcs {
    position: absolute !important;
    bottom: 0px;
    width: 100%;
    height: 35px;
    border-radius: 8px !important;
  }
</style>
