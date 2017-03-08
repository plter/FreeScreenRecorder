/**
 * Created by plter on 3/8/17.
 */

class ListenerList {


    constructor() {
        this._handlers = new Map();
    }

    add(handler) {
        handler.name = handler.name || "__unCategorised__handles__";

        let map = this._handlers.get(handler.name);
        if (!map) {
            map = new Map();
            this._handlers.set(handler.name, map);
        }

        map.set(handler, handler);
    }

    /**
     *
     * @param handlerOrName {EventHandler|Object|String}
     */
    remove(handlerOrName) {
        if (typeof handlerOrName == "string") {
            this._handlers.delete(handlerOrName);
        } else {
            handlerOrName.name = handlerOrName.name || "__unCategorised__handles__";
            let map = this._handlers.get(handlerOrName.name);
            if (map) {
                map.delete(handlerOrName);
            }
        }
    }

    /**
     *
     * @param eventOrName {LEAEvent|String}
     */
    dispatch(eventOrName) {
        if (typeof eventOrName == "string") {//If it's a string,and it may be a event name
            /**
             * @type {Map}
             */
            let map = this._handlers.get(eventOrName);
            if (map) {
                for (let v of map.values()) {
                    v.exec();
                }
            }
        } else {//If eventOrName is not a string,it may be an event object
            let map = this._handlers.get(eventOrName.name);
            if (map) {
                for (let v of map.values()) {
                    v.exec(eventOrName);
                }
            }
        }
    }
}

module.exports = ListenerList;