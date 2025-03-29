export default class Vehicle {
    size;
    symbol;
    license;

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
