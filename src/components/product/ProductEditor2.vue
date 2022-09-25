<template>
  <div>
    <main class="main">
      <div class="container">
        <form @submit.prevent="submit" class="prod-add">
          <div class="prod-add-title">
            <div class="prod-add-title__desk-wrap">
              <div class="prod-add__part prod-add-title__desk-row">
                <div class="prod-add-title__desk-text-wrap">
                  <div class="input-wr">
                    <div class="prod-add-title__desk-text">
                      <input v-model="dataForm.name" placeholder="Наименование товара" class="input-header" />
                    </div>
                    <div v-if="errors.name" class="error-msg">
                      {{ errors.name }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="prod-add__part prod-add__category">
                <h2 class="price-block__header">Категория</h2>
                <div class="input-wr">
                  <el-select
                    v-model="dataForm.category_id"
                    filterable
                    placeholder="Выберите категорию продукта"
                    no-data-text="Список пуст"
                    no-match-text="Ничего не найдено"
                  >
                    <el-option
                      v-for="category in LEAF_CATEGORIES"
                      :key="category.id"
                      :label="category.name"
                      :value="category.id"
                    ></el-option>
                  </el-select>
                  <div v-if="errors.category_id" class="error-msg">
                    {{ errors.category_id }}
                  </div>
                </div>
              </div>

              <div class="prod-add__part prod-add-title__price-block">
                <h2 class="price-block__header">Цена</h2>
                <div class="price-block__items-wrap">
                  <div class="prod-pricing__row">
                    <div v-for="(price, priceIndex) of dataForm.prices" :key="priceIndex" class="prod-pricing-item">
                      <div class="prod-pricing-item__top">
                        <p>
                          <span>от </span
                          ><input v-model="price.amount" type="number" min="1" step="1" placeholder="..." />
                        </p>
                        <img
                          @click="deletePrice(priceIndex)"
                          src="@/assets/img/icons/cross.svg"
                          class="prod-pricing-item__delete"
                        />
                      </div>
                      <div class="prod-pricing-item__bottom">
                        <p>
                          <input v-model="price.price" type="number" min="0.01" step="0.01" placeholder="..." />
                          р
                        </p>
                      </div>
                    </div>
                    <div
                      @click="addPrice"
                      class="el-upload el-upload--picture-card prod-pricing-item prod-pricing-item--add"
                    >
                      <i class="el-icon-plus"></i>
                    </div>
                  </div>
                </div>
                <div class="input-wr">
                  <div v-if="errors.prices" class="error-msg">
                    {{ errors.prices }}
                  </div>
                </div>
              </div>

              <div class="prod-add__part">
                <h2 class="price-block__header">Изображения</h2>
                <div class="prod-add-title__img-wrap">
                  <div class="el-upload-list el-upload-list--picture-card">
                    <li
                      v-for="(image, imageIndex) of dataForm.images"
                      :key="imageIndex"
                      class="el-upload-list__item is-ready"
                    >
                      <div @click="handleImagesRemove(imageIndex)" class="prod-add-title__img-thumb">
                        <img :src="image.url" class="el-upload-list__item-thumbnail" />
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span>
                        </span>
                      </div>
                    </li>
                  </div>
                  <el-upload
                    ref="images"
                    action="#"
                    list-type="picture-card"
                    :limit="10"
                    multiple
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleImagesChange"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
                <div class="input-wr">
                  <div v-if="errors.images" class="error-msg">
                    {{ errors.images }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="prod-add-desk">
            <div class="prod-add__part prod-add-desk__about">
              <h2>Описание</h2>
              <el-input
                v-model="dataForm.description"
                type="textarea"
                placeholder="Опишите подробнее ваш товар"
                :autosize="{ minRows: 2 }"
              >
              </el-input>
              <div class="input-wr">
                <div v-if="errors.description" class="error-msg">
                  {{ errors.description }}
                </div>
              </div>
            </div>
            <div class="prod-add__part prod__characters">
              <h2 class="characters__title">Характеристики</h2>
              <el-table :data="dataForm.specs" empty-text="Характеристик пока нет" class="prod__specs-table">
                <el-table-column prop="key" label="Название"></el-table-column>
                <el-table-column prop="value" label="Значение"></el-table-column>
                <el-table-column label="Удалить" width="100px" align="center">
                  <template slot-scope="scope">
                    <img @click="deleteSpec(scope.$index, scope.row)" src="@/assets/img/icons/cross.svg" />
                  </template>
                </el-table-column>
              </el-table>

              <el-dialog title="Новая характеристика" :visible.sync="isAddNewSpecVisible" :center="true" top="25vh">
                <el-input v-model="newSpec.key" class="prod__specs-input">
                  <template slot="prepend">Название</template>
                </el-input>
                <el-input v-model="newSpec.value" class="prod__specs-input">
                  <template slot="prepend">Значение</template>
                </el-input>
                <span slot="footer">
                  <el-button @click="isAddNewSpecVisible = false">Отменить</el-button>
                  <el-button @click.prevent="addSpec" type="primary">Добавить</el-button>
                </span>
                <span v-if="errors.newSpec" class="error-msg">{{ errors.newSpec }}</span>
              </el-dialog>

              <button @click="isAddNewSpecVisible = true" type="button" class="character-add">
                <span class="character-add__icon"><img src="@/assets/img/icons/plus.svg" alt="" /></span>
                <span class="character-add__text">Добавить характеристику</span>
              </button>
              <div class="input-wr">
                <div v-if="errors.specs" class="error-msg">
                  {{ errors.specs }}
                </div>
              </div>
            </div>
          </div>

          <div class="checklist__wrap">
            <div class="checklist">
              <h3>Пожалуйста, заполните поля:</h3>
              <div class="checklist__list">
                <ul>
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
            </div>
            <div class="btn-wrap">
              <button v-if="!isUpdatingProduct" class="button btn-add btn--blue" type="submit">Добавить товар</button>
              <button v-else class="button btn-add btn--blue" type="submit">Обновить товар</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: {
      form: {
        type: Object,
        default() {
          return {
            name: '',
            description: '',
            prices: [],
            specs: [],
            status: 1,
            category_id: null,
            images: [],
          }
        },
      },
      isUpdatingProduct: {
        type: Boolean,
        default: false,
      },
      productId: {
        type: Number,
        default: -100,
      },
    },
    data() {
      return {
        dataForm: JSON.parse(JSON.stringify(this.form)),
        isAddNewSpecVisible: false,
        newSpec: {
          key: '',
          value: '',
        },
        errors: {
          name: '',
          description: '',
          prices: '',
          specs: '',
          status: '',
          category_id: '',
          images: '',
          newSpec: '',
        },
        rules: {
          images: 'isImagesValid',
        },
      }
    },
    computed: mapGetters('categories', ['LEAF_CATEGORIES']),
    mounted() {
      this.UPDATE_CONTENT_LOADED({ status: true })
    },
    methods: {
      ...mapActions('products', ['ADD_PRODUCT', 'UPDATE_PRODUCT']),
      ...mapActions('layout', ['UPDATE_CONTENT_LOADED']),

      submit() {
        if (!this.validate()) return

        if (this.isUpdatingProduct) this.update()
        else this.upload()
      },

      async update() {
        const result = await this.UPDATE_PRODUCT({
          id: this.productId,
          ...this.form,
          images: this.form.images.map(image => image.raw),
        })

        if (result[0]) {
          this.$notify({
            title: '',
            message: 'Продукт был успешно обновлён!',
            type: 'success',
          })
          this.$router.push('/profile')
        } else {
          console.error('Что-то пошло не так при обновлении продукта')
        }
      },

      async upload() {
        const result = await this.ADD_PRODUCT({
          ...this.form,
          images: this.form.images.map(image => image.raw),
        })

        if (result[0]) {
          this.$notify({
            title: '',
            message: 'Продукт был успешно обновлён!',
            type: 'success',
          })
          this.$router.push('/profile')
        } else {
          console.error('Что-то пошло не так при обновлении продукта')
        }
      },

      validate() {
        let hasErrors = false
        for (const key in this.dataForm) {
          if (!this.dataForm[key] || (typeof this.dataForm[key] !== 'number' && !this.dataForm[key].length)) {
            this.errors[key] = 'Обязательное поле'
            hasErrors = true
          } else this.errors[key] = ''
        }
        return !hasErrors
      },

      handleImagesChange(file) {
        this.dataForm.images.push(file)
      },

      handleImagesRemove(imageIndex) {
        this.dataForm.images.splice(imageIndex, 1)
      },

      addSpec() {
        this.errors.newSpec = ''
        if (!this.newSpec.key || !this.newSpec.value) {
          this.errors.newSpec = 'Заполните все поля'
          return
        }
        this.dataForm.specs.push({
          key: this.newSpec.key,
          value: this.newSpec.value,
        })
        this.newSpec.key = ''
        this.newSpec.value = ''
        this.isAddNewSpecVisible = false
      },

      deleteSpec(specIndex) {
        this.dataForm.specs.splice(specIndex, 1)
      },

      addPrice() {
        this.errors.prices = ''

        const invalidPrice = this.dataForm.prices.find(price => !price.amount || !price.price)

        if (invalidPrice) {
          this.errors.prices = 'Заполните цены корректными данными'
          return false
        }

        this.dataForm.prices.push({ amount: 1, price: 1 })
      },

      deletePrice(priceIndex) {
        this.dataForm.prices.splice(priceIndex, 1)
      },
    },
  }
</script>
