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
                const items = await model.itemModel.find({});
                res.status(200).json({ success: true, data: items });
            } catch (error) {
                res.status(400).json({ success: false , message: error.message });
            }
            break;
        case 'POST':
            try {
                const item = await model.itemModel.create(req.body);
                res.status(201).json({ success: true, data: item });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}