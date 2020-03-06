import Vue from 'vue'
import App from './App.vue'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'balloon-css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(FullCalendar)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
