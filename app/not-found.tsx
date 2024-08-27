import { Footer } from "@/components/_global-components-reused/footer";
import { Navbar } from "@/components/_global-components-reused/navbar";
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

        <h1 className="text-slate-200 text-3xl font-bold">Why are you here?</h1>
        <h2 className="text-slate-500 text-xl font-semibold">
          You are not supposed to here.
        </h2>

        <Link
          className="text-slate-500 bg-white font-bold hover:text-slate-700 hover:scale-105
            rounded-md py-2 px-6 mt-2 duration-200"
          href="/"
        >
          Go Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
