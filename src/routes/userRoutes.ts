import { Router } from "express";
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import {
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
} from "../middlewares/inputValidator";
import { uploadFile } from "../utils/uploadFile.js";

const router = Router();

router.post(
  "/",
  uploadFile("avatar", "users/"),
  validateCreateUser,
  createUser
);
router.post("/login", validateLoginUser, loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch(
  "/:id",
  uploadFile("avatar", "users/"),
  validateUpdateUser,
  updateUser
);

export default router;
