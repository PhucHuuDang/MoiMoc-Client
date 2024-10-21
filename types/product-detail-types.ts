export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  avatar: string | null;
  designation?: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  content: string;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Discussion {
  id: number;
  discussionContent: string;
  createdAt: Date;
  updatedAt: Date;
  user: Omit<User, "createdAt">;
}

export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
}

export interface ProductDetailTypes {
  productId: number;
  productName: string;
  description: string;
  details: string;
  usage: string;
  price: string;
  discountPrice: string;
  discountPercentage: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  productImages: ProductImage[];
  comments: Comment[];
  discussion: Discussion[]; // Assuming this will hold discussion data, if any
  ingredients: Ingredient[];
}

export type ProductInfoPick = Pick<
  ProductDetailTypes,
  | "productId"
  | "productName"
  | "description"
  | "details"
  | "usage"
  | "price"
  | "discountPrice"
  | "discountPercentage"
  | "quantity"
  | "productImages"
  | "ingredients"
>;
