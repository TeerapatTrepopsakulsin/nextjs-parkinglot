import Vehicle from "./Vehicle";


export default class Motorcycle extends Vehicle{
    static size = 1;
    static symbol = "M";
    license;

    static schema = {
        size: { type: 'number', required: true, default: Motorcycle.size },
        symbol: { type: 'string', required: true, default: Motorcycle.symbol }
    };

    constructor(license) {
        super(license);
    }
}