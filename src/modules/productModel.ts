import pool from "../database/database";
import { ProductT } from "../types/common";

export const getAllProductsService2 = async () => {
  const result = await pool.query(
    `SELECT id, name, price, description, discounted_price as "discountedPrice", image_url as "imageUrl", creator_id as "creatorId" FROM products`
  );

  return result.rows;
};

export const getAllProductsService = async (
  id: number | null = null,
  name: string | null = null
) => {
  let where = "";
  const parrams = [];

  let query = `
    SELECT 
      id, 
      name, 
      price, 
      description, 
      discounted_price AS "discountedPrice", 
      image_url AS "imageUrl", 
      creator_id AS "creatorId" 
    FROM products
  `;

  if (id) {
    where = ` WHERE id = $1`;
    parrams.push(id);
  }

  if (where) {
    where += ` AND name ILIKE $2`;
    parrams.push(`%${name}%`);
  } else if (name) {
    where = ` WHERE name ILIKE $1`;
    parrams.push(`%${name}%`);
  }

  query += where;

  const result = await pool.query(query, parrams);

  return result.rows;
};

export const getProductByIdService = async <T>(
  id: number
): Promise<T | null> => {
  const result = await pool.query(
    `SELECT id, name, price, description, discounted_price as "discountedPrice", image_url as "imageUrl", creator_id as "creatorId" FROM products WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const createProductsService = async ({
  name,
  price,
  discountedPrice,
  description,
  imageUrl,
  creatorId,
}: Omit<ProductT, "id" | "updatedAt" | "createdAt">) => {
  const result = await pool.query(
    "INSERT INTO products (name, price, discounted_price, description, image_url, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, price, discountedPrice, description, imageUrl, creatorId]
  );
  return result.rows[0];
};

export const deleteProductService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const updateProductService = async ({
  id,
  name,
  price,
  discountedPrice,
  description,
  imageUrl,
}: Omit<ProductT, "creatorId" | "updatedAt" | "createdAt">) => {
  const result = await pool.query(
    "UPDATE products SET name=COALESCE($1, name), price=COALESCE($2, price), discounted_price=COALESCE($3, discounted_price), description=COALESCE($4, description), image_url=COALESCE($5, image_url) WHERE id=$6 RETURNING *",
    [name, price, discountedPrice, description, imageUrl, id]
  );
  return result.rows[0];
};
