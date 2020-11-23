import VueRouter from 'vue-router';

interface Route {
    path: string
    component: any
    redirect?: string
}

const routes: Route[] = [
    {
        path: '/listening',
        component: require('./listening/listening.vue').default
    },
    {
        path: '/library',
        component: require('./library/library.vue').default
    },
    {
        path: '/keybinds',
        component: require('./keybinds/keybinds.vue').default
    },
    {
        path: '/about',
        component: require('./about/about.vue').default
    }
];

export const router = new VueRouter({
    routes
});
