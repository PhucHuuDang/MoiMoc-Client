"use client";

import Spinner from "@/components/animata/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export const useConfirm = (
  title: string,
  message: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const wait = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const refOutside = useRef<HTMLDivElement>(null);

  const confirm = () => {
    wait(700);
    return new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
    setLoading(false); //
  };

  const handleConfirm = async () => {
    setLoading(true); // Set loading when confirmed
    await wait(200);
    promise?.resolve(true);
    setLoading(false); // Set loading when confirmed
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  useClickAway(refOutside, handleClose);

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise != null}>
        <DialogContent ref={refOutside}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-28"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="moiMoc"
              onClick={handleConfirm}
              className="w-28"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="size-4" />
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmDialog, confirm];
};
