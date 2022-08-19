<template>
  <section class="applyied">
    <CatalogFilter />
    <div class="categories">
      <CatalogProducts :products="products" />
    </div>
  </section>
</template>

<script>
  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'

  export default {
    name: 'CategoryIdPage',
    components: { CatalogFilter, CatalogProducts },
    layout: 'catalog',

    async asyncData(ctx) {
      const id = await ctx.params.id
      const { data } = await ctx.$axios.$get(`/categories/${id}/products`)
      return {
        products: data.products,
      }
    },

    data() {
      return {
        products: null,
      }
    },
  }
</script>
