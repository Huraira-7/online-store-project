import mongoose from 'mongoose';
const {Schema} = mongoose;

const imageSchema = new Schema({
    imagestring: { type: String, required: true },
    // id : {type: String, required: true},
    is_deleted: { type: Boolean, required: true }
});

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price : {type: Number, required: true},
    oldprice : {type: Number}, // NOT required
    category : {type: String, required: true},
    is_out_stock : {type: Boolean, required: true},
    best_selling : {type: Boolean, required: false},
    date: {type: Number, required: true}, //number of milliseconds passed since ...
    images: {type : [imageSchema], required: true},
},
    {timestamps: true}
);

export default mongoose.model('Product', productSchema, 'products');

