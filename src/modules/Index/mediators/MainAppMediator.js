import Mediator from "../../../libs/puremvc/Mediator";
import MainApp from "./MainApp";

class MainAppMediator extends Mediator {

    constructor() {
        super(MainAppMediator.name, new MainApp());
    }


    onRegister() {
        let rootEl = document.createElement("div");
        document.body.appendChild(rootEl);
        this.viewComponent.$mount(rootEl);
    }
}


export default MainAppMediator;
