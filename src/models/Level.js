export default class Level{
    _floor;
    _spots;

    static schema = {
        floor: { type: 'number', required: true}
    };

    constructor() {
    }

    addSpot(spot) {
        this.spots.push(spot);
    }

    get floor() {
        return this._floor;
    }

    get spots() {
        return this._spots;
    }
}