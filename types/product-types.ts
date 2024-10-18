type ProductImage = {
  id: number;
  imageUrl: string;
  productId: number;
};

type ProductType = {
  id: number;
  type: string;
};

export type ProductReturnedTypes = {
  productId: number;
  id: number;
  productName: string;
  productDescription: string;
  price: string; // You can convert this to `number` if price is numeric
  discountPrice: string; // You can convert this to `number` if needed
  discountPercentage: string; // You can convert this to `number` if needed
  quantity: string; // You can convert this to `number` if needed
  usage: string;
  expireDate: string;
  details: string;
  productTypeId: number;
  createdAt: string;
  updatedAt: string;
  productImages: ProductImage[];
  productType: ProductType;
  comments: any[]; // Adjust this type if comments are more specific
  custom: Record<string, any>; // Adjust based on the structure of the `custom` object if needed
};

export type ProductTransformedTypes = {
  id: number;
  productName: string;
  image: string;
  price: string; // Use `number` if price should be a number
  discountPercentage: string; // Use `number` if needed
  discountPrice: string; // Use `number` if needed
  quantity: string; // Use `number` if needed
  createdAt: string;
  productType: string;
};

export type ProductItemData = {
  productId: number;
  id: number;
  productName: string;
  productDescription: string;
  price: string;
  discountPrice: string;
  discountPercentage: string;
  quantity: string;
  mainImage: string;
  quantityOrder?: number;
};

export type IngredientsTypes = {
  id: number;
  ingredient: string;
  createdAt: Date;
  updatedAt: Date;
};
