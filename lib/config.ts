export const config = {
  name: "Môi Mộc",
  description:
    "Sản phẩm của Môi Mộc đều được làm từ nguyên liệu thiên nhiên mang đến cho bạn cảm giác nhẹ nhàng khi sử dụng sản phẩm, hoà quyện cùng với mùi hương tự nhiên, giúp bạn thư giãn trong quá trình làm việc và sau ngày dài mệt mỏi",

  icon: "/apple-touch-icon.png",

  openGraph: {
    type: "website",
    url: "https://www.moimoc.shop",
    title: "Môi Mộc",
    description:
      "Sản phẩm của Môi Mộc đều được làm từ nguyên liệu thiên nhiên mang đến cho bạn cảm giác nhẹ nhàng khi sử dụng sản phẩm, hoà quyện cùng với mùi hương tự nhiên, giúp bạn thư giãn trong quá trình làm việc và sau ngày dài mệt mỏi",

    images: {
      url: "/apple-touch-icon.png",
      width: 1200,
      height: 630,
      alt: "Môi Mộc - Sản phẩm thiên nhiên",
    },

    local: "vi_VN",
    siteName: "MoiMoc",
  },
  twitter: {
    card: "summary_large_image", // Hiển thị dạng card lớn
    site: "@moimoc", // Twitter handle của trang
    title: "Môi Mộc",
    description:
      "Sản phẩm của Môi Mộc đều được làm từ nguyên liệu thiên nhiên mang đến cho bạn cảm giác nhẹ nhàng khi sử dụng sản phẩm, hoà quyện cùng với mùi hương tự nhiên, giúp bạn thư giãn trong quá trình làm việc và sau ngày dài mệt mỏi",
    images: ["/og-image.jpg"], // Hình ảnh khi chia sẻ trên Twitter
  },
  alternates: {
    canonical: "https://www.moimoc.shop", // URL chính
    languages: {
      vi: "https://www.moimoc.shop/vi",
      en: "https://www.moimoc.shop/en", // Nếu hỗ trợ đa ngôn ngữ
    },
  },

  robots: {
    index: true,
    follow: true,
  },
  metadataBase: process.env.NODE_ENV === "production" ? new URL("https://www.moimoc.shop") : new URL("http://localhost:3000"),
};
