import Vue from 'vue';
import Router from 'vue-router';
import App from "./app.vue"
import { router } from './scenes';
import styles from "./global.scss"

Vue.use(Router);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

router.replace("/library")
