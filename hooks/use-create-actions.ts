import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useCreateActions = <T extends FieldValues, K = any>(
  actions: (values: T) => Promise<K>,
  form: UseFormReturn<T>,
  resetObjects?: T,
  options?: UseMutationOptions<K, Error, T>,
) => {
  // const reset = form.reset({
  //   method: "",
  //   price: 0,
  //   estimatedDays: "",
  // });

  const reset = form.reset(resetObjects);

  const {
    mutate: createAction,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: actions,
    onSuccess: () => {
      toast.success("Thêm phương thức giao hàng thành công");
      reset;
    },
    onError: (error) => {
      toast.error("Action failed");
      console.error({ error });
      // if (options?.onError) {
      //   options.onError(error);
      // }
    },
    onSettled: () => {},

    ...options,
  });

  return { createAction, isPending, isSuccess, isError };
};
