<template>
  <section id="About" class="company content-row active">
    <div class="banner-about">
      <a href="#" class="banner-about__link active">Описание</a>
      <a href="#" class="banner-about__link">Реквизиты</a>
    </div>

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

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="company-description__text" v-html="company.description"></div>
          <span class="company-description__read">Показать полностью</span>
        </div>

        <div v-if="requisites.length !== 0 || company.inn" ref="requisites" class="company-requisites">
          <h3 class="company-requisites__title">Реквизиты</h3>
          <div class="table">
            <!-- <div v-for="(value, key, index) in requisites" :key="index" class="table-block">
              <div class="table-block__left">{{ requisitesKey(key) }}</div>
              <div class="table-block__right">{{ value }}</div>
            </div> -->
            <div v-if="requisites.company_name" class="table-block">
              <div class="table-block__left">Название компании:</div>
              <div class="table-block__right">{{ requisites.company_name }}</div>
            </div>
            <div v-if="requisites.legal_address" class="table-block">
              <div class="table-block__left">Юридический адрес:</div>
              <div class="table-block__right">{{ requisites.legal_address }}</div>
            </div>
            <div v-if="requisites.actual_address" class="table-block">
              <div class="table-block__left">Фактический адрес:</div>
              <div class="table-block__right">{{ requisites.actual_address }}</div>
            </div>
            <div v-if="company.inn" class="table-block">
              <div class="table-block__left">ИНН:</div>
              <div class="table-block__right">{{ company.inn }}</div>
            </div>
            <div v-if="requisites.ogrn" class="table-block">
              <div class="table-block__left">ОГРН:</div>
              <div class="table-block__right">{{ requisites.ogrn }}</div>
            </div>
            <div v-if="requisites.kpp" class="table-block">
              <div class="table-block__left">КПП:</div>
              <div class="table-block__right">{{ requisites.kpp }}</div>
            </div>
            <div v-if="requisites.ceo" class="table-block">
              <div class="table-block__left">Генеральный директор:</div>
              <div class="table-block__right">{{ requisites.ceo }}</div>
            </div>
            <div v-if="requisites.director" class="table-block">
              <div class="table-block__left">Директор:</div>
              <div class="table-block__right">{{ requisites.director }}</div>
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
          { name: 'Реквизиты', goTo: 'requisites' },
        ],
        requisites: [],
      }
    },
    mounted() {
      if (this.company.requisites) {
        // const newR = this.company.requisites
        // delete newR.id

        this.requisites = this.company.requisites
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

      requisitesKey(name) {
        const keysForBack = ['company_name', 'legal_address', 'actual_address', 'inn', 'ogrn', 'kpp', 'ceo', 'director']
        const newKeysName = [
          'Название компании:',
          'Юридический адрес:',
          'Фактический адрес:',
          'ИНН:',
          'ОГРН:',
          'КПП:',
          'Генеральный директор:',
          'Директор:',
        ]

        if (keysForBack.includes(name)) {
          return newKeysName[keysForBack.indexOf(name)]
        }
        return name
      },
    },
  }
</script>
