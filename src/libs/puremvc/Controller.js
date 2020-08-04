import View from "./View";
import Observer from "./Observer";

class Controller {

    /**
     * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
     * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
     *
     * @class Controller
     *
     * In PureMVC, the Controller class follows the 'Command and Controller'
     * strategy, and assumes these responsibilities:
     *
     * - Remembering which
     * {@link SimpleCommand SimpleCommand}s
     * or
     * {@link MacroCommand MacroCommand}s
     * are intended to handle which
     * {@link Notification Notification}s
     * - Registering itself as an
     * {@link Observer Observer} with
     * the {@link View View} for each
     * {@link Notification Notification}
     * that it has an
     * {@link SimpleCommand SimpleCommand}
     * or {@link MacroCommand MacroCommand}
     * mapping for.
     * - Creating a new instance of the proper
     * {@link SimpleCommand SimpleCommand}s
     * or
     * {@link MacroCommand MacroCommand}s
     * to handle a given
     * {@link Notification Notification}
     * when notified by the
     * {@link View View}.
     * - Calling the command's execute method, passing in the
     * {@link Notification Notification}.
     *
     * Your application must register
     * {@link SimpleCommand SimpleCommand}s
     * or {@link MacroCommand MacroCommand}s
     * with the Controller.
     *
     * The simplest way is to subclass
     * {@link Facade Facade},
     * and use its
     * {@link Facade#initializeController initializeController}
     * method to add your registrations.
     */
    constructor(key) {
        if (Controller.instanceMap[key] != null) {
            throw new Error(Controller.MULTITON_MSG);
        }

        /**
         * Local reference to the Controller's View
         *
         * @protected
         * @type {View}
         */
        this.view = null;

        /**
         * Note name to command constructor mappings
         *
         * @protected
         * @type {Object}
         */
        this.commandMap = [];

        /**
         * The Controller's multiton key
         *
         * @protected
         * @type {string}
         */
        this.multitonKey = key;
        Controller.instanceMap[this.multitonKey] = this;
        this.initializeController();
    }

    /**
     * @protected
     *
     * Initialize the multiton Controller instance.
     *
     * Called automatically by the constructor.
     *
     * Note that if you are using a subclass of View
     * in your application, you should *also* subclass Controller
     * and override the initializeController method in the
     * following way.
     *
     *     MyController.prototype.initializeController= function ()
     *     {
     *         this.view= MyView.getInstance(this.multitonKey);
     *     };
     *
     * @return {void}
     */
    initializeController() {
        this.view = View.getInstance(this.multitonKey);
    };

    /**
     * If a SimpleCommand or MacroCommand has previously been registered to handle
     * the given Notification then it is executed.
     *
     * @param {Notification} note
     * @return {void}
     */
    executeCommand(note) {
        var commandClassRef = this.commandMap[note.getName()];
        if (commandClassRef == null)
            return;

        var commandInstance = new commandClassRef();
        commandInstance.initializeNotifier(this.multitonKey);
        commandInstance.execute(note);
    }

    /**
     * Register a particular SimpleCommand or MacroCommand class as the handler for
     * a particular Notification.
     *
     * If an command already been registered to handle Notifications with this name,
     * it is no longer used, the new command is used instead.
     *
     * The Observer for the new command is only created if this the irst time a
     * command has been regisered for this Notification name.
     *
     * @param {string} notificationName
     *  the name of the Notification
     * @param {Function} commandClassRef
     *  a command constructor
     * @return {void}
     */
    registerCommand(notificationName, commandClassRef) {
        if (this.commandMap[notificationName] == null) {
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }

        this.commandMap[notificationName] = commandClassRef;
    }

    /**
     * Check if a command is registered for a given Notification
     *
     * @param {string} notificationName
     * @return {boolean}
     *  whether a Command is currently registered for the given notificationName.
     */
    hasCommand(notificationName) {
        return this.commandMap[notificationName] != null;
    }

    /**
     * Remove a previously registered command to
     * {@link Notification Notification}
     * mapping.
     *
     * @param {string} notificationName
     *  the name of the Notification to remove the command mapping for
     * @return {void}
     */
    removeCommand(notificationName) {
        if (this.hasCommand(notificationName)) {
            this.view.removeObserver(notificationName, this);
            this.commandMap[notificationName] = null;
        }
    }
}


/**
 * The Controllers multiton factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @param {string} key
 *  A Controller's multiton key
 * @return {Controller}
 *  the Multiton instance of Controller
 */
Controller.getInstance = function (key) {
    if (null == key)
        return null;

    if (null == this.instanceMap[key]) {
        this.instanceMap[key] = new this(key);
    }

    return this.instanceMap[key];
};

/**
 * @static
 * Remove a Controller instance.
 *
 * @param {string} key
 *  multitonKey of Controller instance to remove
 * @return {void}
 */
Controller.removeController = function (key) {
    delete this.instanceMap[key];
};


/**
 * Multiton key to Controller instance mappings
 *
 * @static
 * @protected
 * @type {Object}
 */
Controller.instanceMap = [];

/**
 * @ignore
 *
 * Message constants
 * @static
 * @protected
 * @type {string}
 */
Controller.MULTITON_MSG = "controller key for this Multiton key already constructed";


export default Controller;