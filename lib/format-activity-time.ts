import { formatDistanceToNow, parseISO } from "date-fns";

export const formatActivityTime = (date: string): string => {
  return formatDistanceToNow(new Date(parseISO(date)), { addSuffix: true });
};
