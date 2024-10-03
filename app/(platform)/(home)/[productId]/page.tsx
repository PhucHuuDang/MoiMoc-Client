import Image from "next/image";
import { Star, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  console.log({ productId });

  return (
    // <>
    //   <div className="min-h-screen bg-[#f9f7f3] text-[#1e3932]">
    //     <nav className="text-sm mb-4">
    //       <a href="#" className="hover:underline">
    //         Sản phẩm
    //       </a>{" "}
    //       &gt; Tẩy tế bào chết môi mật ong
    //     </nav>
    //     <main className="max-w-6xl mx-auto px-4 pt-20">
    //       <div className="flex flex-col md:flex-row gap-8">
    //         {/* Product Info */}
    //         <div className="md:w-1/2">
    //           <h1 className="text-3xl font-semibold mb-2">
    //             Tẩy tế bào chết môi mật ong
    //           </h1>
    //           <p className="text-xl mb-4">120.000 đ</p>
    //           <p className="mb-4">
    //             Sản phẩm tẩy tế bào chết môi mật ong giúp loại bỏ lớp tế bào
    //             chết trên da môi, giúp làm mềm và mịn môi. Sản phẩm chứa các
    //             thành phần tự nhiên như mật ong, dầu dừa, đường nâu, giúp nuôi
    //             dưỡng và bảo vệ môi.
    //           </p>
    //           <h2 className="font-semibold mb-2">Thành phần</h2>
    //           <p className="mb-4">
    //             Mật ong rừng, sáp ong, dầu dừa, đường nâu, dầu vitamin E, chiết
    //             xuất cúc la mã
    //           </p>
    //           <button className="bg-[#1e3932] text-white px-6 py-2 rounded">
    //             Thêm vào giỏ hàng
    //           </button>
    //         </div>

    //         {/* Product Image */}
    //         <div className="md:w-1/2">
    //           <Image
    //             src="/images/alchemistry.png"
    //             alt="Tẩy tế bào chết môi mật ong"
    //             width={400}
    //             height={400}
    //             className="w-full rounded-xl h-[600px]"
    //           />
    //         </div>
    //       </div>

    //       {/* Product Details */}
    //       <div className="mt-12 grid md:grid-cols-2 gap-8">
    //         <div>
    //           <h2 className="text-xl font-semibold mb-4">Chi tiết sản phẩm</h2>
    //           <p>
    //             Được chiết xuất từ mật ong rừng tự nhiên, sản phẩm giúp loại bỏ
    //             tế bào chết trên môi một cách nhẹ nhàng mà vẫn giữ được độ ẩm tự
    //             nhiên. Mật ong chứa các enzym giúp làm sạch sâu và nuôi dưỡng
    //             môi, giúp môi luôn mềm mại và căng mọng.
    //           </p>
    //         </div>
    //         <div>
    //           <h2 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h2>
    //           <p>
    //             Lấy một lượng nhỏ sản phẩm, thoa đều lên môi và massage nhẹ
    //             nhàng trong 1-2 phút. Rửa sạch lại với nước. Sử dụng 2-3 lần mỗi
    //             tuần để có kết quả tốt nhất.
    //           </p>
    //         </div>
    //       </div>

    //       {/* Reviews */}
    //       <div className="mt-12">
    //         <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>
    //         <div className="flex items-center mb-4">
    //           <div className="text-4xl font-bold mr-4">4.0</div>
    //           <div>
    //             <div className="flex">
    //               {[1, 2, 3, 4].map((star) => (
    //                 <Star
    //                   key={star}
    //                   className="text-yellow-400 fill-yellow-400"
    //                 />
    //               ))}
    //               <Star className="text-yellow-400" />
    //             </div>
    //             <p>21 đánh giá</p>
    //           </div>
    //         </div>
    //         {/* Sample Review */}
    //         <div className="border-t border-[#e0e0e0] py-4">
    //           <div className="flex items-center mb-2">
    //             <Image
    //               src="/avatar.jpeg"
    //               alt="Reviewer"
    //               width={40}
    //               height={40}
    //               className="rounded-full mr-2"
    //             />
    //             <div>
    //               <p className="font-semibold">Huỳnh Thu</p>
    //               <div className="flex">
    //                 {[1, 2, 3, 4].map((star) => (
    //                   <Star
    //                     key={star}
    //                     size={16}
    //                     className="text-yellow-400 fill-yellow-400"
    //                   />
    //                 ))}
    //                 <Star size={16} className="text-yellow-400" />
    //               </div>
    //             </div>
    //           </div>
    //           <p>
    //             Sản phẩm rất hiệu quả và dễ sử dụng. Môi trở nên mềm mại, tẩy tế
    //             bào chết môi mật ong giúp làm sạch sâu, loại bỏ da chết và tái
    //             tạo làn da môi. Sử dụng đều đặn sẽ giúp môi luôn mềm mại, hồng
    //             hào.
    //           </p>
    //         </div>
    //       </div>

    //       {/* Related Products */}
    //       <div className="mt-12">
    //         <h2 className="text-xl font-semibold mb-4">Sản phẩm tương tự</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //           {[1, 2, 3].map((product) => (
    //             <div key={product} className="bg-white p-4 rounded-lg shadow">
    //               <Image
    //                 src="/placeholder.svg?height=200&width=200"
    //                 alt="Related Product"
    //                 width={200}
    //                 height={200}
    //                 className="w-full mb-4"
    //               />
    //               <h3 className="font-semibold mb-2">Son dưỡng ẩm dầu dừa</h3>
    //               <p className="mb-2">
    //                 Thành phần: Dầu dừa nguyên chất, sáp ong, mật ong rừng,
    //                 vitamin E
    //               </p>
    //               <div className="flex justify-between items-center">
    //                 <span>70.000 đ</span>
    //                 <button className="bg-[#1e3932] text-white p-2 rounded">
    //                   +
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </main>

    //     {/* Footer */}
    //     <Footer />
    //   </div>
    // </>

    <DetailPage />
  );
}
