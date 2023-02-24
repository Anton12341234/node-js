import Message from "./Message.js";
import User from './models/User.js';
import MessageRoom from "./MessageRoom.js";

class MessageService {
    async create(post, id) {
        let myRooms = await MessageRoom.findOne({owners: `${post.to} ${id}`})
        if(!myRooms){
            myRooms = await MessageRoom.findOne({owners: `${id} ${post.to}`})
            if(!myRooms){
                const name1 = await User.find({_id:post.to})
                const name2 = await User.find({_id:id})
                myRooms = await MessageRoom.create({
                    owners: `${post.to} ${id}`,
                    user1:{
                        name:name1[0].username,
                        avatar: name1[0].avatar,
                        _id: name1[0]._id
                    }, 
                    user2:{
                        name:name2[0].username,
                        avatar: name2[0].avatar,
                        _id: name2[0]._id
                    }
                })
            }
        }
        const message = await Message.create({...post, owner:id, room_id:myRooms._id})
        const messageFind = await Message.find({_id:message._id}).populate('owner');
        const userTo = await User.find({_id:messageFind[0].to})
        return {...messageFind[0]._doc, to:userTo[0]};
    }
    async getAll(body) {
        const messageFind = await Message.find({$or:[{room_id:{ $regex: body.room_id }}]}).populate('owner');
        return messageFind;
    }
    async getRooms(id) {
        const rooms = await MessageRoom.find({$or:[{owners:{ $regex: id }}]})
        return rooms;
    }
    async getAllSearch(body) {
        const searchTitle = await Message.find({
                $or:[
                    {title:{ $regex: body.searchText }},
                    {description: { $regex: body.searchText }}
                ]
            }).sort('-_id').skip(body.skip).limit(body.limit).populate('owner')
        return searchTitle;
    }
    async getAllSearchCount(body) {
        const posts = await Message.find({title: body.searchText})
        return posts.length;
    }
    async getCount() {
        const count = await Message.find()
        return count.length;
    }
    async getMy(id) {
        const posts = await Message.find({owner:id}).populate('owner');
        return posts;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const comments = await Message.find({ad:id}).populate('owner');
        const post = await Message.findById(id).populate('owner');
        return {...post, comments:comments};
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Message.findByIdAndUpdate(post._id, post, {new: true}).populate('owner')
        return updatedPost;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const post = await Message.findByIdAndDelete(id).populate('owner');
            return post;
    }
}


export default new MessageService();