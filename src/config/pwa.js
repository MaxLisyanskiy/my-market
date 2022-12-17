// Глобальные настройки pwa.

// const title = 'Мир поставщиков VALE.SU'
const title = 'Мир поставщиков VALE.SU'
const description = ''

const pwa = {
  icon: {
    source: '/static/',
    fileName: 'pwa-icon.png',
    sizes: [64, 120, 144, 152, 192, 384, 512],
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
