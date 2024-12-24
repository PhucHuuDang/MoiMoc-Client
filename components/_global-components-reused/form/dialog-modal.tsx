"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from "../header";

interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
}

export const DialogModal = ({
  isOpen,
  onClose,
  body,
  footer,
  header,
  title,
}: DialogModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {header}
        {body}
        <DialogFooter className="mx-auto">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
