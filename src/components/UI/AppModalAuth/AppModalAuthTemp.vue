<template>
  <div
    class="modal-dialog auth__wrapp signup"
    role="dialog"
    aria-labelledby="modalHeader"
    aria-describedby="modalDesc"
    @click.stop
  >
    <div class="auth-form signup__form">
      <h3 id="modalHeader" class="signup__title signup__title-temp">Регистрация компании</h3>
      <span class="auth-form__text">По вопросам регистрации напишите, пожалуйста, в службу поддержки:</span>
      <span class="auth-form__email" @click="handleCopyURL">{{ email }}</span>
      <p class="auth-form__link" @click.stop="SET_WINDOW_TO_SHOW('login')">Назад</p>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'AppModalAuthRegister',
    data() {
      return {
        email: 'support@vale.su',
      }
    },
    methods: {
      handleCopyURL() {
        navigator.clipboard.writeText(this.email)
        this.$notify({
          title: '',
          message: 'Почта успешно скопирована',
          type: 'success',
        })
      },
      ...mapMutations('modal-auth', ['SET_WINDOW_TO_SHOW']),
    },
  }
</script>
