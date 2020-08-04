class Notification {
    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class Notification
     *
     * A base Notification implementation.
     *
     * PureMVC does not rely upon underlying event models such as the one provided
     * with the DOM or other browser centric W3C event models.
     *
     * The Observer Pattern as implemented within PureMVC exists to support
     * event-driven communication between the application and the actors of the MVC
     * triad.
     *
     * Notifications are not meant to be a replacement for events in the browser.
     * Generally, Mediator implementors place event listeners on their view
     * components, which they then handle in the usual way. This may lead to the
     * broadcast of Notifications to trigger commands or to communicate with other
     * Mediators. {@link Proxy Proxy},
     * {@link SimpleCommand SimpleCommand}
     * and {@link MacroCommand MacroCommand}
     * instances communicate with each other and
     * {@link Mediator Mediator}s
     * by broadcasting Notifications.
     *
     * A key difference between browser events and PureMVC Notifications is that
     * events follow the 'Chain of Responsibility' pattern, 'bubbling' up the
     * display hierarchy until some parent component handles the event, while
     * PureMVC Notification follow a 'Publish/Subscribe' pattern. PureMVC classes
     * need not be related to each other in a parent/child relationship in order to
     * communicate with one another using Notifications.
     *
     * @constructor
     * @param {string} name
     *  The Notification name
     * @param {Object} [body]
     *  The Notification body
     * @param {Object} [type]
     *  The Notification type
     */
    constructor(name, body, type) {
        /**
         * The Notifications name.
         *
         * @type {string}
         * @private
         */
        this._name = name;
        /**
         * The Notifications type.
         *
         * @type {string}
         * @private
         */
        this._type = type;
        /**
         * The Notifications body.
         *
         * @type {Object}
         * @private
         */
        this._body = body;
    };

    /**
     * Get the name of the Notification instance
     *
     * @return {string}
     *  The name of the Notification instance
     */
    getName() {
        return this._name;
    }

    get name() {
        return this._name;
    }

    /**
     * Set this Notifications body.
     * @param {Object} body
     * @return {void}
     */
    setBody(body) {
        this._body = body;
    }

    /**
     * Get the Notification body.
     *
     * @return {Object}
     */
    getBody() {
        return this._body
    };

    /**
     * Set the type of the Notification instance.
     *
     * @param {Object} type
     * @return {void}
     */
    setType(type) {
        this._type = type;
    };

    /**
     * Get the type of the Notification instance.
     *
     * @return {Object}
     */
    getType() {
        return this._type;
    };

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    /**
     * Get a string representation of the Notification instance
     *
     * @return {string}
     */
    toString() {
        var msg = "Notification Name: " + this.getName();
        msg += "\nBody:" + ((this.body == null) ? "null" : this.body.toString());
        msg += "\nType:" + ((this.type == null) ? "null" : this.type);
        return msg;
    };
}

export default Notification;