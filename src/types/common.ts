export type UserT = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDbT = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string | null;
  birth_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type ProductT = {
  id: number;
  name: string;
  price: number;
  discountedPrice: number | null;
  description: string | null;
  imageUrl: string | null;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductDbT = {
  id: number;
  name: string;
  price: number;
  discounted_price: number | null;
  description: string | null;
  image_url: string | null;
  creator_id: number;
  created_at: Date;
  updated_at: Date;
};

export type UserDtoT = Omit<UserT, "password" | "createdAt" | "updatedAt">;
