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
import { TabsContent } from "@/components/ui/tabs";
import { Check, Edit2, X } from "lucide-react";
import { useState } from "react";

interface PersonalTabsProps {
  value: string;
}

export const PersonalTabs = ({ value }: PersonalTabsProps) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Đặng",
    lastName: "Hữu Phúc",
    bio: "A passionate developer",
    location: "HCMC, Vietnam",
    website: "https://phuchuudang.github.io/Portfolio-website/#services",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    location: false,
    website: false,
  });

  const validateField = (field: keyof typeof personalInfo, value: string) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return value.length > 0 && value.length <= 50;
      case "bio":
        return value.length <= 500;
      case "website":
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          value,
        );
      default:
        return true;
    }
  };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(personalInfo).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                {isEditing[key as keyof typeof isEditing] ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="flex-grow"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handlePersonalInfoChange(
                          key as keyof typeof personalInfo,
                          value,
                        )
                      }
                      disabled={
                        !validateField(key as keyof typeof personalInfo, value)
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          [key]: false,
                        }))
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>{value}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setIsEditing((prev) => ({ ...prev, [key]: true }))
                      }
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
