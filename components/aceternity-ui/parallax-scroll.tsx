"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Edit2, Edit3, LucideEdit2, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "@/hooks/use-confirm";
import { ImageModelTypes } from "@/types";
import { ImageCoordinator } from "../_global-components-reused/image-cordinator";
import { ActionsControl } from "../_global-components-reused/actions-control";
import { ConfirmModal } from "../_global-components-reused/confirm-modal";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const ParallaxScroll = ({
  images,
  className,
  classNameFirstImage,
  classNameSecondImage,
  classNameThirdImage,
  admin,
}: {
  // images: string[];
  images: ImageModelTypes[];
  classNameFirstImage?: string;
  classNameSecondImage?: string;
  classNameThirdImage?: string;
  admin?: boolean;

  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this image?",
    "If you delete this image, it will be gone forever. This action cannot be undone.",
  );

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // delete

  const onDelete = async (imageModelId: number) => {
    setIsPending(true);

    const ok = await confirm();

    try {
      if (ok) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/images-models/${imageModelId}`,
        );
        console.log(response.status);
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["about-moi-moc"] });
          queryClient.invalidateQueries({ queryKey: ["images-models"] });
          toast.success("The image has been deleted successfully.");
          return;
        }
      }
      toast.error("Cannot delete image");
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred while deleting the image.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "h-[40rem] items-start overflow-y-auto w-full",
          className,
        )}
        ref={gridRef}
      >
        <ImageCoordinator>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto
              gap-10 py-40 px-10"
            ref={gridRef}
          >
            <div className="grid gap-10">
              {firstPart.map((el, idx) => (
                <motion.div
                  style={{ y: translateFirst }} // Apply the translateY motion value here
                  key={"grid-1" + idx}
                  className="relative"
                >
                  <Image
                    src={el.imageUrl}
                    className={cn(
                      "h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0",
                      classNameFirstImage,
                    )}
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                  {admin && (
                    <div className="absolute top-2 right-2">
                      <ActionsControl>
                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          // onClick={() => onReplace(el.id)}
                        >
                          <Edit2 className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer" />
                          Replace image
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          onClick={() => onDelete(el.id)}
                        >
                          <Trash2
                            // onClick={() => console.log("clicked delete image")}
                            className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer"
                          />
                          Delete image
                        </DropdownMenuItem>
                      </ActionsControl>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid gap-10">
              {secondPart.map((el, idx) => (
                <motion.div
                  style={{ y: translateSecond }}
                  key={"grid-2" + idx}
                  className="relative"
                >
                  <Image
                    src={el.imageUrl}
                    className={cn(
                      "h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0",
                      classNameSecondImage,
                    )}
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                  {admin && (
                    <div className="absolute top-2 right-2">
                      <ActionsControl>
                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          // onClick={() => onReplace(el.id)}
                        >
                          <Edit2 className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer" />
                          Replace image
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          onClick={() => onDelete(el.id)}
                        >
                          <Trash2
                            // onClick={() => console.log("clicked delete image")}
                            className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer"
                          />
                          Delete image
                        </DropdownMenuItem>
                      </ActionsControl>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid gap-10">
              {thirdPart.map((el, idx) => (
                <motion.div
                  style={{ y: translateThird }}
                  key={"grid-3" + idx}
                  className="relative"
                >
                  <Image
                    src={el.imageUrl}
                    className={cn(
                      "h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0",
                      classNameThirdImage,
                    )}
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />

                  {admin && (
                    // <div className="absolute top-2 right-2">
                    //   <ActionsControl>
                    //     <ConfirmModal
                    //       isPending={isPending}
                    //       action={() => onDelete(el.id)}
                    //       title="Are you sure you want to delete this image?"
                    //       description="If you delete this image, it will be gone forever. This action cannot be undone."
                    //       trigger={
                    //         <DropdownMenuItem>
                    //           <Trash2
                    //             className="right-2 size-5 p-0.5 mr-1 bg-red-500 rounded-md hover:bg-green-100 transition
                    //               duration-300 cursor-pointer"
                    //           />
                    //           Delete image
                    //         </DropdownMenuItem>
                    //       }
                    //     />
                    //   </ActionsControl>
                    // </div>
                    <div className="absolute top-2 right-2">
                      <ActionsControl>
                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          // onClick={() => onReplace(el.id)}
                        >
                          <Edit2 className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer" />
                          Replace image
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer hover:scale-105 transition duration-300"
                          onClick={() => onDelete(el.id)}
                        >
                          <Trash2
                            // onClick={() => console.log("clicked delete image")}
                            className="size-5 p-0.5 mr-1 rounded-md transition duration-300 cursor-pointer"
                          />
                          Delete image
                        </DropdownMenuItem>
                      </ActionsControl>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </ImageCoordinator>
      </div>
    </>
  );
};

export function ParallaxScrollSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto
          gap-10 py-40 px-10"
      >
        <div className="grid gap-10">
          {[...Array(3)].map((_, idx) => (
            <Skeleton
              key={`skeleton-1-${idx}`}
              className="h-80 w-full rounded-lg"
            />
          ))}
        </div>
        <div className="grid gap-10">
          {[...Array(3)].map((_, idx) => (
            <Skeleton
              key={`skeleton-2-${idx}`}
              className="h-80 w-full rounded-lg"
            />
          ))}
        </div>
        <div className="grid gap-10">
          {[...Array(3)].map((_, idx) => (
            <Skeleton
              key={`skeleton-3-${idx}`}
              className="h-80 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
