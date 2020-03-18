module.exports = {
    mkdirs(dirPath) {
        let parent = window.path.dirname(dirPath);
        if (!window.fs.existsSync(parent)) {
            this.mkdirs(parent);
        }
        if (!window.fs.existsSync(dirPath)) {
            window.fs.mkdirSync(dirPath);
        }
    },
    formatTimeString(time) {
        return (time >= 10 ? "" : "0") + time
    },
    getFfmpegExeFilePath() {
        let type = window.os.type();
        let arch = window.os.arch();
        const APP_DIR = window.electron.remote.app.getAppPath();
        let ffmpegExePath = null;
        switch (type) {
            case "Darwin":
                switch (arch) {
                    case "x64":
                        ffmpegExePath = path.join(APP_DIR, "src", "bin", "ffmpeg_osx64");
                        break;
                    default:
                        console.error(`Unsupported arch for platform ${type}`);
                        break;
                }
                break;
            case "Windows_NT":
                switch (arch) {
                    case "x64":
                        ffmpegExePath = path.join(APP_DIR, "src", "bin", "ffmpeg_win64.exe");
                        break;
                    case "x32":
                    case "ia32":
                        ffmpegExePath = path.join(APP_DIR, "src", "bin", "ffmpeg_win32.exe");
                        break;
                    default:
                        console.error(`Unsupported arch for platform ${type}`);
                        break;
                }
                break;
            case "Linux":
                switch (arch) {
                    case "x64":
                        ffmpegExePath = path.join(APP_DIR, "src", "bin", "ffmpeg_linux64.exe");
                        break;
                    case "x32":
                    case "ia32":
                        ffmpegExePath = path.join(APP_DIR, "src", "bin", "ffmpeg_linux32.exe");
                        break;
                    default:
                        console.error(`Unsupported arch for platform ${type}`);
                        break;
                }
                break;
            default:
                console.error("Unsupported platform");
                break;
        }
        return ffmpegExePath;
    }
};