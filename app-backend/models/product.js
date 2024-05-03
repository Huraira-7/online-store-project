import mongoose from 'mongoose';
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price : {type: Number, required: true},
    category : {type: String, required: true},
    is_out_stock : {type: Boolean, required: true},
    is_deleted : {type: Boolean, required: true}, //maybe related to images only
    images: {type : [String], required: true},
    // maybe old price to refer to while showing discounts


    // sender: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
    // trade : {type: mongoose.SchemaTypes.ObjectId, ref: 'Trade', required: true},
},
    {timestamps: true}
);

export default mongoose.model('Product', productSchema, 'products');