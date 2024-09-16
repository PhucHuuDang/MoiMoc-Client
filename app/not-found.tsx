import { Footer } from "@/components/_global-components-reused/footer";
import { Navbar } from "@/components/_global-components-reused/navbar";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-2 h-[70vh] 2xl:h-[60vh] w-full">
        <Image
          src="/404_image.webp"
          height={500}
          width={500}
          className="object-cover mb-4"
          alt="404-not-found"
        />

        <h1 className="text-moi_moc_green text-3xl font-bold">
          Why are you here?
        </h1>
        <h2 className="text-moi_moc_green text-xl font-semibold">
          You are not supposed to here.
        </h2>

        <Link
          className="text-slate-900 border border-[#416837] hover:outline-offset-2 p-1
            hover:border-[#448236] flex items-center justify-center gap-x-1 bg-white
            font-bold hover:text-moi_moc_green hover:scale-105 rounded-lg py-2 px-6 mt-2
            duration-200"
          href="/"
        >
          Go Home <Undo2 className="size-8" />
        </Link>
      </div>
      <Footer />
    </>
  );
}
