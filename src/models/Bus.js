import Vehicle from "./Vehicle";


export default class Bus extends Vehicle {
    static size = 3;
    static symbol = "B";
    license;

    static schema = {
        size: { type: 'number', required: true, default: Bus.size },
        symbol: { type: 'string', required: true, default: Bus.symbol }
    };

    constructor(license) {
        super(license);
    }
}