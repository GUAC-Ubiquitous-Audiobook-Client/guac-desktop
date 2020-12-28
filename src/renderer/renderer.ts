import Vue from 'vue';
import Router from 'vue-router';
import App from "./app.vue"
import {router, Routes} from './scenes/main';

Vue.use(Router);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

router.replace(Routes.LIBRARY)
