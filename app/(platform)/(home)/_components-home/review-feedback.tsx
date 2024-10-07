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
        {/* <Image
          alt="message-moi-moc"
          src="/background-feedback.png"
          fill
          style={{ objectFit: "cover" }}
          className="w-full"
        /> */}

        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[600px]"
          preload="auto"
          style={{ objectFit: "cover" }}
        >
          <source
            src="https://cdn.pixabay.com/video/2022/05/04/115984-706372668_large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 flex items-center justify-center">
          <CardStackFeedbacks items={feedbacks} />
        </div>
      </div>
    </section>
  );
};
