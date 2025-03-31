import mongodb from '../../lib/mongodb';
import ModelManager from '../../lib/ModelManager';
import ParkingLotManager from "../../lib/ParkingLotManager";


export default async function handler(req, res) {
    let db = new mongodb();
    await db.dbConnect();

    const { method } = req;

    let model = new ModelManager();
    let parkingLotManager = new ParkingLotManager();

    switch (method) {
        case 'GET':
            try {
                const parkingLot = await model.parkingLotJsonSchema();
                res.status(200).json({ success: true, data: parkingLot });
            } catch (error) {
                res.status(400).json({ success: false , message: error.message });
            }
            break;
        case 'POST':
            try {
                let vehicle;
                switch (req.body.vehicleType) {
                    case 'Motorcycle':
                        vehicle = null;
                        break;
                    case 'Bus':
                        vehicle = null;
                        break;
                    default:
                        vehicle = await model.carModel.create(req.body);
                }
                // const car = await model.carModel.create(req.body);
                // // const dummyCar = await model.carModel.findOne({})
                // // const ret = await parkingLotManager.park(dummyCar);
                await parkingLotManager.park(vehicle);
                res.status(201).json({ success: true, data: req.body });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}