import commentService from "./commentService.js";

class commentController {
    async create(req, res) {
        try {
            const comment = await commentService.create(req.body, req.user.id)
            res.json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const comment = await commentService.getAll();
            return res.json(comment);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getMy(req, res) {
        try {
            const comment = await commentService.getMy(req.user.id);
            return res.json(comment);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const comment = await commentService.getOne(req.params.id)
            return res.json(comment)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedcomment = await commentService.update(req.body);
            return res.json(updatedcomment);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const comment = await commentService.delete(req.params.id);
            return res.json(comment)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new commentController();