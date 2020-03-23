import Vue from 'vue'
import App from './App.vue'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(FullCalendar)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
