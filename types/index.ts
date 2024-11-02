export type ProductProps = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  productName: string;
  discountPercent?: number;
  productDescription: string;
  imageUrl: string;
  quantityOrder?: number;
};

export type ImageModelTypes = {
  imageUrl: string;
  aboutMoiMocId: number;
  id: number;
};


interface ProductCategory {
  id: number;
  type: string;
}

interface Ingredient {
  ingredientId: number;
  ingredientName: string;
}

interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
}

 export interface ProductEditTypes {
  productId: number;
  productName: string;
  productDescription?: string;
  details?: string;
  usage?: string;
  expireDate?: string;
  price: string;
  discountPrice?: string | null;
  discountPercentage?: number | null;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  productType: ProductCategory;
  ingredients: Ingredient[];
  productImages: ProductImage[];
}