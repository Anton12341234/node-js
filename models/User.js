import pkg from 'mongoose';
const { Schema} = pkg;
import mongoose from 'mongoose';


const User = new Schema({
    addresses: [{type: String}],
    phones: [{type: String}],
    roles: [{type: String, ref: 'Role'}],
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: [{url:{type: String}}],
    nick: {type: String}
})

export default mongoose.model('User', User)