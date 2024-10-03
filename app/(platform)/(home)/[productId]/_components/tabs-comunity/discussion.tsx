"use client";
import Image from "next/image";
import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export const Discussion = () => {
  return (
    <TabsContent value="discussion" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Product Discussion</h3>
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
                      <p className="font-semibold">{comment.name}</p>
                      <p className="text-sm text-gray-500">{comment.time}</p>
                    </div>
                  </div>
                  <p className="mb-2">{comment.comment}</p>
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
            <h4 className="text-lg font-semibold mb-2">Join the Discussion</h4>
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              className="mb-2"
            />
            <Button>Post Comment</Button>
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
