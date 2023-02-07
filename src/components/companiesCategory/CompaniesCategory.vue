<template>
  <div class="companiesCategory">
    <div v-for="company in companies" :key="`${company.name + company.id}`" class="companiesCategory-item">
      <CompaniesCategoryInfo :company="company" />
      <CompaniesCategoryProducts :products="company.products" />
    </div>
  </div>
</template>

<script>
  import CompaniesCategoryInfo from '~/components/companiesCategory/CompaniesCategoryInfo.vue'
  import CompaniesCategoryProducts from '~/components/companiesCategory/CompaniesCategoryProducts.vue'

  export default {
    name: 'CompaniesCategory',
    components: { CompaniesCategoryInfo, CompaniesCategoryProducts },
    props: {
      companies: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        showPhone: false,
      }
    },
    computed: {
      formattingPhone() {
        const pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
        if (this.company.phone) {
          return this.company.phone.replace(pattern, '+7 ($2) $3-$4-$5')
        }
        return 'Нет номера'
      },
    },
  }
</script>

<style src="./companies-category.scss" lang="scss"></style>
