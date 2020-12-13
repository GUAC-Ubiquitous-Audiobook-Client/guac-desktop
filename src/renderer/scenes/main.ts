import VueRouter from 'vue-router';

export enum Routes {
    listening = "/listening",
    library = "/library",
    keybinds = "/keybinds",
    about = "/about",
}

interface Route {
    path: string
    component: any
}

const routes: Route[] = [
    {
        path: Routes.listening,
        component: require('./listening/listening.vue').default
    },
    {
        path: Routes.library,
        component: require('./library/library.vue').default
    },
    {
        path: Routes.keybinds,
        component: require('./keybinds/keybinds.vue').default
    },
    {
        path: Routes.about,
        component: require('./about/about.vue').default
    }
];

export const router = new VueRouter({
    routes
});
