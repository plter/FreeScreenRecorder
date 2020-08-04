import Notifier from "./Notifier";


class Mediator extends Notifier {
    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class puremvc.Mediator
     * @extends puremvc.Notifier
     *
     * A base Mediator implementation.
     *
     * In PureMVC, Mediator classes are used to mediate communication between a view
     * component and the rest of the application.
     *
     * A Mediator should listen to its view components for events, and handle them
     * by sending notifications (to be handled by other Mediators,
     * {@link SimpleCommand SimpleCommands}
     * or
     * {@link MacroCommand MacroCommands})
     * or passing data from the view component directly to a
     * {@link Proxy Proxy}, such as submitting
     * the contents of a form to a service.
     *
     * Mediators should not perform business logic, maintain state or other
     * information for its view component, or break the encapsulation of the view
     * component by manipulating the view component's children. It should only call
     * methods or set properties on the view component.
     *
     * The view component should encapsulate its own behavior and implementation by
     * exposing methods and properties that the Mediator can call without having to
     * know about the view component's children.
     *
     * @constructor
     * @param {string} [mediatorName]
     *  The Mediators name. The Mediators static #NAME value is used by default
     * @param {Object} [viewComponent]
     *  The Mediators {@link #setViewComponent viewComponent}.
     */
    constructor(mediatorName, viewComponent) {
        super();

        /**
         * @ignore
         * The Mediators name. Should only be accessed by Mediator subclasses.
         *
         * @protected
         * @type string
         */
        this.mediatorName = mediatorName || this.constructor.NAME;


        /**
         * @ignore
         * The Mediators viewComponent. Should only be accessed by Mediator subclasses.
         *
         * @protected
         * @type Object
         */
        this._viewComponent = viewComponent;
    }


    /**
     * Get the name of the Mediator
     *
     * @return {string}
     *  The Mediator name
     */
    getMediatorName() {
        return this.mediatorName;
    }

    /**
     * Set the Mediators view component. This could
     * be a HTMLElement, a bespoke UiComponent wrapper
     * class, a MooTools Element, a jQuery result or a
     * css selector, depending on which DOM abstraction
     * library you are using.
     *
     *
     * @param viewComponent {Object} the view component
     * @return {void}
     */
    setViewComponent(viewComponent) {
        this._viewComponent = viewComponent;
    }

    /**
     * Get the Mediators view component.
     *
     * Additionally, an optional explicit getter can be
     * be defined in the subclass that defines the
     * view components, providing a more semantic interface
     * to the Mediator.
     *
     * This is different from the AS3 implementation in
     * the sense that no casting is required from the
     * object supplied as the view component.
     *
     *     MyMediator.prototype.getComboBox= function ()
     *     {
     *         return this.viewComponent;
     *     }
     *
     * @return {Object}
     *  The view component
     */
    getViewComponent() {
        return this._viewComponent;
    };

    get viewComponent() {
        return this._viewComponent;
    }

    /**
     * List the Notification names this Mediator is interested
     * in being notified of.
     *
     * @return {Array}
     *  The list of Notification names.
     */
    listNotificationInterests() {
        return [];
    };

    /**
     * Handle Notifications.
     *
     * Typically this will be handled in a switch statement
     * with one 'case' entry per Notification the Mediator
     * is interested in
     *
     * @param {Notification} notification
     * @return {void}
     */
    handleNotification(notification) {
        return;
    }

    /**
     * Called by the View when the Mediator is registered
     * @return {void}
     */
    onRegister() {
        return;
    }

    /**
     * Called by the View when the Mediator is removed
     */
    onRemove() {
        return;
    };
}

/**
 * @static
 * The name of the Mediator.
 *
 * Typically, a Mediator will be written to serve one specific control or group
 * of controls and so, will not have a need to be dynamically named.
 *
 * @type {string}
 */
Mediator.NAME = "Mediator";

export default Mediator;