<template>
  <section class="all-categories">
    <h1 class="all-categories__title">Все категории</h1>
    <div class="all-categories__list">
      <nuxt-link
        v-for="category in categories"
        :key="`${category + category.id}`"
        :to="`/category/${category.id}`"
        class="all-categories__item"
      >
        {{ category.name }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CategoryMainPage',
    layout: 'default',

    data() {
      return {}
    },
    head() {
      return {
        title: `Все Категории | VALE.SU`,
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: `Все категории | VALE.SU`,
          },
          {
            hid: 'description',
            name: 'description',
            content: `Мы предлагаем цены от производителей. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: `Все категории | VALE.SU`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: `Мы предлагаем цены от производителей. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: 'Оптовый интернет магазин VALE.SU',
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: `Мы предлагаем цены от производителей. Покупай выгодно с VALE.SU`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
          },
        ],
      }
    },
    computed: {
      ...mapState('categories', ['categories']),
    },
    created() {
      this.isTheDeskOrMob()
    },
    methods: {
      isTheDeskOrMob() {
        if (process.browser) {
          if (window.innerWidth > 670) {
            this.$router.push('/')
          }
        }
      },
    },
  }
</script>
