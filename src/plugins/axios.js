import categoryService from '~/services/categoryService.js'
import productService from '~/services/productService.js'

export default function ({ $axios, error }, inject) {
  inject('categoryService', categoryService($axios, error))
  inject('productService', productService($axios, error))
}
