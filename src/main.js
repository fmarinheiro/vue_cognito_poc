import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.withCredentials = false
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(undefined, function(error) {
    if (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch("LogOut");
        return router.push("/login");
      }
    }
  });

axios.interceptors.request.use(function (config) {
    const token = store.getters.IdToken
    config.headers.Authorization = token;

    return config;
});


Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

