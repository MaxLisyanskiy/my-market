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
        <div :class="{ show: showCompanyDescription }" class="company-description__block" ref="description">
          <span class="company-description__title">Описание</span>
          <div class="company-description__flex" v-if="isCompanyEdit">
            <div
              v-if="redactCompanyDescription"
              @click="() => ((showCompanyBlock = true), (showCompanyDescription = true))"
              class="company-edit"
            >
              <div class="company-edit__icon">
                <CompanyEditSvg class="company-edit__icon-img" />
              </div>
              <span class="company-edit__text">Редактировать</span>
            </div>
            <div
              v-if="saveCompanyDescription"
              class="company-save"
              @click="() => ((showCompanyBlock = false), (showCompanyDescription = false))"
            >
              <span class="company-save__text">Сохранить</span>
            </div>

            <div
              v-if="saveCompanyDescription"
              class="company-cancel"
              @click="() => ((showCompanyBlock = false), (showCompanyDescription = false))"
            >
              <span>x</span>
            </div>
          </div>

          <AppSwiper v-if="company.images.length > 1" :swiper-config="swiperConfig" :images="company.images" />

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="company-description__text" v-html="company.description"></div>
          <span class="company-description__read">Показать полностью</span>
        </div>

        <div ref="requisites" class="company-requisites" :class="{ show: showCompanyRequisites }">
          <div class="company-requisites__block">
            <h3 class="company-requisites__title">Реквизиты</h3>
            <div class="company-requisites__flex" v-if="isCompanyEdit">
              <div
                v-if="redactCompanyRequisites"
                @click="() => ((showCompanyBlock = true), (showCompanyRequisites = true))"
                class="company-edit"
              >
                <div class="company-edit__icon">
                  <CompanyEditSvg class="company-edit__icon-img" />
                </div>
                <span class="company-edit__text">Редактировать</span>
              </div>
              <div
                v-if="saveCompanyRequisites"
                class="company-save"
                @click="() => ((showCompanyBlock = false), (showCompanyRequisites = false))"
              >
                <span class="company-save__text">Сохранить</span>
              </div>

              <div
                v-if="saveCompanyRequisites"
                class="company-cancel"
                @click="() => ((showCompanyBlock = false), (showCompanyRequisites = false))"
              >
                <span>x</span>
              </div>
            </div>
          </div>

          <div v-if="company.requisites || company.inn" class="table">
            <div v-if="company.requisites?.company_name" class="table-block">
              <div class="table-block__left">Название компании:</div>
              <div class="table-block__right">{{ company.requisites.company_name }}</div>
            </div>
            <div v-if="company.requisites?.legal_address" class="table-block">
              <div class="table-block__left">Юридический адрес:</div>
              <div class="table-block__right">{{ company.requisites.legal_address }}</div>
            </div>
            <div v-if="company.requisites?.actual_address" class="table-block">
              <div class="table-block__left">Фактический адрес:</div>
              <div class="table-block__right">{{ company.requisites.actual_address }}</div>
            </div>
            <div v-if="company.inn" class="table-block">
              <div class="table-block__left">ИНН:</div>
              <div class="table-block__right">{{ company.inn }}</div>
            </div>
            <div v-if="company.requisites?.ogrn" class="table-block">
              <div class="table-block__left">ОГРН:</div>
              <div class="table-block__right">{{ company.requisites.ogrn }}</div>
            </div>
            <div v-if="company.requisites?.kpp" class="table-block">
              <div class="table-block__left">КПП:</div>
              <div class="table-block__right">{{ company.requisites.kpp }}</div>
            </div>
            <div v-if="company.requisites?.ceo" class="table-block">
              <div class="table-block__left">Генеральный директор:</div>
              <div class="table-block__right">{{ company.requisites.ceo }}</div>
            </div>
            <div v-if="company.requisites?.director" class="table-block">
              <div class="table-block__left">Директор:</div>
              <div class="table-block__right">{{ company.requisites.director }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <client-only>
      <div id="backgroundPlate" class="backgroundPlateTwo"></div>
    </client-only>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import AppSwiper from '~/components/UI/AppSwiper.vue'
  import CompanyEditSvg from '@/assets/img/icons/svg/edit.svg?inline'

  export default {
    name: 'CompanyAbout',
    components: { AppSwiper, CompanyEditSvg },
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

        // Пример переменной для сокращения
        // showCompanyDescriptionEditor: false,

        // Сократить
        redactCompanyDescription: true,
        showCompanyDescription: false,
        hideCompanyDescription: false,
        saveCompanyDescription: false,
        redactCompanyRequisites: true,
        showCompanyRequisites: false,
        hideCompanyRequisites: false,
        saveCompanyRequisites: false,
        showCompanyBlock: false,
        hideCompanyBlock: false,

        // Пример объекта для редактирования
        companyInfo: {},
      }
    },
    mounted() {
      // Пример для добавления значений в объект в data
      this.companyInfo = {
        // description,
        company_name: this.company.company_name ?? '',
        inn: this.company.inn ?? '',
        // ...
      }

      // console.log(this.company)
    },

    // Переместить
    computed: {
      ...mapState('company', ['companySearchInput', 'companySearchQuery']),
      ...mapState('global', ['firstPageVisit']),

      isCompanyEdit() {
        if (this.$auth.user && this.$auth.user.company_id === Number(this.$route.params.id)) {
          return true
        }
        return false
      },
    },

    // Переместить
    watch: {
      showCompanyBlock() {
        if (this.showCompanyBlock === true) {
          this.hideCompanyBlock = false
          document.querySelector('body').style.overflowY = 'hidden'
          document.querySelector('.backgroundPlateTwo').classList.add('active')
          if (this.showCompanyDescription === true) {
            this.saveCompanyDescription = true
            this.redactCompanyDescription = false
          } else if (this.showCompanyRequisites === true) {
            this.saveCompanyRequisites = true
            this.redactCompanyRequisites = false
          }
        } else {
          document.querySelector('body').removeAttribute('style')
          document.querySelector('.backgroundPlateTwo').classList.remove('active')
          if (this.showCompanyDescription === false) {
            this.saveCompanyDescription = false
            this.redactCompanyDescription = true
            this.saveCompanyRequisites = false
            this.redactCompanyRequisites = true
          }
        }
      },
    },

    // Переместить
    hideCompanyBlock() {
      if (this.hideCompanyBlock === true) {
        this.showCompanyBlock = false
        this.showCompanyDescription = false
        this.showCompanyRequisites = false
        if (this.showCompanyDescription === false) {
          alert('HideDescription')
        }
      } else {
        this.hideCompanyBlock = false
        this.showCompanyBlock = true
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
