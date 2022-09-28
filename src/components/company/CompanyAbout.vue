<template>
  <section id="About" class="company content-row active">
    <div class="company__wrapper">
      <div class="wrapper-sidebar sidebar" :class="{ fixed: !scrolled }">
        <ul class="sidebar-list">
          <li
            v-for="link in links"
            :key="link.name"
            class="sidebar-link"
            :class="{ active: activeLink === link.goTo }"
            @click="scrollTo(link.goTo)"
          >
            <a>{{ link.name }}</a>
          </li>
        </ul>
      </div>

      <div class="company-description">
        <div ref="description">
          <span class="company-description__title">Описание</span>

          <AppSwiper v-if="company.images.length > 1" :swiper-config="swiperConfig" :images="company.images" />

          <span class="company-description__text">
            Предприятие ООО «Тамбовконсерв» осуществляет производство металлических крышек для консервирования
            премиум-класса СКО 1-82 и СКО 1-58 под зарегистрированным брендом «Тамбовчанка» с 2005 года. Несмотря на
            большую конкуренцию, предприятие постоянно увеличивает объемы производства. Благодаря тому, что качество,
            внешний вид, а также современная упаковка и тара отвечают требованиям даже самых взыскательных клиентов.
            Продукция ООО «Тамбовконсерв» — это гарантия высокого качества, которое обеспечивается применением только
            сертифицированных материалов и непрерывным контролем инженеров на всех этапах производства.
          </span>
          <span class="company-description__text"
            >За долгие годы работы на предприятии сформировался высококвалифицированный коллектив, а это является
            показателем стабильности предприятия.
          </span>
          <span class="company-description__text"
            >Наше предприятие — надежный партнер и предлагает Вам свое сотрудничество по поставкам производимых им
            товаров. Отгрузка товара может осуществляться как самовывозом со склада, так и нашим транспортом в различные
            регионы. Работаем ответственно и оперативно. Находим индивидуальный подход к каждому клиенту.
          </span>
        </div>

        <div ref="certificates" class="certificates">
          <span class="certificates-title">Сертификаты</span>
          <div class="certificates-row">
            <div class="certificates-block"></div>
            <div class="certificates-block"></div>
            <div class="certificates-block"></div>
            <div class="certificates-block"></div>
            <div class="certificates-block"></div>
            <div class="certificates-block"></div>
          </div>
        </div>

        <div ref="companyManagement" class="management">
          <span class="management-title">Руководство компании</span>
          <div class="management-row">
            <div class="management-block">
              <img src="@/assets/img/img-not_found.jpg" alt="" class="management-block__img" />
              <span class="management-block__title">Владимир Анатольевич Манаенков</span>
              <span class="management-block__description">Генеральный директор</span>
            </div>
            <div class="management-block">
              <img src="@/assets/img/img-not_found.jpg" alt="" class="management-block__img" />
              <span class="management-block__title">Владимир Анатольевич Манаенков</span>
              <span class="management-block__description">Генеральный директор</span>
            </div>
            <div class="management-block">
              <img src="@/assets/img/img-not_found.jpg" alt="" class="management-block__img" />
              <span class="management-block__title">Владимир Анатольевич Манаенков</span>
              <span class="management-block__description">Генеральный директор</span>
            </div>
            <div class="management-block">
              <img src="@/assets/img/img-not_found.jpg" alt="" class="management-block__img" />
              <span class="management-block__title">Владимир Анатольевич Манаенков</span>
              <span class="management-block__description">Генеральный директор</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import AppSwiper from '~/components/UI/AppSwiper.vue'

  export default {
    name: 'CompanyAbout',
    components: { AppSwiper },
    props: {
      company: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
      scrolled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeLink: 'description',
        links: [
          { name: 'Описание', goTo: 'description' },
          // { name: 'Производственные мощности', goTo: 'productionCapacity' },
          // { name: 'Контроль качества', goTo: 'qualityControl' },
          { name: 'Сертификаты', goTo: 'certificates' },
          { name: 'Руководство компании', goTo: 'companyManagement' },
          // { name: 'Услуги и поддержка', goTo: 'servicesAndSupport' },
        ],
      }
    },
    methods: {
      scrollTo(refName) {
        const element = this.$refs[refName]
        const top = element.offsetTop

        this.activeLink = refName

        const indent = !this.scrolled ? 107 : 90

        window.scrollTo(300, top - indent)
      },
    },
  }
</script>
