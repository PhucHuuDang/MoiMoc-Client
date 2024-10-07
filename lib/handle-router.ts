import { removeMarks } from "@/handle-transform/remove-marks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleRouter = (
  title: string,
  id: number,
  router: AppRouterInstance,
) => {
  const titleTransformed = removeMarks(title);

  const params = {
    titleTransformed,
    id,
  };

  router.push(`/${params.titleTransformed}/${params.id}`);
};
