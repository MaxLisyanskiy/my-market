<template>
  <div>
    <button
      class="categories-accordion__btn"
      :class="{ active: isOpen }"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
      @click="toggleAccordion()"
    >
      <slot name="title" />
      <SidebarArrow class="categories-accordion__svg" :class="{ active: isOpen }" />
    </button>

    <div v-show="isOpen">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
  import SidebarArrow from '@/assets/img/icons/svg/sidebar-arrow.svg?inline'

  export default {
    name: 'AppCategoriesAccordion',
    components: { SidebarArrow },
    props: {
      open: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isOpen: this.open,
      }
    },

    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen
      },
    },
  }
</script>
