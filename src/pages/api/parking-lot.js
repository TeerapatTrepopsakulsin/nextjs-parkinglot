import mongodb from '../../lib/mongodb';
import ModelManager from '../../lib/ModelManager';


export default async function handler(req, res) {
    let db = new mongodb();
    await db.dbConnect();

    const { method } = req;

    let model = new ModelManager();

    switch (method) {
        case 'GET':
            try {
                const cars = await model.carModel.find({});
                res.status(200).json({ success: true, data: cars });
            } catch (error) {
                res.status(400).json({ success: false , message: error.message });
            }
            break;
        case 'POST':
            try {
                const car = await model.carModel.create(req.body);
                res.status(201).json({ success: true, data: car });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}