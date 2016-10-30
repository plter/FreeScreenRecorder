const RecordStatus = require("./RecordStatus");
const electron = require("electron");

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
        this._btnSave = document.querySelector("#btn-save");
    }

    addListeners() {

        this._btnStartOrStop.onclick = ()=> {
            switch (this.recordState) {
                case RecordStatus.STOPPED:
                    this._currentRecorder = new MediaRecorder(this._currentStream, {
                        mimeType: "video/webm;codecs=vp9",
                        audioBitsPerSecond: 64000,
                        videoBitsPerSecond: 625000
                    });
                    this._currentChunks = [];
                    this._currentRecorder.ondataavailable = e=>this._currentChunks.push(e.data);
                    this._currentRecorder.start(20);
                    this.recordState = RecordStatus.RECORDING;
                    this._btnSave.disabled = true;
                    break;
                case RecordStatus.RECORDING:
                    this._currentRecorder.stop();
                    this.recordState = RecordStatus.STOPPED;
                    this._statusSpan.innerHTML = "录制完成";
                    this._btnSave.disabled = false;
                    break;
            }

        };

        this._btnPauseOrResume.onclick = ()=> {
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
        };

        this._btnSave.onclick = ()=> {
            this._currentBlob = new Blob(this._currentChunks, {type: 'video/webm'});

            var url = window.URL.createObjectURL(this._currentBlob);
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${new Date().toString()}.webm`;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        };
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
        }).then(stream=> {
            this._currentStream = stream;

            this.recordState = RecordStatus.RETRIEVING_AUDIO_STREAM;
            return navigator.mediaDevices.getUserMedia({audio: true});
        }).then(audioStream=> {
            this._currentStream.addTrack(audioStream.getTracks()[0]);
            this.recordState = RecordStatus.STOPPED;
        }).catch(error=> {
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
                break;
            case RecordStatus.RECORDING:
                this._btnStartOrStop.disabled = false;
                this._btnStartOrStop.innerHTML = "停止";
                this._btnPauseOrResume.disabled = false;
                this._btnPauseOrResume.innerHTML = "暂停";
                this._statusSpan.innerHTML = "录制中...";
                break;
            case RecordStatus.PAUSED:
                this._btnStartOrStop.disabled = true;
                this._btnStartOrStop.innerHTML = "停止";
                this._btnPauseOrResume.disabled = false;
                this._btnPauseOrResume.innerHTML = "继续";
                this._statusSpan.innerHTML = "录制暂停";
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
        this._btnSave.disabled = true;
    }
}

new Index();