/**
 * Created by plter on 3/8/17.
 */

class EventHandler {

    /**
     * name can be null,but can't be "__unCategorised__handles__"
     * @param name
     */
    constructor(name) {
        this.name = name;
    }

    exec(event) {

    }
}

module.exports = EventHandler;