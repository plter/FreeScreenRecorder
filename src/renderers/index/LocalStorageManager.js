/**
 * Created by plter on 3/25/17.
 */


const LocalStorageManager = {
    getDistDir: function () {
        return localStorage.getItem("distDir");
    },
    setDistDir: function (value) {
        localStorage.setItem("distDir", value);
    },
    getAudioBps: function (defaultValue) {
        return localStorage.getItem("audioBps") || defaultValue;
    },
    setAudioBps: function (value) {
        localStorage.setItem("audioBps", value);
    },
    getVideoBps: function (defaultValue) {
        return localStorage.getItem("videoBps") || defaultValue;
    },
    setVideoBps: function (value) {
        localStorage.setItem("videoBps", value);
    }
};

module.exports = LocalStorageManager;