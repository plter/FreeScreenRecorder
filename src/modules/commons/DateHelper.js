const DateHelper = {
    getReadableTimestamp() {
        let d = new Date();
        return `${d.getFullYear()}${DateHelper.formatTime(d.getMonth() + 1)}${DateHelper.formatTime(d.getDate())}${DateHelper.formatTime(d.getHours())}${DateHelper.formatTime(d.getMinutes())}${DateHelper.formatTime(d.getSeconds())}`;
    },

    formatTime(t) {
        return (t >= 10 ? "" : "0") + t;
    }
};


export default DateHelper;