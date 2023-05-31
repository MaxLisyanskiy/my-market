import categoryService from '~/services/categoryService.js'
import productService from '~/services/productService.js'
import companyService from '~/services/companyService.js'
import companyDomainService from '~/services/companyDomainService.js'
import authService from '~/services/authService.js'

export default function ({ $axios, error }, inject) {
  inject('categoryService', categoryService($axios, error))
  inject('productService', productService($axios, error))
  inject('companyService', companyService($axios, error))
  inject('companyDomainService', companyDomainService($axios, error))
  inject('authService', authService($axios, error))
}
