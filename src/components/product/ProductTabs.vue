<template>
  <section class="tabs">
    <ul class="tabs-menu">
      <li class="tabs-menu__link" :class="{ active: tabIndex === 0 }" @click="handleToogleTabs(0)">Описание</li>
      <li v-show="false" class="tabs-menu__link" :class="{ active: tabIndex === 1 }" @click="handleToogleTabs(1)">
        Вопросы и ответы
      </li>
    </ul>

    <div v-show="tabIndex === 0" class="tabs-block description">
      <span class="tabs-block__title">Базовая информация</span>
      <div class="tabs-table__row">
        <div class="tabs-table__block">
          <div class="tabs-table__left"></div>
          <div class="tabs-table__right"></div>
          <div class="tabs-table__left"></div>
          <div class="tabs-table__right"></div>
          <div class="tabs-table__left"></div>
          <div class="tabs-table__right"></div>
          <div class="tabs-table__left"></div>
          <div class="tabs-table__right"></div>
          <div class="tabs-table__left"></div>
          <div class="tabs-table__right"></div>
        </div>
      </div>

      <span class="tabs-block__title">Описание товара</span>
      <span class="tabs-block__text">{{ product.description }}</span>
    </div>

    <div v-show="tabIndex === 1" class="tabs-block feedback">
      <div class="feedback-block">
        <div class="queston-block">
          <span class="queston-block__text"> Самое лучшее место для вопроса </span>
        </div>
        <div class="answer-description">
          <span class="answer-description__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </span>
        </div>
      </div>

      <div class="feedback-block">
        <div class="queston-block">
          <span class="queston-block__text"> Самое лучшее место для вопроса </span>
        </div>
        <div class="answer-description">
          <span class="answer-description__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ProductTabs',
    props: {
      product: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        tabIndex: 0,
      }
    },
    methods: {
      /**
       * Set new tab index
       * @param {number} index tab index
       */
      handleToogleTabs(index) {
        if (this.tabIndex === index) return false

        this.tabIndex = index
      },
    },
  }
</script>

<style lang="scss" scoped></style>
