import pkg from 'mongoose';
const { Schema} = pkg;
import mongoose from 'mongoose';


const MessageRoom = new Schema({
    owners: { type: String},
    user1:{ type: Object},
    user2:{ type: Object},
    createdAt: { type: Number, default: Date.now() }
})

export default mongoose.model('MessageRoom', MessageRoom)