import Proxy from "../../../libs/puremvc/Proxy";
import Dexie from "dexie"
import Constants from "../Constants";

class IndexedDBProxy extends Proxy {

    constructor() {
        var db = new Dexie('screen_recorder');
        db.version(1).stores({
            recorded_videos: '++id,video_name,data'
        });
        super(IndexedDBProxy.name, {db: db});
    }

    saveData(video_id, user_name, data) {
        this.data.db.recorded_videos.put({video_id: video_id, user_name: user_name, data: data});
    }

    async readRecordedVideoLib() {
        let arr = await this.data.db.recorded_videos.toArray();

        let grouped = new Map();
        for (let v of arr) {
            let savedV = grouped.get(v.video_id);
            if (!savedV || !savedV.user_name) {
                grouped.set(v.video_id, v.user_name);
            }
        }
        this.sendNotification(Constants.Notifications.RECORDED_VIDEOS_LOADED, grouped);
    }

    // async exportVideo(video_id, mode = "download") {
    //     let pd = Dialog.showLoading("正在导出...");
    //     let filterResult = await this.data.db.recorded_videos.filter(item => item.video_id == video_id);
    //     let records = await filterResult.toArray();
    //     let blobs = [];
    //     for (let r of records) {
    //         blobs.push(r.data);
    //     }
    //     let blob = new Blob(blobs, {type: "video/webm"});
    //     pd.modal("hide");
    //
    //     if (mode == "download") {
    //         var url = window.URL.createObjectURL(blob);
    //         let filename = DateHelper.getReadableTimestamp() + ".webm";
    //         var a = $(`<a style='display: none;' href="${url}" target="_blank" download="${filename}">${filename}</a>`);
    //         $("body").append(a);
    //         a[0].click();
    //         window.URL.revokeObjectURL(url);
    //         a.remove();
    //     } else if (mode == "preview") {
    //         VideoPreviewDialog.show(video_id, blob);
    //     }
    // }

}

export default IndexedDBProxy;
