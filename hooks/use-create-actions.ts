import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const usePushDataActions = <T extends FieldValues, K = any>(
  actions: (values: T) => Promise<K>,
  form: UseFormReturn<T>,
  resetObjects?: T,
  options?: UseMutationOptions<K, Error, T>,
) => {
  const resetForm = () => {
    if (resetObjects) {
      form.reset({ ...form.getValues(), ...resetObjects });
    } else {
      form.reset();
    }
  };

  const {
    mutate: pushDataAction,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: actions,
    onSuccess: () => {
      toast.success("Thêm phương thức giao hàng thành công");
      resetForm();
    },
    onError: (error, variables, context) => {
      // Default error handling, but allow overriding
      toast.error("Action failed");
      console.error({ error });
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },

    ...options,
  });

  return { pushDataAction, isPending, isSuccess, isError };
};
