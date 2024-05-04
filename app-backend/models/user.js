import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true},
    role : {type: String, required: true}, //employee OR customer,
    active  : {type: Boolean, required: true}, //true for all customers, false if admin updates their email id

},
    {timestamps: true}
);

export default mongoose.model('User', userSchema, 'users');