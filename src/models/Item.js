export const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
});
