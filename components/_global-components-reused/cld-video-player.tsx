"use client";

import {
  type CldVideoPlayerProps,
  CldVideoPlayer as VideoPlayer,
} from "next-cloudinary";
import React from "react";

export const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  return <VideoPlayer {...props} />;
};
