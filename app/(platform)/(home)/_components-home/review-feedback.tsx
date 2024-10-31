"use client";

import { serverFetching } from "@/api/actions/server-fetching";
import {
  CardStackFeedbacks,
  CardStackFeedbacksSkeleton,
} from "@/components/aceternity-ui/card-stack-feedbacks";
import { Discussion } from "@/types/product-detail-types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneAuth: string;
  role: "ADMIN" | "USER"; // Assuming there might be different roles
  avatar: string;
  designation: string | null;
  createdAt: string;
  updatedAt: string;
};

type Discussions = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
  user: User;
};

export const ReviewFeedback = () => {
  const {
    data: discussionData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const discussions = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discussion`,
      );
      return discussions.json();
    },
  });

  // console.log({ discussionData });

  const discussionsTransformed =
    discussionData &&
    discussionData?.map((discussion: Discussions) => {
      // console.log(discussion);

      return {
        id: discussion.id,
        name: discussion.user.name,
        designation: discussion.user.designation ?? null,
        content: <>{discussion.content}</>,
      };
    });

  // console.log({ discussionsTransformed });
  return (
    <section className="w-full h-[600px] 2xl:h-[800px]">
      <div className="relative w-full aspect-[2/1] h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[600px] 2xl:h-[800px]"
          preload="none"
          style={{ objectFit: "fill" }}
        >
          <source
            src="https://cdn.pixabay.com/video/2022/05/04/115984-706372668_large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 flex items-center justify-center">
          {!isLoading && discussionsTransformed?.length !== 0 ? (
            <CardStackFeedbacks items={discussionsTransformed ?? []} />
          ) : (
            <CardStackFeedbacksSkeleton />
          )}
        </div>
      </div>
    </section>
  );
};
