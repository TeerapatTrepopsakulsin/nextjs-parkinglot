export default class Vehicle {
    size;
    symbol;
    license;

    static schema = {
        size: { type: 'number', required: true, default: 2 },
        symbol: { type: 'string', required: true, default: "C" },
        license: { type: 'string', required: true }
    };

    constructor(license) {
        this._license = license;
    };

    can_park(parking_size) {
        return this.size <= parking_size;
    }

    get license() {
        return this._license;
    }
}
