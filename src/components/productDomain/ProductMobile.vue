<template>
  <div>
    <article class="product-mobile">
      <div class="product-owner product-owner__mobile">
        <div>
          <img v-if="company.logo" v-lazy="company.logo.url" :alt="company.name" class="product-owner__img" />
          <img
            v-else
            src="@/assets/img/icons/company-not-found-img.svg"
            alt="company-not-found-img"
            class="product-owner__img"
          />
        </div>
        <div>
          <nuxt-link :to="`/`" class="product-owner__title">{{ company.name }}</nuxt-link>
          <nuxt-link :to="`/`" class="product-owner__subtitle">
            Перейти
            <span
              ><svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.19565 0.150565C5.93478 0.391468 5.93478 0.792974 6.19565 1.03388L9.41304 4.00502L6.19565 6.97616C5.93478 7.21706 5.93478 7.57842 6.19565 7.81932C6.45652 8.06022 6.84783 8.06022 7.1087 7.81932L10.8043 4.40652C11.0652 4.16562 11.0652 3.80427 10.8043 3.56336L7.1087 0.150565C6.84783 -0.0501882 6.45652 -0.0501882 6.19565 0.150565Z"
                  fill="#787878"
                />
                <path
                  d="M0 4.00001C0 3.66864 0.268629 3.40001 0.6 3.40001H9.4C9.73137 3.40001 10 3.66864 10 4.00001C10 4.33138 9.73137 4.60001 9.4 4.60001H0.600001C0.26863 4.60001 0 4.33138 0 4.00001Z"
                  fill="#787878"
                />
              </svg>
            </span>
          </nuxt-link>
        </div>

        <!-- <a :href="`tel:${company.phone}`" class="btn-call product-owner__call">
          <span class="product-call__text">Позвонить</span>
        </a>
        <a :href="`mailto:${company.email}`" class="btn-chat product-owner__chat">
          <span class="product-chat__text">Написать</span>
        </a> -->
      </div>
    </article>
    <article class="product-mobile product-mobile__two fixed">
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
    // mounted() {
    //   this.btnsFixed()
    // },
    // methods: {
    //   btnsFixed() {
    //     // const element = document.querySelector('.product-mobile')
    //     const elementTwo = document.querySelector('.product-mobile__two')
    //     elementTwo.classList.add('fixed')
    //     // const Visible = function (target) {
    //     //   // All element positions
    //     //   const targetPositionTop = window.pageYOffset + target.getBoundingClientRect().top
    //     //   const targetPositionLeft = window.pageXOffset + target.getBoundingClientRect().left
    //     //   const targetPositionRight = window.pageXOffset + target.getBoundingClientRect().right
    //     //   const targetPositionBottom = window.pageYOffset + target.getBoundingClientRect().bottom

    //     //   // Get window position
    //     //   const windowPositionTop = window.pageYOffset

    //     //   if (targetPositionBottom > windowPositionTop && windowPositionTop < targetPositionTop + 40) {
    //     //     elementTwo.classList.remove('fixed')
    //     //   } else {
    //     //     // If the element is not visible, then run this code
    //     //     elementTwo.classList.add('fixed')
    //     //   }
    //     // }

    //     // // Trigger a function on page scroll
    //     // window.addEventListener('scroll', function () {
    //     //   Visible(element)
    //     // })

    //     // // And also run the function immediately. And then suddenly, the element is initially visible
    //     // Visible(element)
    //   },
    // },
  }
</script>
