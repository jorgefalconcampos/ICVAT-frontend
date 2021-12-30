import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import VueAxios from 'vue-axios';
import "@fontsource/work-sans/index.css"
import "@fontsource/work-sans/800.css"
import "@fontsource/work-sans/600.css"
import "@fontsource/work-sans/400.css"
import "@fontsource/work-sans/300.css"
import "@fontsource/work-sans/200.css"

Vue.config.productionTip = false

Vue.use(VueAxios, axios);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
