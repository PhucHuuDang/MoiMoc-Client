import { CardStackFeedbacks } from "@/components/aceternity-ui/card-stack-feedbacks";
import Image from "next/image";

export const ReviewFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Alice Johnson",
      designation: "Software Engineer",
      content: (
        <>
          This platform has transformed the way I manage my projects. The user
          interface is intuitive, and the customer service is top-notch.
        </>
      ),
    },
    {
      id: 2,
      name: "John Doe",
      designation: "Project Manager",
      content: (
        <>
          I appreciate the real-time collaboration features. It has
          significantly improved our team's productivity and communication.
        </>
      ),
    },
    {
      id: 3,
      name: "Emily Smith",
      designation: "UI/UX Designer",
      content: (
        <>
          The design tools are incredibly powerful. As a designer, I find the
          flexibility and customizability of the platform very useful.
        </>
      ),
    },
    {
      id: 4,
      name: "Michael Brown",
      designation: "Data Analyst",
      content: (
        <>
          I love how easy it is to integrate data from various sources. The
          analytics dashboard is a game-changer for my workflow.
        </>
      ),
    },
    {
      id: 5,
      name: "Jessica Lee",
      designation: "Marketing Specialist",
      content: (
        <>
          The marketing automation features have helped streamline our
          campaigns. The results speak for themselves with increased engagement.
        </>
      ),
    },
  ];

  return (
    <section className="w-full h-[600px] 2xl:h-[800px]">
      <div className="relative w-full aspect-[2/1] h-full">
        <Image
          alt="message-moi-moc"
          src="/background-feedback.png"
          fill
          style={{ objectFit: "cover" }}
          className="w-full"
        />

        {/* <div
          className="text-moi_moc_green font-semibold absolute inset-0 flex items-center
            justify-center max-w-3xl mx-auto px-4 text-center flex-col gap-4"
        >
          <blockquote className="text-xl md:text-2xl text-green-800 mb-4">
            "Chúng tôi mong muốn mang đến sản phẩm son hoàn toàn từ nguồn gốc tự
            nhiên và hoàn toàn từ thiên nhiên Việt Nam như quả gấc, dầu dừa, dầu
            oliu, sáp ong, hoa hồng... Điều đường nhiệt thấp là kỹ thuật chúng
            tôi áp dụng để bảo toàn dưỡng chất từ các loại quả, hạt, tinh dầu và
            bơ thực vật, giúp duy trì độ ẩm, phòng tránh khô, nứt, lành mạnh."
          </blockquote>
        </div> */}

        <div className="absolute inset-0 flex items-center justify-center">
          <CardStackFeedbacks items={feedbacks} />
        </div>
      </div>
    </section>
  );
};