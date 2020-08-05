import "./styles/style.css"
import Facade from "../../libs/puremvc/Facade";
import MainAppMediator from "./mediators/MainAppMediator";
import Constants from "./Constants";
import IndexedDBProxy from "./proxies/IndexedDBProxy";
import MediaStreamRecorderProxy from "./proxies/MediaStreamRecorderProxy";


let facade = Facade.getInstance(Constants.Facades.MAIN);
facade.registerProxy(new IndexedDBProxy());
facade.registerProxy(new MediaStreamRecorderProxy());
facade.registerMediator(new MainAppMediator());
