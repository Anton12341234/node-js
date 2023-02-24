import pkg from 'mongoose';
const { Schema} = pkg;
import mongoose from 'mongoose';


const Message = new Schema({
    text: {type: String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    room_id: {type: String},
    createdAt: { type: Number, default: Date.now() }
})

export default mongoose.model('Message', Message)