import { extend } from 'vee-validate'

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// validation rules
extend('email', {
  validate(value) {
    if (emailRegexp.test(value)) return true
    return 'Введите корректную почту'
  },
  computesRequired: true,
})

extend('password', {
  validate(value) {
    if (value.length >= 8) return true
    return 'Пароль должен содержать не менее 8 символов'
  },
  computesRequired: true,
})

extend('repeatPassword', {
  validate(value, [password]) {
    if (value === password) return true
    return 'Пароли не совпадают'
  },
  computesRequired: true,
})

extend('inn', {
  validate(value) {
    if (/^\d{10}$/.test(value)) return true
    return 'ИНН должен содержать 10 цифр'
  },
  computesRequired: true,
})

extend('phone', {
  validate(value) {
    if (/^\d{11}$/.test(value.replace(/\D/g, ''))) return true
    return 'Телефон должен содержать 11 цифр'
  },
  computesRequired: true,
})

extend('login', {
  validate(value) {
    if (emailRegexp.test(value)) return true
    if (/^\d{11}$/.test(value.replace(/\D/g, ''))) return true
    return 'Введите корректный номер телефона или почту'
  },
  computesRequired: true,
})

extend('notEmpty', {
  validate(value, args) {
    if (value.length) return true
    return `Поле "${args.field}" не должно быть пустым`
  },
  computesRequired: true,
  params: ['field'],
})

extend('required', {
  validate(value) {
    if (value.length) return true
    return 'Обязательное поле'
  },
  computesRequired: true,
})

extend('min', {
  validate(value, args) {
    return value.length >= args.length
  },
  params: ['length'],
})
