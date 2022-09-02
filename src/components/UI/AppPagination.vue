<template>
  <ul v-if="!noLiSurround" :class="containerClass">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
      >
        First
      </a>
    </li>

    <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
      <a :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0" @click="prevPage()" @keyup.enter="prevPage()">
        Prev
      </a>
    </li>

    <li
      v-for="page in pages"
      :key="page.index"
      :class="[
        pageClass,
        page.selected ? activeClass : '',
        page.disabled ? disabledClass : '',
        page.breakView ? breakViewClass : '',
      ]"
    >
      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0">
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        tabindex="0"
        :class="pageLinkClass"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </a>
    </li>

    <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
      <a :class="nextLinkClass" :tabindex="lastPageSelected() ? -1 : 0" @click="nextPage()" @keyup.enter="nextPage()">
        Next
      </a>
    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
      >
        Last
      </a>
    </li>
  </ul>

  <div v-else :class="containerClass">
    <a
      v-if="firstLastButton"
      :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="selectFirstPage()"
      @keyup.enter="selectFirstPage()"
    ></a>
    <a
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="prevPage()"
      @keyup.enter="prevPage()"
    >
      Prev
    </a>
    <template v-for="page in pages">
      <a
        v-if="page.breakView"
        :key="page.index"
        :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a
        v-else-if="page.disabled"
        :key="`${page.index + Math.random()}`"
        :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]"
        tabindex="0"
      >
        {{ page.content }}
      </a>
      <a
        v-else
        :key="`${page.index + Date.now()}`"
        tabindex="0"
        :class="[pageLinkClass, page.selected ? activeClass : '']"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </a>
    </template>
    <a
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="nextPage()"
      @keyup.enter="nextPage()"
    >
      Next
    </a>
    <a
      v-if="firstLastButton"
      :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="selectLastPage()"
      @keyup.enter="selectLastPage()"
    >
      Last
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      // modelValue: {
      //   type: Number,
      //   // default: 1,
      // },
      pageCount: {
        type: Number,
        required: true,
      },
      initialPage: {
        type: Number,
        default: 1,
      },
      // forcePage: {
      //   type: Number,
      //   // default: 1,
      // },
      clickHandler: {
        type: Function,
        default: () => {},
      },
      pageRange: {
        type: Number,
        default: 5,
      },
      marginPages: {
        type: Number,
        default: 1,
      },
      // prevText: {
      //   type: String,
      //   default: 'Prev',
      // },
      // nextText: {
      //   type: String,
      //   default: 'Next',
      // },
      breakViewText: {
        type: String,
        default: '…',
      },
      containerClass: {
        type: String,
        default: 'pagination',
      },
      pageClass: {
        type: String,
        default: 'page-item',
      },
      pageLinkClass: {
        type: String,
        default: 'page-link',
      },
      prevClass: {
        type: String,
        default: 'page-item',
      },
      prevLinkClass: {
        type: String,
        default: 'page-link',
      },
      nextClass: {
        type: String,
        default: 'page-item',
      },
      nextLinkClass: {
        type: String,
        default: 'page-link',
      },
      breakViewClass: {
        type: String,
        default: '',
      },
      breakViewLinkClass: {
        type: String,
        default: '',
      },
      activeClass: {
        type: String,
        default: 'active',
      },
      disabledClass: {
        type: String,
        default: 'disabled',
      },
      noLiSurround: {
        type: Boolean,
        default: false,
      },
      firstLastButton: {
        type: Boolean,
        default: false,
      },
      // firstButtonText: {
      //   type: String,
      //   default: 'First',
      // },
      // lastButtonText: {
      //   type: String,
      //   default: 'Last',
      // },
      hidePrevNext: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        innerValue: 1,
      }
    },
    computed: {
      selected: {
        get() {
          return this.modelValue || this.innerValue
        },
        set(newValue) {
          this.innerValue = newValue
        },
      },
      pages() {
        const items = {}
        if (this.pageCount <= this.pageRange) {
          for (let index = 0; index < this.pageCount; index++) {
            const page = {
              index,
              content: index + 1,
              selected: index === this.selected - 1,
            }
            items[index] = page
          }
        } else {
          const halfPageRange = Math.floor(this.pageRange / 2)

          const setPageItem = index => {
            const page = {
              index,
              content: index + 1,
              selected: index === this.selected - 1,
            }

            items[index] = page
          }

          const setBreakView = index => {
            const breakView = {
              disabled: true,
              breakView: true,
            }

            items[index] = breakView
          }

          // 1st - loop thru low end of margin pages
          for (let i = 0; i < this.marginPages; i++) {
            setPageItem(i)
          }

          // 2nd - loop thru selected range
          let selectedRangeLow = 0
          if (this.selected - halfPageRange > 0) {
            selectedRangeLow = this.selected - 1 - halfPageRange
          }

          let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
          if (selectedRangeHigh >= this.pageCount) {
            selectedRangeHigh = this.pageCount - 1
            selectedRangeLow = selectedRangeHigh - this.pageRange + 1
          }

          for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
            setPageItem(i)
          }

          // Check if there is breakView in the left of selected range
          if (selectedRangeLow > this.marginPages) {
            setBreakView(selectedRangeLow - 1)
          }

          // Check if there is breakView in the right of selected range
          if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
            setBreakView(selectedRangeHigh + 1)
          }

          // 3rd - loop thru high end of margin pages
          for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
            setPageItem(i)
          }
        }
        return items
      },
    },
    beforeMount() {
      this.innerValue = this.initialPage
    },
    beforeUpdate() {
      if (this.forcePage === undefined) return
      if (this.forcePage !== this.selected) {
        this.selected = this.forcePage
      }
    },
    methods: {
      handlePageSelected(selected) {
        if (this.selected === selected) return

        this.innerValue = selected
        this.$emit('update:modelValue', selected)
        this.clickHandler(selected)
      },
      prevPage() {
        if (this.selected <= 1) return

        this.handlePageSelected(this.selected - 1)
      },
      nextPage() {
        if (this.selected >= this.pageCount) return

        this.handlePageSelected(this.selected + 1)
      },
      firstPageSelected() {
        return this.selected === 1
      },
      lastPageSelected() {
        return this.selected === this.pageCount || this.pageCount === 0
      },
      selectFirstPage() {
        if (this.selected <= 1) return

        this.handlePageSelected(1)
      },
      selectLastPage() {
        if (this.selected >= this.pageCount) return

        this.handlePageSelected(this.pageCount)
      },
    },
  }
</script>

<style scoped>
  /* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'; */
</style>
