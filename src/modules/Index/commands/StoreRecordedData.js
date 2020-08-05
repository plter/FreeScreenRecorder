import SimpleCommand from "../../../libs/puremvc/SimpleCommand";
import IndexedDBProxy from "../proxies/IndexedDBProxy";

class StoreRecordedData extends SimpleCommand {
    execute(notification) {
        super.execute(notification);
        /**
         * @type {IndexedDBProxy}
         */
        let ip = this.facade.retrieveProxy(IndexedDBProxy.name);
        ip.saveData(notification.body.video_id, notification.body.userName, notification.body.data);
    }
}

export default StoreRecordedData;
