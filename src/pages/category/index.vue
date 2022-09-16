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
        title: `Все категории | VALE.SU`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Все категории`,
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
