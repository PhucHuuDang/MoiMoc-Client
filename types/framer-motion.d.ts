// Type definitions augmentation for framer-motion
// This file provides type fixes for framer-motion version 11.x in strict TypeScript mode

declare module "framer-motion" {
  import * as React from "react";

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    whileFocus?: any;
    whileDrag?: any;
    drag?: boolean | "x" | "y";
    dragConstraints?: any;
    dragElastic?: any;
    dragMomentum?: boolean;
    dragTransition?: any;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    layout?: boolean | "position" | "size";
    layoutId?: string;
    style?: React.CSSProperties;
    onUpdate?: (latest: any) => void;
    onDragStart?: (event: any, info: any) => void;
    onDragEnd?: (event: any, info: any) => void;
    onDrag?: (event: any, info: any) => void;
  }

  export type HTMLMotionProps<T> = Omit<T, keyof MotionProps> & MotionProps;

  type MotionComponentProps<T> = HTMLMotionProps<T> & { ref?: React.Ref<any> };

  export interface Motion {
    div: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLDivElement>>
    >;
    span: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLSpanElement>>
    >;
    button: React.ForwardRefExoticComponent<
      MotionComponentProps<React.ButtonHTMLAttributes<HTMLButtonElement>>
    >;
    section: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    article: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    header: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    footer: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    nav: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    main: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    aside: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLElement>>
    >;
    h1: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    h2: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    h3: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    h4: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    h5: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    h6: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLHeadingElement>>
    >;
    p: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLParagraphElement>>
    >;
    a: React.ForwardRefExoticComponent<
      MotionComponentProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
    >;
    img: React.ForwardRefExoticComponent<
      MotionComponentProps<React.ImgHTMLAttributes<HTMLImageElement>>
    >;
    ul: React.ForwardRefExoticComponent<
      MotionComponentProps<React.HTMLAttributes<HTMLUListElement>>
    >;
    ol: React.ForwardRefExoticComponent<
      MotionComponentProps<React.OlHTMLAttributes<HTMLOListElement>>
    >;
    li: React.ForwardRefExoticComponent<
      MotionComponentProps<React.LiHTMLAttributes<HTMLLIElement>>
    >;
    form: React.ForwardRefExoticComponent<
      MotionComponentProps<React.FormHTMLAttributes<HTMLFormElement>>
    >;
    input: React.ForwardRefExoticComponent<
      MotionComponentProps<React.InputHTMLAttributes<HTMLInputElement>>
    >;
    textarea: React.ForwardRefExoticComponent<
      MotionComponentProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
    >;
    select: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SelectHTMLAttributes<HTMLSelectElement>>
    >;
    label: React.ForwardRefExoticComponent<
      MotionComponentProps<React.LabelHTMLAttributes<HTMLLabelElement>>
    >;
    svg: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGSVGElement>>
    >;
    path: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGPathElement>>
    >;
    circle: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGCircleElement>>
    >;
    rect: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGRectElement>>
    >;
    line: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGLineElement>>
    >;
    ellipse: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGEllipseElement>>
    >;
    polygon: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGPolygonElement>>
    >;
    polyline: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGPolylineElement>>
    >;
    g: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGGElement>>
    >;
    defs: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGDefsElement>>
    >;
    linearGradient: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGLinearGradientElement>>
    >;
    radialGradient: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGRadialGradientElement>>
    >;
    stop: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGStopElement>>
    >;
    text: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGTextElement>>
    >;
    tspan: React.ForwardRefExoticComponent<
      MotionComponentProps<React.SVGAttributes<SVGTSpanElement>>
    >;
    [key: string]: any; // Fallback for any other HTML/SVG elements
  }

  export const motion: Motion;
  export const AnimatePresence: React.FC<any>;
  export function useAnimation(): any;
  export function useAnimate(): any;
  export function useInView(ref: any, options?: any): boolean;
  export function useScroll(options?: any): any;
  export function useTransform(value: any, callback: (value: any) => any): any;
  export function useTransform(
    value: any,
    inputRange: any[],
    outputRange: any[],
  ): any;
  export function useMotionValue(initial: any): any;
  export function useSpring(value: any, options?: any): any;
  export function stagger(delay: number, options?: any): any;

  export type Variant = any;
  export type Variants = any;
  export type MotionValue = any;
  export type AnimationControls = any;
  export type ForwardRefComponent<T, P> = any;
}
