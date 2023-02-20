<template>
  <section class="company company-settings__content-row content-row">
    <div class="company-settings__header">
      <HeaderBackSvg class="company-settings__header-back" @click="handleGoBack" />
      <span class="company-settings__header-text">Настройки</span>
    </div>

    <h1 class="company-settings__title">Данные авторизации</h1>

    <div class="company__wrapper company-settings__wrapper">
      <div class="wrapper-sidebar sidebar" :class="{ fixed: !scrolled }">
        <ul class="sidebar-list">
          <li v-for="link in links" :key="link.name" class="sidebar-link" :class="{ active: activeLink === link.goTo }">
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>

      <div class="company-description company-description__settings">
        <div class="company-settings">
          <h1 class="company-settings__title desktop">Данные авторизации</h1>

          <validation-observer ref="observer" tag="form" class="company-settings-form" @submit.prevent="submit">
            <div class="company-settings-form__left">
              <!-- E-mail -->
              <validation-provider v-slot="{ errors }" ref="email" rules="email" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">E-mail</label>
                <input
                  v-model="email"
                  type="email"
                  inputmode="email"
                  placeholder="E-mail"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <!-- Номер телефона -->
              <validation-provider v-slot="{ errors }" ref="phone" rules="phone" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">Номер телефона</label>
                <input
                  v-model="phone"
                  type="tel"
                  inputmode="tel"
                  placeholder="Номер телефона"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error validate__error_last"> {{ errors[0] }} </span>
              </validation-provider>
            </div>

            <div class="company-settings-form__right">
              <!-- Старый пароль -->
              <validation-provider
                v-slot="{ errors }"
                ref="password"
                rules="password"
                tag="div"
                class="validate"
                mode="lazy"
              >
                <label class="company-settings__label" for="password">Старый пароль</label>
                <input
                  v-model="password"
                  type="password"
                  inputmode="password"
                  placeholder="Введите старый пароль"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ error: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <!-- Новый пароль -->
              <validation-provider tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="newPassword">Новый пароль</label>
                <input
                  v-model="newPassword"
                  type="password"
                  inputmode="password"
                  placeholder="Введите новый пароль"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ error: newPasswordError }"
                  @input="newPasswordError = ''"
                  @change="validateNewPassword"
                />
                <span class="validate__error"> {{ newPasswordError }}</span>
              </validation-provider>

              <!-- Подтверждение пароля -->
              <validation-provider tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="newPasswordRepeat">Подтверждение нового пароля</label>
                <input
                  v-model="newPasswordRepeat"
                  type="password"
                  inputmode="password"
                  placeholder="Повторите новый пароль"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ error: newPasswordRepeatError }"
                  @input="newPasswordRepeatError = ''"
                  @change="validateNewPasswordRepeat"
                />
                <span class="validate__error"> {{ newPasswordRepeatError }} </span>
              </validation-provider>

              <button type="submit" class="company-settings-form__btn">Сохранить</button>
              <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
              <button type="button" class="company-settings__block-exit desk" @click="handleLogout">Выйти</button>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>

    <div class="company-settings__block">
      <button type="submit" class="company-settings__block-saved" @click="submit">Сохранить</button>
      <button type="button" class="company-settings__block-exit mob" @click="handleLogout">Выйти</button>
    </div>
  </section>
</template>

<script>
  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'

  export default {
    name: 'CompanySettings',
    components: { HeaderBackSvg },
    props: {
      mainError: {
        type: String,
        default: '',
      },
      scrolled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeLink: 'auth-data',
        links: [{ name: 'Данные авторизации', goTo: 'auth-data' }],

        email: '',
        phone: '',
        password: '',
        newPassword: '',
        newPasswordRepeat: '',

        // error
        newPasswordError: '',
        newPasswordRepeatError: '',
      }
    },
    mounted() {
      const user = this.$auth.user

      this.email = user.email || ''
      this.phone = user.phone || ''
    },
    methods: {
      async handleLogout(e) {
        e.preventDefault()
        await this.$auth.logout()
        this.$notify({
          title: '',
          message: 'Вы успешно вышли из аккаунта!',
          type: 'success',
        })
      },
      handleGoBack() {
        const newRoute = this.$route.path.replace('settings', 'products')
        this.$router.push(newRoute)
      },

      validateNewPassword() {
        this.newPasswordError = ''

        if (this.newPassword.length === 0) {
          return false
        } else if (this.newPassword.length < 8) {
          this.newPasswordError = 'Пароль должен содержать не менее 8 символов'
        } else if (this.password === this.newPassword) {
          this.newPasswordError = 'Новый пароль должен отличаться от текущего'
        }
      },

      validateNewPasswordRepeat() {
        this.newPasswordRepeatError = ''

        if (this.newPasswordRepeat !== this.newPassword) {
          this.newPasswordRepeatError = 'Пароли не совпадают'
        } else if (this.newPasswordRepeat.length === 0) {
          return false
        }
      },

      async submit() {
        const isValid = await this.$refs.observer.validate()

        this.validateNewPassword()
        this.validateNewPasswordRepeat()

        const body = {
          email: this.email,
          phone: this.phone,
          current_password: this.password,
        }

        if (this.newPasswordRepeat.length !== 0) {
          body.new_password = this.newPasswordRepeat
        }

        if (isValid && this.newPasswordError.length === 0 && this.newPasswordRepeatError.length === 0) {
          this.$emit('updateProfile', body)
        }
      },
    },
  }
</script>
