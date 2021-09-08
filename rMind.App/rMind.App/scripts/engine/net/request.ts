export class Request {
    /**
     * Send GET responce
     * @param entryPoint
     * @param params
     * @param load A callback function
     */
    static async Get(entryPoint: string, params: object, load?: Function) {
        console.log(">> get");

        const xhr = new XMLHttpRequest();
        let param = "";
        if (params) {
            param = `?${this.parseParams(params)}`;
        }

        xhr.open("GET", `api/${entryPoint}${param}`, true); 
        if (load) {
            xhr.onload = evt => {
                const response = xhr.responseText;
                load(params, response);
            };
        }

        xhr.send();
    }

    private static parseParams(params: object) {
        let arr = []
        for (let p in params) {
            arr.push(`${p}=${params[p]}`);
        }
        let sParams = arr.join('&');
        console.log(sParams);
        return sParams;
    }
}