<template>
  <div>
    <header class="header sticky">
      <div class="header-row">
        <div class="header-block header-block__logo">
          <nuxt-link to="/">
            <img src="@/assets/img/logo.svg" alt="logo" class="header-logo" />
          </nuxt-link>
        </div>
        <div class="header-block header-block__search">
          <form type="search" class="header-search" @submit.prevent="handleSearch">
            <input
              type="text"
              placeholder="Я ищу..."
              class="header-search__input"
              :value="searchInput"
              @input="handleUpdateSearchInput"
            />
            <button type="submit" class="header-search__btn">Поиск</button>
          </form>
        </div>
        <div class="header-block header-block__btn">
          <div class="header-btn header-sign">
            <nuxt-link to="/login/">
              <img class="header-sign__img" src="@/assets/img/user_icon.png" alt="Войти" />
              <span class="header-sign__text">Войти</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <TheBreadcrumbs v-show="showBreadcrumbs" />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'

  import TheBreadcrumbs from './TheBreadcrumbs.vue'

  export default {
    components: {
      TheBreadcrumbs,
    },
    computed: {
      ...mapState('search', ['searchInput']),
      ...mapState('breadcrumbs', ['showBreadcrumbs']),
    },
    methods: {
      ...mapMutations('search', ['UPDATE_SEARCH_INPUT', 'UPDATE_SEARCH_QUERY']),
      ...mapActions('search', ['SET_SEARCH_QUERY']),
      /**
       * Update search input in the store and in the input
       *
       * @param {Event & { target: HTMLInputElement }} e
       */
      handleUpdateSearchInput(e) {
        this.UPDATE_SEARCH_INPUT(e.target.value)
      },
      /**
       * Submit to search page if valid query
       */
      handleSearch() {
        if (this.searchInput.trim() !== '') {
          this.UPDATE_SEARCH_QUERY(this.searchInput)
          this.$router.push({
            path: '/search/',
            query: { q: this.searchInput },
          })
        }
      },
    },
  }
</script>
