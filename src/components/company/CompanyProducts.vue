<template>
  <section id="Products" class="company content-row">
    <div class="company__wrapper">
      <aside v-if="products.length > 0" class="wrapper-sidebar products-sidebar">
        <div class="products-sidebar__wrapp">
          <span class="products-sidebar__title">Категории</span>
          <ul class="products-sidebar__list">
            <li
              v-for="(category, index) in productsCategories"
              :key="index"
              class="products-sidebar__link"
              :class="{ active: activeCategory.id === category.id }"
              @click="handleChooseCategory(category)"
            >
              <a>{{ category.name }} ({{ category.products_count }})</a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="company-products" :class="{ productsNotFound: products.length <= 0 }">
        <div class="company-products__top">
          <div class="company-products__top_desk">
            <span class="company-products__title">{{ activeCategory.name }}</span>
            <span class="company-products__text">Количество товаров: {{ products.length }}</span>
            <div v-if="products.length > 0" class="categories-select company-products__select">
              <img src="@/assets/img/icons/svg/select.svg" alt="" class="categories-select__img" />
              <select>
                <option class="categories-select__option" value="Naples">Сначала дешёвые</option>
                <option class="categories-select__option" value="London">2</option>
                <option class="categories-select__option" value="Berlin">3</option>
                <option class="categories-select__option" value="New York">4</option>
                <option class="categories-select__option" value="Frattamaggiore">5</option>
              </select>
            </div>
          </div>
          <div class="company-products__top_mob">
            <p class="company-products__title">
              Все товары <span class="company-products__title_span">({{ products.length }})</span>
            </p>
            <button>
              <CompanyProductsFilterMobSvg />
            </button>
          </div>
        </div>

        <div v-if="products.length > 0" class="company-products__row">
          <nuxt-link v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="product">
            <div class="product-wrapper">
              <div class="product-gallery">
                <div class="product-gallery__link">
                  <div
                    v-if="showAddProduct"
                    class="product-combobox__dots"
                    :class="{ active: activeDots === product.id }"
                    @click.stop="e => handleSetActiveDots(e, product.id)"
                    @touchstart.stop="e => handleSetActiveDots(e, product.id)"
                  >
                    <DotsCompanyProductsSvg />
                  </div>
                  <div class="product-combobox" :class="{ active: activeDots === product.id }">
                    <button
                      class="product-combobox__btn product-combobox__edit"
                      @click.stop="e => handleGoToEditProduct(e, product.id)"
                    >
                      Изменить
                    </button>
                    <button class="product-combobox__btn" @click.stop="e => handleDeleteProduct(e, product.id)">
                      Удалить
                    </button>
                  </div>
                  <div class="product-switcher">
                    <div class="product-switcher__imgs">
                      <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
                    </div>
                  </div>
                </div>
                <div class="product-text">
                  <span class="product-title">{{ product.name }}</span>
                  <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
                  <span class="product-order"
                    >Мин. заказ: <span class="product-order__pcs">{{ product.min_price.amount }} шт.</span></span
                  >
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <CatalogProductsNotFound :search-query="$route.query.q" class="company-products__not-found" />
  </section>
</template>

<script>
  import CatalogProductsNotFound from '@/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'
  import CompanyProductsFilterMobSvg from '@/assets/img/icons/svg/company-products-filter-mob.svg?inline'
  import DotsCompanyProductsSvg from '@/assets/img/icons/svg/dots-company-products.svg?inline'

  export default {
    name: 'CompanyProducts',
    components: {
      CatalogProductsNotFound,
      CompanyProductsFilterMobSvg,
      DotsCompanyProductsSvg,
    },
    props: {
      products: {
        type: Array,
        default: () => [],
      },
      company: {
        type: Object,
        default: () => {},
      },
      categories: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        activeDots: null,
        productsCategories: [],
        activeCategory: {
          id: null,
          name: null,
          products_count: null,
        },
      }
    },
    computed: {
      showAddProduct() {
        if (this.$auth.user && this.$auth.user.company_id === this.company.id) {
          return true
        }

        return false
      },
    },
    mounted() {
      if (this.products.length <= 0) {
        return (this.activeCategory = {
          id: null,
          name: 'Все товары',
          products_count: 0,
        })
      }

      if (this.$route.query.category) {
        const cloneCategories = JSON.parse(JSON.stringify(this.categories))
        this.activeCategory = cloneCategories.filter(item => +item.id === +this.$route.query.category)[0]
        this.productsCategories = this.categories
      } else {
        this.setCategories()
      }
    },
    methods: {
      /**
       * Set active category
       * @param {object} category category object
       */
      handleChooseCategory(category) {
        this.activeCategory = category
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, category: category.id },
        })
      },
      setCategories() {
        if (this.categories.length <= 2) {
          this.productsCategories.push(this.categories[1])
          this.activeCategory = this.categories[1]
        } else {
          this.productsCategories = this.categories
          this.activeCategory = this.categories[0]
        }
      },

      handleSetActiveDots(e, id) {
        e.preventDefault()
        this.activeDots = this.activeDots === id ? null : id
      },

      handleGoToEditProduct(e, id) {
        e.preventDefault()

        this.$router.push(`/product/${id}/edit/`)
      },

      handleDeleteProduct(e, id) {
        e.preventDefault()

        this.$emit('delete', id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product {
    position: relative;
  }
  .productsNotFound {
    width: 100%;
    margin: 0;
    display: none;
  }
  .company-products__not-found {
    padding: 0 30px;
  }
  .aside-not-found {
    margin-top: 0px;
    margin-left: 0px;
    width: 30%;
    height: fit-content;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .product-combobox {
    position: absolute;
    top: 50px;
    z-index: 3;
    display: none;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
    transition: all 0.3s ease;
    @media (max-width: 768px) {
      top: 48px;
    }
    &.active {
      display: flex;
    }

    &__dots {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 2;
      display: flex;
      padding: 6.5px 15.5px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      transition: all 0.3s ease;
      @media (max-width: 768px) {
        top: 6px;
        right: 6px;
        padding: 8px 16px;
      }
      &.active {
        background: rgba(64, 64, 64, 0.9);
      }
      &:hover {
        background: rgba(64, 64, 64, 0.9);
      }
      & svg {
        width: 4px;
        height: 20px;
      }
    }

    &__btn {
      background: rgba(64, 64, 64, 0.9);
      border-radius: 5px;
      height: 32px;
      font-weight: 500;
      font-size: 14px;
      color: #ffffff;
      transition: all 0.2s ease;
      &:hover {
        background-color: #404040;
      }
    }

    &__edit {
      margin-bottom: 6px;
    }
  }
</style>
