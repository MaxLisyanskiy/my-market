<template>
  <div class="modal-dialog" role="dialog" aria-labelledby="modalHeader" aria-describedby="modalDesc" @click.stop>
    <h3 id="modalHeader" class="modal-dialog__title">Регистрация</h3>

    <!-- TODO -->
    <p id="modalDesc" class="modal-dialog__todo">В разработке ...</p>

    <p class="modal-dialog__link" @click.stop="SET_WINDOW_TO_SHOW('login')">Назад</p>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'AppModalAuthRegister',
    data() {
      return {
        authData: {
          login: '',
          password: '',
        },
        main_error: '',
        login_error: '',
        password_error: '',
      }
    },
    methods: {
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH', 'SET_WINDOW_TO_SHOW']),
    },
  }
</script>
