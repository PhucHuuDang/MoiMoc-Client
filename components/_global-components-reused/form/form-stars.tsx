import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

interface FormStarsProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  onSubmit?: (data: T) => void;
  label?: string;
}

export const FormStars = <T extends FieldValues, K>({
  form,
  name,
  placeholder,
  onSubmit,
  label,
}: FormStarsProps<T, K>) => {
  const tooltipTexts = [
    "Rất tệ", // 1 star
    "Tệ", // 2 stars
    "Bình thường", // 3 stars
    "Tốt", // 4 stars
    "Rất tốt", // 5 stars
  ];

  // const [stars, setStars] = React.useState(0);
  // const handleRating = (value: number) => {
  //   setStars(value);
  // };

  // console.log({ stars });

  const ratingValue = form.watch(name);
  console.log({ ratingValue });

  useEffect(() => {
    if (ratingValue) {
      form.setValue(name, ratingValue);
    }
  }, [ratingValue]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        // field.
        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <FormControl className="flex flex-row items-center gap-x-1">
              <Rating
                fillColorArray={[
                  "#f14f45",
                  "#f16c45",
                  "#f18845",
                  "#f1b345",
                  "#f1d045",
                ]}
                allowFraction={false}
                onClick={field.onChange}
                showTooltip
                transition
                tooltipArray={tooltipTexts}
                emptyStyle={{ display: "flex" }}
                SVGstyle={{
                  display: "inline-block",
                  marginBottom: 10,
                  // height: "40px",
                  // size
                }}
                // disableFillHover={pending}
                // id="rating"
                // name={name}
                tooltipDefaultText="Chọn đánh giá"
                tooltipStyle={{
                  backgroundColor: "#338eb8",
                  width: "150px",
                  marginTop: -3,
                  marginLeft: 4,
                }}
                size={25}
              />
            </FormControl>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
