// Глобальные настройки pwa.

// const title = 'Оптовый интернет магазин VALE.SU'
const title = 'Найди себе поставщика'
const description = ''

const pwa = {
  icon: {
    source: '/static/',
    fileName: 'pwa-icon.png',
    // fileName: 'vale-pwa-svg.svg',
    sizes: [64, 120, 144, 152, 192, 384, 512],
    // type: 'image/svg+xml',
    // purpose: 'any',
  },
  manifest: {
    name: title,
    short_name: 'VALE.SU',
    description,
    lang: 'ru',
    start_url: '/',
  },
  workbox: {
    enabled: false,
  },
}

export default pwa
