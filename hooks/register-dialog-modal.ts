import { OpenDialogModal } from "@/interface/interface";
import { create } from "zustand";

export const useRegisterDiaLogModal = create<OpenDialogModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
