import { create } from "zustand";
import { OpenDialogModal } from "@/interface/interface";

export const useIngredientModal = create<OpenDialogModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
