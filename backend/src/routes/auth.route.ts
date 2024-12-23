import { Router } from "express";
import { isLogged } from "../controllers/auth.controller";

const router = Router()

router.get('/auth/isLogged', isLogged)

export default router