"use client";
import Image from "next/image";
import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/provider/auth-provider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DiscussionSafeTypes } from "@/safe-types-zod/client/discussion";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import { toast } from "sonner";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { useLoginDiaLogModal } from "@/hooks/login-dialog-modal";
import axios from "axios";

interface DiscussionProps {
  productId: number;
}
export const Discussion = ({ productId }: DiscussionProps) => {
  const auth = useAuthContext();

  const form = useForm<z.infer<typeof DiscussionSafeTypes>>({
    resolver: zodResolver(DiscussionSafeTypes),
  });

  const loginModal = useLoginDiaLogModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (content: z.infer<typeof DiscussionSafeTypes>) => {
    setIsLoading(true);
    if (!auth?.isAuth) {
      toast.error("Bạn cần đăng nhập để bình luận");
      loginModal.onOpen();
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/discussions`,
        {
          content,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (response.status === 201) {
        toast.success("Bình luận thành công");
        form.reset();
      } else {
        toast.error("Bình luận thất bại");
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }

    // console.log({ content, productId });
  };

  return (
    <TabsContent value="discussion" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Tìm hiểu sản phẩm</h3>
          {/* <div className="mt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <Textarea
                      placeholder="Share your thoughts or ask a question..."
                      value={"newComment"}
                      onChange={(e) => {}}
                      className="mb-2"
                    />
                    <Button onClick={() => {}} className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div> */}
          <div className="space-y-6">
            {[
              {
                name: "Kathryn Murphy",
                comment: "This fit is perfect, and the quality is top-notch.",
                time: "1 week ago",
                likes: 12,
                replies: 2,
              },
              {
                name: "Esther Howard",
                comment:
                  "I recently purchased the gray blazer jacket for women, and I couldn't be happier with my purchase!",
                time: "2 weeks ago",
                likes: 8,
                replies: 1,
              },
              {
                name: "Kristin Watson",
                comment:
                  "I highly recommend this blazer to any woman looking for a timeless and chic addition to their wardrobe.",
                time: "2 weeks ago",
                likes: 15,
                replies: 3,
              },
              {
                name: "Dianne Russell",
                comment:
                  "It provides just the right amount of warmth without making me too hot.",
                time: "1 month ago",
                likes: 6,
                replies: 0,
              },
            ].map((comment, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage
                        src={`https://i.pravatar.cc/40?img=${index + 10}`}
                      />
                      <AvatarFallback>
                        {comment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold">{comment.name}</span>
                      <span className="text-sm text-gray-500">
                        {comment.time}
                      </span>
                    </div>
                  </div>
                  <span className="mb-2">{comment.comment}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center mr-4"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Like ({comment.likes})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Reply ({comment.replies})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <FormValues form={form} onSubmit={onSubmit}>
              <FormTextareaControl
                form={form}
                name="content"
                label="Bình luận về sản phẩm"
                placeholder="Chia sẽ những thứ bạn nghĩ về sản phẩm này"
                formDescription="Hãy tự tin chia sẽ những suy nghĩ của bạn về sản phẩm này"
                disabled={isLoading}
              />

              <FormSubmit
                disabled={isLoading}
                variant="moiMoc"
                className="w-40"
              >
                Gửi
              </FormSubmit>
            </FormValues>
            {/* <Button>Post Comment</Button> */}
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full">
            Load More Comments
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
