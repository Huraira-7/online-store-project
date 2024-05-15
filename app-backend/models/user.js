import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true},
    role : {type: String, required: true}, //employee OR customer,
},
    {timestamps: true}
);

export default mongoose.model('User', userSchema, 'users');