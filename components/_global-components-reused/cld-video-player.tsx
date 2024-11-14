"use client"
import { CldVideoPlayer, CldVideoPlayerProps } from "next-cloudinary";
// import "next-cloudinary/dist/cld-video-player.css";

export default function VideoPlayer(options: {
  src: string;
  width: string | number;
  height: string | number;
  variant?: "primary" | "background";
  className?: string;
}) {
  const { src, width, height, variant = "primary", className = "" } = options;

  // See https://cloudinary.com/glossary/video-autoplay
  let specialOptions: Partial<CldVideoPlayerProps> = {};
  if (variant === "background") {
    specialOptions = {
      autoplay: true,
      muted: true,
      loop: true,
      controls: false,
    };
  }

  return (
    <CldVideoPlayer
      src={src}
      width={width}
      height={height}
      sourceTypes={["mp4"]}
      className={`${className} ${variant === "background" ? "cursor-default" : ""}`}
      transformation={{
        fetch_format: "auto",
        quality: variant === "primary" ? "auto:good" : "auto:low",
        crop: "fill",
      }}
      {...specialOptions}
    />
  );
}
