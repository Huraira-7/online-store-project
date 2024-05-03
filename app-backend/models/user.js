import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    num_owned_items: {type: Number, required: true},
    cash: {type: Number, required: true},
    trades : {
        type: [mongoose.SchemaTypes.ObjectId], // Array of ObjectIds referencing Trades
        ref: 'Trade',                          // Reference the Trade model
        required: true,
    },
},
    {timestamps: true}
);

export default mongoose.model('User', userSchema, 'users');