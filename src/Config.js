/**
 * Created by plter on 10/28/16.
 */

const path = require("path");

const Config = {
    SRC_DIR: __dirname,
    getAppDir: function () {
        return path.dirname(Config.SRC_DIR);
    },
    getRenderersDir: function () {
        return path.join(Config.SRC_DIR, "renderers");
    },
    getMainDir: function () {
        return path.join(Config.SRC_DIR, "main");
    },
    getResDir: function () {
        return path.join(Config.getAppDir(), "res");
    },
    getImagesDir: function () {
        return path.join(Config.getResDir(), "images");
    }
};

module.exports = Config;