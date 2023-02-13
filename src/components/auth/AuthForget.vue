<template>
  <section class="auth">
    <div class="auth-head">
      <nuxt-link to="/">
        <LoginTitleSvg />
      </nuxt-link>
      <span>/</span>
      <h1 class="auth-head__title">Сброс пароля</h1>
    </div>

    <div class="auth__wrapp">
      <!-- email -->
      <validation-observer
        v-if="data.blockToShow === 'reset'"
        ref="observeReset"
        tag="form"
        class="auth-form"
        @submit.prevent="handleResetEmail"
      >
        <h2 class="auth-form__description">
          Для восстановления пароля укажите почту, под которой вы зарегистрированы на сайте. На неё придёт письмо с
          кодом
        </h2>
        <validation-provider v-slot="{ errors }" rules="email" tag="div" class="validate" mode="lazy">
          <input
            v-model="email"
            type="email"
            inputmode="email"
            placeholder="E-mail"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] || mainError }"
            @input="$emit('change-input')"
          />
          <span v-if="errors[0]" class="validate__error"> {{ errors[0] }} </span>
        </validation-provider>

        <button type="submit" class="auth-form__btn">Отправить письмо</button>
        <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
        <nuxt-link to="/login/" class="auth-form__link"> Назад </nuxt-link>
      </validation-observer>

      <!-- code -->
      <form v-else-if="data.blockToShow === 'reset-code'" class="auth-form" @submit.prevent="handleResetCode">
        <h2 class="auth-form__description">
          На почту <span>{{ email }}</span> отправлено письмо с 4-значным кодом. Введите его в поле ниже
        </h2>

        <v-otp-input
          ref="otpInput"
          separator=""
          class="modal-dialog-code signup-otp"
          :num-inputs="4"
          :should-auto-focus="false"
          :is-input-num="true"
          input-type="number"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />

        <span v-if="code_error" class="validate__error"> {{ code_error }} </span>

        <button type="submit" class="auth-form__btn">Продолжить</button>
        <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
        <button v-if="data.codeHasExpired" class="btn-repeat-code" @click.stop="$emit('resend-code-repeat', email)">
          Отправить код повторно
        </button>
        <span class="auth-form__link" @click="$emit('go-back', 'reset')"> Назад </span>
      </form>

      <!-- passwords -->
      <validation-observer
        v-else-if="data.blockToShow === 'reset-new-password'"
        ref="observerResetNewPassword"
        tag="form"
        class="auth-form"
        @submit.prevent="handleResetNewPassword"
      >
        <h2 class="auth-form__description">Придумайте новый пароль</h2>

        <validation-provider v-slot="{ errors }" rules="password" tag="div" class="validate" mode="lazy">
          <input
            v-model="password"
            type="password"
            inputmode="password"
            placeholder="Новый пароль"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
            @input="$emit('change-input')"
          />
          <span v-if="errors[0]" class="validate__error"> {{ errors[0] }} </span>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          :rules="{ repeatPassword: password }"
          tag="div"
          class="validate"
          mode="lazy"
        >
          <input
            v-model="passwordRepeat"
            type="password"
            inputmode="password"
            placeholder="Подтвердите пароль"
            autocomplete="on"
            class="auth-form__input"
            :class="{ validate__input: errors[0] }"
            @input="$emit('change-input')"
          />
          <span v-if="errors[0]" class="validate__error validate__error_last"> {{ errors[0] }} </span>
        </validation-provider>

        <button v-if="!data.codeHasExpired" type="submit" class="auth-form__btn">Сохранить</button>
        <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
        <p v-if="data.codeHasExpired" class="btn-repeat-code" @click="$emit('go-back', 'reset')">Вернуться назад</p>
      </validation-observer>
    </div>

    <div class="signup-svg">
      <ResetSvg class="signup-svg__item" :class="{ active: data.blockToShow === 'reset' }" />
      <ResetCodeSvg class="signup-svg__item" :class="{ active: data.blockToShow === 'reset-code' }" />
      <ResetNewPasswordSvg class="signup-svg__item" :class="{ active: data.blockToShow === 'reset-new-password' }" />
    </div>
  </section>
</template>

<script>
  import LoginTitleSvg from '@/assets/img/icons/svg/auth/login-title.svg?inline'
  import ResetSvg from '@/assets/img/icons/svg/auth/reset.svg?inline'
  import ResetCodeSvg from '@/assets/img/icons/svg/auth/reset-code.svg?inline'
  import ResetNewPasswordSvg from '@/assets/img/icons/svg/auth/reset-new-password.svg?inline'

  export default {
    name: 'AuthForget',
    components: { LoginTitleSvg, ResetSvg, ResetCodeSvg, ResetNewPasswordSvg },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
      mainError: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        // email
        email: '',

        // code
        verificationCode: '',
        code_error: '',

        // new-password
        password: '',
        passwordRepeat: '',
      }
    },
    methods: {
      /** EMAIL */
      async handleResetEmail() {
        const isValid = await this.$refs.observeReset.validate()

        if (isValid) {
          this.$emit('reset', this.email)
        }
      },

      /** CODE */
      handleOnChange(value) {
        this.verificationCode = value
        this.$emit('change-input')
      },
      handleOnComplete(value) {
        this.verificationCode = value
        this.$emit('change-input')
      },
      handleResetCode() {
        if (this.verificationCode.length < 4) {
          this.code_error = 'Код должен содержать 4 цифры'
          return false
        }

        const config = {
          email: this.email,
          code: this.verificationCode,
        }

        this.$emit('reset-code', config)
      },

      /** NEW-PASSWORD */
      async handleResetNewPassword() {
        const config = {
          email: this.email,
          token: this.data.token,
          password: this.password,
          password_confirm: this.passwordRepeat,
        }

        const isValid = await this.$refs.observerResetNewPassword.validate()

        if (isValid) {
          this.$emit('reset-new-password', config)
        }
      },
    },
  }
</script>

<style src="./auth.scss" lang="scss"></style>