<template>
  <section class="applyied">
    <CatalogFilter :what-is-page="'goodsCategory'" />
    <CatalogMobText :what-is-page="'category'" :products="products" :category="category" />
    <div v-if="products.length > 0" class="categories">
      <CatalogProducts :products="products" />
      <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading>
    </div>
    <CompaniesCategoryNotFound v-else />
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CatalogProducts from '~/components/catalog/CatalogProducts/index.vue'
  import CompaniesCategoryNotFound from '~/components/companiesCategory/CompaniesCategoryNotFound.vue'

  export default {
    name: 'CategoryIdPage',
    components: { CatalogFilter, CatalogMobText, CatalogProducts, CompaniesCategoryNotFound },
    layout: 'catalog',

    async asyncData({ app, store, params, query, error }) {
      store.commit('global/SET_TYPE_OF_SECTOR', 'goods')

      let categoryParent = ''
      const { category } = await app.$categoryService.getProductsCategoryById(params.id)

      if (category.depth === 2) {
        const resParent = await app.$categoryService.getProductsCategoryById(category.parent_id)
        categoryParent = resParent.category
      } else {
        categoryParent = category
      }

      // If the category is valid, get the products of the category. If not, go to the error page 404
      if (category) {
        const { products, pagen } = await app.$categoryService.getProductsCategory(params.id, query.p ?? 1, 20)
        return { category, categoryParent, products, pagen }
      } else {
        error({ statusCode: 404 })
      }
    },

    data() {
      return {
        category: {},
        categoryParent: {},
        products: [],
        pagen: [],
        countProducts: 20,
        image: '',
      }
    },

    fetch() {
      let breadcrumbsLinksArr = []

      if (this.category.id !== this.categoryParent.id) {
        breadcrumbsLinksArr = [
          { name: 'Главная', path: '/' },
          {
            name: `${this.categoryParent.name}`,
            path: `/category/${this.categoryParent.id}`,
          },
          {
            name: `${this.category.name}`,
            path: `/category/${this.category.id}`,
          },
        ]
      } else {
        breadcrumbsLinksArr = [
          { name: 'Главная', path: '/' },
          {
            name: `${this.category.name}`,
            path: `/category/${this.category.id}`,
          },
        ]
      }

      // Set links and name for breadcrumbs
      this.SET_BREADCRUMBS({
        breadcrumbsLinks: breadcrumbsLinksArr,
      })

      this.SET_SIDEBAR_CATEGORIES([
        {
          name: this.categoryParent.name,
          path: 'category',
        },
        [
          {
            name: 'Все подкатегории',
            id: this.categoryParent.id,
          },
          ...this.categoryParent.children,
        ],
      ])
    },

    head() {
      return {
        title: `Категория | ${this.category.name}`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: ``,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `Категория | ${this.category.name}`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: ``,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
        ],
      }
    },

    computed: {
      showInfiniteLoading() {
        if (this.products.length >= 20 && this.pagen.total > this.products.length) {
          return true
        }
        return false
      },
    },

    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
      ...mapMutations('categories', ['SET_SIDEBAR_CATEGORIES']),

      /**
       * Get category products with configs after change page in pagination
       * @param {number} pageNum page number in pagination
       * @returns {object} Object with field products, pages
       */
      async handleClickPagination(pageNum) {
        const { products, pagen } = await this.$categoryService.getProductsCategory(
          this.$route.params.id,
          pageNum,
          this.countProducts
        )

        this.products = products
        this.pagen = pagen

        this.$router.push(`${this.$route.path}?p=${pageNum}`)
      },

      infiniteHandler($state) {
        this.$categoryService
          .getProductsCategory(this.$route.params.id, this.pagen.page + 1, this.countProducts)
          .then(({ products, pagen }) => {
            if (products.length) {
              this.products.push(...products)
              this.pagen = pagen
              if (pagen.total > this.products.length) {
                $state.complete()
              } else {
                $state.loaded()
              }
            } else {
              $state.complete()
            }
          })
      },
    },
  }
</script>
