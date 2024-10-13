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

export type UserType = {
  id: number;
  name: string;
  email: string;
  phoneAuth: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
