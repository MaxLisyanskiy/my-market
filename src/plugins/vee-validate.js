import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import '@/plugins/validation.js'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
