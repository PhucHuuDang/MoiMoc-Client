"use client";

import { useEffect, useRef, useState } from "react";

interface UseVideoLazyLoadOptions {
  /**
   * Root margin for intersection observer
   * @default "200px"
   */
  rootMargin?: string;
  /**
   * Threshold for intersection observer
   * @default 0.1
   */
  threshold?: number;
}

/**
 * Hook to lazy load videos using Intersection Observer
 * Video will only load when it's near the viewport
 */
export function useVideoLazyLoad<T extends HTMLVideoElement>(
  options: UseVideoLazyLoadOptions = {},
) {
  const { rootMargin = "200px", threshold = 0.1 } = options;
  const videoRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsInView(true);
            setHasLoaded(true);

            // Load video sources
            const sources = videoElement.querySelectorAll("source");
            sources.forEach((source) => {
              const dataSrc = source.getAttribute("data-src");
              if (dataSrc) {
                source.setAttribute("src", dataSrc);
              }
            });

            videoElement.load();

            // Play video if autoplay is set
            if (videoElement.hasAttribute("autoplay")) {
              videoElement.play().catch(() => {
                // Autoplay was prevented, user interaction required
              });
            }
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  return { videoRef, isInView, hasLoaded };
}
