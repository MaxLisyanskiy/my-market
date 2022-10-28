<template>
  <section class="company company-settings__content-row content-row">
    <div class="company-settings__header">
      <HeaderBackSvg class="company-settings__header-back" />
      <span class="company-settings__header-text">Настройки</span>
    </div>

    <h1 class="company-settings__title">Данные авторизации</h1>

    <div class="company__wrapper company-settings__wrapper">
      <div class="wrapper-sidebar sidebar" :class="{ fixed: !scrolled }">
        <ul class="sidebar-list">
          <li v-for="link in links" :key="link.name" class="sidebar-link" :class="{ active: activeLink === link.goTo }">
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>

      <div class="company-description">
        <div class="company-settings">
          <h1 class="company-settings__title desktop">Данные авторизации</h1>

          <validation-observer ref="observer" tag="form" class="company-settings-form" @submit.prevent="submit">
            <div class="company-settings-form__left">
              <!-- E-mail -->
              <validation-provider v-slot="{ errors }" ref="email" rules="email" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">E-mail</label>
                <input
                  v-model="email"
                  type="email"
                  inputmode="email"
                  placeholder="E-mail"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <!-- Номер телефона -->
              <validation-provider v-slot="{ errors }" ref="phone" rules="phone" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">Номер телефона</label>
                <input
                  v-model="phone"
                  type="tel"
                  inputmode="tel"
                  placeholder="Номер телефона"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error validate__error_last"> {{ errors[0] }} </span>
              </validation-provider>
            </div>

            <div class="company-settings-form__right">
              <!-- Старый пароль -->
              <validation-provider v-slot="{ errors }" ref="" rules="" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">Старый пароль</label>
                <input
                  v-model="inn"
                  type="password"
                  inputmode="number"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <!-- Новый пароль -->

              <validation-provider v-slot="{ errors }" ref="" rules="" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">Новый пароль</label>
                <input
                  v-model="inn"
                  type="password"
                  inputmode="number"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <!-- Подтверждение пароля -->
              <validation-provider v-slot="{ errors }" ref="" rules="" tag="div" class="validate" mode="lazy">
                <label class="company-settings__label" for="email">Подтверждение нового пароля</label>
                <input
                  v-model="inn"
                  type="password"
                  inputmode="number"
                  autocomplete="on"
                  class="company-settings__input"
                  :class="{ validate__input: errors[0] }"
                />
                <span class="validate__error"> {{ errors[0] }} </span>
              </validation-provider>

              <button type="submit" class="company-settings-form__btn">Сохранить</button>
              <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
    <div class="company-settings__block">
      <button type="submit" class="company-settings__block-saved">Сохранить</button>
      <button type="submit" class="company-settings__block-exit">Выйти</button>
    </div>
  </section>
</template>

<script>
  import HeaderBackSvg from '@/assets/img/icons/svg/header-back.svg?inline'

  export default {
    components: { HeaderBackSvg },
    name: 'CompanySettings',
    props: {
      company: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
      scrolled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeLink: 'auth-data',
        links: [{ name: 'Данные авторизации', goTo: 'auth-data' }],
      }
    },
    methods: {},
  }
</script>
