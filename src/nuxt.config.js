import head from './config/head'
import pwa from './config/pwa'

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
  head,

  // Включаем автоматическое подключение компонентов.
  components: true,

  // Отключаем передачу анонимных данных о работе приложения в Nuxt.
  telemetry: false,

  // Отключаем предварительную загрузку контента, на который есть ссылки на текущей страницы.
  router: { prefetchLinks: false },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/main.scss', 'swiper/css/swiper.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/skeleton-loader-vue.js'],

  // Customize the progress-bar color
  // loading: { color: '#3B8070' },
  // Отключаем индикацию загрузки страниц.
  loading: false,
  loadingIndicator: false,

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
  pwa,

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
