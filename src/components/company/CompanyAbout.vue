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

          <span class="company-description__text"> {{ company.description }} </span>
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
