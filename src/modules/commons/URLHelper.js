const URLHelper = {
    readBlobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            let r = new FileReader();
            r.onload = e => {
                resolve(r.result);
            };
            r.onerror = reject;
            r.readAsDataURL(blob);
        });
    }
};

export default URLHelper;