import View from "./View";

class Model {
    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class Model
     *
     * A Multiton Model implementation.
     *
     * In PureMVC, the Model class provides
     * access to model objects (Proxies) by named lookup.
     *
     * The Model assumes these responsibilities:
     *
     * - Maintain a cache of {@link Proxy Proxy}
     *   instances.
     * - Provide methods for registering, retrieving, and removing
     *   {@link Proxy Proxy} instances.
     *
     * Your application must register
     * {@link Proxy Proxy} instances with the Model.
     * Typically, you use a
     * {@link SimpleCommand SimpleCommand}
     * or
     * {@link MacroCommand MacroCommand}
     * to create and register Proxy instances once the Facade has initialized the
     * *Core* actors.
     *
     * This Model implementation is a Multiton, so you should not call the
     * constructor directly, but instead call the
     * {@link #getInstance static Multiton Factory method}
     * @constructor
     * @param {string} key
     *  The Models multiton key
     * @throws {Error}
     *  An error is thrown if this multitons key is already in use by another instance
     */
    constructor(key) {
        if (Model.instanceMap[key]) {
            throw new Error(Model.MULTITON_MSG);
        }

        /**
         * @ignore
         * The Models multiton key.
         *
         * @protected
         * @type string
         */
        this.multitonKey = key;
        Model.instanceMap[key] = this;
        /**
         * @ignore
         * The map used by the Model to store Proxy instances.
         *
         * @protected
         * @type Array
         */
        this.proxyMap = [];
        this.initializeModel();
    };

    /**
     * Initialize the Model instance.
     *
     * Called automatically by the constructor, this
     * is your opportunity to initialize the Singleton
     * instance in your subclass without overriding the
     * constructor.
     *
     * @return void
     */
    initializeModel() {
    };


    /**
     * Register a Proxy with the Model
     * @param {Proxy}
     */
    registerProxy(proxy) {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    };

    /**
     * Retrieve a Proxy from the Model
     *
     * @param {string} proxyName
     * @return {Proxy}
     *  The Proxy instance previously registered with the provided proxyName
     */
    retrieveProxy(proxyName) {
        return this.proxyMap[proxyName];
    };

    /**
     * Check if a Proxy is registered
     * @param {string} proxyName
     * @return {boolean}
     *  whether a Proxy is currently registered with the given proxyName.
     */
    hasProxy(proxyName) {
        return this.proxyMap[proxyName] != null;
    };

    /**
     * Remove a Proxy from the Model.
     *
     * @param {string} proxyName
     *  The name of the Proxy instance to remove
     * @return {Proxy}
     *  The Proxy that was removed from the Model
     */
    removeProxy(proxyName) {
        var proxy = this.proxyMap[proxyName];
        if (proxy) {
            this.proxyMap[proxyName] = null;
            proxy.onRemove();
        }

        return proxy;
    };
}

/**
 * Model Multiton Factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @param {string} key
 *  The multiton key for the Model to retrieve
 * @return {Model}
 *  the instance for this Multiton key
 */
Model.getInstance = function (key) {
    if (null == key)
        return null;

    if (Model.instanceMap[key] == null) {
        Model.instanceMap[key] = new Model(key);
    }

    return Model.instanceMap[key];
};

/**
 * @static
 * Remove a Model instance.
 *
 * @param {string} key
 * @return {void}
 */
Model.removeModel = function (key) {
    delete Model.instanceMap[key];
};

/**
 * @ignore
 * The map used by the Model to store multiton instances
 *
 * @protected
 * @static
 * @type Array
 */
Model.instanceMap = [];

/**
 * @ignore
 * Message Constants
 *
 * @static
 * @type {string}
 */
Model.MULTITON_MSG = "Model instance for this Multiton key already constructed!";

export default Model;