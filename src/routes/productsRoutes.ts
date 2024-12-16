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

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  uploadFile("image", "products/"),
  validateCreateProduct,
  createProduct
);
router.patch(
  "/:id",
  uploadFile("image", "products/"),
  validateCreateProduct,
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
