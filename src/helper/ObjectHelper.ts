export class ObjectHelper {

    public static values(data: Object) {
        let res = [];
        for (let key in data) {
            res.push(data[key]);
        }

        return res;
    }

}