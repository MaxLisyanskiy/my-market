// Глобальные настройки секции Head. Можно прописать общие мета-теги, атрибуты и прочее.

const title = 'Оптовый интернет магазин VALE.SU'
// const description =
//   'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU'
const description = ''
const image = `${process.env.ORIGIN_URL}/assets/img/icons/svg/logo.svg`

const meta = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
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
    content: 'ru_RU',
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
    hid: 'og:site_name',
    property: 'og:site_name',
    content: title,
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

const pwasplash = [
  {
    href: 'splashscreens/iphone5_splash.png',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphone6_splash.png',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphoneplus_splash.png',
    media:
      '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonex_splash.png',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonexr_splash.png',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonexsmax_splash.png',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipad_splash.png',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro1_splash.png',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro3_splash.png',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro2_splash.png',
    media:
      '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    rel: 'apple-touch-startup-image',
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
    ...pwasplash,
  ],
}

export default head
