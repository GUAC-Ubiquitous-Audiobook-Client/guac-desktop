"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.Routes = void 0;
var vue_router_1 = __importDefault(require("vue-router"));
var Routes;
(function (Routes) {
    Routes["LISTENING"] = "/listening";
    Routes["LIBRARY"] = "/library";
    Routes["KEYBINDS"] = "/keybinds";
    Routes["ABOUT"] = "/about";
})(Routes = exports.Routes || (exports.Routes = {}));
var routes = [
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
exports.router = new vue_router_1.default({
    routes: routes
});
