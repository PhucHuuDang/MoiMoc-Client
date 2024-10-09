"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export const RatingReviews = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Emily Johnson",
      rating: 5,
      comment:
        "This blazer is absolutely stunning! The fit is perfect, and the quality is top-notch. I've received so many compliments wearing it to work and events.",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      comment:
        "Great jacket overall. The material is high-quality and it looks very professional. The only reason I'm not giving 5 stars is that it runs slightly large.",
    },
    {
      id: 3,
      name: "Sarah Thompson",
      rating: 5,
      comment:
        "I'm in love with this blazer! It's versatile enough to wear to the office or dress up for a night out. The attention to detail in the stitching and buttons is impressive.",
    },
    {
      id: 4,
      name: "David Lee",
      rating: 3,
      comment:
        "The blazer is decent, but I found the shoulders a bit too tight for my liking. The style is nice, but the fit could be better.",
    },
    {
      id: 5,
      name: "Jessica Brown",
      rating: 5,
      comment:
        "Absolutely love this blazer! The fabric feels luxurious, and it fits perfectly. It elevates any outfit, whether for work or casual wear.",
    },
  ];
  return (
    <TabsContent value="ratings" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold">4.9</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on 128 reviews</p>
            </div>

            <div className="w-2/3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <span className="text-sm w-3 mr-2">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <Progress
                    value={rating === 5 ? 80 : rating === 4 ? 15 : 5}
                    className="h-2 w-full"
                  />
                  <span className="text-sm ml-2">
                    {rating === 5 ? "80%" : rating === 4 ? "15%" : "5%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {feedbacks.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage
                        src={`https://i.pravatar.cc/40?img=${index}`}
                      />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Rating stars */}
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4
                            ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Write a Review</h4>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400"
                />
              ))}
            </div>
            <Textarea
              placeholder="Share your thoughts about the product..."
              className="mb-2"
            />
            <Button>Submit Review</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
