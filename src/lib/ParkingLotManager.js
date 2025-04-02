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
        // for (let i = 0; Array.isArray(parkingLot.levels) && i < parkingLot.levels.length; i++) {
        //     let levelId = parkingLot.levels[i];
        //     let level = await this.modelManager.levelModel.findById(levelId);
        //     for (let j = 0; Array.isArray(level.spots) && j < level.spots.length; j++) {
        //         let spotId = level.spots[j];
        //         let spot = await this.modelManager.parkingSpotModel.findById(spotId);
        //         let parkedVehicle = await this.modelManager.vehicleModel.findById(spot.vehicle);
        //         if (!parkedVehicle && (vehicle.size <= spot.size)) { // Check if the spot is empty
        //             spot.vehicle = vehicle._id; // Park the vehicle
        //             await spot.save(); // Save the updated parking lot
        //             return true;
        //         }
        //     }
        // }
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
