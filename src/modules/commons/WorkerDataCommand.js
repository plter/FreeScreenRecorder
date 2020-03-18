const WorkerDataCommand = {
    CMD_READY: "ready",
    CMD_PROGRESS: "progress",
    CMD_COMPLETE: "complete",
    CMD_REQUEST_CONVERT_SRV_TO_WEBM: "requestEncodeSrvToWebm",
    CMD_READING_SRV_FILE: "readingSrvFile",
    CMD_FOUND_BLOB: "foundBlob",
    CMD_CONVERT_SRV_TO_WEBM_PROGRESS: "convertSrvToWebmProgress",
    CMD_CONVERT_SRV_TO_WEBM_COMPLETE: "convertSrvToWebmComplete",
    makeReadyCommand() {
        return {cmd: this.CMD_READY};
    },
    makeProgressCommand(progress) {
        return {cmd: this.CMD_PROGRESS, progress: progress};
    },
    makeCompleteCommand() {
        return {cmd: this.CMD_COMPLETE};
    },
    makeRequestConvertSrvToWebmCommand(inSrvPath, outWebmPath) {
        return {cmd: this.CMD_REQUEST_CONVERT_SRV_TO_WEBM, inSrvPath: inSrvPath, outWebmPath: outWebmPath};
    },
    makeReadingSrvFileCommand() {
        return {cmd: this.CMD_READING_SRV_FILE};
    },
    makeFoundBlobCommand(totalFound) {
        return {cmd: this.CMD_FOUND_BLOB, totalFound: totalFound};
    },
    makeConvertSrvToWebmProgress(currentCount, totalCount) {
        return {cmd: this.CMD_CONVERT_SRV_TO_WEBM_PROGRESS, currentCount: currentCount, totalCount: totalCount};
    },
    makeConvertSrvToWebComplete(blobs, webmPath) {
        return {cmd: this.CMD_CONVERT_SRV_TO_WEBM_COMPLETE, blobs: blobs, webmPath: webmPath};
    }

};

module.exports = WorkerDataCommand;