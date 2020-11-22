import Vue from 'vue';
import Router from 'vue-router';

import { router } from './scenes';

Vue.use(Router);

const app = new Vue({
    router,
    data: () => {
        return {
            loading: true,
            authenticated: false,
            message: 'Hello There!!!'
        }
    },
    async mounted() {
        this.loading = false;
    }
}).$mount('#app');
