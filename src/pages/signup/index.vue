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
        this.$authService.signup(body)
        // .then()
        // .catch()
      },
    },
  }
</script>
