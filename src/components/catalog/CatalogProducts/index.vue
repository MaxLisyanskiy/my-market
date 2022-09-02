<template>
  <div :class="viewMode === 'gallery' ? 'gallery' : 'list'">
    <template v-if="viewMode === 'gallery'">
      <div
        v-for="product in products"
        :key="`${product.name + product.id}`"
        class="product"
      >
        <img
          v-if="product?.images?.[0]?.url"
          :src="product.images[0].url"
          :alt="product.name"
          class="product__img"
        />
        <img
          v-else
          src="@/assets/img/default-card.png"
          :alt="product.name"
          class="product__img"
        />
        <span class="product-title">{{ product.name }}</span>
        <span class="product-pcs">от ₽{{ product.min_price.price }}/шт.</span>
        <span class="product-order"
          >Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span
        >
      </div>
    </template>
    <template v-else>
      <div
        v-for="product in products"
        :key="`${product.name + product.id}`"
        class="product"
      >
        <div class="product-left">
          <img
            v-if="product?.images?.[0]?.url"
            :src="product.images[0].url"
            :alt="product.name"
            class="product-left__img"
          />
          <img
            v-else
            src="@/assets/img/default-card.png"
            :alt="product.name"
            class="product-left__img"
          />
        </div>
        <div class="product-center">
          <span class="product-center__title">{{ product.name }}</span>
          <span class="product-center__text"
            >Цена:
            <span class="product-center__text product-center__mark"
              >от ₽{{ product.min_price.price }}/шт.</span
            ></span
          >
          <span class="product-center__text"
            >Мин. заказ:
            <span class="product-center__text product-center__mark"
              >1000 шт.</span
            ></span
          >
          <span class="product-center__description">{{
            product.description
          }}</span>
        </div>
        <div class="product-right">
          <span class="product-right__title">Наименование организации</span>

          <button class="product-call">
            <span class="product-call__text">Позвонить</span>
          </button>
          <button class="product-chat">
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
