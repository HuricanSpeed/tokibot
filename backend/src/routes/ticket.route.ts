import { Router } from "express";
import { createPanel, getPanel, getPanels } from "../controllers/ticket.controller";

const router = Router();

router.post("/newPanel", createPanel);
router.post("/getPanels", getPanels);
router.post("/getPanel", getPanel);

export default router;