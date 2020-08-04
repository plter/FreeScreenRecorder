const Constants = {
    Notifications: {
        START_UP: "startUp",
        SHOW_LOGIN_DIALOG: "showLoginDialog",
        REFRESH_CLIENT_LIST: "refreshClientList",
        REFRESH_ROOM_NAME: "refreshRoomName",
        COMMAND_LOGIN: "login",
        COMMAND_HANDLE_SOCKET_MESSAGE: "handleSocketMessage",
        MANAGE_STREAM_RECORDER: "manageStreamRecorder",
        MANAGE_STREAM_RECORDER_TYPE_START: "start",
        MANAGE_STREAM_RECORDER_TYPE_STOP: "stop",
        STORE_RECORDED_DATA: "storeRecordedData",
        READ_RECORDED_VIDEO_LIB: "readRecordedVideoLib",
        RECORDED_VIDEOS_LOADED: "recordedVideosLoaded",
        EXPORT_VIDEO: "exportVideo",
        EXPORT_VIDEO_TYPE_DOWNLOAD: "download",
        EXPORT_VIDEO_TYPE_PREVIEW: "preview",
        SEND_CHAT_MESSAGE_IN_ROOM: "sendChatMessageInRoom",
        RECEIVED_CHAT_MESSAGE_IN_ROOM: "receivedChatMessageInRoom",
        MANAGE_SCREEN_RECORDER: "manageScreenRecorder",
        MANAGE_SCREEN_RECORDER_TYPE_START: "start",
        MANAGE_SCREEN_RECORDER_TYPE_STOP: "stop",
        STARTED_TO_RECORD_SCREEN: "startedToRecordScreen",
        STOPPED_TO_RECORD_SCREEN: "stoppedToRecordScreen"
    },

    Facades: {
        MAIN: "main"
    },

    RTC_CONFIGURATION: {
        iceServers: [{
            urls: "stun:stun.l.google.com:19302"
        }]
    },

    LOGIN_MODE: {
        TEACHER: "teacher",
        STUDENT: "student"
    },


    MediaRecorder: {MIME_TYPE: 'video/webm; codecs="opus,vp8"', TIME_SPLIT: 500}
};

export default Constants;
