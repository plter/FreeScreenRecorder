import Constants from "../Constants";
import Facade from "../../../libs/puremvc/Facade";
import DateHelper from "../../commons/DateHelper";

class MediaStreamRecorderTask {

    constructor(stream) {
        /**
         * @type {MediaStream}
         */
        this._stream = stream;
        this._recording = false;

        this._video_name = DateHelper.getReadableTimestamp();
    }


    startRecordProcess() {
        this._recorder = new MediaRecorder(this._stream, {mimeType: Constants.MediaRecorder.MIME_TYPE});
        this._recorder.ondataavailable = e => {
            Facade.getInstance(Constants.Facades.MAIN).sendNotification(Constants.Notifications.STORE_RECORDED_DATA, {
                video_id: this._video_name,
                data: e.data
            });
        };
        this._recorder.start(Constants.MediaRecorder.TIME_SPLIT);
    }

    start() {
        if (!MediaRecorder.isTypeSupported(Constants.MediaRecorder.MIME_TYPE)) {
            console.error("Your browser dose not support record video");
            return;
        }

        if (!this._recording) {
            if (this._stream.active) {
                this.startRecordProcess();
            } else {
                this._stream.onactive = () => {
                    this.startRecordProcess();
                };
            }
            this._recording = true;
        }
    }

    stop() {
        if (this._recording && this._recorder) {
            this._recorder.stop();
            this._recording = false;
        }
    }
}

export default MediaStreamRecorderTask;
