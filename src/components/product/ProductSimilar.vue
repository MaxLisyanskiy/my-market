<template>
  <aside class="similar">
    <div class="similar-info product-owner">
      <nuxt-link :to="`/company/${company.id}/products`" class="product-owner__title">{{ company.name }}</nuxt-link>
      <a :href="`tel:${company.phone}`" class="btn-call product-owner__call">
        <BtnCallSvg class="btn-call__img" />
        <span class="product-call__text">Позвонить</span>
      </a>
      <a :href="`mailto:${company.email}`" class="btn-chat product-owner__chat">
        <BtnMessageSvg class="btn-chat__img" />
        <span class="product-chat__text">Написать в чат</span>
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
  }
</script>

<style lang="scss" scoped></style>
