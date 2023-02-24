import MessageService from "./MessageService.js";

class MessageController {
    async create(req, res) {
        try {
            const post = await MessageService.create(req.body, req.user.id)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await MessageService.getAll(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getRooms(req, res) {
        try {
            const post = await MessageService.getRooms( req.user.id)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAllSearch(req, res) {
        try {
            const posts = await MessageService.getAllSearch(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllSearchCount(req, res) {
        try {
            const posts = await MessageService.getAllSearchCount(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getCount(req, res) {
        try {
            const count = await MessageService.getCount();
            return res.json(count);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getMy(req, res) {
        try {
            const posts = await MessageService.getMy(req.user.id);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const post = await MessageService.getOne(req.params.id)
            return res.json({...post._doc, comments: post.comments})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedPost = await MessageService.update(req.body);
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const post = await MessageService.delete(req.params.id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new MessageController();