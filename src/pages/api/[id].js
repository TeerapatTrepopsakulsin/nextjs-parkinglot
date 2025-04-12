// pages/api/items/[id].js
import mongodb from '../../lib/mongodb';
import ModelManager from '../../lib/ModelManager';
import ParkingLotManager from "../../lib/ParkingLotManager";


export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    const db = new mongodb();
    await db.dbConnect();

    const model = new ModelManager();
    const parkingLotManager = new ParkingLotManager();

    switch (method) {
        case 'DELETE':
            try {
                const deletedVehicle = await model.vehicleModel.deleteOne({ _id: id });
                if (!deletedVehicle) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: deletedVehicle });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}