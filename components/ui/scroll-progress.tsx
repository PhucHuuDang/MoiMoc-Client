"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface ScrollProgressProps {
  /**
   * Color of the progress bar
   * @default "bg-gradient-to-r from-pink-500 to-purple-600"
   */
  className?: string;
  /**
   * Height of the progress bar in pixels
   * @default 3
   */
  height?: number;
}

/**
 * Accessible scroll progress indicator
 * Shows how far the user has scrolled down the page
 */
export function ScrollProgress({
  className = "bg-gradient-to-r from-pink-500 to-purple-600",
  height = 3,
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    calculateScrollProgress();
    window.addEventListener("scroll", calculateScrollProgress, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-gray-200 dark:bg-gray-800"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className={className}
          style={{
            width: `${scrollProgress}%`,
            height: "100%",
            transition: prefersReducedMotion
              ? "none"
              : "width 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {Math.round(scrollProgress)}% scrolled
      </div>
    </>
  );
}
