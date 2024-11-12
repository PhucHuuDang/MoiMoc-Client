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
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedBacksSafeTypes } from "@/safe-types-zod/client/feedback";
import { FormStars } from "@/components/_global-components-reused/form/form-stars";
import axios from "axios";
import { useAuthContext } from "@/provider/auth-provider";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clientGetData } from "@/api/actions/get-data-api";
import { FeedbackReturnTypes } from "@/types/product-detail-types";
import { Rating } from "react-simple-star-rating";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";
import Spinner from "@/components/animata/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatActivityTime } from "@/lib/format-activity-time";

interface RatingReviewsProps {
  productId: number;
}

export type FeedbackTypes = {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
    designation: string;
    phoneAuth: boolean;
  };
};
export const RatingReviews = ({ productId }: RatingReviewsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FeedBacksSafeTypes>>({
    resolver: zodResolver(FeedBacksSafeTypes),
  });
  const queryClient = useQueryClient();

  const {
    data: feedbacksData,
    error,
    isError,
  } = useQuery({
    queryKey: ["feedbacks", productId],
    queryFn: async () => clientGetData("/feedback"),
  });

  const auth = useAuthContext();

  console.log({ feedbacksData });

  const filterFeedbacks = feedbacksData
    ?.filter((item: FeedbackReturnTypes) => item.productId === productId)
    ?.map((feedback: FeedbackReturnTypes) => {
      return {
        id: feedback.id,
        content: feedback.content,
        rating: feedback.rating,
        createdAt: feedback.createdAt,
        user: {
          name: feedback.user?.name,
          avatar: feedback.user.avatar,
          designation: feedback.user.designation,
          phoneAuth: feedback.user.phoneAuth,
        },
      };
    });

  console.log({ filterFeedbacks });

  const onSubmit = async (values: z.infer<typeof FeedBacksSafeTypes>) => {
    console.log({ values });

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback`,
        {
          ...values,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (response.status === 201) {
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        form.reset({
          rating: 0,
          content: "",
        });

        queryClient.invalidateQueries({ queryKey: ["feedbacks", productId] });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const EmptyFeedback = () => {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-10 h-10 text-muted-foreground" />
          ))}
        </div>
        <h2 className="text-3xl font-semibold mb-4">Chưa có đánh giá nào</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Hãy là người đầu tiên đánh giá sản phẩm này!
        </p>
      </div>
    );
  };

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
            <ScrollArea className="h-96">
              {filterFeedbacks?.length > 0 ? (
                filterFeedbacks?.map((review: FeedbackTypes, index: number) => (
                  <Card key={index} className="my-2 mx-4">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex gap-1">
                          <Avatar className="size-14 mr-3">
                            <AvatarImage
                              src={
                                "/about-moi-moc-images/avatar-placeholder.gif"
                              }
                            />
                            <AvatarFallback>
                              {review.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-y-1">
                            <p className="font-semibold">{review.user.name}</p>
                            <span className="text-sm font-semibold text-slate-800">
                              {formatActivityTime(review.createdAt)}
                            </span>
                            <Rating
                              fillColorArray={[
                                "#f14f45",
                                "#f16c45",
                                "#f18845",
                                "#f1b345",
                                "#f1d045",
                              ]}
                              // allowFraction={false}
                              // showTooltip
                              allowHover={false}
                              transition
                              disableFillHover
                              initialValue={review.rating}
                              emptyStyle={{ display: "flex" }}
                              SVGstyle={{
                                display: "inline-block",
                                marginBottom: 10,
                                // height: "40px",
                                // size
                              }}
                              // disableFillHover={pending}
                              // id="rating"
                              // name={name}
                              tooltipStyle={{
                                backgroundColor: "#338eb8",
                                width: "150px",
                                marginTop: -3,
                                marginLeft: 4,
                              }}
                              size={25}
                            />
                          </div>
                        </div>
                      </div>

                      <p>{review.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <EmptyFeedback />
              )}
            </ScrollArea>
          </div>
          <div className="mt-6">
            <FormValues form={form} onSubmit={onSubmit}>
              <FormStars form={form} name="rating" label="Đánh giá của bạn" />

              <FormTextareaControl
                form={form}
                name="content"
                label="Nhận xét của bạn"
                placeholder="Chia sẽ nhận xét của bạn về sản phẩm này"
                formDescription="Hãy tự tin chia sẽ nhận xét của bạn về sản phẩm này"
                disabled={isLoading}
              />

              <FormSubmit
                disabled={isLoading}
                variant="moiMoc"
                className="w-40"
              >
                {isLoading ? (
                  <div className="flex gap-x-1">
                    <Spinner className="size-5" />
                    <span>Đang gửi</span>
                  </div>
                ) : (
                  "Gửi"
                )}
              </FormSubmit>
            </FormValues>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
