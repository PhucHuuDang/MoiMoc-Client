"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Save,
  Upload,
  X,
  Moon,
  Sun,
  Edit2,
} from "lucide-react";
// import { toast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutMoiMocSafeTypes } from "@/safe-types-zod/admin/about-moi-moc-safe-types";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";

export function ManageAboutMoiMocClient({
  initialImages = [],
  initialContent = {},
}) {
  const [images, setImages] = useState(initialImages);
  const [content, setContent] = useState(initialContent);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = useCallback(() => {
    if (newImageUrl) {
      // setImages(prev => [...prev, { url: newImageUrl, alt: '' }])
      setNewImageUrl("");
      // toast({
      //   title: "Image added",
      //   description: "The new image has been added to the list.",
      // })
    }
  }, [newImageUrl]);

  const handleDeleteImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    // toast({
    //   title: "Image deleted",
    //   description: "The image has been removed from the list.",
    //   variant: "destructive",
    // })
  }, []);

  const handleContentChange = useCallback((section: string, value: string) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  }, []);

  const simulateImageUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }, []);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        simulateImageUpload();
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            setTimeout(() => {
              // setImages(prev => [...prev, { url: result, alt: file.name }])
              // toast({
              //   title: "Image uploaded",
              //   description: "The image has been successfully uploaded.",
              // })
            }, 5000); // Simulate network delay
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [simulateImageUpload],
  );

  const handleSaveChanges = useCallback(() => {
    // Here you would typically send the updated data to your backend
    console.log("Saving changes:", { images, content });
    // Implement API call to save changes
    // toast({
    //   title: "Changes saved",
    //   description: "Your changes have been successfully saved.",
    // })
    form.handleSubmit(onSubmit)();
  }, [images, content]);

  const form = useForm<z.infer<typeof AboutMoiMocSafeTypes>>({
    resolver: zodResolver(AboutMoiMocSafeTypes),
  });

  const onSubmit = async (values: z.infer<typeof AboutMoiMocSafeTypes>) => {
    console.log({ values });
  };

  return (
    <div className={"min-h-screen w-full }"}>
      <div className="w-full p-4 space-y-8 transition-colors duration-200">
        <header className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Manage About Moi Moc
            </h1>
            <span className="text-muted-foreground mt-2">
              Manage your website content and images
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={handleDarkModeToggle}
                    id="dark-mode"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>Toggle Dark Mode</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
            {/* <Label htmlFor="dark-mode" className="cursor-pointer">
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Label> */}
          </div>
        </header>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images" className="text-primary">
              Manage Images
            </TabsTrigger>
            <TabsTrigger value="content" className="text-primary">
              Edit Content
            </TabsTrigger>
          </TabsList>

          <FormValues form={form} onSubmit={onSubmit}>
            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Image Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4 space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter image URL"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleAddImage}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="moiMoc">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
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
                    </Dialog>
                  </div>
                  <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src=""
                            alt="123"
                            className="w-full h-40 object-cover rounded-md transition-all duration-300
                              group-hover:opacity-75"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                                  duration-300"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Image Actions
                              </DropdownMenuLabel>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* {["story", "vision", "mission", "imageUrls"].map(
                      (section) => (
                        // <div key={section} className="space-y-2">
                        //   <Label
                        //     htmlFor={section}
                        //     className="text-lg font-semibold capitalize"
                        //   >
                        //     {section}
                        //   </Label>
                        //   <Textarea
                        //     id={section}
                        //     // value={content[section] || ""}
                        //     onChange={(e) =>
                        //       handleContentChange(section, e.target.value)
                        //     }
                        //     rows={6}
                        //     placeholder={`Enter ${section} content here...`}
                        //     className="w-full resize-none"
                        //   />
                        // </div>
                        // <FormTextareaControl form={form} name={section} />
                        <div>123</div>
                      ),
                    )} */}
                    <FormTextareaControl
                      form={form}
                      name="story"
                      label="Story"
                      placeholder="Enter story content here..."
                    />

                    <FormTextareaControl
                      form={form}
                      name="vision"
                      label="Vision"
                      placeholder="Enter vision content here..."
                    />

                    <FormTextareaControl
                      form={form}
                      name="mission"
                      label="Mission"
                      placeholder="Enter mission content here..."
                    />

                    {/* <FormSubmit className="bg-red-500">Save changes</FormSubmit> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </FormValues>
        </Tabs>

        <div
          className="flex justify-end"
          // onClick={() => form.handleSubmit(onSubmit)()}
        >
          <Button onClick={handleSaveChanges} size="lg">
            <Save className="mr-2 h-5 w-5" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
