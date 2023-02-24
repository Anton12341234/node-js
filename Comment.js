import mongoose from 'mongoose';
const { Schema } = mongoose;

const Comment = new mongoose.Schema({
    text: {type: Number, required: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Number, default: Date.now() },
    ad: { type: String }
})

export default mongoose.model('Comment', Comment)