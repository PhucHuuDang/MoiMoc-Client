"use client";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, List, Home, Check } from "lucide-react";
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

  const watchAddress = parentForm?.watch(name);

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

  useEffect(() => {
    if (addresses?.data.length === 1) {
      const singleAddress = addresses.data[0];
      parentForm?.setValue(name as Path<T>, singleAddress.address);
      toast.success("Đã chọn địa chỉ.");
    }
  }, [addresses, parentForm, name]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full h-8 sm:w-auto"
          variant="moiMoc"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới hoặc chọn địa chỉ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Quản lý địa chỉ</DialogTitle>
          <DialogDescription>
            Thêm mới hoặc chọn địa chỉ nhận hàng
          </DialogDescription>
        </DialogHeader>

        <Tabs className="w-full" defaultValue="add">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger className="flex items-center gap-2" value="add">
              <Plus className="w-4 h-4" />
              <span>Thêm mới</span>
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="choose">
              <List className="w-4 h-4" />
              <span>Chọn địa chỉ</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add" className="min-h-[200px]">
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
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
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

          <TabsContent
            value="choose"
            className="min-h-[240px] max-h-[400px] overflow-y-auto"
          >
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-3 py-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 border rounded-xl"
                  >
                    <Skeleton className="w-5 h-5 rounded-full mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : addresses?.data.length === 1 ? (
              // Single address card
              <div className="py-4">
                <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-moi_moc_green bg-moi_moc_green/5">
                  <MapPin className="w-5 h-5 text-moi_moc_green mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {addresses.data[0].address}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-moi_moc_green text-white rounded-full">
                        Mặc định
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Địa chỉ này sẽ được sử dụng tự động
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-moi_moc_green flex-shrink-0" />
                </div>
              </div>
            ) : addresses?.data.length > 0 ? (
              // Radio card list for multiple addresses
              <div className="py-4">
                <RadioGroup
                  value={addresses?.data
                    ?.find(
                      (a: AddressTypes) =>
                        a.address === (watchAddress as unknown as string),
                    )
                    ?.id.toString()}
                  onValueChange={(value) => {
                    const selectedAddress = addresses?.data?.find(
                      (address: AddressTypes) =>
                        address.id.toString() === value,
                    );

                    if (selectedAddress) {
                      parentForm?.setValue(
                        name as Path<T>,
                        selectedAddress.address,
                      );
                      toast.success("Đã chọn địa chỉ");
                    }
                  }}
                  className="space-y-3"
                >
                  {addresses?.data?.map((address: AddressTypes) => {
                    const isSelected =
                      addresses?.data?.find(
                        (a: AddressTypes) =>
                          a.address === (watchAddress as unknown as string),
                      )?.id === address.id;

                    return (
                      <div key={address.id}>
                        <Label
                          htmlFor={`address-${address.id}`}
                          className={cn(
                            "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            "hover:border-moi_moc_green/50 hover:bg-moi_moc_green/5",
                            isSelected
                              ? "border-moi_moc_green bg-moi_moc_green/10"
                              : "border-gray-200 bg-white",
                          )}
                        >
                          <RadioGroupItem
                            value={address.id.toString()}
                            id={`address-${address.id}`}
                            className="mt-0.5 text-moi_moc_green"
                          />
                          <div className="flex-1">
                            <MapPin
                              className={cn(
                                "w-4 h-4 inline mr-2",
                                isSelected
                                  ? "text-moi_moc_green"
                                  : "text-gray-500",
                              )}
                            />
                            <span
                              className={cn(
                                "font-medium",
                                isSelected ? "text-moi_moc_green" : "",
                              )}
                            >
                              {address.address}
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-moi_moc_green" />
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            ) : (
              // Empty state
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Chưa có địa chỉ nào
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Hãy thêm địa chỉ đầu tiên để bắt đầu
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const tabTrigger = document.querySelector(
                      '[value="add"]',
                    ) as HTMLElement;
                    tabTrigger?.click();
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm địa chỉ
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
