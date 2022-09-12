<template>
  <aside class="similar">
    <!-- <div class="similar-row">
          <span class="similar-row__title">Похожее у продавца</span>
          <div v-for="index in 3" :key="index" class="product">
            <img src="@/assets/img/img-not_found.jpg" alt="" class="product__img" />
            <span class="product-title">Банка стеклянная 182мм 500мл</span>
            <span class="product-pcs">от ₽24/шт.</span>
            <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
          </div>
        </div> -->
    <div class="similar-info product-owner">
      <nuxt-link :to="`/company/${company.id}`" class="product-owner__title">{{ company.name }}</nuxt-link>

      <!-- TODO -->
      <!-- <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#a)">
          <path d="M.375.125h19.25v13.75H.375V.125Z" fill="#2A2FAF" />
          <path d="M.375.125h19.25v4.469H.375V.125Z" fill="#FBFBFB" />
          <path d="M.375 9.406h19.25v4.469H.375V9.406Z" fill="#E92B2B" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="translate(.375 .125)" d="M0 0h19.25v13.75H0z" />
          </clipPath>
        </defs>
      </svg>
      <span class="product-owner__address">РСО-А, г. Владикавказ</span> -->

      <a :href="`tel:${company.phone}`" class="btn-call product-owner__call">
        <BtnCallSvg class="btn-call__img" />
        <span class="product-call__text">Позвонить</span>
      </a>
      <button class="btn-chat product-owner__chat">
        <BtnMessageSvg class="btn-chat__img" />
        <span class="product-chat__text">Написать в чат</span>
      </button>
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
