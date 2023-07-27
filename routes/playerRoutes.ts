import { Router } from "express";
import * as playerController from "../controllers/playerController";

const router = Router();

router.get("/", playerController.getAllPlayers);

export default router;
