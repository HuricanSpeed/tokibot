import { Router } from "express";
import { createPanel, deletePanel, getPanel, getPanels, updatePanel } from "../controllers/ticket.controller";

const router = Router();

router.post("/newPanel", createPanel);
router.post("/getPanels", getPanels);
router.post("/getPanel", getPanel);
router.post("/updatePanel", updatePanel);
router.post("/deletePanel", deletePanel);

export default router;