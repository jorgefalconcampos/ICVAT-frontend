import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';
import vuetify from './plugins/vuetify'
import "@fontsource/work-sans/index.css"
import "@fontsource/work-sans/800.css"
import "@fontsource/work-sans/600.css"
import "@fontsource/work-sans/400.css"
import "@fontsource/work-sans/300.css"
import "@fontsource/work-sans/200.css"


axios.defaults.withCredentials = true
// axios.defaults.baseURL = "http://localhost:8000/api/" // http://localhost:8000/api/
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/" // http://localhost:8000/api/

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch["auth/LogOut"];
      return router.push("/login");
    }
  }
});


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.prototype.$qs = qs;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
