import { Router } from "express";

import { banUser, getBans, unbanUser } from "../controllers/ban.controller";

import loginMiddleware from "../middleware/login.middleware";

const router = Router();

router.get('/getBans', loginMiddleware, getBans)
router.post('/banUser', loginMiddleware, banUser)
router.post('/unbanUser', loginMiddleware, unbanUser)

export default router;