// Construct the model and Design Database Schema
import mongoose from 'mongoose';
// import ItemSchema from '../models/Item.js';
import Car from '../models/Car.js';
import ParkingSpot from "../models/ParkingSpot.js";
import Vehicle from '../models/Vehicle.js';
import Level from '../models/Level.js';
import ParkingLot from '../models/ParkingLot.js';
import Motorcycle from '../models/Motorcycle.js';
import Bus from '../models/Bus.js';


export default class ModelManager {
    static instance = null;
    // itemModel;
    vehicleModel;
    carModel;
    motorcycleModel;
    busModel;
    parkingSpotModel;
    levelModel;
    parkingLotModel;
    jsonSchema;

    constructor() {
        if (ModelManager.instance == null) {
            ModelManager.instance = this;


            // Vehicle Base Model
            let vehicleSchema = new mongoose.Schema(
                Vehicle.schema,
                { discriminatorKey: 'type', collection: 'vehicles' });
            this.vehicleModel = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

            // Car
            this.carModel = mongoose.models.Car || this.vehicleModel.discriminator('Car', Car.schema);

            // Motorcycle
            this.motorcycleModel = mongoose.models.Motorcycle || this.vehicleModel.discriminator('Motorcycle', Motorcycle.schema);

            // Bus
            this.busModel = mongoose.models.Bus || this.vehicleModel.discriminator('Bus', Bus.schema);

            // Parking Spot
            let spotSchema = ParkingSpot.schema;
            spotSchema.vehicle = { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
            this.parkingSpotModel = mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', spotSchema);

            // Level
            let levelSchema = Level.schema;
            levelSchema.spots = [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' }];
            this.levelModel = mongoose.models.Level || mongoose.model('Level', levelSchema);

            // Parking Lot Module
            let parkingLotSchema = ParkingLot.schema;
            parkingLotSchema.levels = [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level' }];
            this.parkingLotModel = mongoose.models.ParkingLot || mongoose.model('ParkingLot', parkingLotSchema);

            // Full JSON Schema
            this.jsonSchema = {
                    path: 'levels',
                    populate: {
                        path: 'spots',
                        populate: {
                            path: 'vehicle',
                            model: 'Vehicle',
                        },
                    },
            }
        }
        return ModelManager.instance
    }

    async parkingLotJsonSchema() {
        return await this.parkingLotModel.find({}).populate(this.jsonSchema);
    }
}
