export const purchaseOrderData = {
  userId: 54,
  orderDetailId: 6,
  orderDetail: {
    id: 6,
    paymentMethodId: 1,
    deliveryMethodId: 1,
    totalAmount: 350000,
    discountCode: null,
    createdAt: "2024-12-09T10:29:47.029999",
    updatedAt: "2024-12-09T10:29:47.029999",
    orderProducts: [
      {
        orderDetailId: 6,
        productId: 28,
        quantity: 1,
        product: {
          id: 28,
          productName: "Velvet lush | Son môi chiết xuất gấc",
          productDescription:
            "Trái gấc, biểu tượng của sức khỏe và sự thịnh vượng trong văn hóa Việt Nam, không chỉ là nguồn dinh dưỡng tuyệt vời mà còn là thần dược cho làn da và đôi môi. Son môi gấc lấy cảm hứng từ sắc cam rực rỡ của gấc, mang đến vẻ đẹp tươi mới và căng mọng cho đôi môi, giúp bạn tự tin tỏa sáng mỗi ngày.",
          price: 140000,
          discountPrice: null,
          discountPercentage: null,
          quantity: 20,
          usage:
            "Thoa nhẹ lên môi mỗi ngày để duy trì độ ẩm và màu sắc tươi sáng.",
          expireDate: "12",
          details: "Dưỡng ẩm và làm đẹp môi với sắc cam tự nhiên, rạng rỡ.",
          productTypeId: 1,
          createdAt: "2024-10-31T06:26:27.490444",
          updatedAt: "2024-10-31T06:26:27.490444",
          productImages: [
            {
              id: 83,
              imageUrl:
                "https://res.cloudinary.com/dkumclikk/image/upload/v1730355969/nzdkrdahjcpw0stc34jr.jpg",
              productId: 28,
            },
          ],
        },
      },
      {
        orderDetailId: 6,
        productId: 29,
        quantity: 1,
        product: {
          id: 29,
          productName: "Rosy glow | Son môi chiết xuất hoa hồng",
          productDescription:
            "Cánh hoa hồng mềm mại và tinh tế luôn là biểu tượng của sự quyến rũ và nữ tính. Lấy cảm hứng từ những cánh hoa hồng rực rỡ nhất, son môi hoa hồng mang lại sắc hồng dịu dàng và thuần khiết cho đôi môi. Đôi môi bạn sẽ trở nên rạng rỡ, tươi tắn như một đóa hoa hồng trong sương sớm, vừa mềm mại, vừa đầy sức sống.",
          price: 160000,
          discountPrice: null,
          discountPercentage: null,
          quantity: 20,
          usage: "Sử dụng hàng ngày để đôi môi luôn tươi tắn và mịn màng.",
          expireDate: "12",
          details:
            "Mang lại màu hồng tự nhiên từ hoa hồng, dưỡng ẩm và bảo vệ môi khỏi khô nứt.",
          productTypeId: 1,
          createdAt: "2024-10-31T06:28:16.524069",
          updatedAt: "2024-10-31T06:28:16.524069",
          productImages: [
            {
              id: 87,
              imageUrl:
                "https://res.cloudinary.com/dkumclikk/image/upload/v1730356049/qtvvi8xhlmyb9yc3i2ix.jpg",
              productId: 29,
            },
          ],
        },
      },
    ],
    deliveryMethod: {
      id: 1,
      method: "Express",
      price: 50000,
      active: true,
      estimatedDays: "1-2",
      ordersLastMonth: null,
      revenue: null,
    },
    paymentMethod: {
      id: 1,
      method: "Stripe",
      price: null,
      fee: "0",
      type: "credit",
      transaction: null,
      status: true,
    },
  },
};
