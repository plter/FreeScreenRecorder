class FlexBoxApplication {

    constructor(rootElement) {
        this._rootElement = rootElement;
        this._flexBoxApplicationWindowChangeHandler();
        this._flexBoxApplicationAddListeners();
    }

    _flexBoxApplicationAddListeners() {
        window.addEventListener("resize", this._flexBoxApplicationWindowChangeHandler.bind(this));
    }

    _flexBoxApplicationWindowChangeHandler(e) {
        this.rootElement.style.height = `${window.innerHeight}px`;
    }

    get rootElement() {
        return this._rootElement;
    }
}

module.exports = FlexBoxApplication;