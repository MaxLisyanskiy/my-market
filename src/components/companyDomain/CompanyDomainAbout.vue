<template>
  <section id="About" class="company content-row active">
    <div class="banner-about">
      <a href="#" class="banner-about__link active">Описание</a>
      <a href="#" class="banner-about__link">Реквизиты</a>
    </div>

    <div class="company__wrapper">
      <div class="wrapper-sidebar sidebar sidebar_domain" :class="{ fixed: !scrolled }">
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

      <div ref="description" class="company-description">
        <div :class="{ showDescription: !companyDescriptionEditor || !companyRequisitesEditor }">
          <div :class="{ show: !companyDescriptionEditor }" class="company-description__block">
            <span class="company-description__title">{{ descriptionTitle }}</span>
            <div class="company-description__flex">
              <div
                v-if="companyDescriptionEditor && isCompanyOwner"
                class="company-edit"
                @click="() => ((companyDescriptionEditor = !companyDescriptionEditor), (companyShowPlate = true))"
              >
                <!--
                <div class="company-edit__icon">
                  <CompanyEditSvg class="company-edit__icon-img" />
                </div>
                <span class="company-edit__text">Редактировать</span>-->
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
            <AppSwiper
              v-if="dataForm.images.length > 0 && companyDescriptionEditor"
              :swiper-config="swiperConfig"
              :images="dataForm.images"
            />

            <div v-if="companyDescriptionEditor" style="width: 100%; display: flex"></div>
            <div v-if="companyDescriptionEditor" class="company-description__text">{{ dataForm.description }}</div>
            <span v-if="companyDescriptionEditor" class="company-description__read">Показать полностью</span>

            <div v-if="!companyDescriptionEditor" class="company-redact__slider">
              <div class="editor-imgs">
                <div class="el-upload-list el-upload-list--picture-card">
                  <draggable v-model="dataForm.images">
                    <transition-group>
                      <li v-for="(image, imageIndex) of dataForm.images" :key="image.id" class="el-upload-list__item">
                        <div class="company-redact__slider-block">
                          <img class="company-redact__slider-img" :src="image.url" />
                          <CompanyDeleteSvg
                            class="company-redact__slider-delete"
                            @click="handleImagesRemove(imageIndex)"
                          />
                        </div>
                      </li>
                    </transition-group>
                  </draggable>
                </div>
                <el-upload
                  ref="images"
                  action="#"
                  list-type="picture-card"
                  list-style="none"
                  :limit="10"
                  multiple
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleImagesChange"
                  class="company-add__slider"
                >
                  <label for="companySliderAdd">
                    <CompanyCameraSvg class="company-add__slider-img" />
                    <span class="company-add__slider-text">Добавить фото</span>
                  </label>
                </el-upload>
              </div>
            </div>

            <div v-if="!companyDescriptionEditor" class="description-redact">
              <textarea
                v-model="dataForm.description"
                class="description-redact__textarea"
                :placeholder="dataForm.description"
              ></textarea>
            </div>

            <div v-if="!companyDescriptionEditor" class="company-save mob">
              <span
                class="company-save__text"
                @click="() => ((companyDescriptionEditor = true), save(descriptionTitle))"
                >Сохранить</span
              >
            </div>

            <div v-if="!companyDescriptionEditor" class="company-cancel mob">
              <span
                class="company-cancel"
                @click="() => ((companyDescriptionEditor = true), (companyShowPlate = false))"
                >X</span
              >
            </div>
          </div>

          <div ref="requisites" class="company-requisites" :class="{ show: !companyRequisitesEditor }">
            <div class="company-requisites__block company-requisites__block-redact">
              <h3 class="company-requisites__title">{{ requisitesTitle }}</h3>
              <div class="company-requisites__flex">
                <div
                  v-if="companyRequisitesEditor && isCompanyOwner"
                  class="company-edit"
                  @click="() => ((companyRequisitesEditor = !companyRequisitesEditor), (companyShowPlate = true))"
                >
                  <!--
                  <div class="company-edit__icon">
                    <CompanyEditSvg class="company-edit__icon-img" />
                  </div>
                  <span class="company-edit__text">Редактировать</span>-->
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

              <div v-if="!companyRequisitesEditor" class="table table-redact">
                <div class="table-block">
                  <div class="table-block__left">Название компании:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.company_name"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.company_name"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">Юридический адрес:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.legal_address"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.legal_address"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">Фактический адрес:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.actual_address"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.actual_address"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">ИНН:</div>
                  <div class="table-block__right table-redact__right">
                    <input v-model="dataForm.inn" class="table-redact__input" type="text" :placeholder="company.inn" />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">ОГРН:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.ogrn"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.ogrn"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">КПП</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.kpp"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.kpp"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">Генеральный директор:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.ceo"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.ceo"
                    />
                  </div>
                </div>
                <div class="table-block">
                  <div class="table-block__left">Директор:</div>
                  <div class="table-block__right table-redact__right">
                    <input
                      v-model="dataForm.requisites.director"
                      class="table-redact__input"
                      type="text"
                      :placeholder="dataForm.requisites.director"
                    />
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
                <div class="table-block__right">{{ dataForm.requisites.company_name }}</div>
              </div>
              <div v-if="company.requisites?.legal_address" class="table-block">
                <div class="table-block__left">Юридический адрес:</div>
                <div class="table-block__right">{{ dataForm.requisites.legal_address }}</div>
              </div>
              <div v-if="company.requisites?.actual_address" class="table-block">
                <div class="table-block__left">Фактический адрес:</div>
                <div class="table-block__right">{{ dataForm.requisites.actual_address }}</div>
              </div>
              <div v-if="company.inn" class="table-block">
                <div class="table-block__left">ИНН:</div>
                <div class="table-block__right">{{ dataForm.inn }}</div>
              </div>
              <div v-if="company.requisites?.ogrn" class="table-block">
                <div class="table-block__left">ОГРН:</div>
                <div class="table-block__right">{{ dataForm.requisites.ogrn }}</div>
              </div>
              <div v-if="company.requisites?.kpp" class="table-block">
                <div class="table-block__left">КПП:</div>
                <div class="table-block__right">{{ dataForm.requisites.kpp }}</div>
              </div>
              <div v-if="company.requisites?.ceo" class="table-block">
                <div class="table-block__left">Генеральный директор:</div>
                <div class="table-block__right">{{ dataForm.requisites.ceo }}</div>
              </div>
              <div v-if="company.requisites?.director" class="table-block">
                <div class="table-block__left">Директор:</div>
                <div class="table-block__right">{{ dataForm.requisites.director }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <client-only>
      <div v-if="backgroundPlate" class="backgroundPlateTwo"></div>
    </client-only>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import draggable from 'vuedraggable'
  import AppSwiper from '~/components/UI/AppSwiper.vue'
  //  import CompanyEditSvg from '@/assets/img/icons/svg/edit.svg?inline'
  import CompanyDeleteSvg from '@/assets/img/icons/svg/close-share.svg?inline'
  import CompanyCameraSvg from '@/assets/img/icons/svg/camera.svg?inline'

  export default {
    name: 'CompanyAbout',
    components: { AppSwiper, CompanyCameraSvg, CompanyDeleteSvg, draggable },
    props: {
      company: {
        type: Object,
        default: () => {
          return {
            images: [],
          }
        },
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
        dataForm: JSON.parse(JSON.stringify(this.company)),
        requisitesTitle: 'Реквизиты',
        descriptionTitle: 'Описание',
        activeLink: 'description',
        links: [
          { name: 'Описание', goTo: 'description' },
          { name: 'Реквизиты', goTo: 'requisites' },
        ],

        requisites: {},
        companyDescriptionEditor: true,
        companyRequisitesEditor: true,
        companyShowPlate: false,
        backgroundPlate: false,
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
      isCompanyOwner() {
        if (this.$auth.user && this.$auth.user.company_id === Number(this.$route.params.id)) {
          return true
        }
        return false
      },
    },

    watch: {
      companyShowPlate() {
        if (this.companyShowPlate === true) {
          document.querySelector('.backgroundPlateTwo').classList.add('active')
        } else {
          document.querySelector('.backgroundPlateTwo').classList.remove('active')
        }
      },
    },
    methods: {
      save(name) {
        this.companyShowPlate = false
        if (name === this.requisitesTitle) {
          alert(this.requisitesTitle)
        } else {
          alert(this.descriptionTitle)
        }
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
      async handleImagesChange(files) {
        const formData = new FormData()
        formData.append('images[]', files.raw)

        await this.$axios
          .post('/images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            this.dataForm.images.push(...data)
          })
          .catch(() => {
            this.$notify({
              title: '',
              message: 'Что-то пошло не так при добавлении фотографии',
              type: 'error',
            })
          })
      },
      handleImagesRemove(imageIndex) {
        this.dataForm.images.splice(imageIndex, 1)
      },
    },
  }
</script>

<style lang="scss">
  .company-add__slider {
    & .el-upload--picture-card {
      background-color: #e7e7e7;
      width: 100%;
      border: none;
      border-radius: none;
    }
  }
  .company-redact__slider {
    & .editor-imgs {
      max-width: 100%;
      margin-left: 8px;
    }
    & .el-upload-list__item {
      overflow: visible;
      background: none;
      border: none;
      width: 215px;
      height: 116px;
      border-radius: 10px;
      margin-left: 4px;
    }
  }
</style>
