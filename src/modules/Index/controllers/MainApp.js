import Vue from "vue/dist/vue.min"
import Tpl from "../views/MainApp.html"
import Dialogs from "../../commons/Dialogs";


const MainApp = Vue.component("main-app", {
    template: Tpl,
    data() {
        return {
            include_audio: true,
            audio_devices: []
        };
    },

    mounted() {
        this.buildMainMenu();
    },
    methods: {

        createMenuItem(label, clickCallback, iconPath, type) {
            return new window.electron.remote.MenuItem({
                label: label,
                click: clickCallback,
                type: type,
                icon: iconPath
            });
        },

        buildMainMenu() {
            this._mainMenu = new window.electron.remote.Menu();
            // this._mainMenu.append(this.createMenuItem("视频库", () => Dialogs.showVideoLibrary(), window.path.join(window.appPath, "src", "res", "icons", "video_library_18.png")));
            // this._mainMenu.append(this.createMenuItem("设置", () => Dialogs.showSettingsDialog(), window.path.join(window.appPath, "src", "res", "icons", "MaterialDesignIcons", "ic_settings_black_18dp.png")));
            // this._mainMenu.append(this.createMenuItem(undefined, undefined, undefined, "separator"));
            // this._mainMenu.append(this.createMenuItem("捐助", () => Dialogs.showDonateDialog(), window.path.join(window.appPath, "src", "res", "icons", "wechat_18.png")));
            this._mainMenu.append(this.createMenuItem("关于 ScreenRecorder", () => Dialogs.showAboutDialog(), window.path.join(window.appPath, "res", "icons", "MaterialDesignIcons", "ic_info_outline_black_18dp.png")));
            // this._mainMenu.append(this.createMenuItem(undefined, undefined, undefined, "separator"));
            this._mainMenu.append(this.createMenuItem("退出", () => window.close(), window.path.join(window.appPath, "res", "icons", "MaterialDesignIcons", "ic_highlight_off_black_18dp.png")));
        },

        selectChangeHandler(e) {
        },

        mainMenuClicked(e) {
            this._mainMenu.popup({x: 8, y: 60});
        },

        btnShowDonateWindowClicked(e) {
            Dialogs.showDonateDialog();
        }
    }
});


export default MainApp;