<template>
  <AuthSignup :main-error="mainError" @register="register" />
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
      }
    },
    head() {
      return {
        title: `Регистрация | VALE.SU`,
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      }
    },
    methods: {
      register(body) {
        this.$authService
          .signup(body)
          .then(res => {
            if (res.status === 'success') {
              this.$router.push('/login/')
              this.$notify({
                title: '',
                message: 'Вы успешно зарегистрировались!',
                type: 'success',
              })
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
