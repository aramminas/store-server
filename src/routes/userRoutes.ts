import { Router } from "express";
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
  getUserProducts,
} from "../controllers/userController";
import {
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
} from "../middlewares/inputValidator";
import { loginLimiter } from "../configs/limiter";
import { uploadFile } from "../utils/uploadFile";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();
const prodectRouter = Router();
prodectRouter.use(authenticateToken);

// Public routes
router.post("/login", validateLoginUser, loginLimiter, loginUser);
router.post(
  "/",
  uploadFile("avatar", "users/"),
  validateCreateUser,
  createUser
);
// Protected routes
prodectRouter.get("/", getAllUsers);
prodectRouter.get("/logout", logoutUser);
prodectRouter.get("/:id", getUserById);
prodectRouter.patch(
  "/:id",
  uploadFile("avatar", "users/"),
  validateUpdateUser,
  updateUser
);
prodectRouter.delete("/:id", deleteUser);
prodectRouter.get("/:id/products", getUserProducts);

export default [router, prodectRouter];
