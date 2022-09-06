<template>
  <div :class="viewMode === 'gallery' ? 'gallery' : 'list'">
    <template v-if="viewMode === 'gallery'">
      <nuxt-link
        v-for="product in products"
        :key="`${product.name + product.id}`"
        :to="`/product/${product.id}`"
        class="product"
      >
        <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="product__img" />
        <span class="product-title">{{ product.name }}</span>
        <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
        <span class="product-order">Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span>
      </nuxt-link>
    </template>

    <template v-else>
      <div v-for="product in products" :key="`${product.name + product.id}`" class="product">
        <nuxt-link :to="`/product/${product.id}`" class="product-wrapp">
          <div class="product-left">
            <img v-lazy="product?.images?.[0]?.url" :alt="product.name" class="product-left__img" />
          </div>
          <div class="product-center">
            <p class="product-center__title">{{ product.name }}</p>
            <div class="product-center__wrapp">
              <p class="product-center__text">
                Цена:
                <span class="product-center__text product-center__mark">от ₽{{ product.min_price.price }}/шт.</span>
              </p>
              <p class="product-center__text">
                Мин. заказ: <span class="product-center__text product-center__mark"> 1000 шт.</span>
              </p>
            </div>
            <p class="product-center__description">{{ product.description }}</p>
          </div>
        </nuxt-link>
        <div class="product-right">
          <span class="product-right__title">Наименование организации</span>

          <button class="btn-call product-call">
            <img src="@/assets/img/icons/btn-call.svg" alt="btn-call" class="btn-call__img" />
            <span class="product-call__text">Позвонить</span>
          </button>
          <button class="btn-chat product-chat">
            <img src="@/assets/img/icons/btn-message.svg" alt="btn-message" class="btn-chat__img" />
            <span class="product-chat__text">Чат</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CatalogProducts',
    props: {
      products: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      ...mapState('catalog', ['viewMode']),
    },
  }
</script>
