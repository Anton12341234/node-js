import Post from "./Post.js";
import User from './models/User.js';
import Comment from "./Comment.js";

class PostService {
    async create(post, id) {
        const createdPost = await Post.create({...post, owner:id});
        return createdPost;
    }
    async getAll(body) {
        const posts = await Post.find().sort('-_id').skip(body.skip).limit(body.limit).populate('owner')
        return posts;
    }
    async getAllSearch(body) {
        const searchTitle = await Post.find({
                $or:[
                    {title:{ $regex: body.searchText }},
                    {description: { $regex: body.searchText }}
                ]
            }).sort('-_id').skip(body.skip).limit(body.limit).populate('owner')
        return searchTitle;
    }
    async getAllSearchCount(body) {
        const count = await Post.count({title: body.searchText})
        return count;
    }
    async getCount() {
        const count = await Post.count()
        return count;
    }
    async getMy(id) {
        const posts = await Post.find({owner:id}).populate('owner');
        return posts;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const comments = await Comment.find({ad:id}).populate('owner');
        const post = await Post.findById(id).populate('owner');
        return {...post, comments:comments};
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}).populate('owner')
        return updatedPost;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const post = await Post.findByIdAndDelete(id).populate('owner');
            return post;
    }
}


export default new PostService();