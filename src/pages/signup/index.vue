<template>
  <AuthSignup :main-error="mainError" @login="register" />
</template>

<script>
  import AuthSignup from '@/components/auth/AuthSignup.vue'

  export default {
    name: 'LoginPage',
    components: { AuthSignup },
    layout: 'customLayout',

    data() {
      return {
        mainError: '',
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
        this.$auth
          .loginWith('local', { data: body })
          .then(async () => {
            const { data } = await this.$auth.fetchUser(body)
            this.$auth.setUser(data.data.user)
          })
          .then(() => {
            this.$router.push(`/company/${this.$auth.user.company_id}/products/`)
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              return (this.mainError = 'Неверный логин или пароль')
            }
            this.mainError = 'Что-то пошло не так :('
          })
      },
    },
  }
</script>
