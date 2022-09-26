<template>
  <AuthLogin :main-error="mainError" @login="login" />
</template>

<script>
  import AuthLogin from '@/components/auth/AuthLogin.vue'

  export default {
    name: 'LoginPage',
    components: { AuthLogin },
    layout: 'customLayout',
    middleware: 'auth',

    data() {
      return {
        mainError: '',
      }
    },
    head() {
      return {
        title: `Вход в аккаунт | VALE.SU`,
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      }
    },
    methods: {
      login(body) {
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
