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
import { Discussion as DiscussionTypes } from "@/types/product-detail-types";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";

interface DiscussionProps {
  productId: number;
  discussions: DiscussionTypes[];
}
export const Discussion = ({ productId, discussions }: DiscussionProps) => {
  const auth = useAuthContext();

  const form = useForm<z.infer<typeof DiscussionSafeTypes>>({
    resolver: zodResolver(DiscussionSafeTypes),
  });

  const loginModal = useLoginDiaLogModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof DiscussionSafeTypes>) => {
    setIsLoading(true);
    if (!auth?.isAuth) {
      toast.error("Bạn cần đăng nhập để bình luận");
      loginModal.onOpen();
      setIsLoading(false);
      return;
    }

    const { content } = values;

    console.log({ values, productId });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/discussion`,
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

      console.log({ response });

      if (response.status === 201) {
        toast.success("Bình luận thành công");
        form.setValue("content", "");
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
            {discussions.map((discussion, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage
                        src={
                          discussion.user.avatar ??
                          "/about-moi-moc-images/avatar-placeholder.gif"
                        }
                      />
                      <AvatarFallback>
                        {discussion.user.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-x-2">
                      <span className="font-semibold">
                        {discussion.user.username}
                      </span>
                      <span className="text-sm text-gray-500">
                        {vietnameseDate(discussion.createdAt as Date)}
                      </span>
                    </div>
                  </div>
                  <span className="mb-2">{discussion.discussionContent}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center mr-4"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Like (2)
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Reply (2)
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
