<template>
  <section class="product-center">
    <div class="product-center__title-block">
      <h1 class="product-center__title">{{ product.name }}</h1>
    </div>
    <div class="product-center__block">
      <div class="product-block__row desk">
        <div v-for="item in product.prices" :key="item.id" class="product-block">
          <span class="product-block__price">₽{{ item.price }}</span>
          <span class="product-block__text">от {{ item.amount }} шт. </span>
        </div>
      </div>
      <vue-custom-scrollbar class="product-block__row mob" tagname="div">
        <div v-for="item in product.prices" :key="item.id" class="product-block">
          <span class="product-block__price">₽{{ item.price }}</span>
          <span class="product-block__text">от {{ item.amount }} шт. </span>
        </div>
      </vue-custom-scrollbar>
      <div class="product-rectangle">
        <div v-for="item in product.specs" :key="item.id" class="rectangle-block">
          <span class="rectangle-block__text">{{ item.key }}:</span>
          <span class="rectangle-block__value">{{ item.value }}</span>
        </div>
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
