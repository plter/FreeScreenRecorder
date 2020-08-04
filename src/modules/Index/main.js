import "./styles/style.css"
import Facade from "../../libs/puremvc/Facade";
import MainAppMediator from "./controllers/MainAppMediator";
import Constants from "./Constants";


let facade = Facade.getInstance(Constants.Facades.MAIN);
facade.registerMediator(new MainAppMediator());
