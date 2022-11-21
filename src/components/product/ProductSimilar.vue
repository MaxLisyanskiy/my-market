<template>
  <aside class="similar">
    <div class="similar-info product-owner">
      <nuxt-link :to="`/company/${company.id}/products`" class="product-owner__title">{{ company.name }}</nuxt-link>

      <div v-if="!showPhone" class="btn-call product-owner__call" @click="() => (showPhone = true)">
        <BtnCallSvg class="btn-call__img" />
        <span class="product-call__text">Показать номер</span>
      </div>
      <a v-else-if="showPhone && company.phone" :href="`tel:${company.phone}`" class="btn-call product-owner__call">
        <BtnCallSvg class="btn-call__img" />
        <span class="product-call__text">{{ formattingPhone }}</span>
      </a>
      <div v-else class="btn-call btn-call_empty product-owner__call">
        <span class="product-call__text">Нет номера</span>
      </div>

      <a :href="`mailto:${company.email}`" class="btn-chat product-owner__chat">
        <BtnMessageSvg class="btn-chat__img" />
        <span class="product-chat__text">Написать</span>
      </a>
    </div>
  </aside>
</template>

<script>
  import BtnCallSvg from '@/assets/img/icons/svg/btn-call.svg?inline'
  import BtnMessageSvg from '@/assets/img/icons/svg/btn-message.svg?inline'

  export default {
    name: 'ProductSimilar',
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

<style lang="scss" scoped></style>
