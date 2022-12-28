<template>
  <section class="auth">
    <div class="auth-form signup signup__form">
      <h3 id="modalHeader" class="signup__title signup__title-temp">Регистрация компании</h3>
      <span class="auth-form__text">По вопросам регистрации напишите, пожалуйста, в службу поддержки:</span>
      <span class="auth-form__email" @click="handleCopyURL">{{ email }}</span>
      <nuxt-link to="/login">
        <p class="auth-form__link">Назад</p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'AuthSignup',
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
<style lang="scss" scoped>
  .signup__title-temp {
    line-height: 0;
  }
  .auth-form {
    background: none;
    box-shadow: none;
    &__email,
    &__text {
      color: #808080;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
    }
    &__email {
      color: #404040;
      cursor: pointer;
    }
    &__link {
      font-size: 12px;
      line-height: 14px;
    }
  }
</style>
