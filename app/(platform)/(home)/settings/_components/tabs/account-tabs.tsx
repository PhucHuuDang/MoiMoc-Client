import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { AccountSafeTypes } from "@/safe-types-zod/client/settings-profile-safe-types/account-safe.types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AccountTabsProps {
  value: string;
}
export const AccountTabs = ({ value }: AccountTabsProps) => {
  const form = useForm<z.infer<typeof AccountSafeTypes>>({
    resolver: zodResolver(AccountSafeTypes),
  });

  const onSubmit = async (values: z.infer<typeof AccountSafeTypes>) => {
    console.log({ values });

    // const submit = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
    //   values,
    // );
  };

  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, []);

  return (
    <>
      <TabsContent value={value}>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </div>
            <div>
              <Button
                variant="moiMoc"
                className="w-36"
                disabled={form.formState.isSubmitting}
                // onClick={() => setIsDialogOpen(true)}
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                {form.formState.isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                {/* Lưu thay đổi */}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormValues form={form} onSubmit={onSubmit}>
              <FormItemsControl
                form={form}
                name="email"
                placeholder="email@gmail.com"
                label="Email"
                type="email"
                disabled={false}
              />

              <FormItemsControl
                form={form}
                name="phone"
                placeholder="1234567890"
                label="Phone"
                disabled={false}
              />
            </FormValues>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="cst">Central Time</SelectItem>
                  <SelectItem value="mst">Mountain Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
