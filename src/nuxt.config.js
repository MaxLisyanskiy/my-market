export default {
  // Указываем порт, на котором будет работать приложение.
  server: {
    port: process.env.PORT,
    host: 'localhost',
  },

  // Передаём на фронт данные из .env. Эти переменные будет доступны через process.env.[...].
  env: {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    ORIGIN_URL: process.env.ORIGIN_URL,
  },

  // Глобальные настройки секции Head. Можно прописать общие мета-теги, атрибуты и прочее.
  head: {
    htmlAttrs: { lang: 'ru' },
    title: 'Оптовый интернет магазин VALE.SU',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        as: 'style',
        rel: 'stylesheet preload prefetch',
        href: '/fonts/fonts.css',
      },
    ],
  },

  // Включаем автоматическое подключение компонентов.
  components: true,

  // Отключаем передачу анонимных данных о работе приложения в Nuxt.
  telemetry: false,

  // Отключаем предварительную загрузку контента, на который есть ссылки на текущей страницы.
  router: { prefetchLinks: false },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Customize the progress-bar color
  loading: { color: '#3B8070' },
  // Отключаем индикацию загрузки страниц.
  // loading: false,
  // loadingIndicator: false,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  // Отключаем генерацию создания файла .eslintcache
  eslint: {
    cache: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    https: true,
    credentials: true,
  },

  // PWA options
  pwa: {
    icon: {
      source: '/static/',
      fileName: 'logo_v.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: 'Оптовый интернет магазин VALE.SU',
      short_name: 'VALE.SU',
      description:
        'VALE - оптовый интернет магазин №1. Мы предлагаем цены от производителей, гарантируем качество товара и организовываем доставку. Покупай выгодно с VALE.SU',
      lang: 'ru',
      start_url: '/profile',
    },
    workbox: {
      enabled: false,
    },
  },

  // Vue settings
  vue: {
    config: {
      productionTip: false,
      devtools: process.env.NODE_ENV !== 'production',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true, // Просим стили вырезать в отдельные файлы. Иначе css будет inline.
    devtools: process.env.NODE_ENV !== 'production',
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],
}
