/**
 * Created by plter on 3/24/17.
 */

const fs = require("fs");

class StreamQueue {

    constructor(distFile) {
        this._distFile = distFile;
        this._idle = true;
        this._blobs = [];
        this._fileReader = new FileReader();
        this._fileReader.onload = () => this.fileLoadedHandler();
    }

    get distFile() {
        return this._distFile;
    }

    appendData(blob) {
        this._blobs.push(blob);
        this.checkToStartWrite();
    }

    checkToStartWrite() {
        if (this._idle) {
            this.shiftAndWrite();
            this._idle = false;
        }
    }

    shiftAndWrite() {
        this._fileReader.readAsArrayBuffer(this._blobs.shift());
    }

    fileLoadedHandler() {

        fs.appendFileSync(this.distFile, Buffer.from(this._fileReader.result));

        if (this._blobs.length > 0) {
            this.shiftAndWrite();
        } else {
            this._idle = true;
        }
    }
}

module.exports = StreamQueue;