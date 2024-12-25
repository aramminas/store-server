import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { uploadFile } from "../utils/uploadFile";
import { validateCreateProduct } from "../middlewares/inputValidator";

import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();
const prodectRouter = Router();
prodectRouter.use(authenticateToken);

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
// Protected routes
prodectRouter.post(
  "/",
  uploadFile("image", "products/"),
  validateCreateProduct,
  createProduct
);
prodectRouter.patch(
  "/:id",
  uploadFile("image", "products/"),
  validateCreateProduct,
  updateProduct
);
prodectRouter.delete("/:id", deleteProduct);

export default [router, prodectRouter];
