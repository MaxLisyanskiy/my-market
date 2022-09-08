<template>
  <div>
    <article class="wrapper-product">
      <section class="card">
        <div class="product">
          <div class="product-left">
            <img src="@/assets/img/product-max.png" alt="" class="product-left__img" />
            <!-- <swiper class="swiper product-swiper" :options="swiperOption2">
              <div class="product-slider swiper-wrapper">
                <swiper-slide v-for="index in 22" :key="index" class="swiper-slide">
                  <img src="@/assets/img/product.png" alt="product" class="product-slider__img" />
                </swiper-slide>
              </div>
              <div slot="button-prev" class="product-swiper__button-prev"></div>
              <div slot="button-next" class="product-swiper__button-next"></div>
            </swiper> -->
            <AppSwiper :swiper-config="swiperConfig" />
          </div>

          <div class="product-center">
            <span class="product-center__title">Банка стеклянная 82мм 500мл для консервирования, хранения сыпучих</span>
            <div class="product-center__block">
              <div v-for="index in 4" :key="index" class="product-block">
                <span class="product-block__price">₽24/шт.</span>
                <span class="product-block__count">1,000-1,999</span>
                <span class="product-block__text">шт.</span>
              </div>
            </div>

            <div class="product-rectangle">
              <div class="rectangle-block">
                <span class="rectangle-block__text">Цвет:</span>
                <div class="rectangle-row">
                  <img src="@/assets/img/Баллон 10лит 1.png" alt="" class="rectangle-row__img" />
                </div>
              </div>
              <div class="rectangle-block">
                <span class="rectangle-block__text">Вес:</span>
                <span class="rectangle-block__value">200 г.</span>
              </div>
              <div class="rectangle-block">
                <span class="rectangle-block__text">Объём:</span>
                <span class="rectangle-block__value">500 мл.</span>
              </div>
              <div class="rectangle-block">
                <span class="rectangle-block__text">Номинальная вместимость:</span>
                <span class="rectangle-block__value">—</span>
              </div>
              <div class="rectangle-block">
                <span class="rectangle-block__text">Полная вместимость:</span>
                <span class="rectangle-block__value">—</span>
              </div>
              <div class="rectangle-block">
                <span class="rectangle-block__text">Диаметр венчика:</span>
                <span class="rectangle-block__value">82 мм.</span>
              </div>

              <div class="rectangle-from">
                <span class="rectangle-from__text">Отправка из:</span>
                <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#a)">
                    <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF" />
                    <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB" />
                    <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z" />
                    </clipPath>
                  </defs>
                </svg>
                <span class="rectangle-from__location">РСО-А, г. Владикавказ</span>
              </div>
            </div>
          </div>

          <div class="product-right">
            <div class="product-owner">
              <span class="product-owner__title">ООО “Стеклянные банки”</span>
              <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#a)">
                  <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF" />
                  <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB" />
                  <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z" />
                  </clipPath>
                </defs>
              </svg>
              <span class="product-owner__address">РСО-А, г. Владикавказ</span>
              <button class="btn-call product-owner__call">
                <svg class="btn-call__img" width="10" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.873 0H1.46C.656 0 0 .656 0 1.459v14.584c0 .803.656 1.459 1.459 1.459h6.416c.803 0 1.459-.656 1.459-1.459V1.459A1.466 1.466 0 0 0 7.874 0ZM3.791 1.166h1.75a.292.292 0 0 1 0 .582h-1.75a.292.292 0 0 1-.291-.291c0-.16.13-.291.291-.291Zm.875 15.75a.874.874 0 0 1-.875-.875c0-.484.39-.875.875-.875.484 0 .875.39.875.875 0 .484-.39.875-.875.875Zm4.084-2.332H.584V2.916H8.75v11.668Z"
                    fill="#fff"
                  />
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
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_515_1843"
                      x1="1"
                      y1="16.5"
                      x2="18.2884"
                      y2="13.085"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F00B1D" />
                      <stop offset="1" stop-color="#FF5833" />
                    </linearGradient>
                  </defs>
                </svg>
                <span class="product-chat__text">Написать в чат</span>
              </button>
            </div>

            <div class="schedule">
              <span class="schedule__text">График цен</span>
            </div>
          </div>
        </div>
      </section>
    </article>

    <article class="product-description">
      <section class="tabs">
        <ul class="tabs-menu">
          <li class="tabs-menu__link">Описание</li>
          <li class="tabs-menu__link active">Вопросы и ответы</li>
        </ul>

        <div class="tabs-block description active">
          <span class="tabs-block__title">Базовая информация</span>
          <div class="tabs-table__row">
            <div class="tabs-table__block">
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
            </div>

            <div class="tabs-table__block">
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
              <div class="tabs-table__left"></div>
              <div class="tabs-table__right"></div>
            </div>
          </div>

          <span class="tabs-block__title">Описание товара</span>
          <span class="tabs-block__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </section>
      <section class="similar">
        <aside class="similar-row">
          <span class="similar-row__title">Похожее у продавца</span>
          <div v-for="index in 3" :key="index" class="product">
            <img src="@/assets/img/img-not_found.jpg" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 182мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
            <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
          </div>
        </aside>
        <aside class="similar-info product-owner">
          <span class="product-owner__title">ООО “Стеклянные банки”</span>
          <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)">
              <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF" />
              <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB" />
              <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z" />
              </clipPath>
            </defs>
          </svg>
          <span class="product-owner__address">РСО-А, г. Владикавказ</span>
          <button class="btn-call product-owner__call">
            <svg class="btn-call__img" width="10" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.873 0H1.46C.656 0 0 .656 0 1.459v14.584c0 .803.656 1.459 1.459 1.459h6.416c.803 0 1.459-.656 1.459-1.459V1.459A1.466 1.466 0 0 0 7.874 0ZM3.791 1.166h1.75a.292.292 0 0 1 0 .582h-1.75a.292.292 0 0 1-.291-.291c0-.16.13-.291.291-.291Zm.875 15.75a.874.874 0 0 1-.875-.875c0-.484.39-.875.875-.875.484 0 .875.39.875.875 0 .484-.39.875-.875.875Zm4.084-2.332H.584V2.916H8.75v11.668Z"
                fill="#fff"
              />
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
              />
              <defs>
                <linearGradient
                  id="paint0_linear_515_1843"
                  x1="1"
                  y1="16.5"
                  x2="18.2884"
                  y2="13.085"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F00B1D" />
                  <stop offset="1" stop-color="#FF5833" />
                </linearGradient>
              </defs>
            </svg>
            <span class="product-chat__text">Написать в чат</span>
          </button>
        </aside>
      </section>
      <section class="watched">
        <span class="watched-title">Вы смотрели ранее</span>
        <div class="watched-row">
          <div v-for="index in 6" :key="index" class="product">
            <img src="@/assets/img/img-not_found.jpg" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import AppSwiper from '../../components/UI/AppSwiper.vue'

  export default {
    name: 'ProductIdPage',
    components: { AppSwiper },
    layout: 'default',

    async asyncData({ app, store, params }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      const { product, company } = await app.$productService.getProductById(params.id)

      const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      const category = await get(product.category_id)

      return { product, company, category }
    },
    data() {
      return {
        product: {},
        company: {},
        swiperConfig: {
          mainClass: 'product-swiper',
          wrapperClass: 'product-slider',
          slidesPerView: 5,
          loop: false,
          direction: this.getDirection(),
          autoplay: false,
          isPagination: false,
          btnPrevClass: 'product-swiper__button-prev',
          btnNextClass: 'product-swiper__button-next',
        },
      }
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
        ],
      })
    },
    head() {
      return {
        title: `${this.product.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.name} - оптом от завода. По низким ценам с доставкой`,
          },
        ],
      }
    },
    methods: {
      ...mapMutations('breadcrumbs', ['SET_BREADCRUMBS']),

      getDirection() {
        if (process.browser) {
          const direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal'

          return direction
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
