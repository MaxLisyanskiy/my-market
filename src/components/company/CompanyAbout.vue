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

      <div
        class="company-description"
      >
	  <div :class="{ showDescription: !companyDescriptionEditor || !companyRequisitesEditor }">
        <div :class="{ show: !companyDescriptionEditor }" class="company-description__block">
          <span class="company-description__title">{{ descriptionTitle }}</span>
          <div class="company-description__flex">
            <div
              v-if="companyDescriptionEditor"
              class="company-edit"
              @click="() => ((companyDescriptionEditor = !companyDescriptionEditor), (companyShowPlate = true))"
            >
              <div class="company-edit__icon">
                <CompanyEditSvg class="company-edit__icon-img" />
              </div>
              <span class="company-edit__text">Редактировать</span>
            </div>
            <div
              v-if="!companyDescriptionEditor"
              class="company-save desktop"
              @click="() => ((companyDescriptionEditor = true), save(descriptionTitle))"
            >
              <span class="company-save__text">Сохранить</span>
            </div>

            <div
              v-if="!companyDescriptionEditor"
              class="company-cancel desktop"
              @click="() => ((companyDescriptionEditor = true), (companyShowPlate = false))"
            >
              <span>x</span>
            </div>
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-if="companyDescriptionEditor" class="company-description__text" v-html="companyInfo.description"></div>
          <span v-if="companyDescriptionEditor" class="company-description__read">Показать полностью</span>

          <div v-if="!companyDescriptionEditor" class="company-redact__slider">
            <div class="company-redact__slider-block">
              <img
                class="company-redact__slider-img"
                src="https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp"
                alt=""
              />
              <CompanyDeleteSvg class="company-redact__slider-delete" />
            </div>
            <div class="company-add__slider">
              <label for="companySliderAdd">
                <CompanyCameraSvg class="company-add__slider-img" />
                <span class="company-add__slider-text">Добавить фото</span>
              </label>
              <input id="companySliderAdd" class="company-add__slider-input" type="file" />
            </div>
          </div>

          <div v-if="!companyDescriptionEditor" class="description-redact">
            <textarea class="description-redact__textarea" :placeholder="companyInfo.description"></textarea>
          </div>

          <div v-if="!companyDescriptionEditor" class="company-save mob">
            <span class="company-save__text" @click="() => ((companyDescriptionEditor = true), save(descriptionTitle))"
              >Сохранить</span
            >
          </div>

          <div v-if="!companyDescriptionEditor" class="company-cancel mob">
            <span class="company-cancel" @click="() => ((companyDescriptionEditor = true), (companyShowPlate = false))"
              >X</span
            >
          </div>
        </div>

        <div ref="requisites" class="company-requisites" :class="{ show: !companyRequisitesEditor }">
          <div class="company-requisites__block company-requisites__block-redact">
            <h3 class="company-requisites__title">{{ requisitesTitle }}</h3>
            <div class="company-requisites__flex">
              <div
                v-if="companyRequisitesEditor"
                class="company-edit"
                @click="() => ((companyRequisitesEditor = !companyRequisitesEditor), (companyShowPlate = true))"
              >
                <div class="company-edit__icon">
                  <CompanyEditSvg class="company-edit__icon-img" />
                </div>
                <span class="company-edit__text">Редактировать</span>
              </div>
              <div
                v-if="!companyRequisitesEditor"
                class="company-save desktop"
                @click="() => ((companyRequisitesEditor = true), save(requisitesTitle))"
              >
                <span class="company-save__text">Сохранить</span>
              </div>

              <div
                v-if="!companyRequisitesEditor"
                class="company-cancel desktop"
                @click="() => ((companyRequisitesEditor = true), (companyShowPlate = false))"
              >
                <span>x</span>
              </div>
            </div>

            <AppSwiper v-if="company.images.length > 1" :swiper-config="swiperConfig" :images="company.images" />

            <div v-if="!companyRequisitesEditor" class="table table-redact">
              <div class="table-block">
                <div class="table-block__left">Название компании:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.company_name" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">Юридический адрес:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.legal_address" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">Фактический адрес:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.actual_address" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">ИНН:</div>
                <div class="table-block__right table-redact__right">
                  <input
                    v-model="companyInfo.inn"
                    class="table-redact__input"
                    type="text"
                    :placeholder="companyInfo.inn"
                  />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">ОГРН:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.ogrn" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">КПП</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.kpp" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">Генеральный директор:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.ceo" />
                </div>
              </div>
              <div class="table-block">
                <div class="table-block__left">Директор:</div>
                <div class="table-block__right table-redact__right">
                  <input class="table-redact__input" type="text" :placeholder="companyInfo.director" />
                </div>
              </div>

              <div v-if="!companyRequisitesEditor" class="company-save mob">
                <span
                  class="company-save__text"
                  @click="() => ((companyRequisitesEditor = true), save(requisitesTitle))"
                  >Сохранить</span
                >
              </div>

              <div v-if="!companyRequisitesEditor" class="company-cancel mob">
                <span
                  class="company-cancel"
                  @click="() => ((companyRequisitesEditor = true), (companyShowPlate = false))"
                  >X</span
                >
              </div>
            </div>
          </div>

          <div
            v-if="(company.requisites && companyRequisitesEditor) || (company.inn && companyRequisitesEditor)"
            class="table"
          >
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
  import CompanyDeleteSvg from '@/assets/img/icons/svg/close-share.svg?inline'
  import CompanyCameraSvg from '@/assets/img/icons/svg/camera.svg?inline'

  export default {
    name: 'CompanyAbout',
    components: { AppSwiper, CompanyEditSvg, CompanyCameraSvg, CompanyDeleteSvg },
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
        requisitesTitle: 'Реквизиты',
        descriptionTitle: 'Описание',
        activeLink: 'description',
        links: [
          { name: 'Описание', goTo: 'description' },
          { name: 'Реквизиты', goTo: 'requisites' },
        ],
        companyDescriptionEditor: true,
        companyRequisitesEditor: true,
        companyShowPlate: false,

        companyInfo: {
        },
      }
    },
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
    watch: {
      companyShowPlate() {
        if (this.companyShowPlate === true) {
          document.querySelector('body').style.overflowY = 'hidden'
          document.querySelector('.backgroundPlateTwo').classList.add('active')
        } else {
          document.querySelector('body').removeAttribute('style')
          document.querySelector('.backgroundPlateTwo').classList.remove('active')
        }
      },
    },
    mounted() {
      this.companyInfo = {
        description: this.company.description ?? '',
        company_name: this.company.company_name ?? '',
        legal_address: this.company.legal_address ?? '',
        actual_address: this.company.actual_address ?? '',
        inn: this.company.inn ?? '',
        ogrn: this.company.ogrn ?? '',
        kpp: this.company.kpp ?? '',
        ceo: this.company.ceo ?? '',
        director: this.company.director ?? '',
      }
    },
    methods: {
      save(name) {
        alert(name)
        this.companyShowPlate = false
      },
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
