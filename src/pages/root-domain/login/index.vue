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
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Вход в аккаунт | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: ``,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Вход в аккаунт | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: ``,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: 'Мир поставщиков VALE.SU',
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: ``,
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
