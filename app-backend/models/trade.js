import mongoose from 'mongoose';
const {Schema} = mongoose;

const tradeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    conditions: {type: [String] , required: true},
    list_offers: {
        type: [ mongoose.SchemaTypes.ObjectId], // Array of ObjectIds referencing Offers
        ref: 'Offer',                           // Reference the Offer model
        required: true,
    },
    accepted_offer: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Offer', 
    }
},
    {timestamps: true}
);

export default mongoose.model('Trade', tradeSchema, 'trades');