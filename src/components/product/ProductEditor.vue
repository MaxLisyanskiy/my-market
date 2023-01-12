<template>
  <div class="editor">
    <form class="content-row editor-form" @submit.prevent="submit">
      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Наименование товара</h2>
        <div class="validate">
          <input v-model="dataForm.name" placeholder="Наименование товара" class="editor-form__input" />
          <span v-if="errors.name" class="validate__error"> {{ errors.name }} </span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Категория</h2>
        <div class="validate">
          <el-select
            v-model="dataForm.category_id"
            filterable
            placeholder="Выберите категорию продукта"
            no-data-text="Список пуст"
            no-match-text="Ничего не найдено"
          >
            <el-option
              v-for="category in goodsCategories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
          <span v-if="errors.category_id" class="validate__error"> {{ errors.category_id }} </span>
        </div>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Цена</h2>
        <div class="editor-price">
          <div class="editor-price__row">
            <div v-for="(price, priceIndex) of dataForm.prices" :key="priceIndex" class="editor-price-item">
              <div class="editor-price-item__top">
                <p>
                  <span>от </span>
                  <input
                    v-model="price.amount"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="..."
                    class="editor-price-item__input"
                  />
                </p>
                <img
                  src="@/assets/img/icons/cross.svg"
                  class="prod-pricing-item__delete"
                  @click="deletePrice(priceIndex)"
                />
              </div>
              <div class="editor-price-item__bottom">
                <input v-model="price.price" type="number" min="0.01" step="0.01" placeholder="..." />
                <p>₽</p>
              </div>
            </div>
            <div class="el-upload el-upload--picture-card prod-pricing-item prod-pricing-item--add" @click="addPrice">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
        <span v-if="errors.prices" class="validate__error"> {{ errors.prices }} </span>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Изображения</h2>
        <div class="editor-imgs">
          <div class="el-upload-list el-upload-list--picture-card">
            <draggable v-model="dataForm.images">
              <transition-group>
                <li
                  v-for="(image, imageIndex) of dataForm.images"
                  :key="image.id"
                  class="el-upload-list__item is-ready"
                >
                  <div class="prod-add-title__img-thumb" @click="handleImagesRemove(imageIndex)">
                    <img :src="image.url" class="el-upload-list__item-thumbnail" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span>
                    </span>
                  </div>
                </li>
              </transition-group>
            </draggable>
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
        <span v-if="errors.images" class="validate__error"> {{ errors.images }} </span>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Описание</h2>
        <el-input
          v-model="dataForm.description"
          type="textarea"
          placeholder="Опишите подробнее ваш товар"
          :autosize="{ minRows: 2 }"
        />
        <span v-if="errors.description" class="validate__error"> {{ errors.description }} </span>
      </div>

      <div class="editor-form__wrapp">
        <h2 class="editor-form__title">Характеристики</h2>
        <el-table :data="dataForm.specs" empty-text="Характеристик пока нет" class="prod__specs-table">
          <el-table-column prop="key" label="Название"></el-table-column>
          <el-table-column prop="value" label="Значение"></el-table-column>
          <el-table-column label="Удалить" width="100px" align="center">
            <template slot-scope="scope">
              <img src="@/assets/img/icons/cross.svg" @click="deleteSpec(scope.$index, scope.row)" />
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
            <el-button type="primary" @click.prevent="addSpec">Добавить</el-button>
          </span>
          <span v-if="errors.newSpec" class="error-msg">{{ errors.newSpec }}</span>
        </el-dialog>

        <button type="button" class="editor-spec__add-btn" @click="isAddNewSpecVisible = true">
          <PlusSvg />
          <span>Добавить характеристику</span>
        </button>

        <span v-if="errors.specs" class="validate__error"> {{ errors.specs }} </span>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import draggable from 'vuedraggable'

  import PlusSvg from '@/assets/img/icons/plus.svg?inline'

  export default {
    name: 'ProductEditor',
    components: { PlusSvg, draggable },
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

    computed: {
      ...mapState('categories', ['categories']),

      goodsCategories() {
        const arr = []

        this.categories.forEach(item => {
          item.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              arr.push(level3)
            })
          })
        })

        return arr
      },
    },

    methods: {
      submit() {
        if (!this.validate()) return false

        if (this.isUpdatingProduct) this.update()
        else this.upload()
      },

      async update() {
        const body = {
          _method: 'PATCH',
          ...this.dataForm,
        }
        const result = await this.$productService.updateProduct(this.productId, body)

        if (result[0]) {
          this.$notify({
            title: '',
            message: 'Продукт был успешно обновлён!',
            type: 'success',
          })
          this.$router.push(`/company/${this.$auth.user.company_id}/products/`)
        } else {
          this.$notify({
            title: '',
            message: 'Что-то пошло не так при добавлении продукта',
            type: 'error',
          })
        }
      },

      async upload() {
        const result = await this.$productService.addProduct(this.dataForm)

        if (result[0]) {
          this.$notify({
            title: '',
            message: 'Продукт был успешно добавлен!',
            type: 'success',
          })
          this.$router.push(`/company/${this.$auth.user.company_id}/products/`)
        } else {
          this.$notify({
            title: '',
            message: 'Что-то пошло не так при добавлении продукта',
            type: 'error',
          })
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

      async handleImagesChange(files) {
        const formData = new FormData()
        formData.append('images[]', files.raw)

        await this.$axios
          .post('/images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            this.dataForm.images.push(...data)
          })
          .catch(() => {
            this.$notify({
              title: '',
              message: 'Что-то пошло не так при добавлении фотографии',
              type: 'error',
            })
          })
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
