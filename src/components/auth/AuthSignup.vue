<template>
  <section class="auth">
    <div class="auth-head">
      <nuxt-link to="/">
        <LoginTitleSvg />
      </nuxt-link>
      <span>/</span>
      <h1 class="auth-head__title">Регистрация</h1>
    </div>

    <div class="auth__wrapp signup">
      <AuthRegisterSvg />

      <validation-observer ref="observer" tag="form" class="auth-form signup__form" @submit.prevent="submit">
        <!-- Название компании -->
        <validation-provider v-slot="{ errors }" ref="required" rules="required" tag="div" class="validate" mode="lazy">
          <input
            v-model="name"
            type="text"
            inputmode="text"
            placeholder="Название компании"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
          />
          <span class="validate__error"> {{ errors[0] }} </span>
        </validation-provider>

        <!-- ИНН -->
        <validation-provider v-slot="{ errors }" ref="inn" rules="inn" tag="div" class="validate" mode="lazy">
          <input
            v-model="inn"
            type="number"
            inputmode="number"
            placeholder="ИНН"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
          />
          <span class="validate__error"> {{ errors[0] }} </span>
        </validation-provider>

        <!-- E-mail -->
        <validation-provider v-slot="{ errors }" ref="email" rules="email" tag="div" class="validate" mode="lazy">
          <input
            v-model="email"
            type="email"
            inputmode="email"
            placeholder="E-mail"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
          />
          <span class="validate__error"> {{ errors[0] }} </span>
        </validation-provider>

        <!-- Номер телефона -->
        <validation-provider v-slot="{ errors }" ref="phone" rules="phone" tag="div" class="validate" mode="lazy">
          <input
            v-model="phone"
            type="tel"
            inputmode="tel"
            placeholder="Номер телефона"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
          />
          <span class="validate__error validate__error_last"> {{ errors[0] }} </span>
        </validation-provider>

        <button type="submit" class="auth-form__btn disabled">Подать заявку</button>
        <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
        <nuxt-link to="/login/" class="auth-form__link"> Назад </nuxt-link>
      </validation-observer>
    </div>
  </section>
</template>

<script>
  import LoginTitleSvg from '@/assets/img/icons/login-title.svg?inline'
  import AuthRegisterSvg from '@/assets/img/icons/auth-register.svg?inline'

  export default {
    name: 'AuthSignup',
    components: { LoginTitleSvg, AuthRegisterSvg },
    props: {
      mainError: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        name: '',
        inn: '',
        email: '',
        phone: '',

        main_error: '',
      }
    },
    methods: {
      async submit() {
        const isValid = await this.$refs.observer.validate()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .disabled {
    background: #afadad;
    cursor: not-allowed;
  }
</style>
