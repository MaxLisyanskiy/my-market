<template>
  <AuthForget
    :data="data"
    :main-error="main_error"
    @change-input="changeInput"
    @go-back="goBack"
    @reset="reset"
    @reset-code="resetCode"
    @resend-code-repeat="resendCodeRepeat"
    @reset-new-password="resetNewPassword"
  />
</template>

<script>
  import AuthForget from '@/components/auth/AuthForget.vue'

  export default {
    name: 'ForgetPage',
    components: { AuthForget },
    layout: 'customLayout',

    data() {
      return {
        data: {
          blockToShow: 'reset',
          token: '',
          codeHasExpired: '',
        },

        main_error: '',
      }
    },
    head() {
      return {
        title: `Сброс пароля | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            title: `Сброс пароля | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Мы гарантируем качество товара и организовываем доставку`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            title: `Сброс пароля | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Мы гарантируем качество товара и организовываем доставку`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            title: `Сброс пароля | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Мы гарантируем качество товара и организовываем доставку`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
        ],
      }
    },
    methods: {
      changeInput() {
        this.main_error = ''
      },
      goBack(path) {
        this.changeInput()
        this.data.blockToShow = path
      },
      reset(email) {
        this.$authService
          .postPasswordForgot({ email })
          .then(({ status }) => {
            if (status === 'success') {
              this.data.blockToShow = 'reset-code'
            } else {
              this.data.mainError = 'Что-то пошло не так :('
            }
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              return (this.data.mainError = 'Введенная почта не зарегистрирована')
            }
            this.data.mainError = 'Что-то пошло не так :('
          })
      },
      resetCode(config) {
        this.$authService
          .postPasswordEnterCode(config)
          .then(({ status, token }) => {
            if (status === 'success') {
              this.data.token = token
              this.data.blockToShow = 'reset-new-password'
            } else {
              this.main_error = 'Срок действия кода истек'
              this.data.codeHasExpired = true
            }
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              return (this.main_error = 'Введён неверный код')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },
      resetNewPassword(config) {
        this.$authService
          .postPasswordNewPassword(config)
          .then(({ status }) => {
            if (status === 'success') {
              this.$router.push('/login/')
              this.$notify({
                title: '',
                message: 'Пароль был успешно обновлён!',
                type: 'success',
              })
            } else {
              this.main_error = 'Что-то пошло не так :('
            }
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              this.data.codeHasExpired = true
              return (this.main_error = 'Срок действия кода истек')
            }
            this.main_error = 'Что-то пошло не так :('
          })
      },
      resendCodeRepeat(email) {
        this.changeInput()
        this.$authService.postPasswordForgot({ email })
        this.$notify({
          title: '',
          message: `На почту ${email} отправлен новый код`,
          type: 'success',
        })
      },
    },
  }
</script>
