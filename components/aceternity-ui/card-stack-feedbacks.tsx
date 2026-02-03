"use client";
import { JSX, useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { motion } from "@/lib/motion";

import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  createdAt: Date;
  rating: number;
  content: React.ReactNode;
};

export const CardStackFeedbacks = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}): JSX.Element => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card: Card, index: number): JSX.Element => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-gradient-to-br from-lime-700 via-green-800 to-teal-800
              h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200
              dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex
              flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="space-y-4">
              <div className="font-semibold text-slate-200 dark:text-neutral-200 leading-snug line-clamp-3">
                {card.content}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                  <span className="font-semibold text-base text-slate-100">
                    Đã đánh giá:
                  </span>
                  <Rating
                    fillColorArray={[
                      "#f14f45",
                      "#f16c45",
                      "#f18845",
                      "#f1b345",
                      "#f1d045",
                    ]}
                    allowHover={false}
                    transition
                    readonly
                    initialValue={card.rating}
                    emptyStyle={{ display: "flex" }}
                    SVGstyle={{
                      display: "inline-block",
                      marginBottom: 8,
                      // height: "40px",
                    }}
                    // disableFillHover={isLoad}
                    // id="rating"
                    // name={name}
                    tooltipStyle={{
                      backgroundColor: "#338eb8",
                      width: "150px",
                      marginTop: -3,
                      marginLeft: 4,
                    }}
                    size={20}
                  />
                </div>
                <span className="text-slate-100 text-sm font-semibold">
                  Vào {vietnameseDate(new Date(card.createdAt))}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-x-0.5">
                <User className="size-5 text-slate-100 font-bold" />
                <p className="text-slate-100 font-bold dark:text-white">
                  {card.name}
                </p>
              </div>

              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export function CardStackFeedbacksSkeleton(): JSX.Element {
  return (
    <div className="h-60 w-60 md:h-60 md:w-96 p-4 bg-white rounded-3xl shadow-lg">
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-8 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
