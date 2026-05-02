import express from "express"
import { userLogOut, userLogin, userRegister } from "../routControlers/userroutControler.js";

const router = express.Router();

router.post('/register',userRegister);

export default router