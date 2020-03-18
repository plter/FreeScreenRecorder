import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/style.css"
import MainApp from "./controllers/MainApp";

window.jQuery = window.$ = require("jquery");
require("popper.js");
require("bootstrap");


let rootEl = document.createElement("div");
document.body.appendChild(rootEl);

new MainApp().$mount(rootEl);