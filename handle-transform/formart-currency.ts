export const formatCurrency = (price: number) => {
  if (!price) {
    return null;
  }
  return price.toLocaleString("vi-VN", {
    currency: "VND",
    style: "currency",
  });
};
