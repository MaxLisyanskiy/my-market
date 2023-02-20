<template>
  <div :scroll="handleScroll">
    <!-- Banner Desktop -->
    <section class="banner">
      <div class="banner-info">
        <div class="banner-info-left">
          <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="banner-info__logo" />
          <img
            v-else
            src="@/assets/img/icons/company-not-found-img.svg"
            alt="company-not-found-img"
            class="banner-info__logo"
          />
          <div class="banner-info__text">
            <h1 class="banner-info__title">{{ company.name }}</h1>
            <div class="banner-info__description">
              <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                <span>{{ formattingPhone }}</span>
              </a>
              <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                <span>{{ company.email }}</span>
              </a>
            </div>
            <div v-if="!isCompanyOwner" class="banner-info__btns">
              <a :href="`tel:${company.phone}`" class="banner-info__btns_call"> Позвонить </a>
              <a :href="`mailto:${company.email}`" class="banner-info__btns_write"> Написать </a>
            </div>
            <div v-else class="banner-info__btns">
              <button class="banner-info__btns_edit" @click="() => (showCompanyEditor = true)">
                Редактировать профиль
              </button>
            </div>
          </div>
        </div>
        <client-only>
          <div
            v-if="backgroundPlate"
            class="backgroundPlateCompanyTop"
            @click=";(showCompanyEditor = false), (backgroundPlate = false)"
          ></div>
        </client-only>
        <validation-observer
          ref="observer"
          tag="form"
          class="banner-info-edit"
          :class="{ show: showCompanyEditor, error: companyNameError || companyPhoneError || companyEmailError }"
          @submit.prevent="handleEditCompanyProfile"
        >
          <div class="banner-info-edit__wrapp">
            <LogoDeleteSvg
              v-if="isCompanyOwner"
              class="banner-info__delete-logo"
              @click.stop="e => handleCompanyLogoDelete(notFound)"
            />
            <label for="companyLogo" class="banner-info-edit__logo">
              <img v-if="companyLogo" v-lazy="companyLogo.url" :alt="company.name" class="banner-info__logo" />
              <img
                v-else
                src="@/assets/img/icons/company-not-found-img.svg"
                alt="company-not-found-img"
                class="banner-info__logo"
              />
              <CompanyEditLogoSvg />
            </label>
            <input
              id="companyLogo"
              type="file"
              name="companyLogo"
              class="banner-info-edit__logo-input"
              @change="event => handleCompanyLogoChange(event.target.files)"
            />

            <div class="banner-info-edit__fields">
              <validation-provider
                ref="required"
                rules="required"
                tag="div"
                class="validate banner-info-edit__validate-name"
                mode="lazy"
              >
                <input
                  v-model="companyName"
                  type="text"
                  inputmode="text"
                  autocomplete="on"
                  placeholder="Введите название компании"
                  class="banner-info-edit__input-name"
                  :class="{ error: companyNameError }"
                  @input="companyNameError = ''"
                  @change="validateCompanyName"
                />
                <span class="validate__error"> {{ companyNameError }} </span>
              </validation-provider>
              <validation-provider
                ref="phone"
                rules="phone"
                tag="div"
                class="validate banner-info-edit__validate"
                mode="lazy"
              >
                <input
                  v-model="companyPhone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="on"
                  placeholder="Введите номер телефона компании"
                  class="banner-info-edit__input banner-info-edit__input_first"
                  :class="{ error: companyPhoneError }"
                  @input="companyPhoneError = ''"
                  @change="validateCompanyPhone"
                />
                <span class="validate__error"> {{ companyPhoneError }} </span>
              </validation-provider>
              <validation-provider ref="email" rules="email" tag="div" class="validate" mode="lazy">
                <input
                  v-model="companyEmail"
                  type="email"
                  inputmode="email"
                  autocomplete="on"
                  placeholder="Введите e-mail компании"
                  class="banner-info-edit__input"
                  :class="{ error: companyEmailError }"
                  @input="companyEmailError = ''"
                  @change="validateCompanyEmail"
                />
                <span class="validate__error"> {{ companyEmailError }} </span>
              </validation-provider>
            </div>
          </div>
          <button type="submit" class="banner-info-edit__submitBtn">Сохранить изменения</button>
        </validation-observer>

        <div class="banner-info-right">
          <form type="search" class="banner-search" @submit.prevent="handleSearchCompanyProducts">
            <input
              type="text"
              placeholder="Искать в этом магазине..."
              class="banner-search__input"
              :value="companySearchInput"
              inputmode="search"
              @input="handleUpdateCompanySearchInput"
            />
            <button type="submit" class="banner-search__btn">Поиск</button>
          </form>

          <div v-if="isCompanyOwner" class="banner-info-right__btns">
            <nuxt-link to="/product/add/" class="banner-info-right__add">
              <CompanyAddProductPlusSvg />
              <span>Добавить товар</span>
            </nuxt-link>
            <nuxt-link :to="`/company/${company.id}/settings/`" class="banner-info-right__settings">
              <CompanySettingsSvg />
              <span>Настройки</span>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div id="bannerTabs" class="banner-tabs">
        <div class="banner-tabs-list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Mob -->
    <section v-show="!isComapnySettings" class="banner-mob">
      <div class="banner-mob-top" :class="{ owner: isCompanyOwner, search: showSearchInput }">
        <template v-if="!isCompanyOwner">
          <nuxt-link v-if="firstPageVisit" to="/" class="header-mob-logo">
            <LogoSvg />
          </nuxt-link>
          <button v-else class="banner-mob-top__back" @click="$router.go(-1)">
            <CompanyHeaderBackSvg />
          </button>
          <form type="search" class="banner-mob-top__form" @submit.prevent="handleSearchCompanyProducts">
            <button type="submit" class="banner-mob-top__search-btn">
              <CompanyHeaderSearchSvg />
            </button>
            <input
              type="text"
              placeholder="Искать в этом магазине..."
              class="banner-mob-top__input"
              :value="companySearchInput"
              inputmode="search"
              @input="handleUpdateCompanySearchInput"
            />
          </form>
        </template>
        <template v-else>
          <div class="banner-mob-top__left">
            <button v-if="!firstPageVisit && !showSearchInput" class="banner-mob-top__back" @click="$router.go(-1)">
              <CompanyHeaderBackSvg />
            </button>
            <button v-else-if="showSearchInput" class="banner-mob-top__back" @click="() => (showSearchInput = false)">
              <CompanyHeaderBackSvg />
            </button>
          </div>
          <nuxt-link v-show="!showSearchInput" to="/" class="header-mob-logo banner-mob-top__logo">
            <LogoSvg />
          </nuxt-link>
          <form
            type="search"
            class="banner-mob-top__form owner"
            :class="{ active: showSearchInput }"
            @submit.prevent="handleSearchCompanyProducts"
          >
            <button type="submit" class="banner-mob-top__search-btn">
              <CompanyHeaderSearchSvg />
            </button>
            <input
              type="text"
              placeholder="Искать в этом магазине..."
              class="banner-mob-top__input"
              :value="companySearchInput"
              inputmode="search"
              @input="handleUpdateCompanySearchInput"
            />
          </form>
          <div v-show="!showSearchInput" class="banner-mob-top__right">
            <div class="banner-mob-top__right_btns">
              <button class="banner-mob-top__right_search" @click="() => (showSearchInput = true)">
                <img src="@/assets/img/icons/svg/company/company-owner-search.svg" alt="company-owner-search" />
              </button>
              <nuxt-link to="/product/add/" class="banner-mob-top__right_plus">
                <img src="@/assets/img/icons/svg/company/company-owner-plus.svg" alt="company-owner-plus" />
              </nuxt-link>
              <nuxt-link :to="`/company/${company.id}/settings/`">
                <CompanyOwnerSettingsSvg />
              </nuxt-link>
            </div>
          </div>
        </template>
      </div>
      <div class="banner-mob-info">
        <template v-if="!showCompanyEditor">
          <div class="banner-mob-info__wrapp">
            <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="banner-mob-info__img" />
            <img
              v-else
              src="@/assets/img/icons/company-not-found-img.svg"
              alt="company-not-found-img"
              class="banner-mob-info__img"
            />
            <div class="banner-mob-info__text">
              <span class="banner-info__title">{{ company.name }}</span>
              <div class="banner-info__description">
                <a :href="`tel:${company.phone}`" class="banner-info__description_tel">
                  <span>{{ formattingPhone }}</span>
                </a>
                <a :href="`mailto:${company.email}`" class="banner-info__description_mail">
                  <span>{{ company.email }}</span>
                </a>
              </div>
            </div>
          </div>
          <div v-if="!isCompanyOwner" class="banner-mob-info__btns">
            <a :href="`tel:${company.phone}`" class="banner-mob-info__call">Позвонить</a>
            <a :href="`mailto:${company.email}`" class="banner-mob-info__chat">Написать</a>
          </div>
          <div v-else class="banner-mob-info__btns">
            <button class="banner-mob-info__edit" @click="() => (showCompanyEditor = true)">
              Редактировать профиль
            </button>
          </div>
        </template>
        <validation-observer
          ref="observer"
          tag="form"
          class="banner-info-edit-mob"
          :class="{ show: showCompanyEditor }"
          @submit.prevent="handleEditCompanyProfile"
        >
          <div class="banner-info-edit__wrapp">
            <LogoDeleteSvg
              v-if="isCompanyOwner"
              class="banner-info__delete-logo"
              @click.stop="e => handleCompanyLogoDelete()"
            />
            <label for="companyLogo" class="banner-info-edit__logo">
              <img v-if="companyLogo" v-lazy="companyLogo.url" :alt="company.name" class="banner-info__logo" />
              <img
                v-else
                src="@/assets/img/icons/company-not-found-img.svg"
                alt="company-not-found-img"
                class="banner-info__logo"
              />
              <CompanyEditLogoMobSvg />
            </label>
            <input
              id="companyLogo"
              type="file"
              name="companyLogo"
              class="banner-info-edit__logo-input"
              @change="event => handleCompanyLogoChange(event.target.files)"
            />
            <div class="banner-info-edit__fields">
              <validation-provider
                ref="required"
                rules="required"
                tag="div"
                class="validate banner-info-edit__validate-name"
                mode="lazy"
              >
                <input
                  v-model="companyName"
                  type="text"
                  inputmode="text"
                  autocomplete="on"
                  placeholder="Введите название компании"
                  class="banner-info-edit__input-name"
                  :class="{ error: companyNameError }"
                  @input="companyNameError = ''"
                  @change="validateCompanyName"
                />
                <span class="validate__error"> {{ companyNameError }} </span>
              </validation-provider>
              <validation-provider
                ref="phone"
                rules="phone"
                tag="div"
                class="validate banner-info-edit__validate"
                mode="lazy"
              >
                <input
                  v-model="companyPhone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="on"
                  placeholder="Введите номер телефона компании"
                  class="banner-info-edit__input banner-info-edit__input_first"
                  :class="{ error: companyPhoneError }"
                  @input="companyPhoneError = ''"
                  @change="validateCompanyPhone"
                />
                <span class="validate__error"> {{ companyPhoneError }} </span>
              </validation-provider>
              <validation-provider ref="email" rules="email" tag="div" class="validate" mode="lazy">
                <input
                  v-model="companyEmail"
                  type="email"
                  inputmode="email"
                  autocomplete="on"
                  placeholder="Введите e-mail компании"
                  class="banner-info-edit__input"
                  :class="{ error: companyEmailError }"
                  @input="companyEmailError = ''"
                  @change="validateCompanyEmail"
                />
                <span class="validate__error"> {{ companyEmailError }} </span>
              </validation-provider>
            </div>
          </div>
          <button type="submit" class="banner-info-edit__submitBtn">Сохранить изменения</button>
        </validation-observer>
      </div>
      <div class="banner-tabs">
        <div class="banner-tabs-list">
          <nuxt-link
            v-show="false"
            :to="`/company/${company.id}`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Main' }"
          >
            Главная
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/products`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'Products' }"
          >
            Товары
          </nuxt-link>
          <nuxt-link
            :to="`/company/${company.id}/about/`"
            class="banner-tabs-list__link"
            :class="{ active: activeTab === 'About' }"
          >
            О компании
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Banner Fixed -->
    <section class="banner-fixed" :class="{ active: !scrolledToTabs }">
      <div class="banner-tabs">
        <div class="banner-tabs__wrapp">
          <div class="banner-tabs-company">
            <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" />
            <img v-else src="@/assets/img/icons/company-not-found-img.svg" alt="company-not-found-img" />
            <h3>{{ company.name }}</h3>
          </div>
          <div class="banner-tabs-list">
            <nuxt-link
              v-show="false"
              :to="`/company/${company.id}`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'Main' }"
            >
              Главная
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/products`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'Products' }"
            >
              Товары
            </nuxt-link>
            <nuxt-link
              :to="`/company/${company.id}/about/`"
              class="banner-tabs-list__link"
              :class="{ active: activeTab === 'About' }"
            >
              О компании
            </nuxt-link>
          </div>
        </div>
        <div class="banner-tabs-connection">
          <template v-if="!isCompanyOwner">
            <a :href="`tel:${company.phone}`" class="banner-tabs-connection__tel">
              <img src="@/assets/img/icons/company-tel.svg" alt="company-tel" />
              <span>Позвонить</span>
            </a>
            <a :href="`mailto:${company.email}`" class="banner-tabs-connection__mail">
              <img src="@/assets/img/icons/company-mail.svg" alt="company-mail" />
              <span> Написать</span>
            </a>
          </template>
          <nuxt-link v-else :to="`/company/${company.id}/settings/`" class="banner-tabs-connection__settings">
            <CompanySettingsSvg />
            <span>Настройки</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import LogoSvg from '@/assets/img/icons/svg/logo.svg?inline'

  import CompanyHeaderBackSvg from '@/assets/img/icons/svg/company/company-header-back.svg?inline'
  import CompanyHeaderSearchSvg from '@/assets/img/icons/svg/company/company-header-search.svg?inline'
  import CompanyAddProductPlusSvg from '@/assets/img/icons/svg/company/company-add-product-plus.svg?inline'
  import CompanySettingsSvg from '@/assets/img/icons/svg/company/company-settings.svg?inline'

  import CompanyOwnerSettingsSvg from '@/assets/img/icons/svg/company/company-owner-settings.svg?inline'
  import CompanyEditLogoSvg from '@/assets/img/icons/svg/company/company-edit-logo.svg?inline'
  import CompanyEditLogoMobSvg from '@/assets/img/icons/svg/company/company-edit-logo-mob.svg?inline'
  import LogoDeleteSvg from '@/assets/img/icons/svg/close-share.svg?inline'

  export default {
    name: 'CompanyTop',
    components: {
      LogoSvg,
      CompanyHeaderBackSvg,
      CompanyHeaderSearchSvg,
      CompanyAddProductPlusSvg,
      CompanySettingsSvg,
      CompanyOwnerSettingsSvg,
      CompanyEditLogoSvg,
      CompanyEditLogoMobSvg,
      LogoDeleteSvg,
    },
    props: {
      company: {
        type: Object,
        default: () => {},
      },
      activeTab: {
        type: String,
        default: 'Main',
      },
    },
    data() {
      return {
        scrolledToTabs: true,
        showSearchInput: false,
        showCompanyEditor: false,

        companyName: '',
        companyPhone: '',
        companyEmail: '',
        companyLogo: this.company.logo,

        companyNameError: '',
        companyPhoneError: '',
        companyEmailError: '',

        backgroundPlate: false,
        notFound: 'handleCompanyLogoDelete',
      }
    },

    computed: {
      ...mapState('company', ['companySearchInput', 'companySearchQuery']),
      ...mapState('global', ['firstPageVisit']),

      formattingPhone() {
        const pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
        if (this.companyPhone) {
          return this.companyPhone.replace(pattern, '+7 ($2) $3-$4-$5')
        }
        return 'Нет номера'
      },

      isCompanyOwner() {
        if (this.$auth.user && this.$auth.user.company_id === Number(this.$route.params.id)) {
          return true
        }
        return false
      },

      isComapnySettings() {
        if (this.$route.name === 'company-id-settings') {
          return true
        }
        return false
      },
    },
    watch: {
      showCompanyEditor() {
        if (this.showCompanyEditor === true) {
          document.querySelector('body').style.overflowY = 'hidden'
          this.backgroundPlate = true
        } else {
          document.querySelector('body').removeAttribute('style')
          this.backgroundPlate = false
        }
      },
    },
    mounted() {
      window.addEventListener('keydown', this.escCloseModal)

      this.companyName = this.company.name || ''
      this.companyPhone = this.company.phone || ''
      this.companyEmail = this.company.email || ''

      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('keydown', this.escCloseModal)
    },

    methods: {
      // Close a modal on pressing the Esc key
      escCloseModal(e) {
        if (this.showCompanyEditor && e.key === 'Escape') {
          this.showCompanyEditor = false
        }
      },
      ...mapMutations('company', ['UPDATE_COMPANY_SEARCH_INPUT', 'UPDATE_COMPANY_SEARCH_QUERY']),

      /**
       * Update search input in the store and in the input
       *
       * @param {Event & { target: HTMLInputElement }} e
       */
      handleUpdateCompanySearchInput(e) {
        this.UPDATE_COMPANY_SEARCH_INPUT(e.target.value)
      },

      /**
       * Submit to search company products if valid query
       */
      handleSearchCompanyProducts() {
        if (this.companySearchInput.trim() !== '') {
          this.UPDATE_COMPANY_SEARCH_QUERY(this.companySearchInput)
          this.$router.push({
            path: this.$route.path,
            query: { q: this.companySearchInput },
          })
        } else if (this.companySearchInput !== this.companySearchQuery) {
          this.UPDATE_COMPANY_SEARCH_QUERY(this.companySearchInput)
          this.$router.push({
            path: `/company/${this.company.id}/products`,
          })
        }
      },

      handleScroll() {
        const obj = document.querySelector('#bannerTabs')
        const { top } = obj.getBoundingClientRect()
        const height = document.documentElement.clientHeight
        this.scrolledToTabs = top < height && top > 0

        this.$emit('scrolled', this.scrolledToTabs)
      },

      handleCompanyLogoDelete() {
        this.companyLogo = ''
        document.querySelector('#companyLogo').value = ''
      },

      async handleCompanyLogoChange(file) {
        const formData = new FormData()
        formData.append('images[]', file[0])

        await this.$axios
          .post('/images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            this.companyLogo = data[0]
          })
          .catch(() => {
            this.$notify({
              title: '',
              message: 'Что-то пошло не так при добавлении фотографии',
              type: 'error',
            })
          })
      },

      validateCompanyName() {
        this.companyNameError = ''

        if (this.companyName.length === 0) {
          this.companyNameError = 'Обязательное поле'
        }
      },

      validateCompanyPhone() {
        this.companyPhoneError = ''

        if (this.companyPhone.length === 0) {
          this.companyPhoneError = 'Обязательное поле'
        } else if (
          // eslint-disable-next-line
          !/^[0-9]{11}$/.test(this.companyPhone.replace(/\D/g, ''))
        ) {
          this.companyPhoneError = 'Телефон должен содержать 11 цифр'
        }
      },

      validateCompanyEmail() {
        this.companyEmailError = ''

        if (this.companyEmail.length === 0) {
          this.companyEmailError = 'Обязательное поле'
        } else if (
          // eslint-disable-next-line
          !/^[A-z0-9\-\.\_]+@[A-z\-\.\_]+$/.test(this.companyEmail)
        ) {
          this.companyEmailError = 'Введите корректную почту'
        }
      },

      async handleEditCompanyProfile() {
        this.validateCompanyName()
        this.validateCompanyPhone()
        this.validateCompanyEmail()

        if (!this.companyNameError && !this.companyPhoneError && !this.companyEmailError) {
          const body = {
            _method: 'PATCH',
            name: this.companyName,
            phone: this.companyPhone,
            email: this.companyEmail,
            logo: this.companyLogo ? { id: this.companyLogo.id, path: this.companyLogo?.path } : null,
          }

          const result = await this.$companyService.updateCompany(body)

          if (result[0]) {
            this.$notify({
              title: '',
              message: 'Данные о компании были успешно изменены!',
              type: 'success',
            })
            this.$emit('updateCompany')
            this.showCompanyEditor = false
          } else {
            this.$notify({
              title: '',
              message: 'Что-то пошло не так при изменение данных о компании',
              type: 'error',
            })
          }
        }
      },
    },
  }
</script>
