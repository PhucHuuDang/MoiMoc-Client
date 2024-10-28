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
