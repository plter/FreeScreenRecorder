/**
 * Created by plter on 3/25/17.
 */


const LocalStorageManager = {
    getDistDir: function () {
        return localStorage.getItem("distDir");
    },
    setDistDir: function (value) {
        localStorage.setItem("distDir", value);
    }
};

module.exports = LocalStorageManager;