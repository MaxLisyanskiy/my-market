<template>
  <section class="product-right">
    <div class="product-owner product-owner__desktop">
      <nuxt-link :to="`/company/${company.id}/products`" class="product-owner__title">{{ company.name }}</nuxt-link>

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

    <!-- <div class="schedule">
      <span class="schedule__text">График цен</span>
    </div> -->
  </section>
</template>

<script>
  import BtnCallSvg from '@/assets/img/icons/svg/btn-call.svg?inline'
  import BtnMessageSvg from '@/assets/img/icons/svg/btn-message.svg?inline'

  export default {
    name: 'ProductRight',
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
