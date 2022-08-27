<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts :products="products" :loading="loading" />
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'
  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  export default {
    name: 'CategoryIdPage',
    components: { CatalogFilter, CatalogProducts },
    layout: 'catalog',

    async asyncData({ store, params, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // Get category in store by ID and overwrite in data.
      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(params.id)

      if (category) {
        return { category }
      } else {
        error({ statusCode: 404 })
      }
    },
    data() {
      return {
        products: null,
        loading: false,
      }
    },
    async fetch() {
      /**
       * Get category products by by ID
       */
      const id = await this.$route.params.id
      await this.onLoadCategoryProducts(id)

      this.SET_BREADCRUMBS([
        { name: 'Главная', path: '/' },
        {
          name: `${this.category.name}`,
          path: `/category/${this.category.id}`,
        },
      ])
    },
    head() {
      return {
        title: `${this.category?.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.category?.name} по ценам от заводов России. Низкие цены доставка в регионы. Гарантия качества.`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
      /**
       * Get category by ID and overwrite in data. Change loading.
       *
       * @async
       * @param {number} id Router params id.
       */
      async onLoadCategoryProducts(id) {
        this.loading = true
        await this.$axios
          .$get(`/categories/${id}/products?page=1&count=20`)
          .then(({ data }) => {
            this.products = data.products
          })
          .then(() => {
            this.loading = false
          })
      },
    },
  }
</script>
