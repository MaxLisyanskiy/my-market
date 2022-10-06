<template>
  <dialog class="modal" :class="{ active: showModalAuth }" @click="handleCloseModalAuth">
    <AppModalAuthLogin v-if="windowToShow === 'login'" />
    <AppModalAuthRegister v-else-if="windowToShow === 'register'" />
    <AppModalAuthReset v-else />
  </dialog>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import AppModalAuthLogin from './AppModalAuthLogin.vue'
  import AppModalAuthRegister from './AppModalAuthRegister.vue'
  import AppModalAuthReset from './AppModalAuthReset.vue'

  export default {
    name: 'AppModalAuth',
    components: { AppModalAuthLogin, AppModalAuthRegister, AppModalAuthReset },
    computed: {
      ...mapState('modal-auth', ['showModalAuth', 'windowToShow']),
    },
    mounted() {
      window.addEventListener('keydown', this.escCloseModal)
    },
    destroy() {
      window.removeEventListener('keydown', this.escCloseModal)
    },
    methods: {
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH']),

      // Close a modal auth
      handleCloseModalAuth() {
        this.main_error = ''
        this.login_error = ''
        this.password_error = ''

        this.SET_SHOW_MODAL_AUTH(false)
      },

      // Close a modal on pressing the Esc key
      escCloseModal(e) {
        if (this.showModalAuth && e.key === 'Escape') {
          this.handleCloseModalAuth()
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
