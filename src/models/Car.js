import Vehicle from "./Vehicle";


export default class Car extends Vehicle{
    static size = 2;
    static symbol = "C";
    license;

    static schema = {
        size: { type: 'string', required: true, default: 2 },
        symbol: { type: 'string', required: true, default: "C" },
        license: { type: 'string', required: true }
    };

    constructor(license) {
        super(license);
    }
}
