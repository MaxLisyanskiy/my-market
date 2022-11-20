<template>
  <section class="auth">
    <div class="auth-head">
      <nuxt-link to="/">
        <LoginTitleSvg />
      </nuxt-link>
      <span>/</span>
      <h1 class="auth-head__title">Вход</h1>
    </div>

    <div class="auth__wrapp">
      <validation-observer ref="observer" tag="form" class="auth-form" @submit.prevent="login">
        <!-- email -->
        <validation-provider ref="login" rules="login" tag="div" class="validate">
          <input
            v-model="authData.login"
            type="email"
            inputmode="email"
            placeholder="E-mail"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: login_error }"
            @input="
              main_error = ''
              login_error = ''
            "
            @change="validateLogin"
          />
          <span v-if="login_error" class="validate__error"> {{ login_error }} </span>
        </validation-provider>

        <!-- password -->
        <validation-provider ref="password" rules="password" tag="div" class="validate">
          <input
            v-model="authData.password"
            type="password"
            inputmode="text"
            placeholder="Пароль"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: password_error }"
            @input="
              main_error = ''
              password_error = ''
            "
            @change="validatePassword"
          />
          <span v-if="password_error" class="validate__error validate__error_last">{{ password_error }}</span>
        </validation-provider>

        <nuxt-link to="/forget/" class="auth-form__forget"> Забыли пароль? </nuxt-link>
        <button type="submit" class="auth-form__btn">Войти</button>
        <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
        <nuxt-link to="/signup/" class="auth-form__link"> Зарегистрировать компанию </nuxt-link>
      </validation-observer>
    </div>
  </section>
</template>

<script>
  import LoginTitleSvg from '@/assets/img/icons/svg/auth/login-title.svg?inline'

  export default {
    name: 'AuthLogin',
    components: { LoginTitleSvg },
    props: {
      mainError: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        authData: {
          login: '',
          password: '',
        },
        main_error: '',
        login_error: '',
        password_error: '',
      }
    },
    methods: {
      validateLogin() {
        this.login_error = ''
        this.authData.login = this.authData.login.replace(/\s/g, '')

        if (this.authData.login.length === 0) {
          return
        }

        if (this.authData.login.length > 255) {
          this.login_error = 'Логин не может быть длинее 255 символов'
        } else if (
          // eslint-disable-next-line
          !(/^[A-z0-9\-\.\_]+@[A-z\-\.\_]+$/.test(this.authData.login) || /^\+[0-9]{11}$/.test(this.authData.login))
        ) {
          this.login_error = 'Логин должен содержать корректную почту'
        }
      },

      validatePassword() {
        this.password_error = ''
        this.authData.password = this.authData.password.replace(/\s/g, '')

        if (this.authData.password.length === 0) {
          return
        }

        if (this.authData.password.length < 8) {
          this.password_error = 'Минимальная длина пароля - 8 символов'
        }
      },

      login() {
        this.main_error = ''

        this.validateLogin()
        this.validatePassword()

        if (this.authData.login.length === 0) {
          this.login_error = 'Это поле обязательно для ввода'
        }
        if (this.authData.password.length === 0) {
          this.password_error = 'Это поле обязательно для ввода'
        }

        if (this.login_error || this.password_error) {
          return
        }

        const body = {
          login: this.authData.login.replace('+', ''),
          password: this.authData.password,
        }

        this.$emit('login', body)
      },
    },
  }
</script>
