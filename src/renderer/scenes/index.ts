import VueRouter from 'vue-router';

interface Route {
    path: string
    component: any
}

const routes: Route[] = [
    {
        path: '/',
        component: require('./home/home.vue').default
    },
    {
        path: '/keybinds',
        component: require('./keybinds/keybinds.vue').default
    }
];

export const router = new VueRouter({
    routes
});
