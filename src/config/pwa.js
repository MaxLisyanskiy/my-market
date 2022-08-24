// Глобальные настройки pwa.

const title = 'Оптовый интернет магазин VALE.SU'
const description =
  'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU'

const pwa = {
  icon: {
    source: '/static/',
    fileName: 'logo_v.png',
    sizes: [64, 120, 144, 152, 192, 384, 512],
  },
  manifest: {
    name: title,
    short_name: 'VALE.SU',
    description,
    lang: 'ru',
    start_url: '/profile',
  },
  workbox: {
    enabled: false,
  },
}

export default pwa
