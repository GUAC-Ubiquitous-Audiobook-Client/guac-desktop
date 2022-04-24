"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var app_vue_1 = __importDefault(require("./app.vue"));
var main_1 = require("./scenes/main");
vue_1.default.use(vue_router_1.default);
new vue_1.default({
    render: function (h) { return h(app_vue_1.default); },
    router: main_1.router
}).$mount('#app');
main_1.router.replace(main_1.Routes.LIBRARY);
