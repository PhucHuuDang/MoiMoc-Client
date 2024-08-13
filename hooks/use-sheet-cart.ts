import { create } from "zustand";

interface SheetCartProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSheetCart = create<SheetCartProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
