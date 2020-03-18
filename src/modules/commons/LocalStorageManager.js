/**
 * Created by plter on 3/25/17.
 */

const LS_KEY_BASE_NS = "topyunp_screenrecorder";

const Tools = require("../commons/Tools");

const LocalStorageManager = {
    getVideoLibraryDir: function () {
        let dest = localStorage.getItem(`${LS_KEY_BASE_NS}_destDir`) || window.path.join(window.electron.remote.app.getPath("home"), "SRLibrary");
        Tools.mkdirs(dest);
        return dest;
    },
    setDestDir: function (value) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_destDir`, value);
    },
    getAudioBps: function () {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_audioBps`) || "128000";
    },
    setAudioBps: function (value) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_audioBps`, value);
    },
    getVideoBps: function () {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_videoBps`) || "6000000";
    },
    setVideoBps: function (value) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_videoBps`, value);
    },
    setSelectedAudioDeviceId(deviceId) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_SelectedAudioDeviceId`, deviceId);
    },
    getSelectedAudioDeviceId() {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_SelectedAudioDeviceId`);
    },
    setSelectedScreen(screen) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_SelectedScreen`, screen);
    },
    getSelectedScreen() {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_SelectedScreen`);
    },
    clearSelectedScreen() {
        localStorage.removeItem(`${LS_KEY_BASE_NS}_SelectedScreen`);
    },
    /**
     *
     * @param value yes or no
     */
    setIfIncludeAudio(value) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_ifIncludeAudio`, value);
    },
    getIfIncludeAudio() {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_ifIncludeAudio`) || "yes";
    },
    /**
     *
     * @param value yes or no
     */
    setIfIncludeComputerAudio(value) {
        localStorage.setItem(`${LS_KEY_BASE_NS}_ifIncludeComputerAudio`, value);
    },
    /**
     * 是否包括电脑声音
     * @returns {string | string}
     */
    getIfIncludeComputerAudio() {
        return localStorage.getItem(`${LS_KEY_BASE_NS}_ifIncludeComputerAudio`) || "no";
    }
};

module.exports = LocalStorageManager;