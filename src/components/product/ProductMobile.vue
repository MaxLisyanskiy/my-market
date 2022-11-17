<template>
  <div>
    <article class="product-mobile">
      <!-- <div class="rectangle-from rectangle-from__mobile">
        <span class="rectangle-from__text">Отправка из:</span>
        <svg class="rectangle-from__flag" width="20" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <span class="rectangle-from__location">РСО-А, г. Владикавказ</span>
      </div> -->
      <div class="product-owner product-owner__mobile">
        <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="product-owner__img" />
        <img
          v-else
          src="@/assets/img/icons/company-not-found-img.svg"
          alt="company-not-found-img"
          class="product-owner__img"
        />
        <nuxt-link :to="`/company/${company.id}/products`" class="product-owner__title">{{ company.name }}</nuxt-link>
        <!-- <svg
        class="product-owner__flag rectangle-from__flag"
        width="20"
        height="14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
          <span class="product-call__text">Позвонить</span>
        </a>
        <a :href="`mailto:${company.email}`" class="btn-chat product-owner__chat">
          <span class="product-chat__text">Написать в чат</span>
        </a>
      </div>
    </article>
    <article class="product-mobile product-mobile__two">
      <div class="product-owner product-owner__mobile">
        <a :href="`tel:${company.phone}`" class="btn-call product-owner__call">
          <span class="product-call__text">Позвонить</span>
        </a>
        <a :href="`mailto:${company.email}`" class="btn-chat product-owner__chat">
          <span class="product-chat__text">Написать</span>
        </a>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'ProductMobile',
    props: {
      company: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.btnsFixed()
    },
    methods: {
      btnsFixed() {
        const element = document.querySelector('.product-mobile')
        const elementTwo = document.querySelector('.product-mobile__two')
        const Visible = function (target) {
          // All element positions
          const targetPositionTop = window.pageYOffset + target.getBoundingClientRect().top
          const targetPositionLeft = window.pageXOffset + target.getBoundingClientRect().left
          const targetPositionRight = window.pageXOffset + target.getBoundingClientRect().right
          const targetPositionBottom = window.pageYOffset + target.getBoundingClientRect().bottom

          // Get window position
          const windowPositionTop = window.pageYOffset

          if (
            targetPositionBottom > windowPositionTop &&
            windowPositionTop < targetPositionTop + 40
          ) {
            elementTwo.classList.remove('fixed')
          } else {
            // If the element is not visible, then run this code
            elementTwo.classList.add('fixed')
          }
        }

        // Trigger a function on page scroll
        window.addEventListener('scroll', function () {
          Visible(element)
        })

        // And also run the function immediately. And then suddenly, the element is initially visible
        Visible(element)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
