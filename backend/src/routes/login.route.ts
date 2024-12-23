import { Router } from "express";
import { login, logout } from "../controllers/login.controller";

const router = Router();

router.get("/login", login)

router.get("/logout", logout)

export default router;