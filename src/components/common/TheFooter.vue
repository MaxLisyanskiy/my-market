<template>
  <footer class="footer">
    <span class="footer-text">© 2022 VALE. Все права защищены.</span>

    <div class="menu mobile">
      <ul class="menu-list">
        <li class="menu-link">
          <nuxt-link to="/">
            <HomeSvg class="menu-link__icon" />
            <span class="menu-link__text">Главная</span>
          </nuxt-link>
        </li>

        <li class="menu-link">
          <nuxt-link to="/category/">
            <AllCategoriesSvg class="menu-link__icon" />
            <span class="menu-link__text">Все категории</span>
          </nuxt-link>
        </li>

        <li class="menu-link">
          <a v-if="!$auth.loggedIn" href="#" @click.prevent="handleShowModalAuth">
            <ProfileSvg class="menu-link__icon" />
            <span class="menu-link__text">Войти</span>
          </a>
          <nuxt-link v-else :to="`/company/${$auth.user.company_id}/products/`">
            <ProfileSvg class="menu-link__icon" />
            <span class="menu-link__text">Профиль</span>
          </nuxt-link>
          <AppModalAuth />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
  import { mapMutations } from 'vuex'

  import HomeSvg from '@/assets/img/icons/svg/home.svg?inline'
  import AllCategoriesSvg from '@/assets/img/icons/svg/all-categories.svg?inline'
  import ProfileSvg from '@/assets/img/icons/svg/profile.svg?inline'

  import AppModalAuth from '@/components/UI/AppModalAuth.vue'

  export default {
    name: 'TheFooter',
    components: { HomeSvg, AllCategoriesSvg, ProfileSvg, AppModalAuth },
    computed: {
      isLoggedIn() {
        return this.$auth.loggedIn
      },
    },
    methods: {
      ...mapMutations('modal-auth', ['SET_SHOW_MODAL_AUTH']),

      // Open modal auth
      handleShowModalAuth() {
        this.SET_SHOW_MODAL_AUTH(true)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nuxt-link-exact-active.nuxt-link-active .menu-link__icon {
    fill: #404040;
  }
</style>
