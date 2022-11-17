<template>
  <div
    class="modal-dialog auth__wrapp signup"
    role="dialog"
    aria-labelledby="modalHeader"
    aria-describedby="modalDesc"
    @click.stop
  >
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
          onfocus="this.removeAttribute('readonly')"
          readonly
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
          onfocus="this.removeAttribute('readonly')"
          readonly
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
          onfocus="this.removeAttribute('readonly')"
          readonly
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
          onfocus="this.removeAttribute('readonly')"
          readonly
        />
        <span class="validate__error"> {{ errors[0] }} </span>
      </validation-provider>

      <!-- Пароль -->
      <validation-provider v-slot="{ errors }" ref="password" rules="password" tag="div" class="validate" mode="lazy">
        <input
          v-model="password"
          type="password"
          inputmode="text"
          placeholder="Пароль"
          autocomplete="on"
          class="auth-form__input"
          :class="{ validate__input: errors[0] }"
          onfocus="this.removeAttribute('readonly')"
          readonly
        />
        <span class="validate__error"> {{ errors[0] }} </span>
      </validation-provider>

      <button type="submit" class="auth-form__btn">Подать заявку</button>
      <div v-if="mainError.length > 0" class="validate__main-error validate__main-error_array">
        <p v-for="errorText in mainError" :key="errorText">{{ errorText }}</p>
      </div>
      <p class="auth-form__link" @click.stop="SET_WINDOW_TO_SHOW('login')">Назад</p>
    </validation-observer>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import AuthRegisterSvg from '@/assets/img/icons/auth-register.svg?inline'

  export default {
    name: 'AppModalAuthRegister',
    components: { AuthRegisterSvg },
    data() {
      return {
        name: '',
        inn: '',
        email: '',
        phone: '',
        password: '',
        mainError: [],
      }
    },
    methods: {
      ...mapMutations('modal-auth', ['SET_WINDOW_TO_SHOW']),

      async submit() {
        const isValid = await this.$refs.observer.validate()

        const body = {
          name: this.name,
          inn: this.inn,
          email: this.email,
          phone: this.phone,
          password: this.password,
        }

        if (isValid) {
          this.$authService
            .signup(body)
            .then(res => {
              if (res.status === 'success') {
                this.SET_WINDOW_TO_SHOW('login')
                this.$notify({
                  title: '',
                  message: 'Вы успешно зарегистрировались!',
                  type: 'success',
                })
              } else {
                this.mainError = ['Что-то пошло не так :(']
              }
            })
            .catch(({ response }) => {
              const errorArray = []
              const data = response.data.data

              if ('email' in data) {
                errorArray.push('Введенный email уже занят')
              }

              if ('inn' in data) {
                errorArray.push('Введенный ИНН уже занят')
              }

              if ('phone' in data) {
                errorArray.push('Введенный телефон уже занят')
              }

              this.mainError = errorArray
            })
        }
      },
    },
  }
</script>
