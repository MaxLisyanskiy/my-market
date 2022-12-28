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
  import AppModalAuthRegister from './AppModalAuthTemp.vue'
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
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH', 'SET_WINDOW_TO_SHOW']),

      // Close a modal auth
      handleCloseModalAuth() {
        document.querySelector('body').classList.remove('lock')
        this.SET_SHOW_MODAL_AUTH(false)
        this.SET_WINDOW_TO_SHOW('login')
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
