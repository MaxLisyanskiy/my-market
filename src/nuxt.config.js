import head from './config/head'
import pwa from './config/pwa'
import sitemap from './config/sitemap'
import robots from './config/robots'

export default {
  // Указываем порт, на котором будет работать приложение.
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3000,
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
  css: ['~/assets/styles/main.scss', 'swiper/css/swiper.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/axios.js' }, { src: '~/plugins/vue-lazy-load.js' }, { src: '~/plugins/router.js' }],

  // Customize the progress-bar color
  loading: { color: '#f00b1d' },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/yandex-metrika'],

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

  // @nuxtjs/auth-next
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          global: true,
          type: 'Bearer ',
          maxAge: 60 * 60 * 24 * 30, // token lifetime in Number of seconds. Default is 30 min. Now is 30 days
        },
        user: {
          property: 'data.user',
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get' },
        },
      },
    },
  },

  /**
   ****** SEO *******
   */

  // sitemap.xml settings
  sitemap,

  // robot.txt settings
  robots,

  // Yandex Metrika settings
  // https://www.npmjs.com/package/@nuxtjs/yandex-metrika
  yandexMetrika: {
    id: process.env.YANDEX_METRIKA_ID,
    webvisor: true,
  },

  /**
   ****** Build *******
   */

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true, // Просим стили вырезать в отдельные файлы. Иначе css будет inline.
    devtools: process.env.NODE_ENV !== 'production',
  },
}
