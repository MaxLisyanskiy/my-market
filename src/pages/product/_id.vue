<template>
  <!-- TODO -->
  <h1 class="product-id-page__title">В разработке...</h1>

  <!-- <div>
    <div class="wrapper wrapper-product">
      <div class="card">
        <div class="product">
          <client-only>
            <div class="product-left">
              <img :src="product.images[0].url" alt="" class="product-left__img" />
              <Swiper ref="swiperPreview" :options="swiperOptionPreview" class="swiper product-swiper">
                <swiper-slide v-for="(image, imageIndex) of product.images" :key="`slider-preview-${imageIndex}`">
                  <div class="product-slider swiper-wrapper">
                    <img :src="image.url" class="swiper-slide product-slider__img" />
                  </div>
                </swiper-slide>
              </Swiper>
              <div class="swiper product-swiper">
                <div class="product-slider swiper-wrapper">
                  <img
                    v-for="item in 10"
                    :key="item"
                    src="img/product.png"
                    alt="product"
                    class="swiper-slide product-slider__img"
                  />
                </div>
                <div class="product-swiper__button-prev"></div>
                <div class="product-swiper__button-next"></div>
              </div>
            </div>
          </client-only>

          <div class="product-center">
            <span class="product-center__title">{{ product.name }}</span>
            <div class="product-center__block">
              <div class="product-block">
                <span class="product-block__price">₽36/шт.</span>
                <span class="product-block__count">1,000-1,999</span>
                <span class="product-block__text">шт.</span>
              </div>

              <div class="product-block">
                <span class="product-block__price">₽36/шт.</span>
                <span class="product-block__count">1,000-1,999</span>
                <span class="product-block__text">шт.</span>
              </div>

              <div class="product-block">
                <span class="product-block__price">₽36/шт.</span>
                <span class="product-block__count">1,000-1,999</span>
                <span class="product-block__text">шт.</span>
              </div>

              <div class="product-block">
                <span class="product-block__price">₽36/шт.</span>
                <span class="product-block__count">1,000-1,999</span>
                <span class="product-block__text">шт.</span>
              </div>
            </div>

            <div class="product-rectangle">
              <div class="rectangle-block">
                <span class="rectangle-block__text">Цвет:</span>
                <div class="rectangle-row">
                  <img src="img/Баллон 10лит 1.png" alt="" class="rectangle-row__img" />
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
                <img src="img/icons/flag-russia.svg" alt="" class="rectangle-from__flag" />
                <span class="rectangle-from__location">РСО-А, г. Владикавказ</span>
              </div>
            </div>
          </div>

          <div class="product-right">
            <div class="product-owner">
              <span class="product-owner__title">{{ company.name }}</span>
              <img src="img/flag_rus.png" alt="" class="product-owner__flag" />
              <span class="product-owner__address">РСО-А, г. Владикавказ</span>
              <button class="btn-call product-owner__call">Позвонить</button>
              <button class="btn-chat product-owner__chat">Написать</button>
            </div>

            <div class="schedule">
              <span class="schedule__text">График цен</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-description">
      <div class="tabs">
        <ul class="tabs-menu">
          <li class="tabs-menu__link active">Описание</li>
          <li class="tabs-menu__link">Вопросы и ответы</li>
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
      </div>

      <div class="similar">
        <div class="similar-row">
          <span class="similar-row__title">Похожее у продавца</span>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
            <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
            <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
            <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
          </div>
        </div>
        <div class="similar-info product-owner">
          <span class="product-owner__title">ООО “Стеклянные банки”</span>
          <img src="img/flag_rus.png" alt="" class="product-owner__flag" />
          <span class="product-owner__address">РСО-А, г. Владикавказ</span>
          <button class="btn-call product-owner__call">Позвонить</button>
          <button class="btn-chat product-owner__chat">Написать</button>
        </div>
      </div>

      <div class="watched">
        <span class="watched-title">Вы смотрели ранее</span>
        <div class="watched-row">
          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>

          <div class="product">
            <img src="img/Баллон 10лит 1.png" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 82мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
  import { mapMutations } from 'vuex'

  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'ProductIdPage',
    // components: {
    //   Swiper,
    //   SwiperSlide,
    // },
    layout: 'default',

    async asyncData({ app, store, params, query, error }) {
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
        swiperOptionTop: {
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-top-button-next',
            prevEl: '.swiper-top-button-prev',
          },
          pagination: {
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-top-pagination',
          },
          autoHeight: true,
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
        },
        swiperOptionPreview: {
          autoHeight: true,
          spaceBetween: 20,
          navigation: {
            nextEl: '.swiper-detail-button-next',
            prevEl: '.swiper-detail-button-prev',
          },
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
