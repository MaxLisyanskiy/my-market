<template>
  <div class="modal-dialog" role="dialog" aria-labelledby="modalHeader" @click.stop>
    <h3 id="modalHeader" class="modal-dialog__title">Вход</h3>

    <validation-observer ref="observer" tag="form" @submit.prevent="handleSubmitLogin">
      <validation-provider ref="login" rules="login" tag="div" class="validate">
        <input
          v-model="authData.login"
          type="email"
          inputmode="email"
          placeholder="E-mail"
          autocomplete="on"
          class="modal-dialog__input"
          :class="{ validate__input: login_error }"
          @input="
            main_error = ''
            login_error = ''
          "
          @change="validateLogin"
        />
        <span v-if="login_error" class="validate__error"> {{ login_error }} </span>
      </validation-provider>

      <validation-provider ref="password" rules="password" tag="div" class="validate">
        <input
          v-model="authData.password"
          type="password"
          inputmode="text"
          placeholder="Пароль"
          autocomplete="on"
          class="modal-dialog__input"
          :class="{ validate__input: password_error }"
          @input="
            main_error = ''
            password_error = ''
          "
          @change="validatePassword"
        />
        <span v-if="password_error" class="validate__error validate__error_last">{{ password_error }}</span>
      </validation-provider>

      <p class="modal-dialog__forgot" @click.stop="SET_WINDOW_TO_SHOW('reset')">Забыли пароль?</p>
      <button type="submit" class="modal-dialog__btn">Войти</button>
      <span v-if="main_error" class="validate__main-error">{{ main_error }}</span>
    </validation-observer>

    <p class="modal-dialog__link" @click.stop="SET_WINDOW_TO_SHOW('register')">Зарегистрировать компанию</p>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'AppModalAuthLogin',
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
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH', 'SET_WINDOW_TO_SHOW']),

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

      handleSubmitLogin() {
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

        this.$auth
          .loginWith('local', { data: body })
          .then(async () => {
            const { data } = await this.$auth.fetchUser(body)
            this.$auth.setUser(data.data.user)
          })
          .then(() => {
            this.SET_SHOW_MODAL_AUTH()
            this.$router.push(`/company/${this.$auth.user.company_id}/products/`)
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              return (this.main_error = 'Неверный логин или пароль')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },
    },
  }
</script>
