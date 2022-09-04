import categoryService from '~/services/categoryService.js'
import productService from '~/services/productService.js'
import companyService from '~/services/companyService.js'

export default function ({ $axios, error }, inject) {
  inject('categoryService', categoryService($axios, error))
  inject('productService', productService($axios, error))
  inject('companyService', companyService($axios, error))
}
