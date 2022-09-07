// Vue module for lazyloading images in your applications.
// https://www.npmjs.com/package/vue-lazyload

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default (context, inject) => {
  Vue.use(VueLazyload, {
    preLoad: 0,
    // eslint-disable-next-line
    error: require(`${'~~/assets/img/img-not_found.jpg'}`),
    loading: require(`${'~~/assets/img/loading-skeleton.gif'}`),
    attempt: 3,
    lazyComponent: true,
    observer: true,
    throttleWait: 500,
  })
}
