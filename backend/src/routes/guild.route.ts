import { Router } from "express";
import { getGuild, getGuildCategories, getGuilds } from "../controllers/guild.controller";
import loginMiddleware from "../middleware/login.middleware";

const router = Router();

router.get('/getGuilds', loginMiddleware, getGuilds)
router.post('/getGuild', loginMiddleware, getGuild)
router.post('/getGuildCategories', loginMiddleware, getGuildCategories)

export default router;