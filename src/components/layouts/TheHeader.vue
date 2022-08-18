<template>
  <header class="header sticky">
    <div class="header-row">
      <div class="header-block header-block__logo">
        <nuxt-link to="/">
          <img src="@/assets/img/logo.svg" alt="logo" class="header-logo" />
        </nuxt-link>
      </div>
      <div class="header-block header-block__search">
        <form class="header-search">
          <input type="text" placeholder="Я ищу..." class="header-search__input" />
          <button class="header-search__btn">Поиск</button>
        </form>
      </div>
      <div class="header-block header-block__btn">
        <div class="header-btn header-sign">
          <img class="header-sign__img" src="@/assets/img/user_icon.png" alt="Войти" />
          <span class="header-sign__text">Войти</span>
        </div>
      </div>
    </div>
  </header>
</template>
