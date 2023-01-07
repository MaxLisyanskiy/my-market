<template>
  <div class="categories-accordion">
    <AppCategoriesAccordion v-for="level1 in categories" :key="`${level1 + level1.id}`" :open="true">
      <template #title>
        <span>{{ level1.name }}</span>
      </template>
      <template #content>
        <AppCategoriesAccordion
          v-for="level2 in level1.children"
          :key="`${level2 + level2.id}`"
          class="categories-accordion__level2"
          :open="openLevelTwo(level2.children)"
        >
          <template #title>
            <span>{{ level2.name }}</span>
          </template>
          <template #content>
            <div class="categories-accordion__level3">
              <NuxtLink v-for="level3 in level2.children" :key="`${level3 + level3.id}`" :to="`/category/${level3.id}`">
                {{ level3.name }}
              </NuxtLink>
            </div>
          </template>
        </AppCategoriesAccordion>
      </template>
    </AppCategoriesAccordion>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import AppCategoriesAccordion from '@/components/UI/AppCategoriesAccordion'

  export default {
    name: 'CatalogSidebarMenu',
    components: { AppCategoriesAccordion },
    computed: {
      ...mapState('categories', ['categories']),
    },
    methods: {
      openLevelTwo(arr) {
        let result = false

        for (let i = 0; i < arr.length; i++) {
          if (Number(arr[i].id) === Number(this.$route.params.id)) {
            result = true
          } else if (i === arr.length && result !== true) {
            result = false
          }
        }

        return result
      },
    },
  }
</script>

<style lang="scss" scoped>
  a.nuxt-link-active {
    color: #ff5833;
  }
  // a.nuxt-link-active {
  //   background: #ff5833;
  //   height: 24px;
  //   width: 224px;
  //   border-radius: 5px;
  //   color: #ffffff;
  //   align-items: center;
  //   display: flex;
  //   margin-left: -10px;
  //   box-sizing: border-box;
  //   padding: 4px 0 4px 10px;
  //   margin-bottom: -2px;
  //   &:hover {
  //     color: #ffffff;
  //   }
  // }
</style>
