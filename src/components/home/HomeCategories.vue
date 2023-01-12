<template>
  <aside class="wrapper-sidebar sidebar">
    <span class="sidebar-title">Категории</span>

    <div class="categories-accordion">
      <AppCategoriesAccordion v-for="level1 in categories" :key="`${level1 + level1.id}`">
        <template #title>
          <span>{{ level1.name }}</span>
        </template>
        <template #content>
          <AppCategoriesAccordion
            v-for="level2 in level1.children"
            :key="`${level2 + level2.id}`"
            class="categories-accordion__level2"
          >
            <template #title>
              <span>{{ level2.name }}</span>
            </template>
            <template #content>
              <div class="categories-accordion__level3">
                <NuxtLink
                  v-for="level3 in level2.children"
                  :key="`${level3 + level3.id}`"
                  :to="`/category/${level3.id}`"
                >
                  {{ level3.name }}
                </NuxtLink>
              </div>
            </template>
          </AppCategoriesAccordion>
        </template>
      </AppCategoriesAccordion>
    </div>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'

  import AppCategoriesAccordion from '@/components/UI/AppCategoriesAccordion'

  export default {
    name: 'HomeCategories',
    components: { AppCategoriesAccordion },
    data() {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapState('categories', ['categories']),
    },

    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen
      },
    },
  }
</script>
