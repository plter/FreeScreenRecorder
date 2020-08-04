import Observer from "./Observer";

class View {
    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class View
     *
     * A Multiton View implementation.
     *
     * In PureMVC, the View class assumes these responsibilities
     *
     * - Maintain a cache of {@link Mediator Mediator}
     *   instances.
     *
     * - Provide methods for registering, retrieving, and removing
     *   {@link Mediator Mediator}.
     *
     * - Notifiying {@link Mediator Mediator} when they are registered or
     *   removed.
     *
     * - Managing the observer lists for each {@link Notification Notification}
     *   in the application.
     *
     * - Providing a method for attaching {@link Observer Observer} to an
     *   {@link Notification Notification}'s observer list.
     *
     * - Providing a method for broadcasting a {@link Notification Notification}.
     *
     * - Notifying the {@link Observer Observer}s of a given
     *   {@link Notification Notification} when it broadcast.
     *
     * This View implementation is a Multiton, so you should not call the
     * constructor directly, but instead call the static Multiton
     * Factory #getInstance method.
     *
     * @param {string} key
     * @constructor
     * @throws {Error}
     *  if instance for this Multiton key has already been constructed
     */
    constructor(key) {
        if (View.instanceMap[key] != null) {
            throw new Error(View.MULTITON_MSG);
        }

        /**
         * @ignore
         * The Views internal multiton key.
         *
         * @type string
         * @protected
         */
        this.multitonKey = key;

        View.instanceMap[this.multitonKey] = this;

        /**
         * @ignore
         * The Views internal mapping of mediator names to mediator instances
         *
         * @type Array
         * @protected
         */
        this.mediatorMap = [];
        /**
         * @ignore
         * The Views internal mapping of Notification names to Observer lists
         *
         * @type Array
         * @protected
         */
        this.observerMap = [];
        this.initializeView();
    };

    /**
     * @protected
     * Initialize the Singleton View instance
     *
     * Called automatically by the constructor, this is your opportunity to
     * initialize the Singleton instance in your subclass without overriding the
     * constructor
     *
     * @return {void}
     */
    initializeView() {
        return;
    };

    /**
     * Register an Observer to be notified of Notifications with a given name
     *
     * @param {string} notificationName
     *  The name of the Notifications to notify this Observer of
     * @param {Observer} observer
     *  The Observer to register.
     * @return {void}
     */
    registerObserver(notificationName, observer) {
        if (this.observerMap[notificationName] != null) {
            this.observerMap[notificationName].push(observer);
        } else {
            this.observerMap[notificationName] = [observer];
        }
    };

    /**
     * Notify the Observersfor a particular Notification.
     *
     * All previously attached Observers for this Notification's
     * list are notified and are passed a reference to the INotification in
     * the order in which they were registered.
     *
     * @param {Notification} notification
     *  The Notification to notify Observers of
     * @return {void}
     */
    notifyObservers(notification) {
        // SIC
        if (this.observerMap[notification.getName()] != null) {
            var observers_ref = this.observerMap[notification.getName()], observers = [], observer;

            for (let i = 0; i < observers_ref.length; i++) {
                observer = observers_ref[i];
                observers.push(observer);
            }

            for (let i = 0; i < observers.length; i++) {
                observer = observers[i];
                observer.notifyObserver(notification);
            }
        }
    };

    /**
     * Remove the Observer for a given notifyContext from an observer list for
     * a given Notification name
     *
     * @param {string} notificationName
     *  Which observer list to remove from
     * @param {Object} notifyContext
     *  Remove the Observer with this object as its notifyContext
     * @return {void}
     */
    removeObserver(notificationName, notifyContext) {
        // SIC
        var observers = this.observerMap[notificationName];
        for (var i = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext) == true) {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length == 0) {
            delete this.observerMap[notificationName];
        }
    };

    /**
     * Register a Mediator instance with the View.
     *
     * Registers the Mediator so that it can be retrieved by name,
     * and further interrogates the Mediator for its
     * {@link Mediator#listNotificationInterests interests}.
     *
     * If the Mediator returns any Notification
     * names to be notified about, an Observer is created encapsulating
     * the Mediator instance's
     * {@link Mediator#handleNotification handleNotification}
     * method and registering it as an Observer for all Notifications the
     * Mediator is interested in.
     *
     * @param {Mediator}
     *  a reference to the Mediator instance
     */
    registerMediator(mediator) {
        if (this.mediatorMap[mediator.getMediatorName()] != null) {
            return;
        }

        mediator.initializeNotifier(this.multitonKey);
        // register the mediator for retrieval by name
        this.mediatorMap[mediator.getMediatorName()] = mediator;

        // get notification interests if any
        var interests = mediator.listNotificationInterests();

        // register mediator as an observer for each notification
        if (interests.length > 0) {
            // create observer referencing this mediators handleNotification method
            var observer = new Observer(mediator.handleNotification, mediator);
            for (var i = 0; i < interests.length; i++) {
                this.registerObserver(interests[i], observer);
            }
        }

        mediator.onRegister();
    }

    /**
     * Retrieve a Mediator from the View
     *
     * @param {string} mediatorName
     *  The name of the Mediator instance to retrieve
     * @return {Mediator}
     *  The Mediator instance previously registered with the given mediatorName
     */
    retrieveMediator(mediatorName) {
        return this.mediatorMap[mediatorName];
    };

    /**
     * Remove a Mediator from the View.
     *
     * @param {string} mediatorName
     *  Name of the Mediator instance to be removed
     * @return {Mediator}
     *  The Mediator that was removed from the View
     */
    removeMediator(mediatorName) {
        var mediator = this.mediatorMap[mediatorName];
        if (mediator) {
            // for every notification the mediator is interested in...
            var interests = mediator.listNotificationInterests();
            for (var i = 0; i < interests.length; i++) {
                // remove the observer linking the mediator to the notification
                // interest
                this.removeObserver(interests[i], mediator);
            }

            // remove the mediator from the map
            delete this.mediatorMap[mediatorName];

            // alert the mediator that it has been removed
            mediator.onRemove();
        }

        return mediator;
    };

    /**
     * Check if a Mediator is registered or not.
     *
     * @param {string} mediatorName
     * @return {boolean}
     *  Whether a Mediator is registered with the given mediatorname
     */
    hasMediator(mediatorName) {
        return this.mediatorMap[mediatorName] != null;
    };
}

/**
 * View Singleton Factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @return {View}
 *  The Singleton instance of View
 */
View.getInstance = function (key) {
    if (null == key)
        return null;

    if (View.instanceMap[key] == null) {
        View.instanceMap[key] = new View(key);
    }

    return View.instanceMap[key];
};

/**
 * Remove a View instance
 *
 * @return {void}
 */
View.removeView = function (key) {
    delete View.instanceMap[key];
};


/**
 * @ignore
 * The internal map used to store multiton View instances
 *
 * @type Array
 * @protected
 */
View.instanceMap = [];

/**
 * @ignore
 * The error message used if an attempt is made to instantiate View directly
 *
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";

export default View;