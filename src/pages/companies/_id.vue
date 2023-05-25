<template>
  <section class="applyied">
    <CatalogFilter v-if="false" :what-is-page="'companiesCategory'" />
    <CatalogMobText :what-is-page="'category'" :companies="companies" :category="category" />
    <div v-if="companies.length > 0" class="categories">
      <CompaniesCategory :companies="companies" />
      <InfiniteLoading v-if="showInfiniteLoading" spinner="spiral" @infinite="infiniteHandler"></InfiniteLoading>
    </div>
    <CompaniesCategoryNotFound v-else />
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  import CatalogFilter from '~/components/catalog/CatalogFilter.vue'
  import CatalogMobText from '~/components/catalog/CatalogMobText.vue'
  import CompaniesCategory from '~/components/companiesCategory/CompaniesCategory.vue'
  import CompaniesCategoryNotFound from '~/components/companiesCategory/CompaniesCategoryNotFound.vue'

  export default {
    name: 'CompaniesCategoryIdPage',
    components: { CatalogFilter, CatalogMobText, CompaniesCategory, CompaniesCategoryNotFound },
    layout: 'catalog',

    async asyncData({ app, store, params, error }) {
      store.commit('global/SET_TYPE_OF_SECTOR', 'companies')

      let categoryParent = ''
      const { category } = await app.$categoryService.getProductsCategoryById(params.id)

      if (category.depth === 2) {
        const resParent = await app.$categoryService.getProductsCategoryById(category.parent_id)
        categoryParent = resParent.category
      } else {
        categoryParent = category
      }

      if (category) {
        const { companies, pagen } = await app.$companyService.getCompanisByCategoryId(params.id)

        return { category, categoryParent, companies, pagen }
      } else {
        error({ statusCode: 404 })
      }
    },

    data() {
      return {
        category: {},
        companies: [],
        products: [],
        pagen: [],
        countCompanies: 10,
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
            path: `/companies/${this.categoryParent.id}`,
          },
          {
            name: `${this.category.name}`,
            path: `/companies/${this.category.id}`,
          },
        ]
      } else {
        breadcrumbsLinksArr = [
          { name: 'Главная', path: '/' },
          {
            name: `${this.category.name}`,
            path: `/companies/${this.category.id}`,
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
          path: 'companies',
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
        title: `Вид деятельности | ${this.category.name}`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Вид деятельности | ${this.category.name}`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Вид деятельности | ${this.category.name}`,
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
            content: `Вид деятельности | ${this.category.name}`,
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
        if (this.companies.length >= 10 && this.pagen.total > this.products.length) {
          return true
        }
        return false
      },
    },

    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),
      ...mapMutations('categories', ['SET_SIDEBAR_CATEGORIES']),

      // async handleClickPagination(pageNum) {
      //   const { products, pagen } = await this.$categoryService.getProductsCategory(
      //     this.$route.params.id,
      //     pageNum,
      //     this.countProducts
      //   )

      //   this.products = products
      //   this.pagen = pagen

      //   this.$router.push(`${this.$route.path}?p=${pageNum}`)
      // },

      infiniteHandler($state) {

        this.$companyService
          .getCompanisByCategoryId(this.$route.params.id, Number(this.pagen.page) + 1, this.countCompanies)
          .then(({ companies, pagen }) => {
            if (companies.length) {
              this.companies.push(...companies)
              this.pagen = pagen
              if (pagen.total > this.companies.length) {
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
