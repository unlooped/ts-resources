"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectHelper = void 0;
class ObjectHelper {
    static values(data) {
        let res = [];
        for (let key in data) {
            res.push(data[key]);
        }
        return res;
    }
}
exports.ObjectHelper = ObjectHelper;
