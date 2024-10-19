"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/animata/spinner";
import { FormSelectControl } from "@/components/_global-components-reused/form/form-select-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressSafeTypes } from "@/safe-types-zod/admin/address-safe-types";
import { useAuthContext } from "@/provider/auth-provider";
import { useLoginDiaLogModal } from "@/hooks/login-dialog-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type AddressTypes = {
  address: string;
  id: number;
  createdAat: Date;
  updatedAat: Date;
  userId: number;
};

interface AddAddressProps<T extends FieldValues, K> {
  parentForm?: UseFormReturn<T>;
  name: Path<T>;
}
export const AddAddress = <T extends FieldValues, K>({
  parentForm,
  name,
}: AddAddressProps<T, K>) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const client = useQueryClient();
  const auth = useAuthContext();
  const loginModal = useLoginDiaLogModal();

  const {
    isLoading,
    isFetched,
    data: addresses,
    error,
    isError,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/address/user/${auth?.user?.id}`,
        );
        return response;
      } catch (error) {
        console.log({ error });
        toast.error("Lỗi khi lấy dữ liệu địa chỉ");
      }
    },
  });

  const form = useForm<z.infer<typeof AddressSafeTypes>>({
    resolver: zodResolver(AddressSafeTypes),
  });

  const addNewAddress = async (value: z.infer<typeof AddressSafeTypes>) => {
    const { address } = value;
    if (!auth?.user?.id) {
      loginModal.onOpen();
      setIsDialogOpen(false);
      return;
    }

    const data = { address, userId: auth?.user?.id };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/address`,
      data,
    );
    return response.data;
  };

  const {
    mutate: addNewMethod,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: addNewAddress,
    onSuccess: () => {
      toast.success("Thêm địa chỉ nhận hàng thành công");
      form.reset({
        address: "",
      });
      client.invalidateQueries({ queryKey: ["addresses"] });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Thêm địa chỉ nhận hàng thất bại");
      console.error({ error });
    },
    // onSettled: () => {
    //   setIsLoading(false);
    // },
  });

  const onSubmit = (values: z.infer<typeof AddressSafeTypes>) => {
    // setIsLoading(true);
    addNewMethod(values);
  };

  // console.log({ isPending, isSuccess });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full h-8 sm:w-auto"
          variant="moiMoc"
          onClick={() => setIsDialogOpen(true)} // Mở dialog khi click vào button
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới hoặc chọn địa chỉ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs className="w-full">
          <TabsList>
            <TabsTrigger value="add">Thêm mới địa chỉ</TabsTrigger>
            <TabsTrigger value="choose">Thêm mới địa chỉ</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <DialogHeader>
              <DialogTitle>Thêm mới địa chỉ nhận hàng</DialogTitle>
              <DialogDescription>
                Thêm mới địa chỉ nhận hàng để nhận hàng nhanh chóng
              </DialogDescription>
            </DialogHeader>

            <FormValues form={form} onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                <FormItemsControl
                  form={form}
                  name="address"
                  label="Địa chỉ nhận hàng"
                  disabled={isPending}
                  placeholder="Hãy nhập địa chỉ nhận hàng của bạn"
                />
              </div>

              <DialogFooter>
                <DialogClose
                  className="w-32 outline-1 outline rounded-lg"
                  disabled={isPending}
                >
                  {/* <Button variant="outline">Hủy</Button> */}
                  Hủy
                </DialogClose>
                <Button
                  variant="moiMoc"
                  disabled={isPending}
                  onClick={(e) => {
                    form.handleSubmit(onSubmit);
                    e.stopPropagation();
                    // e.preventDefault();
                  }}
                >
                  {isPending ? (
                    <>
                      <Spinner className="size-5" />
                      'Đang xử lý...'
                    </>
                  ) : (
                    "Thêm địa chỉ"
                  )}
                </Button>
              </DialogFooter>
            </FormValues>
          </TabsContent>

          <TabsContent value="choose">
            {addresses?.data.length > 0 ? (
              <Select
                onValueChange={(value) => {
                  const selectedAddress = addresses?.data?.find(
                    (address: AddressTypes) => address.id.toString() === value,
                  );

                  console.log(selectedAddress.address);

                  if (selectedAddress) {
                    parentForm?.setValue(
                      name as Path<T>,
                      selectedAddress.address,
                    ); // Set the address value

                    toast.success("Chọn địa chỉ thành công");
                  }
                  console.log(parentForm?.getValues(name));
                }}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Chọn địa chỉ" />
                </SelectTrigger>
                <SelectContent>
                  {addresses?.data?.map((address: AddressTypes) => (
                    <SelectItem key={address.id} value={address.id.toString()}>
                      {address.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="font-bold mx-auto">
                Có vẻ như bạn chưa có địa chỉ nào
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
