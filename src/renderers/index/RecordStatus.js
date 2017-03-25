/**
 * Created by plter on 10/29/16.
 */

const RecordStatus = {
    STOPPED: 1,//This state means the screen is ready for recording
    RECORDING: 2,
    PAUSED: 3,
    RETRIEVING_SCREEN_STREAM: 4,
    RETRIEVING_AUDIO_STREAM: 5,
};

module.exports = RecordStatus;