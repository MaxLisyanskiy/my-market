<template>
  <!-- TODO -->
  <h1 class="product-id-page__title">В разработке...</h1>

  <!-- <div>
    <div class="banner">
      <div class="banner-bg">
        <img src="@/assets/img/company/banner-image.png" alt="" class="banner-bg__img" />
      </div>
      <div class="banner-info">
        <div class="banner-info__left">
          <img src="@/assets/img/company/company-logo.svg" alt="logo" class="banner-info__logo" />
          <div class="banner-info__text">
            <span class="banner-info__title">{{ company.name }}</span>
            <span class="banner-info__description"></span>
          </div>
        </div>
        <div class="banner-info__right">
          <div class="banner-search">
            <input placeholder="Искать в этом магазине..." type="text" class="banner-search__input" />
            <button class="banner-search__btn">Поиск</button>
          </div>
          <input type="text" class="banner-input" />
        </div>
      </div>

      <div class="banner-tabs">
        <ul class="banner-tabs__list">
          <li class="banner-tabs__link">Главная</li>
          <li class="banner-tabs__link">Товары</li>
          <li class="banner-tabs__link active">О компании</li>
        </ul>
      </div>
    </div>

    <div class="company content-row">
      <div class="wrapper">
        <div class="wrapper-sidebar sidebar">
          <ul class="sidebar-list">
            <li class="sidebar-link">Описание</li>
            <li class="sidebar-link">Производственные мощности</li>
            <li class="sidebar-link">Контроль качества</li>
            <li class="sidebar-link">Сертификаты</li>
            <li class="sidebar-link">Руководство компании</li>
            <li class="sidebar-link">Услуги и поддержка</li>
          </ul>
        </div>

        <div class="company-description">
          <span class="company-description__title">Описание</span>
          <div class="wrapper-slider swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <span class="slider-text">Карусель с баннерами</span>
              </div>
              <div class="swiper-slide">
                <span class="slider-text">Slide 2</span>
              </div>
              <div class="swiper-slide">
                <span class="slider-text">Slide 3</span>
              </div>
              <div class="swiper-slide">
                <span class="slider-text">Slide 4</span>
              </div>
            </div>
            <div class="swiper-pagination"></div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <div class="swiper-scrollbar"></div>
          </div>

          <span class="company-description__text">
            Предприятие ООО «Тамбовконсерв» осуществляет производство металлических крышек для консервирования
            премиум-класса СКО 1-82 и СКО 1-58 под зарегистрированным брендом «Тамбовчанка» с 2005 года. Несмотря на
            большую конкуренцию, предприятие постоянно увеличивает объемы производства. Благодаря тому, что качество,
            внешний вид, а также современная упаковка и тара отвечают требованиям даже самых взыскательных клиентов.
            Продукция ООО «Тамбовконсерв» — это гарантия высокого качества, которое обеспечивается применением только
            сертифицированных материалов и непрерывным контролем инженеров на всех этапах производства. За долгие годы
            работы на предприятии сформировался высококвалифицированный коллектив, а это является показателем
            стабильности предприятия. Наше предприятие — надежный партнер и предлагает Вам свое сотрудничество по
            поставкам производимых им товаров. Отгрузка товара может осуществляться как самовывозом со склада, так и
            нашим транспортом в различные регионы. Работаем ответственно и оперативно. Находим индивидуальный подход к
            каждому клиенту.
          </span>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
  export default {
    name: 'ProductIdPage',
    layout: 'default',

    async asyncData({ app, store, params, query, error }) {
      // Get all categoris
      await store.dispatch('categories/GET_CATEGORIES')

      // const { product, company } = await app.$productService.getProductById(params.id)
      const { company } = await app.$companyService.getCompanyById(params.id)

      // const get = await store.getters['categories/GET_CATEGORY_BY_ID']
      // const category = await get(product.category_id)
      return { company }
    },
    data() {
      return {
        company: {},
      }
    },
    head() {
      return {
        title: `${this.company.name} | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.company.name}  - низкие цены, гарантия качества`,
          },
        ],
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .product-id-page__title {
    text-align: center;
    width: 100%;
    font-size: 30px;
  }
</style>
