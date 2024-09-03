import { Logo } from "@/components/_global-components-reused/logo";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="absolute inset-0 flex h-full w-full items-center justify-center
        bg-moi_moc_green/30"
    >
      <div className="flex flex-col items-center justify-center gap-y-1">
        <Logo height={100} width={300} />

        <div className="flex items-center gap-x-1 justify-center">
          <LoaderCircle className="size-6 animate-spin" />
          <span className="text-lg font-bold">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
