import { truncate } from "lodash";

interface TruncateTextProps {
  text: string;
  length: number;
  separator?: RegExp | string;
  omission?: string;
}

export const truncateText = (
  text: string,
  length: number,
  separator?: RegExp | string,
  omission?: string,
): string => {
  return truncate(text, {
    length: length,
    omission: omission ?? "...",
    separator: separator ?? undefined,
  });
};
