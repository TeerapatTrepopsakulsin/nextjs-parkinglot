import mongoose from 'mongoose';
import ItemSchema from '../models/Item.js';
import Car from '../models/Car.js';


export default class ModelManager {
    static instance = null;
    itemModel = mongoose.models.Item || mongoose.model('Item', ItemSchema);
    carModel = mongoose.models.Car || mongoose.model('Car', Car.schema);

    constructor() {
        if (ModelManager.instance == null) {
            ModelManager.instance = this;
        }
        return ModelManager.instance
    }
}
