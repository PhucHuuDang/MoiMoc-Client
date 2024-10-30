"use client ";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Edit2,
  ImageOff,
  PlusCircle,
  RefreshCcw,
  Settings2,
  Trash2,
  Upload,
} from "lucide-react";
import { ImageUploadAboutMoiMoc } from "../image-upload-about-moi-moc";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import { DataTypes } from "../manage-moi-moc-client";
import Spinner from "@/components/animata/spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ParallaxScroll,
  ParallaxScrollSkeleton,
} from "@/components/aceternity-ui/parallax-scroll";
import { serverFetching } from "@/api/actions/server-fetching";
import { ImagesNotfound } from "./images-notfound";
import { ImageModelTypes } from "@/types";

interface ManageImagesModelsProps {
  tabsContent: string;
  data: DataTypes;
}

export const ManageImagesModels = ({
  tabsContent,
  data,
}: ManageImagesModelsProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [addDirectlyUrl, setAddDirectlyUrl] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const [ConfirmDialog, confirm] = useConfirm(
    "Add Image(s)",
    "Do you want to add the image(s)?",
  );

  const handleDeleteImage = (index: number) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleImageUpload = (url: string) => {
    setImageUrls((prevUrls) => [...prevUrls, url]);
  };

  const handleAddImage = () => {
    setImageUrls((prevUrls) => [...prevUrls, addDirectlyUrl]);
  };

  const {
    data: imagesModels,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["images-models"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/images-models`,
      );

      // const images = response.data?.map(
      //   (item: ImageModelTypes) => item.imageUrl,
      // );

      // console.log({ images });

      if (response.status !== 200 && !response.data) {
        return [];
      }

      return response.data as ImageModelTypes[];
    },
  });

  const handleAddImagesModels = async () => {
    setIsPending(true);

    const ok = await confirm();

    const valuesImages = imageUrls.map((image) => ({
      aboutMoiMocId: data.id,
      imageUrl: image,
    }));

    try {
      if (ok) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/images-models`,
          valuesImages,
        );
        if (response.status === 201) {
          queryClient.invalidateQueries({ queryKey: ["about-moi-moc"] });
          queryClient.invalidateQueries({ queryKey: ["images-models"] });
          setImageUrls([]);
          toast.success("Image(s) added successfully");
          return;
        }
      }

      return toast.info("Image(s) not added");
    } catch (error) {
      console.log({ error });
      toast.error("Have something wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <TabsContent value={tabsContent}>
        <Card>
          <CardHeader>
            <CardTitle>Image Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4 space-x-2">
              <Input
                type="text"
                placeholder="Enter image URL"
                value={addDirectlyUrl}
                onChange={(e) => setAddDirectlyUrl(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleAddImage}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Image
              </Button>

              <ImageUploadAboutMoiMoc handleImageUpload={handleImageUpload} />
              {/* <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="moiMoc">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>

                        <ImageUploadAboutMoiMoc />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Image</DialogTitle>
                          <DialogDescription>
                            Choose an image file to upload.
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <Progress value={uploadProgress} className="w-full" />
                        )}
                      </DialogContent>
                    </Dialog> */}
            </div>

            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full"
            >
              <ResizablePanel defaultSize={60} className="w-full">
                {/* h-[calc(100vh-300px)] */}
                <ScrollArea className="w-full h-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageUrls?.map((img, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={img}
                          alt={`Model ${index}`}
                          height={420}
                          width={500}
                          className="w-full h-[420px] object-cover object-left-top rounded-lg gap-10 !m-0 !p-0
                            transition-all duration-300 group-hover:opacity-75"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                                duration-300"
                            >
                              <Settings2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Image Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteImage(index)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="mr-2 h-4 w-4" />
                              Replace
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit Alt Text
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={40} className="w-full">
                {imagesModels && imagesModels.length > 0 ? (
                  <ParallaxScroll
                    images={imagesModels}
                    className="h-[50rem] 2xl:h-[60rem]"
                    classNameFirstImage="h-[420px] "
                    classNameThirdImage="h-[420px]"
                    classNameSecondImage="h-[420px]"
                    admin
                  />
                ) : isError ? (
                  <ImagesNotfound />
                ) : (
                  <ParallaxScrollSkeleton className="h-[55rem]" />
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </CardContent>
        </Card>

        <Button
          variant="moiMoc"
          onClick={handleAddImagesModels}
          disabled={isPending}
        >
          {isPending && <Spinner className="size-6" />}Save all changes
        </Button>
      </TabsContent>
    </>
  );
};
