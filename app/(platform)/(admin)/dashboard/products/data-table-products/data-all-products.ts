type AllProductsTable = {
  id: number;
  image: string;
  name: string;
  status: "Draft" | "Processing" | "Publish" | "Active" | "Failed";
  quantity: number;
  price: number;
  discountPercent?: number;
  discountPrice?: number;
  totalSales: number;
  createdAt: string;
};
export const dataAllProducts: AllProductsTable[] = [
  {
    id: 1,
    image: "/images/demo-product-3.png",
    name: "Product 1",
    status: "Draft",
    quantity: 100,
    price: 29.99,
    discountPercent: 10,
    discountPrice: 26.99,
    totalSales: 250,
    createdAt: "2023-01-15T12:00:00Z",
  },
  {
    id: 2,
    image: "/images/demo-product-3.png",
    name: "Product 2",
    status: "Processing",
    quantity: 200,
    price: 49.99,
    totalSales: 150,
    createdAt: "2023-02-20T08:30:00Z",
  },
  {
    id: 3,
    image: "/images/demo-product-3.png",
    name: "Product 3",
    status: "Publish",
    quantity: 50,
    price: 19.99,
    discountPercent: 15,
    discountPrice: 16.99,
    totalSales: 300,
    createdAt: "2023-03-10T14:45:00Z",
  },
  {
    id: 4,
    image: "/images/demo-product-3.png",
    name: "Product 4",
    status: "Active",
    quantity: 75,
    price: 39.99,
    totalSales: 400,
    createdAt: "2023-04-05T11:00:00Z",
  },
  {
    id: 5,
    image: "/images/demo-product-3.png",
    name: "Product 5",
    status: "Failed",
    quantity: 0,
    price: 24.99,
    totalSales: 0,
    createdAt: "2023-05-12T09:15:00Z",
  },
  {
    id: 6,
    image: "/images/demo-product-3.png",
    name: "Product 6",
    status: "Draft",
    quantity: 150,
    price: 15.99,
    discountPercent: 5,
    discountPrice: 14.99,
    totalSales: 120,
    createdAt: "2023-06-01T13:00:00Z",
  },
  {
    id: 7,
    image: "/images/demo-product-3.png",
    name: "Product 7",
    status: "Processing",
    quantity: 30,
    price: 89.99,
    totalSales: 80,
    createdAt: "2023-06-25T16:30:00Z",
  },
  {
    id: 8,
    image: "/images/demo-product-3.png",
    name: "Product 8",
    status: "Publish",
    quantity: 60,
    price: 29.99,
    discountPercent: 20,
    discountPrice: 23.99,
    totalSales: 220,
    createdAt: "2023-07-15T10:00:00Z",
  },
  {
    id: 9,
    image: "/images/demo-product-3.png",
    name: "Product 9",
    status: "Active",
    quantity: 100,
    price: 35.99,
    totalSales: 500,
    createdAt: "2023-08-05T12:00:00Z",
  },
  {
    id: 10,
    image: "/images/demo-product-3.png",
    name: "Product 10",
    status: "Failed",
    quantity: 0,
    price: 12.99,
    totalSales: 0,
    createdAt: "2023-08-30T15:00:00Z",
  },
  {
    id: 11,
    image: "/images/demo-product-3.png",
    name: "Product 11",
    status: "Draft",
    quantity: 45,
    price: 40.0,
    discountPercent: 10,
    discountPrice: 36.0,
    totalSales: 50,
    createdAt: "2023-09-05T09:30:00Z",
  },
  {
    id: 12,
    image: "/images/demo-product-3.png",
    name: "Product 12",
    status: "Processing",
    quantity: 80,
    price: 55.99,
    totalSales: 30,
    createdAt: "2023-09-15T11:15:00Z",
  },
  {
    id: 13,
    image: "/images/demo-product-3.png",
    name: "Product 13",
    status: "Publish",
    quantity: 25,
    price: 19.99,
    discountPercent: 25,
    discountPrice: 14.99,
    totalSales: 90,
    createdAt: "2023-09-20T14:00:00Z",
  },
  {
    id: 14,
    image: "/images/demo-product-3.png",
    name: "Product 14",
    status: "Active",
    quantity: 120,
    price: 22.5,
    totalSales: 300,
    createdAt: "2023-09-25T13:30:00Z",
  },
  {
    id: 15,
    image: "/images/demo-product-3.png",
    name: "Product 15",
    status: "Failed",
    quantity: 0,
    price: 33.99,
    totalSales: 0,
    createdAt: "2023-10-01T17:00:00Z",
  },
];
