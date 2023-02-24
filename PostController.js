import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.user.id)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllSearch(req, res) {
        try {
            const posts = await PostService.getAllSearch(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllSearchCount(req, res) {
        try {
            const posts = await PostService.getAllSearchCount(req.body);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getCount(req, res) {
        try {
            const count = await PostService.getCount();
            return res.json(count);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getMy(req, res) {
        try {
            const posts = await PostService.getMy(req.user.id);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json({...post._doc, comments: post.comments})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body);
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new PostController();