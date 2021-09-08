var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Request {
    /**
     * Send GET responce
     * @param entryPoint
     * @param params
     * @param load A callback function
     */
    static Get(entryPoint, params, load) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static parseParams(params) {
        let arr = [];
        for (let p in params) {
            arr.push(`${p}=${params[p]}`);
        }
        let sParams = arr.join('&');
        console.log(sParams);
        return sParams;
    }
}
