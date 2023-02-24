import Comment from "./Comment.js";

class commentService {
    async create(comment,id) {
        const createdcomment = await Comment.create({...comment, owner:id});
        return createdcomment;
    }

    async getAll() {
        const comments = await Comment.find().populate('owner')
        return comments;
    }
    async getMy(id) {
        const comments = await Comment.find({owner:id}).populate('owner');
        return comments;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const comment = await Comment.findById(id).populate('owner');
        return comment;
    }

    async update(comment) {
        if (!comment._id) {
            throw new Error('не указан ID')
        }
        const updatedcomment = await Comment.findByIdAndUpdate(comment._id, comment, {new: true}).populate('owner')
        return updatedcomment;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const comment = await Comment.findByIdAndDelete(id).populate('owner');
            return comment;
    }
}


export default new commentService();