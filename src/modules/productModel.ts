import escapeHTML from "escape-html";
import prisma from "../../prisma";

import { ProductT } from "../types/common";

export const getAllProductsService = async (
  id: number | null = null,
  name: string | null = null
) => {
  const limit = 100;
  const offset = 0;

  const result = await prisma.products.findMany({
    take: limit,
    skip: offset,
    where: {
      creatorId: id || undefined,
      name: {
        contains: name || undefined,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProducts = await prisma.products.count();

  return { total: totalProducts, products: result };
};

export const getProductByIdService = async <T>(id: number) => {
  const result = await prisma.products.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

export const createProductsService = async ({
  name,
  price,
  discountedPrice,
  description,
  imageUrl,
  creatorId,
}: Omit<ProductT, "id" | "updatedAt" | "createdAt">) => {
  const descriptionEscape = escapeHTML(description || "") || null;

  const result = await prisma.products.create({
    data: {
      name,
      price: +price,
      discountedPrice: discountedPrice ? +discountedPrice : undefined,
      description: description ? descriptionEscape : undefined,
      imageUrl,
      creatorId: +creatorId,
    },
  });

  return result;
};

export const updateProductService = async ({
  id,
  name,
  price,
  discountedPrice,
  description,
  imageUrl,
}: Omit<ProductT, "creatorId" | "updatedAt" | "createdAt">) => {
  const descriptionEscape = escapeHTML(description || "") || null;

  const result = await prisma.products.update({
    where: { id },
    data: {
      name: name || undefined,
      price: price ? +price : undefined,
      discountedPrice: discountedPrice ? +discountedPrice : undefined,
      description: description ? descriptionEscape : undefined,
      imageUrl: imageUrl || undefined,
    },
  });

  return result;
};

export const getAllOwnerProductsImagesService = async (id: number) => {
  const result = await prisma.products.findMany({
    where: {
      creatorId: id,
    },
    select: {
      imageUrl: true,
    },
  });

  return result;
};

export const deleteProductService = async (id: number) => {
  const result = await prisma.products.delete({
    where: {
      id,
    },
  });

  return result;
};
