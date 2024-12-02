import express from "express";
import { signIn, signUp, refreshToken } from "../controller/userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/refresh-token", refreshToken);

export default router;
