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
          <a href="#" @click="e => handleGoToAllCategories(e)">
            <AllCategoriesSvg class="menu-link__icon" />
            <span class="menu-link__text">Все категории</span>
          </a>
        </li>

        <li class="menu-link">
          <nuxt-link
            v-if="!$auth.loggedIn"
            :to="'/login/'"
            :class="{
              'nuxt-link-exact-active nuxt-link-active':
                $route.name === 'login' || $route.name === 'forget' || $route.name === 'signup',
            }"
          >
            <ProfileSvg class="menu-link__icon" />
            <span class="menu-link__text">Войти</span>
          </nuxt-link>
          <nuxt-link v-else :to="`/company/${$auth.user.company_id}/products/`">
            <ProfileSvg class="menu-link__icon" />
            <span class="menu-link__text">Профиль</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
  import HomeSvg from '@/assets/img/icons/svg/home.svg?inline'
  import AllCategoriesSvg from '@/assets/img/icons/svg/all-categories.svg?inline'
  import ProfileSvg from '@/assets/img/icons/svg/profile.svg?inline'

  export default {
    name: 'TheFooter',
    components: { HomeSvg, AllCategoriesSvg, ProfileSvg },
    computed: {
      isLoggedIn() {
        return this.$auth.loggedIn
      },
    },
    methods: {
      handleGoToAllCategories(e) {
        e.preventDefault()
        if (this.$route.path === '/category/') {
          this.$router.push('/category/?active=goods&reload=true')
        } else {
          this.$router.push('/category/?active=goods')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nuxt-link-exact-active.nuxt-link-active .menu-link__icon {
    fill: #404040;
  }
</style>

<style src="./footer.scss" lang="scss"></style>