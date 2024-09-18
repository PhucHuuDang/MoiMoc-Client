import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseImagesProductStoreProps {
  images: string[];
  setImages: (images: string[]) => void;
  addImage: (image: string) => void;
  removeImage: (index: number) => void;
  clearImages: () => void;
}

export const useImagesProductStore = create(
  persist<UseImagesProductStoreProps>(
    (set, get) => ({
      images: [],
      setImages: (images) => set({ images }),
      addImage: (image) =>
        set((state) => ({ images: [...state.images, image] })),
      removeImage: (index) =>
        set((state) => ({
          images: state.images.filter((_, i) => i !== index),
        })),
      clearImages: () => set({ images: [] }),
    }),
    {
      name: "images-product-store",
      version: 1,
    },
  ),
);
