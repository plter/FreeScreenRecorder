import Constants from "../Constants";
import Proxy from "../../../libs/puremvc/Proxy"
import DateHelper from "../../commons/DateHelper";

class MediaStreamRecorderProxy extends Proxy {


    constructor() {
        super(MediaStreamRecorderProxy.name, {});
    }


    startRecordProcess(stream) {
        let video_name = DateHelper.getReadableTimestamp();
        this._recorder = new MediaRecorder(stream, {mimeType: Constants.MediaRecorder.MIME_TYPE});
        this._recorder.ondataavailable = e => {
            this.sendNotification(Constants.Notifications.STORE_RECORDED_DATA, {
                video_id: video_name,
                data: e.data
            });
        };
        this._recorder.start(Constants.MediaRecorder.TIME_SPLIT);
    }

    start(stream) {
        if (!MediaRecorder.isTypeSupported(Constants.MediaRecorder.MIME_TYPE)) {
            console.error("Your browser dose not support record video");
            return;
        }

        if (!this._recording) {
            this.startRecordProcess(stream);
            this._recording = true;
        } else {
            console.error("Can not start two or more record process at same time");
        }
    }

    stop() {
        if (this._recording && this._recorder) {
            this._recorder.stop();
            this._recording = false;
        }
    }
}

export default MediaStreamRecorderProxy;
