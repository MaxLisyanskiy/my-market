<template>
  <div class="modal-dialog" role="dialog" aria-labelledby="modalHeader" aria-describedby="modalDesc" @click.stop>
    <template v-if="windowToShow === 'reset'">
      <h3 id="modalHeader" class="modal-dialog__title">Сброс пароля</h3>
      <p id="modalDesc" class="modal-dialog__subtitle">
        Для восстановления пароля укажите почту, под которой вы зарегистрированы на сайте. На неё придёт письмо с кодом
      </p>

      <validation-observer ref="observer" tag="form" @submit.prevent="handleResetEmail">
        <validation-provider ref="login" rules="login" tag="div" class="validate">
          <input
            v-model="email"
            type="email"
            inputmode="email"
            placeholder="E-mail"
            autocomplete="on"
            class="modal-dialog__input"
            :class="{ validate__input: email_error || main_error }"
            @input="
              main_error = ''
              email_error = ''
            "
            @change="validateEmail"
          />
          <span v-if="email_error" class="validate__error"> {{ email_error }} </span>
        </validation-provider>

        <button type="submit" class="modal-dialog__btn">Отправить письмо</button>
        <span v-if="main_error" class="validate__main-error">{{ main_error }}</span>
      </validation-observer>

      <p class="modal-dialog__link" @click.stop="SET_WINDOW_TO_SHOW('login')">Назад</p>
    </template>

    <template v-else-if="windowToShow === 'reset-code'">
      <h3 id="modalHeader" class="modal-dialog__title">Сброс пароля</h3>
      <p id="modalDesc" class="modal-dialog__subtitle">
        На почту <span>{{ email }}</span> отправлено письмо с 6-значным кодом. Введите его в поле ниже
      </p>

      <form @submit.prevent="handleResetCode">
        <div class="modal-dialog-code">
          <input
            ref="first"
            v-model="code[0]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[0].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
          <input
            ref="second"
            v-model="code[1]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[1].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
          <input
            ref="third"
            v-model="code[2]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[2].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
          <input
            ref="forth"
            v-model="code[3]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[3].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
          <input
            ref="fifth"
            v-model="code[4]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[4].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
          <input
            ref="six"
            v-model="code[5]"
            type="number"
            inputmode="number"
            autocomplete="on"
            :class="{ validate__input: code[5].trim() === '' && code_error }"
            @input="
              code_error = ''
              main_error = ''
            "
          />
        </div>
        <span v-if="code_error" class="validate__error"> {{ code_error }} </span>

        <button type="submit" class="modal-dialog__btn">Продолжить</button>
        <span v-if="main_error" class="validate__main-error">{{ main_error }}</span>
      </form>

      <p class="modal-dialog__link" @click.stop="SET_WINDOW_TO_SHOW('reset')">Назад</p>
    </template>

    <template v-else-if="windowToShow === 'reset-new-password'">
      <h3 id="modalHeader" class="modal-dialog__title">Сброс пароля</h3>
      <p id="modalDesc" class="modal-dialog__subtitle">Придумайте новый пароль</p>

      <validation-observer ref="observer" tag="form" @submit.prevent="handleResetNewPassword">
        <validation-provider ref="password" rules="password" tag="div" class="validate">
          <input
            v-model="password"
            type="password"
            inputmode="text"
            placeholder="Новый пароль"
            autocomplete="on"
            class="modal-dialog__input"
            :class="{ validate__input: password_error }"
            @input="
              main_error = ''
              password_error = ''
            "
            @change="validatePassword"
          />
          <span v-if="password_error" class="validate__error">
            {{ password_error }}
          </span>
        </validation-provider>

        <validation-provider ref="password" rules="password" tag="div" class="validate">
          <input
            v-model="passwordRepeat"
            type="password"
            inputmode="text"
            placeholder="Подтвердите пароль"
            autocomplete="on"
            class="modal-dialog__input"
            :class="{ validate__input: passwordRepeat_error }"
            @input="
              main_error = ''
              passwordRepeat_error = ''
            "
            @change="validatePassword('repeat')"
          />
          <span v-if="passwordRepeat_error" class="validate__error validate__error_last">
            {{ passwordRepeat_error }}
          </span>
        </validation-provider>

        <button type="submit" class="modal-dialog__btn">Сохранить</button>
        <span v-if="main_error" class="validate__main-error">{{ main_error }}</span>
      </validation-observer>
    </template>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'AppModalAuthReset',
    data() {
      return {
        main_error: '',

        // email
        email: '',
        email_error: '',

        // code
        code: ['', '', '', '', '', ''],
        verificationCode: '',
        code_error: '',

        // new-password
        token: '',
        password: '',
        password_error: '',
        passwordRepeat: '',
        passwordRepeat_error: '',
      }
    },
    computed: {
      ...mapState('modal-auth', ['windowToShow']),
    },
    watch: {
      code(newValue, oldValue) {
        const codeId = ['first', 'second', 'third', 'forth', 'fifth', 'six']

        let tempValue = ''

        for (let i = 0; i < newValue.length; i++) {
          if (i === 6) {
            break
          }
          if (newValue[i]) {
            tempValue = tempValue + newValue[i]
          }
        }

        const m = tempValue.split('')
        let location = 0

        for (let i = 0; i < newValue.length; i++) {
          if (m[i] && i < 6) {
            location++
            newValue[i] = m[i]
          } else {
            newValue[i] = ''
            break
          }
        }

        if (location < 1) {
          location = 1
        } else if (location === 6) {
          location = 6
        }

        const elemFocus = location === 6 ? codeId[location - 1] : codeId[location]
        this.$refs[elemFocus].focus()

        this.verificationCode = newValue.join('')
      },
    },
    methods: {
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH', 'SET_WINDOW_TO_SHOW']),

      /** EMAIL */
      validateEmail() {
        this.email_error = ''
        this.email = this.email.replace(/\s/g, '')
        if (this.email.length === 0) {
          return false
        }
        if (this.email.length > 255) {
          this.email_error = 'Логин не может быть длинее 255 символов'
        } else if (
          // eslint-disable-next-line
          !(/^[A-z0-9\-\.\_]+@[A-z\-\.\_]+$/.test(this.email) || /^\+[0-9]{11}$/.test(this.email))
        ) {
          this.email_error = 'Логин должен содержать корректную почту'
        }
      },
      handleResetEmail() {
        this.main_error = ''

        this.validateEmail()

        if (this.email.length === 0) {
          this.email_error = 'Это поле обязательно для ввода'
        }

        this.$authService
          .postPasswordForgot({ email: this.email })
          .then(({ status }) => {
            if (status === 200) {
              this.SET_WINDOW_TO_SHOW('reset-code')
            } else {
              this.main_error = 'Что-то пошло не так :('
            }
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              return (this.main_error = 'Неверный логин или пароль')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },

      /** CODE */
      handleResetCode() {
        this.main_error = ''

        if (this.verificationCode.length < 6) {
          this.code_error = 'Код должен содержать 6 цифр'
          return false
        }

        this.$authService
          .postPasswordEnterCode({ code: this.verificationCode })
          .then(({ status, token }) => {
            if (status === 'success') {
              this.token = token
              this.SET_WINDOW_TO_SHOW('reset-new-password')
            } else {
              this.main_error = 'Что-то пошло не так :('
            }
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              return (this.main_error = 'Введён неверный код')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },

      /** NEW-PASSWORD */
      validatePassword(passwordType) {
        if (passwordType === 'repeat') {
          this.passwordRepeat_error = ''
          this.passwordRepeat = this.passwordRepeat.replace(/\s/g, '')

          if (this.passwordRepeat.length === 0) {
            return false
          }

          if (this.passwordRepeat.length < 8) {
            this.passwordRepeat_error = 'Минимальная длина пароля - 8 символов'
          }
        } else {
          this.password_error = ''
          this.password = this.password.replace(/\s/g, '')

          if (this.password.length === 0) {
            return false
          }

          if (this.password.length < 8) {
            this.password_error = 'Минимальная длина пароля - 8 символов'
          }
        }
      },

      handleResetNewPassword() {
        this.main_error = ''

        this.validatePassword()

        if (this.password !== this.passwordRepeat) {
          this.main_error = 'Пароли не совпадают'
          return false
        }

        const config = {
          token: this.token,
          password: this.password,
          password_confirm: this.passwordRepeat,
        }

        this.$authService
          .postPasswordNewPassword(config)
          .then(({ status }) => {
            if (status === 'success') {
              this.SET_WINDOW_TO_SHOW('login')
            } else {
              this.main_error = 'Что-то пошло не так :('
            }
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              return (this.main_error = 'Введён неверный код')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },
    },
  }
</script>
