import Vue from "vue/dist/vue.min"
import Tpl from "./MainApp.html"

import "bootstrap/dist/css/bootstrap.min.css"

window.jQuery = window.$ = require("jquery");
require("popper.js");
require("bootstrap");

const MainApp = Vue.component("main-app", {
    template: Tpl,

    methods: {
        btnGotoYunpClicked(e) {
            window.electron.shell.openExternal('https://yunp.top');
        },

        btnCloseClicked(e) {
            window.close();
        }
    }
});

let rootEl = document.createElement("div");
document.body.appendChild(rootEl);
new MainApp().$mount(rootEl);