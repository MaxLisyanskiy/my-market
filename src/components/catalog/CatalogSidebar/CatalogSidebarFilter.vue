<template>
  <div>
    <div class="filter">
      <span class="filter-title">Заголовок фильтра 1#</span>
      <div class="filter-list">
        <div v-for="option in options" :key="option.id" class="checkbox">
          <input
            :id="`option-${option.id}`"
            class="custom-checkbox"
            type="checkbox"
            :value="option.value"
          />
          <label :for="`option-${option.id}`">{{ option.labelName }}</label>
        </div>
      </div>
    </div>

    <button class="filter-btn">Применить фильтры</button>
  </div>
</template>

<script>
  export default {
    name: 'CatalogSidebarFilter',
    data() {
      return {
        options: [
          { id: 1.1, labelName: 'Опция #1 (999)', value: 'indigo' },
          { id: 1.2, labelName: 'Опция #2 (999)', value: 'red' },
          { id: 1.3, labelName: 'Опция #3 (999)', value: 'brown' },
          { id: 1.4, labelName: 'Опция #4 (999)', value: 'yellow' },
          { id: 1.5, labelName: 'Опция #5 (999)', value: 'green' },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped></style>
