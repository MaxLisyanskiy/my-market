<template>
  <section class="tabs">
    <ul class="tabs-menu">
      <li class="tabs-menu__link" :class="{ active: tabIndex === 0 }" @click="handleToogleTabs(0)">Описание</li>
      <li v-show="false" class="tabs-menu__link" :class="{ active: tabIndex === 1 }" @click="handleToogleTabs(1)">
        Вопросы и ответы
      </li>
    </ul>

    <div v-show="tabIndex === 0" class="tabs-block description">
      <div class="tabs-table__row">
        <span class="tabs-block__title tabs-block__title-one">Базовая информация</span>
        <div class="tabs-table__block">
          <div v-for="(spec, index) in productSpecsLeft" :key="index" class="tabs-table__wrapp">
            <div class="tabs-table__left">{{ spec.key }}</div>
            <div class="tabs-table__right">{{ spec.value }}</div>
          </div>
        </div>
        <div v-if="productSpecsRight.length > 0" class="tabs-table__block tabs-table__block-two">
          <div v-for="(spec, index) in productSpecsRight" :key="index" class="tabs-table__wrapp">
            <div class="tabs-table__left">{{ spec.key }}</div>
            <div class="tabs-table__right">{{ spec.value }}</div>
          </div>
        </div>
      </div>

      <div class="tabs-block__description">
        <span class="tabs-block__title">Описание <span class="tabs-block__desktop">товара</span></span>
        <span class="tabs-block__text">{{ product.description }}</span>
      </div>
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
        productSpecsLeft: [],
        productSpecsRight: [],
      }
    },
    created() {
      if (this.product.specs.length > 5) {
        this.productSpecsLeft = this.product.specs.slice(0, 5)
        this.productSpecsRight = this.product.specs.slice(0, 5)
      } else {
        this.productSpecsLeft = this.product.specs
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
