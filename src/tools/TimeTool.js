/**
 * Created by plter on 2016/10/31.
 */

const TimeTool = {
    format: function (time) {
        return (time >= 10 ? "" : "0") + time;
    },
    formatDate: function (date) {
        return `${date.getFullYear()}${TimeTool.format(date.getMonth() + 1)}${TimeTool.format(date.getDate())}${TimeTool.format(date.getHours())}${TimeTool.format(date.getMinutes())}${TimeTool.format(date.getSeconds())}`;
    }
};

module.exports = TimeTool;