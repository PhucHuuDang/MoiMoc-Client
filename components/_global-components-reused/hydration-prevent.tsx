"use client";

import React, { useEffect } from "react";

export const HydrationPrevent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
    // if (typeof window !== "undefined") {
    //   setIsMounted(true);
    // }
  }, []);

  if (!isMounted) return null;

  return children;
};
