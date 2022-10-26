<template>
  <section class="company content-row">
    <div class="company__wrapper">
      <div class="wrapper-sidebar sidebar" :class="{ fixed: !scrolled }">
        <ul class="sidebar-list">
          <li v-for="link in links" :key="link.name" class="sidebar-link" :class="{ active: activeLink === link.goTo }">
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>

      <div class="company-description">
        <div class="company-settings">
          <h1 class="company-settings__title">Данные авторизации</h1>

          <validation-observer ref="observer" tag="form" class="company-settings-form" @submit.prevent="submit">
            <div class="company-settings-form__left">
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
            </div>

            <div class="company-settings-form__right">
              <!-- Название компании -->
              <validation-provider
                v-slot="{ errors }"
                ref="required"
                rules="required"
                tag="div"
                class="validate"
                mode="lazy"
              >
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

              <button type="submit" class="company-settings-form__btn">Сохранить</button>
              <span v-if="mainError" class="validate__main-error">{{ mainError }}</span>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
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
