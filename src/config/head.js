const title = 'Оптовый интернет магазин VALE.SU'
const description =
  'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU'
const image = ''

const meta = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  },
  { name: 'format-detection', content: 'telephone=no' },
  {
    hid: 'apple-mobile-web-app-capable',
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    hid: 'title',
    name: 'title',
    content: title,
  },
  {
    hid: 'description',
    name: 'description',
    content: description,
  },
  {
    hid: 'og:locale',
    name: 'og:locale',
    content: 'pt_BR',
  },
  {
    hid: 'og:updated_time',
    name: 'og:updated_time',
    content: new Date().getTime(),
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.ORIGIN_URL,
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: title,
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: description,
  },
  {
    hid: 'og:image',
    itemprop: 'image',
    property: 'og:image',
    content: image,
  },
  {
    hid: 'twitter:card',
    property: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    hid: 'twitter:url',
    property: 'twitter:url',
    content: process.env.ORIGIN_URL,
  },
  {
    hid: 'twitter:title',
    property: 'twitter:title',
    content: title,
  },
  {
    hid: 'twitter:description',
    property: 'twitter:description',
    content: description,
  },
  {
    hid: 'twitter:image',
    itemprop: 'image',
    property: 'twitter:image',
    content: image,
  },
  {
    name: 'msapplication-TileColor',
    content: '#101c3b',
  },
]

const head = {
  htmlAttrs: { lang: 'ru' },
  title,
  // titleTemplate: '%s | VALE.SU',
  meta,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      as: 'style',
      rel: 'stylesheet preload prefetch',
      href: '/fonts/fonts.css',
    },
  ],
}

export default head
