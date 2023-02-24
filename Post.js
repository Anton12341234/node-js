import mongoose from 'mongoose';
const { Schema } = mongoose;

const Post = new mongoose.Schema({
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Number, default: Date.now() },
    images:[{url:{type: String}}]
})

export default mongoose.model('Post', Post)