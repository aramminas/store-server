import { Router } from "express";
import { authToken } from "../controllers/tokenController";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken";

const router = Router();

router.post("/", verifyRefreshToken, authToken);

export default router;
