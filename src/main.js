import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://91vanyfuib.execute-api.eu-west-3.amazonaws.com/';

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
    const token = store.getters.AccessToken
    config.headers.Authorization =  token;

    return config;
});


Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

