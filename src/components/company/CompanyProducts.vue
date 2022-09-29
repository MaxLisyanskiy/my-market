<template>
  <section id="Products" class="company content-row">
    <div class="company__wrapper">
      <aside v-if="products.length > 0" class="wrapper-sidebar products-sidebar">
        <div class="products-sidebar__wrapp">
          <span class="products-sidebar__title">Категории</span>
          <ul class="products-sidebar__list">
            <li
              v-for="(category, index) in categoriesProducts"
              :key="index"
              class="products-sidebar__link"
              :class="{ active: categoriesProducts.length <= 1 || activeCategoryId === category.id }"
              @click="handleChooseCategory(category.id)"
            >
              <a>{{ category.name }} ({{ category.countProducts }})</a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="company-products" :class="{ productsNotFound: filteredProducts.length <= 0 }">
        <div class="company-products__top">
          <div class="company-products__top_desk">
            <span class="company-products__title">Все товары</span>
            <span class="company-products__text">Количество товаров: {{ filteredProducts.length }}</span>
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

        <div v-if="filteredProducts.length > 0" class="company-products__row">
          <nuxt-link v-if="showAddProduct" to="/product/add/" class="product product-add">
            <svg
              class="product-add__img"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 17 18"
              fill="none"
            >
              <rect x="0.707153" y="8.29297" width="16" height="1.5" rx="0.75" fill="#656565" />
              <rect
                x="7.7782"
                y="16.7783"
                width="16"
                height="1.5"
                rx="0.75"
                transform="rotate(-90 7.7782 16.7783)"
                fill="#656565"
              />
            </svg>
            <div class="product-wrapper">
              <span class="product-title">Добавить товар</span>
            </div>
          </nuxt-link>

          <nuxt-link
            v-for="product in filteredProducts"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="product"
          >
            <div v-if="showAddProduct" class="edit-product" @click="$router.push(`/product/${product.id}/edit/`)">
              <PencilEditProductSvg />
            </div>
            <!-- <div class="product-img">
              <img v-lazy="product?.images?.[0]?.url" :alt="product.name" />
            </div> -->
            <div class="product-swither">
              <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="product-swither__img" />
            </div>
            <div class="product-wrapper">
              <span class="product-title">{{ product.name }}</span>
              <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
              <span class="product-order">
                Мин. заказ:
                <span class="product-order__pcs">{{ product.min_price.amount }} шт.</span>
              </span>
            </div>
          </nuxt-link>
        </div>

        <CatalogProductsNotFound
          v-if="filteredProducts.length <= 0"
          :search-query="$route.query.q"
          class="company-products__not-found"
        />
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import CatalogProductsNotFound from '@/components/catalog/CatalogProducts/CatalogProductsNotFound.vue'

  import CompanyProductsFilterMobSvg from '@/assets/img/icons/svg/company-products-filter-mob.svg?inline'
  import PencilEditProductSvg from '@/assets/img/icons/svg/pencil-edit-product.svg?inline'

  export default {
    name: 'CompanyProducts',
    components: {
      CatalogProductsNotFound,
      CompanyProductsFilterMobSvg,
      PencilEditProductSvg,
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
    },
    data() {
      return {
        activeCategoryId: null,
      }
    },
    computed: {
      ...mapState('categories', ['categories']),

      categoriesProducts() {
        const categoriesArr = JSON.parse(JSON.stringify(this.categories))

        for (const category of categoriesArr) {
          category.countProducts = 0
        }

        for (const product of this.products) {
          for (const category of categoriesArr) {
            if (product.category_id === category.id) {
              category.countProducts++
            }
          }
        }

        return categoriesArr.filter(item => item.countProducts !== 0)
      },

      filteredProducts() {
        const productsArr = JSON.parse(JSON.stringify(this.products))

        if (this.activeCategoryId) {
          return productsArr.filter(item => item.category_id === this.activeCategoryId)
        }

        return productsArr
      },

      showAddProduct() {
        if (this.$auth.user && this.$auth.user.company_id === this.company.id) {
          return true
        }

        return false
      },

      categoriesProductsClass() {
        if (this.categoriesProducts.length < 1) {
          return true
        }

        return false
      },
    },
    methods: {
      /**
       * Set id for activeCategoryId
       * @param {number} id category id
       */
      handleChooseCategory(id) {
        this.activeCategoryId = id
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
  }
  .company-products__not-found {
    margin-top: 15px !important;
    padding: 30px;
    border-top: 1px solid #e5e0e0;
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

  .product-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #e1e1e1;
    border-radius: 16px;
    &__img {
      width: 100%;
      height: 100px;
    }
  }

  .edit-product {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    background: #e5e0e0;
    padding: 7px;
    border-radius: 50%;
    z-index: 2;
    &:hover {
      border: 1px solid red;
    }

    & svg {
      width: 30px;
      height: 30px;
    }
  }
</style>
