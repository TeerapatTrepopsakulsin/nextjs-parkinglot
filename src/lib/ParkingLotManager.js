// Logic of ParkingLot integrate with database
import ModelManager from "./ModelManager";


export default class ParkingLotManager {
    static instance = null;
    modelManager;

    constructor() {
        if (ParkingLotManager.instance == null) {
            ParkingLotManager.instance = this;
            // Initialisation
            this.modelManager = new ModelManager();
        }
        return ParkingLotManager.instance
    }

    async park(parkingLot, vehicle) {
        const pL = await parkingLot.populate(this.modelManager.jsonSchema);

        for (const level of pL.levels) {
            for (const spot of level.spots) {
                if (!spot.vehicle && vehicle.size <= spot.size) { // Check if the spot is empty and vehicle can fit in
                    spot.vehicle = vehicle._id; // Park the vehicle
                    await spot.save(); // Save the updated parking lot
                    return true;
                }
            }
        }
        throw new Error("Parking lot is full.");
    }

    async count(parkingLot) {
        let countJson = {};
        const pL = await parkingLot.populate(this.modelManager.jsonSchema);

        for (const level of pL.levels) {
            for (const spot of level.spots) {
                if (!spot.vehicle) {
                    const s = spot.symbol;
                    if (!countJson[s]) {
                        countJson[s] = 1;
                    } else {
                        countJson[s] += 1;
                    }
                }
            }
        }
        return countJson;
    }
}
