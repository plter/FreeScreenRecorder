/**
 * Created by plter on 3/8/17.
 */

class LEAEvent {

    /**
     * @param name A name can't be null
     * @param data?
     */
    constructor(name, data) {
        this._name = name;
        this._data = data;
    }

    get name() {
        return this._name;
    }

    get data() {
        return this._data;
    }
}

module.exports = LEAEvent;