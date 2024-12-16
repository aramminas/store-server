import { NextFunction, Request, Response } from "express";
import {
  getAllProductsService,
  createProductsService,
  getProductByIdService,
  deleteProductService,
  updateProductService,
} from "../modules/productModel";
import { removeFile } from "../utils";
import { ProductT } from "../types/common";
import { handleResponse } from "../utils/controller";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ovnerId = req.query.ovnerId ? +req.query.ovnerId : null;
  const query = req.query.q ? String(req.query.q) : null;

  try {
    const products: ProductT[] = await getAllProductsService(ovnerId, query);
    return handleResponse<ProductT[]>(
      res,
      200,
      "Products fetched successfully",
      products
    );
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getProductByIdService(+req.params.id);
    if (!product) return handleResponse(res, 404, "Product not found");
    return handleResponse(res, 200, "Product fetched successfully", product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, discountedPrice, description, creatorId } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = req.file.path.replace("public/", "");
  }

  try {
    const products: ProductT = await createProductsService({
      name,
      price,
      discountedPrice,
      description,
      imageUrl,
      creatorId,
    });

    return handleResponse<ProductT>(
      res,
      201,
      "Products created successfully",
      products
    );
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, name, price, discountedPrice, description } = req.body;

  let imageUrl = null;
  if (req.file) {
    imageUrl = req.file.path.replace("public/", "");
  }

  const productId = Number(req.params.id);
  const userId = Number(req.query.userId);

  try {
    const product: ProductT | null = await getProductByIdService<ProductT>(
      productId
    );
    if (!product) return handleResponse(res, 404, "Product not found");

    if (product?.creatorId !== userId) {
      return handleResponse(res, 400, "You don't have permission", {});
    }

    // remove old product image
    if (imageUrl) {
      if (product?.imageUrl) {
        removeFile(product.imageUrl);
      }
    }

    const updatedProduct = await updateProductService({
      id: productId,
      name,
      price,
      discountedPrice,
      description,
      imageUrl,
    });

    console.log("updatedProduct :>> ", updatedProduct, {
      id,
      name,
      price,
      discountedPrice,
      description,
      imageUrl,
    });

    return handleResponse(
      res,
      200,
      "Product updated successfully",
      updatedProduct
    );
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId ? +req.query.userId : null;
  const productId = +req.params.id;
  try {
    const product = await getProductByIdService<ProductT>(productId);
    if (!product) return handleResponse(res, 404, "Product not found");

    if (product.creatorId === userId) {
      // remove product image
      if (product.imageUrl) {
        removeFile(product.imageUrl);
      }
      const response = await deleteProductService(productId);
      if (response) {
        return handleResponse(
          res,
          200,
          "Product deleted successfully",
          response
        );
      }
    }

    return handleResponse(res, 400, "Failed to remove product", {});
  } catch (err) {
    next(err);
  }
};
