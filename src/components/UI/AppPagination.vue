<template>
  <ul class="pagination">
    <!-- <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
      >
        &lt;&lt;
      </a>
    </li> -->

    <!-- PaginationArrowLeft -->
    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[firstPageSelected() ? disabledClass : '']"
      class="pagination__first-arrow"
    >
      <a :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0" @click="prevPage()" @keyup.enter="prevPage()">
        <PaginationLeftSvg />
      </a>
    </li>

    <li
      v-for="page in pages"
      :key="page.index"
      class="pagination__item"
      :class="[page.selected ? 'pagination__item_active' : '', page.disabled ? 'pagination__item_disabled' : '']"
    >
      <a v-if="page.breakView" :class="[pageLinkClass]" tabindex="0">
        <PaginationDotsSvg />
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

    <!-- PaginationArrowRight -->
    <li
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[lastPageSelected() ? disabledClass : '']"
      class="pagination__last-arrow"
    >
      <a :class="nextLinkClass" :tabindex="lastPageSelected() ? -1 : 0" @click="nextPage()" @keyup.enter="nextPage()">
        <PaginationRightSvg />
      </a>
    </li>

    <!-- <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
      >
        &gt;&gt;
      </a>
    </li> -->
  </ul>
</template>

<script>
  import PaginationLeftSvg from '@/assets/img/icons/pagination/pagination-left.svg?inline'
  import PaginationRightSvg from '@/assets/img/icons/pagination/pagination-right.svg?inline'
  import PaginationDotsSvg from '@/assets/img/icons/pagination/pagination-dots.svg?inline'

  export default {
    name: 'AppPagination',
    components: { PaginationLeftSvg, PaginationRightSvg, PaginationDotsSvg },
    props: {
      pageCount: {
        type: Number,
        required: true,
      },
      initialPage: {
        type: Number,
        default: 1,
      },
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
      pageClass: {
        type: String,
        default: 'page-item',
      },
      pageLinkClass: {
        type: String,
        default: 'page-link',
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
      activeClass: {
        type: String,
        default: 'active',
      },
      disabledClass: {
        type: String,
        default: 'disabled',
      },
      firstLastButton: {
        type: Boolean,
        default: false,
      },
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

<style lang="scss" scoped>
  .pagination {
    margin-top: 10px;
    margin-right: 15px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    &__item {
      margin: 0 2.5px;
      padding: 3px 6px;

      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #4d4d4d;

      cursor: pointer;

      &_active {
        background: #ff5833;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        cursor: default;
      }

      &_disabled {
        cursor: default;
      }
    }

    &__first-arrow {
      margin-right: 1.5px;
      padding: 3px 6px;
      cursor: pointer;
      &.disabled {
        cursor: default;
        & svg {
          & path {
            fill: #999999;
          }
        }
      }
    }

    &__last-arrow {
      margin-left: 1.5px;
      padding: 3px 6px;
      cursor: pointer;
      &.disabled {
        cursor: default;
        & svg {
          & path {
            fill: #999999;
          }
        }
      }
    }
  }
</style>
