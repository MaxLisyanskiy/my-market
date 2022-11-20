<template>
  <AuthSignup :main-error="mainError" :successful-registration="successfulRegistration" @register="register" />
</template>

<script>
  import AuthSignup from '@/components/auth/AuthSignup.vue'

  export default {
    name: 'RegisterPage',
    components: { AuthSignup },
    layout: 'customLayout',

    data() {
      return {
        mainError: [],
        successfulRegistration: false,
      }
    },
    head() {
      return {
        title: `Регистрация | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Регистрация | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Регистрация | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `Регистрация | VALE.SU`,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU`,
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
      register(body) {
        this.$authService
          .signup(body)
          .then(res => {
            if (res.status === 'success') {
              this.successfulRegistration = true
            } else {
              this.mainError = ['Что-то пошло не так :(']
            }
          })
          .catch(({ response }) => {
            const errorArray = []
            const data = response.data.data

            if ('email' in data) {
              errorArray.push('Введенный email уже занят')
            }

            if ('inn' in data) {
              errorArray.push('Введенный ИНН уже занят')
            }

            if ('phone' in data) {
              errorArray.push('Введенный телефон уже занят')
            }

            this.mainError = errorArray
          })
      },
    },
  }
</script>
