const RecordStatus = require("./RecordStatus");
const electron = require("electron");
const TimeTool = require("../../tools/TimeTool");
const ipcRenderer = electron.ipcRenderer;
const di = require("../common/DialogsInterfaces");
const LocalStorageManager = require("./LocalStorageManager");
const StreamQueue = require("./StreamQueue");
const path = require("path");

class Index {

    constructor() {
        this.initUI();
        this.addListeners();
        this.tryToGetStream();
    }

    initUI() {
        this._btnStartOrStop = document.querySelector("#btn-start-or-stop");
        this._btnPauseOrResume = document.querySelector("#btn-pause-or-resume");
        this._statusSpan = document.querySelector("#status-span");
        this._videoBpsInput = document.querySelector("#videoBpsInput");
        this._videoBpsInput.value = LocalStorageManager.getVideoBps(625000);
        this._audioBpsInput = document.querySelector("#audioBpsInput");
        this._audioBpsInput.value = LocalStorageManager.getAudioBps(48000);

        this._textInputDistDirPath = document.querySelector("#distDirPath");
        //try to read the saved dist dir path
        let dirPath = LocalStorageManager.getDistDir();
        if (dirPath) {
            this._textInputDistDirPath.value = dirPath;
        }
    }

    startRecord() {
        this._currentRecorder = new MediaRecorder(this._currentStream, {
            mimeType: "video/webm;codecs=vp9",
            audioBitsPerSecond: this.getAudioBps(),
            videoBitsPerSecond: this.getVideoBps()
        });
        this._currentStreamQueue = new StreamQueue(path.join(this.getDistDirTextFieldValue(), `${TimeTool.formatDate(new Date())}.webm`));
        this._currentRecorder.ondataavailable = e => {
            this._currentStreamQueue.appendData(e.data);
        };
        this._currentRecorder.start(20);
        this.recordState = RecordStatus.RECORDING;
    }

    stopRecord() {
        this._currentRecorder.stop();
        this.recordState = RecordStatus.STOPPED;
        this._statusSpan.innerHTML = "录制完成";
    }

    _btnStartOrStopClickedHandler() {
        if (this.getDistDirTextFieldValue()) {
            switch (this.recordState) {
                case RecordStatus.STOPPED:
                    this.startRecord();
                    break;
                case RecordStatus.RECORDING:
                    this.stopRecord();
                    break;
            }
        } else {
            alert("请先选择保存目录");
        }
    }

    _btnPauseOrResumeClickedHandler() {
        if (this.getDistDirTextFieldValue()) {
            switch (this.recordState) {
                case RecordStatus.RECORDING:
                    this._currentRecorder.pause();
                    this.recordState = RecordStatus.PAUSED;
                    break;
                case RecordStatus.PAUSED:
                    this._currentRecorder.resume();
                    this.recordState = RecordStatus.RECORDING;
                    break;
            }
        } else {
            alert("请先选择保存目录");
        }
    }

    getDistDirTextFieldValue() {
        return this._textInputDistDirPath.value;
    }

    addListeners() {

        this._btnStartOrStop.onclick = () => this._btnStartOrStopClickedHandler();
        this._btnPauseOrResume.onclick = () => this._btnPauseOrResumeClickedHandler();

        this.addIpcRendererListeners();
        document.querySelector("#btnBrowserForDistDir").onclick = () => {
            this.showSelectDistDirOpenDialog();
        };

        this._audioBpsInput.onchange = e => LocalStorageManager.setAudioBps(this._audioBpsInput.value);
        this._videoBpsInput.onchange = e => LocalStorageManager.setVideoBps(this._videoBpsInput.value);
    }

    showSelectDistDirOpenDialog() {
        di.showOpenDirectoryDialog("选择目标目录", this._textInputDistDirPath.value, dirPath => {
            if (dirPath) {
                this._textInputDistDirPath.value = dirPath;
                LocalStorageManager.setDistDir(this._textInputDistDirPath.value);
            }
        });
    }

    addIpcRendererListeners() {
        ipcRenderer.on("startOrStop", event => {
            this._btnStartOrStopClickedHandler();
            event.returnValue = 1;
        });
        ipcRenderer.on("pauseOrResume", event => {
            this._btnPauseOrResumeClickedHandler();
            event.returnValue = 1;
        });
    }

    tryToGetStream() {
        this.recordState = RecordStatus.RETRIEVING_SCREEN_STREAM;
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'screen',
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 800
                }
            }
        }).then(stream => {
            this._currentStream = stream;

            this.recordState = RecordStatus.RETRIEVING_AUDIO_STREAM;
            return navigator.mediaDevices.getUserMedia({audio: true});
        }).then(audioStream => {
            this._currentStream.addTrack(audioStream.getTracks()[0]);
            this.recordState = RecordStatus.STOPPED;
        }).catch(error => {
            alert("设备初始化失败...");
            this._statusSpan.innerHTML = "初始化失败";
            console.error(error)
        });
    }

    get recordState() {
        return this._recordState;
    }

    set recordState(value) {
        this._recordState = value;

        switch (value) {
            case RecordStatus.STOPPED:
                this._btnStartOrStop.disabled = false;
                this._btnStartOrStop.innerHTML = "开始";
                this._btnPauseOrResume.disabled = true;
                this._statusSpan.innerHTML = "设备就绪";
                this.dispatchStoppedEvent();
                break;
            case RecordStatus.RECORDING:
                this._btnStartOrStop.disabled = false;
                this._btnStartOrStop.innerHTML = "停止";
                this._btnPauseOrResume.disabled = false;
                this._btnPauseOrResume.innerHTML = "暂停";
                this._statusSpan.innerHTML = "录制中...";
                this.dispatchRecordingEvent();
                break;
            case RecordStatus.PAUSED:
                this._btnStartOrStop.disabled = true;
                this._btnStartOrStop.innerHTML = "停止";
                this._btnPauseOrResume.disabled = false;
                this._btnPauseOrResume.innerHTML = "继续";
                this._statusSpan.innerHTML = "录制暂停";
                this.dispatchPausedEvent();
                break;
            case RecordStatus.RETRIEVING_SCREEN_STREAM:
                this.disableAllButtons();
                this._statusSpan.innerHTML = "正在检查视频输入...";
                break;
            case RecordStatus.RETRIEVING_AUDIO_STREAM:
                this.disableAllButtons();
                this._statusSpan.innerHTML = "正在检查声音输入...";
                break;
        }
    }

    disableAllButtons() {
        this._btnPauseOrResume.disabled = true;
        this._btnStartOrStop.disabled = true;
    }

    /**
     * Read audio bits per second from text input
     */
    getAudioBps() {
        return parseInt(this._audioBpsInput.value);
    }

    /**
     * Read video bits per second from text input
     */
    getVideoBps() {
        return parseInt(this._videoBpsInput.value);
    }

    dispatchPausedEvent() {
        ipcRenderer.send("paused");
    }

    dispatchRecordingEvent() {
        ipcRenderer.send("recording");
    }

    dispatchStoppedEvent() {
        ipcRenderer.send("stopped");
    }
}

new Index();