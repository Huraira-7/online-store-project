import mongoose from 'mongoose';
const {Schema} = mongoose;

const imageSchema = new Schema({
    imagestring: { type: String, required: true },
    is_deleted: { type: Boolean, required: true }
});

export default mongoose.model('Image', imageSchema, 'images');