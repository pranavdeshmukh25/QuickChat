import express from 'express'
import isLogin from '../middleware/isLogin.js'
import { getCorrentChatters, getUserBySearch, getUser, updateUser } from '../controllers/userHandlerController.js'
const router = express.Router()

router.get('/search',isLogin,getUserBySearch);

router.get('/currentchatters',isLogin,getCorrentChatters);

router.get('/profile',isLogin,getUser);

router.put('/profile/update',isLogin,updateUser);

export default router