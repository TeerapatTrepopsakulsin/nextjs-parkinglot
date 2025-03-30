import Vehicle from "./Vehicle";


export default class ParkingSpot {
    _size;
    _symbol;
    _spotNum;
    _vehicle;

    static schema = {
        size: { type: 'number', required: true, default: 2 },
        symbol: { type: 'string', required: true, default: "c" },
        spotNum: { type: 'number', required: true }
    };

    constructor(size, spotNum) {
        if (size === 1) {
            this._symbol = "m";
        }
        else if (size === 2) {
            this._symbol = "c";
        }
        else if (size === 3) {
            this._symbol = "b";
        }

        this._size = size;
        this._spotNum = spotNum;
    }

    park(vehicle) {
        if (this._vehicle !== null) {
            // full
            return false
        }
        else {
            if (vehicle.can_park(this.size)) {
                this.vehicle = vehicle;
                return true;
            }
            else {
                return false;
                // vehicle too fat
            }
        }
    }

    remove() {
        this._vehicle = null;
    }

    get vehicle() {
        return this._vehicle;
    }

    set vehicle(value) {
        this._vehicle = value;
    }

    get size() {
        return this._size;
    }

    get spotNum() {
        return this._spotNum;
    }

    get symbol() {
        return this._symbol;
    }
}