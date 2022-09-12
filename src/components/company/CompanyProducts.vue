<template>
  <section id="Products" class="company content-row">
    <div class="wrapper">
      <div class="wrapper-sidebar products-sidebar">
        <span class="products-sidebar__title">Категории</span>
        <ul class="products-sidebar__list">
          <li class="products-sidebar__link"><a>Крышки(999)</a></li>
        </ul>
        <aside class="similar-info product-owner">
          <span class="product-owner__title">ООО “Стеклянные банки”</span>
          <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span class="product-owner__address">РСО-А, г. Владикавказ</span>
          <button class="btn-call product-owner__call">
            <svg class="btn-call__img" width="10" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.873 0H1.46C.656 0 0 .656 0 1.459v14.584c0 .803.656 1.459 1.459 1.459h6.416c.803 0 1.459-.656 1.459-1.459V1.459A1.466 1.466 0 0 0 7.874 0ZM3.791 1.166h1.75a.292.292 0 0 1 0 .582h-1.75a.292.292 0 0 1-.291-.291c0-.16.13-.291.291-.291Zm.875 15.75a.874.874 0 0 1-.875-.875c0-.484.39-.875.875-.875.484 0 .875.39.875.875 0 .484-.39.875-.875.875Zm4.084-2.332H.584V2.916H8.75v11.668Z"
                fill="#fff"
              ></path>
            </svg>
            <span class="product-call__text">Позвонить</span>
          </button>
          <button class="btn-chat product-owner__chat">
            <svg
              class="btn-chat__img"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 1.5H2.5C1.67125 1.5 1.0075 2.17125 1.0075 3L1 16.5L4 13.5H14.5C15.3287 13.5 16 12.8288 16 12V3C16 2.17125 15.3287 1.5 14.5 1.5ZM13 10.5H4V9H13V10.5ZM13 8.25H4V6.75H13V8.25ZM13 6H4V4.5H13V6Z"
                fill="url(#paint0_linear_515_1843)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_515_1843"
                  x1="1"
                  y1="16.5"
                  x2="18.2884"
                  y2="13.085"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F00B1D"></stop>
                  <stop offset="1" stop-color="#FF5833"></stop>
                </linearGradient>
              </defs>
            </svg>
            <span class="product-chat__text">Написать в чат</span>
          </button>
        </aside>
      </div>

      <div class="company-products">
        <div class="company-products__top">
          <span class="company-products__title">Все товары</span>
          <span class="company-products__text">Количество товаров: {{ products.length }}</span>
          <div class="categories-select company-products__select">
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

        <div class="company-products__row">
          <nuxt-link v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="product">
            <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="product-img" />
            <span class="product-title">{{ product.name }}</span>
            <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
            <span class="product-order">
              Мин. заказ:
              <span class="product-order__pcs">{{ product.min_price.amount }} шт.</span>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CompanyProducts',
    props: {
      products: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style lang="scss" scoped></style>
