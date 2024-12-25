import { Router } from "express";
import { authToken } from "../controllers/tokenController";

const router = Router();

router.post("/", authToken);

export default router;
