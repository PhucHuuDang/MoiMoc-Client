import { LoaderCircle } from "lucide-react";

const LoadingMapsPage = () => {
  return (
    <div
      className="absolute bg-neutral-500/10 h-full w-full inset-0 [mask-size:40px] flex
        items-center justify-center"
    >
      <div className="flex items-center gap-1">
        <LoaderCircle size={20} className="animate-spin text-slate-200" />
        <span className="text-slate-300">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingMapsPage;
