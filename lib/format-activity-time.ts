import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";
import { vi, enUS } from "date-fns/locale";

export const formatActivityTime = (date: string): string => {
  return formatDistanceToNow(new Date(parseISO(date)), {
    addSuffix: true,
    locale: vi,
    includeSeconds: true,
  });
};
