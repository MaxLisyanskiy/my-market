<template>
  <div :class="productsClass === 'gallery' ? 'gallery' : 'list'">
    <div v-if="productsClass === 'gallery'" class="product">
      <img src="@/assets/img/Баллон 10лит 1.png" alt="" class="product__img" />
      <span class="product-title">Баллон 10 литров</span>
      <span class="product-pcs">от ₽24/шт.</span>
      <span class="product-order"
        >Мин. заказ: <span class="product-order__pcs">1000 шт.</span></span
      >
    </div>
    <div v-else class="product">
      <div class="product-left">
        <img src="@/assets/img/product.png" alt="" class="product-left__img" />
      </div>
      <div class="product-center">
        <span class="product-center__title"
          >Банка стеклянная 82мм 500мл для консервирования, хранения
          сыпучих</span
        >
        <span class="product-center__text"
          >Цена:
          <span class="product-center__text product-center__mark"
            >от ₽24/шт.</span
          ></span
        >
        <span class="product-center__text"
          >Мин. заказ:
          <span class="product-center__text product-center__mark"
            >1000 шт.</span
          ></span
        >
        <span class="product-center__description"
          >Стеклянная банка для консервации, хранения. Имеет практичную и
          удобную форму, изготовлена из прочного качественного стекла.
          Вместимость стеклянной тары 500 мл, высота 121 мм, ширина дна 78 мм.
          Горлышко безопасно отшлифовано. Можно хранить продукты питания, а
          также использовать для консервирования. Банки высшего первого сорта,
          подходят для работы в автоклаве...</span
        >
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
  </div>
</template>

<script>
  export default {
    name: 'CatalogProducts',
    data() {
      return {
        productsClass: 'list',
      }
    },
  }
</script>

<style lang="scss" scoped></style>
