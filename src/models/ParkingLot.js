export default class ParkingLot {
    _levels;

    static schema = {};

    constructor() {};

    async park(vehicle){
        for (let i=0; i<this.levels.length; i++){
            let l = this.levels[i];
            for (let j=0; j<l.spots.length; j++) {
                let s = l.spots[j];
                let res = s.park(vehicle);
                if (res) {
                    return true;
                }
            }
        }
        return false;
    }

    get levels() {
        return this._levels;
    }

    set levels(value) {
        this._levels = value;
    }

    addLevel(level) {
        this.levels.push(level);
    }
}