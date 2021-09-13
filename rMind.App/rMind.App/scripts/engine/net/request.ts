export class Request {
    /**
     * Send GET responce
     * @param entryPoint
     * @param params
     * @param load A callback function
     */
    static async get(entryPoint: string, params: object, load?: Function) {
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
            }
        }        

        xhr.send();
    }

    static async post(entryPoint: string, body: any, load?: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `api/${entryPoint}`, true);
        if (load) {
            xhr.onload = evt => {
                const response = xhr.responseText;
                load(response);
            }
        }

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(body));
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