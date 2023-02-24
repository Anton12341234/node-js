import { Router } from "express"
import controller from './authController.js'
import { check } from "express-validator"
const router = new Router()
import authMiddleware from'./middlewaree/authMiddleware.js'
import PostController from "./PostController.js";
import ImageController from "./ImageController.js";
import commentController from "./commentController.js";
import MessageController from "./MessageController.js";

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users',authMiddleware, controller.getUsers)
router.get('/users/:id',authMiddleware, controller.getOne)
router.put('/users',authMiddleware, controller.update)

router.post('/posts',authMiddleware, PostController.create)
router.post('/all_Posts',authMiddleware, PostController.getAll)
router.post('/all_Search',authMiddleware, PostController.getAllSearch)
router.post('/all_Search/count',authMiddleware, PostController.getAllSearchCount)
router.get('/posts/count',authMiddleware, PostController.getCount)
router.get('/my_posts',authMiddleware, PostController.getMy)
router.get('/posts/:id',authMiddleware, PostController.getOne)
router.put('/posts',authMiddleware, PostController.update)
router.delete('/posts/:id',authMiddleware, PostController.delete)

router.post('/Image', ImageController.create)
router.get('/Image', ImageController.getAll)
router.get('/Image/:id', ImageController.getOne)
router.put('/Image', ImageController.update)
router.delete('/Image/:id', ImageController.delete)

router.post('/comment', authMiddleware,commentController.create)
router.get('/comment', authMiddleware,commentController.getAll)
router.get('/comment/:id', authMiddleware,commentController.getOne)
router.put('/comment',authMiddleware, commentController.update)
router.delete('/comment/:id',authMiddleware, commentController.delete)

router.post('/message', authMiddleware,MessageController.create)
router.post('/message_get', authMiddleware,MessageController.getAll)
router.get('/message_Rooms', authMiddleware,MessageController.getRooms)
router.get('/message/:id', authMiddleware,MessageController.getOne)
router.put('/message',authMiddleware, MessageController.update)
router.delete('/message/:id',authMiddleware, MessageController.delete)


export default router;