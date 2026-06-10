import express from "express"
import multer from "multer";
import { getMessages, sendMessage } from "../controllers/messageRouteController.js";
import isLogin from "../middleware/isLogin.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB

router.post('/send/:id', isLogin, upload.single('attachment'), sendMessage)

router.get('/:id', isLogin, getMessages);

export default router