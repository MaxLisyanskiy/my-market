<template>
  <ProductEditor :form="form" :is-updating-product="true" :product-id="Number($route.params.id)" />
</template>

<script>
  import { mapMutations } from 'vuex'

  import ProductEditor from '@/components/product/ProductEditor.vue'

  export default {
    name: 'ProductIdEditPage',
    components: { ProductEditor },
    layout: 'default',
    async asyncData({ app, store, params }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get product by ID
      const { product } = await app.$productService.getProductById(params.id)

      // Get category by ID
      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(product.category_id)

      // Set form with product-data for ProductEditor
      const form = {
        name: product.name,
        description: product.description,
        prices: product.prices,
        specs: product.specs,
        status: 1,
        category_id: product.category_id,
        images: product.images,
      }

      return { product, category, form }
    },
    fetch() {
      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: [
          { name: 'Главная', path: '/' },
          {
            name: `${this.category.name}`,
            path: `/category/${this.category.id}`,
          },
          {
            name: `${this.product.name}`,
            path: `/product/${this.product.id}`,
          },
          {
            name: 'Редактировать товар',
            path: `/product/${this.product.id}/edit/`,
          },
        ],
      })
    },
    head() {
      return {
        title: `Редактировать товар - ${this.product.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Редактировать товар - ${this.product.name} | VALE.SU`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>
