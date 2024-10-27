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

interface ManageImagesModelsProps {
  tabsContent: string;
  data: DataTypes;
}

type ImageModelTypes = {
  imageUrl: string;
  aboutMoiMocId: number;
  id: number;
};

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

  console.log({ imageUrls });

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

      const images = response.data?.map(
        (item: ImageModelTypes) => item.imageUrl,
      );

      console.log({ images });

      return images;
    },
  });

  console.log({ imagesModels });

  const handleAddImagesModels = async () => {
    setIsPending(true);

    // const

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
              <ResizablePanel defaultSize={60}>
                <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

              <ResizablePanel defaultSize={40}>
                {
                  imagesModels?.length > 0 ? (
                    <ParallaxScroll
                      images={imagesModels}
                      className="h-[50rem] 2xl:h-[60rem]"
                      classNameFirstImage="h-[420px] "
                      classNameThirdImage="h-[420px]"
                      classNameSecondImage="h-[420px]"
                    />
                  ) : isError ? (
                    <ImagesNotfound />
                  ) : (
                    <ParallaxScrollSkeleton className="h-[55rem]" />
                  )

                  // <div className="flex items-center justify-center h-full w-full">
                  //   <Card className="w-full max-w-md border-none">
                  //     <CardHeader className="text-center">
                  //       <CardTitle className="text-2xl font-bold">
                  //         No Images Found
                  //       </CardTitle>
                  //     </CardHeader>
                  //     <CardContent className="flex flex-col items-center space-y-4">
                  //       <motion.div
                  //         initial={{ opacity: 0, y: 20 }}
                  //         animate={{ opacity: 1, y: 0 }}
                  //         transition={{ duration: 0.5 }}
                  //         className="flex flex-col items-center space-y-6"
                  //       >
                  //         <div className="relative w-40 h-40">
                  //           <motion.div
                  //             className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
                  //             animate={{ scale: [1, 1.1, 1] }}
                  //             transition={{ repeat: Infinity, duration: 2 }}
                  //           />
                  //           <ImageOff className="absolute inset-0 w-full h-full text-gray-400 p-10" />
                  //         </div>
                  //         <span className="text-center text-gray-600 max-w-md">
                  //           We couldn't find any images matching your criteria.
                  //           Try adjusting your search, uploading new images, or
                  //           check out our suggestions.
                  //         </span>
                  //       </motion.div>
                  //     </CardContent>
                  //     <CardFooter className="flex justify-center space-x-4">
                  //       <Button variant="outline" onClick={() => {}}>
                  //         <RefreshCcw className="w-4 h-4 mr-2" />
                  //         Refresh
                  //       </Button>
                  //       <Button onClick={() => {}}>
                  //         <Upload className="w-4 h-4 mr-2" />
                  //         Upload Images
                  //       </Button>
                  //     </CardFooter>
                  //   </Card>
                  // </div>
                }
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
