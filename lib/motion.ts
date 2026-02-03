/**
 * Re-export framer-motion with proper TypeScript types for production builds
 * Type augmentation is done in types/framer-motion.d.ts
 *
 * @see https://www.framer.com/motion/
 */

export {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

export type {
  HTMLMotionProps,
  MotionProps,
  ForwardRefComponent,
  Variant,
  Variants,
  MotionValue,
  AnimationControls,
} from "framer-motion";
