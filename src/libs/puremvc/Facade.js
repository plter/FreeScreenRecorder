import Model from "./Model";
import View from "./View";
import Controller from "./Controller";
import Notification from "./Notification"

class Facade {
    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class Facade
     * Facade exposes the functionality of the Controller, Model and View
     * actors to client facing code.
     *
     * This Facade implementation is a Multiton, so you should not call the
     * constructor directly, but instead call the static Factory method,
     * passing the unique key for this instance to #getInstance
     *
     * @constructor
     * @param {string} key
     *    The multiton key to use to retrieve the Facade instance.
     * @throws {Error}
     *  If an attempt is made to instantiate Facade directly
     */
    constructor(key) {
        if (Facade.instanceMap[key] != null) {
            throw new Error(Facade.MULTITON_MSG);
        }

        /**
         * @ignore
         * The Facades corresponding Controller
         *
         * @protected
         * @type Controller
         */
        this.controller = null;

        /**
         * @ignore
         * The Facades corresponding Model instance
         *
         * @protected
         * @type Model
         */
        this.model = null;

        /**
         * @ignore
         * The Facades correspnding View instance.
         *
         * @protected
         * @type View
         */
        this.view = null;

        /**
         * @ignore
         * The Facades multiton key.
         *
         * @protected
         * @type string
         */
        Facade.prototype.multitonKey = null;

        this.initializeNotifier(key);
        Facade.instanceMap[key] = this;
        this.initializeFacade();
    }

    /**
     * Initialize the Multiton Facade instance.
     *
     * Called automatically by the constructor. Override in your subclass to any
     * subclass specific initializations. Be sure to call the 'super'
     * initializeFacade method, though
     *
     *     MyFacade.prototype.initializeFacade= function ()
     *     {
     *         Facade.call(this);
     *     };
     * @protected
     * @return {void}
     */
    initializeFacade() {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    };

    /**
     * Initialize the {@link Controller Controller}.
     *
     * Called by the #initializeFacade method.
     *
     * Override this method in your subclass of Facade
     * if one or both of the following are true:
     * - You wish to initialize a different Controller
     * - You have
     * {@link SimpleCommand SimpleCommand}s
     * or {@link MacroCommand MacroCommand}s
     * to register with the Controllerat startup.
     *
     * If you don't want to initialize a different Controller,
     * call the 'super' initializeControlle method at the beginning of your
     * method, then register commands.
     *
     *     MyinitializeController ()
     *     {
     *         initializeController.call(this);
     *         this.registerCommand(AppConstants.A_NOTE_NAME, ABespokeCommand)
     *     }
     *
     * @protected
     * @return {void}
     */
    initializeController() {
        if (this.controller != null)
            return;

        this.controller = Controller.getInstance(this.multitonKey);
    };

    /**
     * @protected
     * Initialize the {@link Model Model};
     *
     * Called by the #initializeFacade method.
     * Override this method in your subclass of Facade if one of the following are
     * true:
     *
     * - You wish to initialize a different Model.
     *
     * - You have {@link Proxy Proxy}s to
     *   register with the Model that do not retrieve a reference to the Facade at
     *   construction time.
     *
     * If you don't want to initialize a different Model
     * call 'super' #initializeModel at the beginning of your method, then register
     * Proxys.
     *
     * Note: This method is *rarely* overridden; in practice you are more
     * likely to use a command to create and registerProxys with the Model>,
     * since Proxys with mutable data will likely
     * need to send Notifications and thus will likely want to fetch a reference to
     * the Facade during their construction.
     *
     * @return {void}
     */
    initializeModel() {
        if (this.model != null)
            return;

        this.model = Model.getInstance(this.multitonKey);
    };

    /**
     * @protected
     *
     * Initialize the {@link View View}.
     *
     * Called by the #initializeFacade method.
     *
     * Override this method in your subclass of Facade if one or both of the
     * following are true:
     *
     * - You wish to initialize a different View.
     * - You have Observers to register with the View
     *
     * If you don't want to initialize a different View
     * call 'super' #initializeView at the beginning of your
     * method, then register Mediator instances.
     *
     *     MyinitializeView ()
     *     {
     *         initializeView.call(this);
     *         this.registerMediator(new MyMediator());
     *     };
     *
     * Note: This method is *rarely* overridden; in practice you are more
     * likely to use a command to create and register Mediators
     * with the View, since Mediator instances will need to send
     * Notifications and thus will likely want to fetch a reference
     * to the Facade during their construction.
     * @return {void}
     */
    initializeView() {
        if (this.view != null)
            return;

        this.view = View.getInstance(this.multitonKey);
    };

    /**
     * Register a command with the Controller by Notification name
     * @param {string} notificationName
     *  The name of the Notification to associate the command with
     * @param {Function} commandClassRef
     *  A reference ot the commands constructor.
     * @return {void}
     */
    registerCommand(notificationName, commandClassRef) {
        this.controller.registerCommand(notificationName, commandClassRef);
    };

    /**
     * Remove a previously registered command to Notification mapping from the
     * {@link Controller#removeCommand Controller}
     * @param {string} notificationName
     *  The name of the the Notification to remove from the command mapping for.
     * @return {void}
     */
    removeCommand(notificationName) {
        this.controller.removeCommand(notificationName);
    };

    /**
     * Check if a command is registered for a given notification.
     *
     * @param {string} notificationName
     *  A Notification name
     * @return {boolean}
     *  Whether a comman is currently registered for the given notificationName
     */
    hasCommand(notificationName) {
        return this.controller.hasCommand(notificationName);
    };

    /**
     * Register a Proxy with the {@link Model#registerProxy Model}
     * by name.
     *
     * @param {Proxy} proxy
     *  The Proxy instance to be registered with the Model.
     * @return {void}
     */
    registerProxy(proxy) {
        this.model.registerProxy(proxy);
    };

    /**
     * Retrieve a Proxy from the Model
     *
     * @param {string} proxyName
     * @return {Proxy}
     */
    retrieveProxy(proxyName) {
        return this.model.retrieveProxy(proxyName);
    };

    /**
     * Remove a Proxy from the Model by name
     * @param {string} proxyName
     *  The name of the Proxy
     * @return {Proxy}
     *  The Proxy that was removed from the Model
     */
    removeProxy(proxyName) {
        var proxy = null;
        if (this.model != null) {
            proxy = this.model.removeProxy(proxyName);
        }

        return proxy;
    };

    /**
     * Check it a Proxy is registered.
     * @param {string} proxyName
     *  A Proxy name
     * @return {boolean}
     *  Whether a Proxy is currently registered with the given proxyName
     */
    hasProxy(proxyName) {
        return this.model.hasProxy(proxyName);
    };

    /**
     * Register a Mediator with with the View.
     *
     * @param {Mediator} mediator
     *  A reference to the Mediator to register
     * @return {void}
     */
    registerMediator(mediator) {
        if (this.view != null) {
            this.view.registerMediator(mediator);
        }
    };

    /**
     * Retrieve a Mediator from the View by name
     *
     * @param {string} mediatorName
     *  The Mediators name
     * @return {Mediator}
     *  The retrieved Mediator
     */
    retrieveMediator(mediatorName) {
        return this.view.retrieveMediator(mediatorName);
    };

    /**
     * Remove a Mediator from the View.
     *
     * @param {string} mediatorName
     *  The name of the Mediator to remove.
     * @return {Mediator}
     *  The removed Mediator
     */
    removeMediator(mediatorName) {
        var mediator = null;
        if (this.view != null) {
            mediator = this.view.removeMediator(mediatorName);
        }

        return mediator;
    };

    /**
     * Check if a Mediator is registered or not.
     *
     * @param {string} mediatorName
     *  A Mediator name
     * @return {boolean}
     *  Whether a Mediator is registered with the given mediatorName
     */
    hasMediator(mediatorName) {
        return this.view.hasMediator(mediatorName);
    };

    /**
     * Create and send a
     * {@link Notification Notification}
     *
     * Keeps us from having to construct new Notification instances in our
     * implementation
     *
     * @param {string} notificationName
     *  The name of the Notification to send
     * @param {Object} [body]
     *  The body of the notification
     * @param {string} [type]
     *  The type of the notification
     * @return {void}
     */
    sendNotification(notificationName, body, type) {
        this.notifyObservers(new Notification(notificationName, body, type));
    };

    /**
     * Notify {@link Observer Observer}s
     *
     * This method is left public mostly for backward compatibility, and to allow
     * you to send custom notification classes using the facade.
     *
     * Usually you should just call sendNotification and pass the parameters, never
     * having to construct the notification yourself.
     *
     * @param {Notification} notification
     *  The Notification to send
     * @return {void}
     */
    notifyObservers(notification) {
        if (this.view != null) {
            this.view.notifyObservers(notification);
        }
    };

    /**
     * Initialize the Facades Notifier capabilities by setting the Multiton key for
     * this facade instance.
     *
     * Not called directly, but instead from the constructor when #getInstance is
     * invoked. It is necessary to be public in order to implement Notifier
     *
     * @param {string} key
     * @return {void}
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    };

}


/**
 * Facade Multiton Factory method.
 * Note that this method will return null if supplied a
 * null or undefined multiton key.
 *
 * @param {string} key
 *    The multiton key use to retrieve a particular Facade instance
 * @return {Facade}
 */
Facade.getInstance = function (key) {
    if (null == key)
        return null;

    if (Facade.instanceMap[key] == null) {
        Facade.instanceMap[key] = new Facade(key);
    }

    return Facade.instanceMap[key];
};


/**
 * Check if a *Core* is registered or not
 *
 * @static
 * @param {string} key
 *  The multiton key for the *Core* in question
 * @return {boolean}
 *  Whether a *Core* is registered with the given key
 */
Facade.hasCore = function (key) {
    return Facade.instanceMap[key] != null;
};

/**
 * Remove a *Core*
 *
 * Remove the Model, View, Controller and Facade for a given key.
 *
 * @static
 * @param {string} key
 * @return {void}
 */
Facade.removeCore = function (key) {
    if (Facade.instanceMap[key] == null)
        return;

    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete Facade.instanceMap[key];
};

/**
 * @ignore
 * The Multiton Facade instance map.
 * @static
 * @protected
 * @type Array
 */
Facade.instanceMap = [];

/**
 * @ignore
 * Message Constants
 * @protected
 * @type {string}
 * @const
 * @static
 */
Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";

export default Facade;