<template>
  <div class="companiesCategory-item__left">
    <nuxt-link :to="`/company/${company.id}/products/`" class="companiesCategory-item__link">
      <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="companiesCategory-item__logo" />
      <img
        v-else
        src="@/assets/img/icons/company-not-found-img.svg"
        alt="company-not-found-img"
        class="companiesCategory-item__logo"
      />
      <h3 class="companiesCategory-item__name">{{ company.name }}</h3>
    </nuxt-link>
    <p class="companiesCategory-item__description">{{ company.description }}</p>
    <div class="companiesCategory-item-btns">
      <div v-if="!showPhone" class="companiesCategory-item-btns__call" @click="() => (showPhone = true)">
        <BtnCallSvg class="btn-call__img" />
        <span>Показать номер</span>
      </div>
      <a
        v-else-if="showPhone && company.phone"
        :href="`tel:${company.phone}`"
        class="companiesCategory-item-btns__call"
      >
        <BtnCallSvg class="btn-call__img" />
        <span>{{ formattingPhone }}</span>
      </a>
      <div v-else class="companiesCategory-item-btns__call empty">
        <span>Нет номера</span>
      </div>

      <a :href="`mailto:${company.email}`" class="companiesCategory-item-btns__chat">
        <BtnMessageSvg class="btn-chat__img" />
        <span>Написать</span>
      </a>
    </div>
  </div>
</template>

<script>
  import BtnCallSvg from '@/assets/img/icons/svg/btn-call.svg?inline'
  import BtnMessageSvg from '@/assets/img/icons/svg/btn-message.svg?inline'

  export default {
    name: 'CompaniesCategoryInfo',
    components: { BtnCallSvg, BtnMessageSvg },
    props: {
      company: {
        type: Object,
        default: () => {},
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
