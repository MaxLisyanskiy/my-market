<template>
  <section class="editor">
    <form class="content-row editor-form">
      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Наименование товара</h2>
        <div class="">
          <input type="text" placeholder="Наименование товара" class="editor-form__input" />
          <span>Error</span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Категория</h2>
        <div class="">
          <select class="editor-form__select">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <span>Error</span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Цена</h2>
        <div class="editor-price">
          <div class="editor-price__row">
            <div v-for="(price, priceIndex) of 1" :key="priceIndex" class="prod-pricing-item">
              <div class="prod-pricing-item__top">
                <p><span>от </span><input v-model="price.amount" type="number" min="1" step="1" placeholder="..." /></p>
                <img
                  src="@/assets/img/icons/cross.svg"
                  class="prod-pricing-item__delete"
                  @click="deletePrice(priceIndex)"
                />
              </div>
              <div class="prod-pricing-item__bottom">
                <p>
                  <input v-model="price.price" type="number" min="0.01" step="0.01" placeholder="..." />
                  р
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Изображения</h2>
        <div class="">
          <div class="editor-file">
            <PlusSvg />
            <input type="file" id="file" ref="myFiles" multiple @change="handleImagesChange" />
          </div>
          <span>Error</span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Описание</h2>
        <div class="">
          <textarea placeholder="Опишите подробнее ваш товар" class="editor-form__input"></textarea>
          <span>Error</span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Характеристики</h2>
        <div class="">
          <span>Error</span>
        </div>
        <button class="editor-spec__add-btn">
          <PlusSvg />
          <span>Добавить характеристику</span>
        </button>
      </div>

      <div class="editor-checklist">
        <div class="editor-checklist__wrapp">
          <h3 class="editor-checklist__title">Пожалуйста, заполните поля:</h3>
          <ul class="editor-checklist__list">
            <li>Фотографии товара</li>
            <li>Краткое наименование товара</li>
            <li>Краткое описание товара</li>
            <li>Категории</li>
            <li>Место загрузки</li>
            <li>Добавить цену в ценовое поле</li>
            <li>Описание</li>
            <li>Характеристики</li>
          </ul>
        </div>
        <div class="btn-wrap">
          <button v-if="!isUpdatingProduct" class="editor-checklist__btn" type="submit">Добавить товар</button>
          <button v-else class="editor-checklist__btn" type="submit">Обновить товар</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import PlusSvg from '@/assets/img/icons/plus.svg?inline'

  export default {
    name: 'ProductIdEditPage',
    components: { PlusSvg },
    layout: 'default',
    methods: {
      handleImagesChange(event) {
        console.log(this.$refs.myFiles.files.url)
        // this.form.images.push(event.target.files)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
