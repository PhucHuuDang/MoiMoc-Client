import { FormPassword } from "@/components/_global-components-reused/form/form-password";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useConfirm } from "@/hooks/use-confirm";
import { useAuthContext } from "@/provider/auth-provider";
import { SecuritySafeTypes } from "@/safe-types-zod/client/settings-profile-safe-types/security.safe-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { isEqual } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface SecurityTabsProps {
  value: string;
}

export const SecurityTabs = ({ value }: SecurityTabsProps) => {
  const auth = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [ConfirmDialog, confirm] = useConfirm(
    "Thay đổi mật khẩu",
    "Bạn có chắc chắn muốn thay đổi mật khẩu?",
  );

  const form = useForm<z.infer<typeof SecuritySafeTypes>>({
    resolver: zodResolver(SecuritySafeTypes),
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof SecuritySafeTypes>) => {
      console.log({ values });

      const { password, newPassword, confirmPassword } = values;

      if (!isEqual(values.newPassword, values.confirmPassword)) {
        toast.info("Mật khẩu mới và mật khẩu xác nhận không khớp");
        return;
      }

      const ok = await confirm();

      if(!ok) {
        toast.info("Hủy thay đổi mật khẩu");
        return
      }

      try {
        const changePassword = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
          {
            currentPassword: password,
            newPassword: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );

        if (changePassword.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["user-activities"] });
          toast.success("Thay đổi mật khẩu thành công");
          form.reset();
          router.refresh();
        }
      } catch (error) {
        console.log({ error });
        toast.error("Lỗi khi thay đổi mật khẩu");
      }
    },
    [auth?.token, form, router], // Dependencies the callback relies on
  );

  return (
    <>
      <ConfirmDialog />
      <TabsContent value={value}>
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormValues form={form} onSubmit={onSubmit}>
              <FormPassword
                form={form}
                name="password"
                placeholder="Nhập mật khẩu hiện tại"
                disabled={false}
                label="Mật khẩu"
              />

              <FormPassword
                form={form}
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                disabled={false}
                label="Mật khẩu"
              />

              <FormPassword
                form={form}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                disabled={false}
                label="Mật khẩu"
              />

              <FormSubmit>Submit</FormSubmit>
            </FormValues>

            {/* <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div> */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="twoFactor"
                // checked={quickSettings.twoFactor}
                // onCheckedChange={() => handleQuickSettingChange("twoFactor")}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
