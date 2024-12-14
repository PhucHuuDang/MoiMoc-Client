export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  productImages: { imageUrl: string }[];
}

export interface OrderDetail {
  id: number;
  totalAmount: number;
  createdAt: string;
  orderProducts: { product: Product; quantity: number }[];
  deliveryMethod: { method: string; price: number; estimatedDays: string };
  paymentMethod: { method: string };
}

export interface PurchaseOrderProps {
  userId: number;
  orderDetailId: number;
  orderDetail: OrderDetail;
}
