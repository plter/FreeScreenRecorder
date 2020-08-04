import Notifier from "./Notifier";

class Proxy extends Notifier {

    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class Proxy
     * @extends Notifier
     *
     * A base Proxy implementation.
     *
     * In PureMVC, Proxy classes are used to manage parts of the application's data
     * model.
     *
     * A Proxy might simply manage a reference to a local data object, in which case
     * interacting with it might involve setting and getting of its data in
     * synchronous fashion.
     *
     * Proxy classes are also used to encapsulate the application's interaction with
     * remote services to save or retrieve data, in which case, we adopt an
     * asyncronous idiom; setting data (or calling a method) on the Proxy and
     * listening for a
     * {@link Notification Notification}
     * to be sent  when the Proxy has retrieved the data from the service.
     *
     *
     * @param {string} [proxyName]
     *  The Proxy's name. If none is provided, the Proxy will use its constructors
     *  NAME property.
     * @param {Object} [data]
     *  The Proxy's data object
     * @constructor
     */
    constructor(proxyName, data) {
        super();

        /**
         * @ignore
         * The Proxys name.
         *
         * @protected
         * @type String
         */
        this._proxyName = null;

        /**
         * @ignore
         * The Proxy's data object.
         *
         * @protected
         * @type Object
         */
        this._data = null;

        this._proxyName = proxyName || this.constructor.NAME;
        if (data != null) {
            this.setData(data);
        }
    }

    /**
     * Get the Proxy's name.
     *
     * @return {string}
     */
    getProxyName() {
        return this._proxyName;
    };

    /**
     * Set the Proxy's data object
     *
     * @param {Object} data
     * @return {void}
     */
    setData(data) {
        this._data = data;
    };

    /**
     * Get the Proxy's data object
     *
     * @return {Object}
     */
    getData() {
        return this._data;
    };

    get data() {
        return this._data
    }

    set data(value) {
        this._data = value;
    }

    /**
     * Called by the {@link Model Model} when
     * the Proxy is registered.
     *
     * @return {void}
     */
    onRegister() {
        return;
    };

    /**
     * Called by the {@link Model Model} when
     * the Proxy is removed.
     *
     * @return {void}
     */
    onRemove() {
        return;
    };
}

Proxy.NAME = "Proxy";

export default Proxy;