// Глобальные настройки секции Head. Можно прописать общие мета-теги, атрибуты и прочее.

const title = 'Оптовый интернет магазин VALE.SU'
const description =
  'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU'
const image = ''

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

// const pwasplash = [
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2048-2732.jpg',
//     media:
//       '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2732-2048.jpg',
//     media:
//       '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1668-2388.jpg',
//     media:
//       '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2388-1668.jpg',
//     media:
//       '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1536-2048.jpg',
//     media:
//       '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2048-1536.jpg',
//     media:
//       '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1668-2224.jpg',
//     media:
//       '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2224-1668.jpg',
//     media:
//       '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1620-2160.jpg',
//     media:
//       '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2160-1620.jpg',
//     media:
//       '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1290-2796.jpg',
//     media:
//       '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2796-1290.jpg',
//     media:
//       '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1179-2556.jpg',
//     media:
//       '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2556-1179.jpg',
//     media:
//       '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1284-2778.jpg',
//     media:
//       '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2778-1284.jpg',
//     media:
//       '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1170-2532.jpg',
//     media:
//       '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2532-1170.jpg',
//     media:
//       '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1125-2436.jpg',
//     media:
//       '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2436-1125.jpg',
//     media:
//       '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1242-2688.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2688-1242.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-828-1792.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1792-828.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1242-2208.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-2208-1242.jpg',
//     media:
//       '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-750-1334.jpg',
//     media:
//       '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1334-750.jpg',
//     media:
//       '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-640-1136.jpg',
//     media:
//       '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
//   },
//   {
//     rel: 'apple-touch-startup-image',
//     href: 'pwasplash/apple-splash-1136-640.jpg',
//     media:
//       '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
//   },
// ]

const pwasplash = [
  {
    href: 'splashscreens/iphone5_splash.png',
    media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphone6_splash.png',
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphoneplus_splash.png',
    media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonex_splash.png',
    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonexr_splash.png',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/iphonexsmax_splash.png',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipad_splash.png',
    media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro1_splash.png',
    media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro3_splash.png',
    media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
    rel: 'apple-touch-startup-image',
  },
  {
    href: 'splashscreens/ipadpro2_splash.png',
    media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
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
