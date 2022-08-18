<template>
  <div class="wrapper-sidebar sidebar">
    <span class="sidebar-title">Категории</span>
    <ul class="sidebar-list">
      <li v-for="category in categories" :key="category" class="sidebar-link">
        {{ category }}
        <svg
          class="sidebar-link__svg"
          width="6"
          height="8"
          viewBox="0 0 6 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="sidebar-link__path"
            d="M0.880012 0.160002C0.640012 0.400002 0.640012 0.800002 0.880012 1.04L3.84001 4L0.880012 6.96C0.640012 7.2 0.640012 7.56 0.880012 7.8C1.12001 8.04 1.48001 8.04 1.72001 7.8L5.12001 4.4C5.36001 4.16 5.36001 3.8 5.12001 3.56L1.72001 0.160002C1.48001 -0.0399979 1.12001 -0.0399979 0.880012 0.160002Z"
            fill="#666666"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HomeCategories',

    data() {
      return {
        categories: ['Банки', 'Бутылки', 'Бутыли, балоны, графины', 'Крышки, пробки, колпаки', 'Оборудование, станки'],
      }
    },
  }
</script>
