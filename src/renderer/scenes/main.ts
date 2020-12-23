import VueRouter from 'vue-router';

export enum Routes {
    LISTENING = "/listening",
    LIBRARY = "/library",
    KEYBINDS = "/keybinds",
    ABOUT = "/about",
}

interface Route {
    path: string
    component: any
}

const routes: Route[] = [
    {
        path: Routes.LISTENING,
        component: require('./listening/listening.vue').default
    },
    {
        path: Routes.LIBRARY,
        component: require('./library/library.vue').default
    },
    {
        path: Routes.KEYBINDS,
        component: require('./keybinds/keybinds.vue').default
    },
    {
        path: Routes.ABOUT,
        component: require('./about/about.vue').default
    }
];

export const router = new VueRouter({
    routes
});
