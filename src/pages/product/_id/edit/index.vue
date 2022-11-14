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
    middleware: 'auth',

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
            hid: 'title',
            name: 'title',
            title: `Редактировать товар - ${this.product.name} | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Редактировать описание товара - ${this.product.description} | VALE.SU`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            title: `Редактировать товар - ${this.product.name} | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Редактировать описание товара - ${this.product.description} | VALE.SU`,
          },
          {
            hid: 'og:image',
            itemprop: 'image',
            property: 'og:image',
            content: `${this.product.images[0]?.url}`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            title: `Редактировать товар - ${this.product.name} | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Редактировать описание товара - ${this.product.description} | VALE.SU`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: `${this.product.images[0]?.url}`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
    },
  }
</script>
