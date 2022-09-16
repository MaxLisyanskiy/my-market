<template>
  <section id="Products" class="company content-row">
    <div class="company__wrapper">
      <aside v-if="products.length > 0" class="wrapper-sidebar products-sidebar">
        <div class="products-sidebar__wrapp">
          <span class="products-sidebar__title">Категории</span>
          <ul class="products-sidebar__list">
            <li v-for="(category, index) in categoriesProducts" :key="index" class="products-sidebar__link">
              <a>{{ category.name }}({{ category.countProducts }})</a>
            </li>
          </ul>
        </div>
        <div class="similar-info product-owner">
          <span class="product-owner__title">{{ company.name }}</span>
          <!-- <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)">
              <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF"></path>
              <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB"></path>
              <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B"></path>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <span class="product-owner__address">РСО-А, г. Владикавказ</span> -->
          <div class="similar-info-btns">
            <a :href="`tel:${company.phone}`" class="btn-call similar-info-btns__call">
              <BtnCallSvg class="btn-call__img" />
              <span class="product-call__text">Позвонить</span>
            </a>
            <a :href="`mailto:${company.email}`" class="btn-chat similar-info-btns__chat">
              <BtnMessageSvg class="btn-chat__img" />
              <span class="product-chat__text">Написать в чат</span>
            </a>
          </div>
        </div>
      </aside>

      <aside v-if="products.length <= 0" class="similar-info product-owner aside-not-found">
        <span class="product-owner__title">{{ company.name }}</span>
        <!-- <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)">
              <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF"></path>
              <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB"></path>
              <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B"></path>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <span class="product-owner__address">РСО-А, г. Владикавказ</span> -->
        <div class="similar-info-btns">
          <a :href="`tel:${company.phone}`" class="btn-call similar-info-btns__call">
            <BtnCallSvg class="btn-call__img" />
            <span class="product-call__text">Позвонить</span>
          </a>
          <a :href="`mailto:${company.email}`" class="btn-chat similar-info-btns__chat">
            <BtnMessageSvg class="btn-chat__img" />
            <span class="product-chat__text">Написать в чат</span>
          </a>
        </div>
      </aside>

      <div class="company-products" :class="{ productsNotFound: products.length <= 0 }">
        <div class="company-products__top">
          <div class="company-products__top_desk">
            <span class="company-products__title">Все товары</span>
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
            <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="product-img" />
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
          v-if="products.length <= 0"
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

  import BtnCallSvg from '@/assets/img/icons/svg/btn-call.svg?inline'
  import BtnMessageSvg from '@/assets/img/icons/svg/btn-message.svg?inline'
  import CompanyProductsFilterMobSvg from '@/assets/img/icons/svg/company-products-filter-mob.svg?inline'

  export default {
    name: 'CompanyProducts',
    components: { CatalogProductsNotFound, BtnCallSvg, BtnMessageSvg, CompanyProductsFilterMobSvg },
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
    computed: {
      ...mapState('categories', ['categories']),

      categoriesProducts() {
        const arr = JSON.parse(JSON.stringify(this.categories))

        for (const category of arr) {
          category.countProducts = 0
        }

        for (const product of this.products) {
          for (const category of arr) {
            if (product.category_id === category.id) {
              category.countProducts++
            }
          }
        }

        return arr.filter(item => item.countProducts !== 0)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .productsNotFound {
    width: 100%;
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
</style>
