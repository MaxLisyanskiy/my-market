<template>
  <section class="product-center">
    <div class="product-center__title-block">
      <h1 class="product-center__title">{{ product.name }}</h1>
    </div>
    <div class="product-center__block">
      <div class="product-block__row">
        <div v-for="item in product.prices" :key="item.id" class="product-block">
          <span class="product-block__price">₽{{ item.price }}</span>
          <span class="product-block__text">от {{ item.amount }} шт. </span>
        </div>
      </div>
      <div class="product-rectangle">
        <div v-for="item in product.specs" :key="item.id" class="rectangle-block">
          <span class="rectangle-block__text">{{ item.key }}:</span>
          <span class="rectangle-block__value">{{ item.value }}</span>
        </div>

        <!-- <div class="rectangle-from rectangle-from__desktop">
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
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ProductCenter',
    props: {
      product: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>
